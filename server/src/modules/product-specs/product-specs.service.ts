import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProductSpecsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create product specification
   */
  async create(
    productName: string,
    category: string,
    specifications: Record<string, any>,
    performanceMetrics: Record<string, any>,
    technicalDetails: Record<string, any>,
    createdById: string,
    mediaGalleryIds?: string[],
  ) {
    const spec = await this.prisma.productSpecification.create({
      data: {
        productName,
        category,
        specifications,
        performanceMetrics,
        technicalDetails,
        mediaGalleryIds: mediaGalleryIds || [],
        createdById,
      },
      include: {
        createdBy: {
          select: {
            id: true,
            email: true,
            fullName: true,
          },
        },
      },
    });

    return spec;
  }

  /**
   * Get all product specifications
   */
  async findAll(
    page: number = 1,
    limit: number = 20,
    category?: 'duma' | 'archer' | 'artemis' | 'kallon' | 'iroko',
  ) {
    const skip = (page - 1) * limit;
    const where: any = {};

    if (category) {
      where.category = category;
    }

    const total = await this.prisma.productSpecification.count({ where });

    const specs = await this.prisma.productSpecification.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        createdBy: {
          select: {
            id: true,
            email: true,
            fullName: true,
          },
        },
      },
    });

    return {
      data: specs,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get single product specification
   */
  async findOne(id: string) {
    const spec = await this.prisma.productSpecification.findUnique({
      where: { id },
      include: {
        createdBy: {
          select: {
            id: true,
            email: true,
            fullName: true,
          },
        },
      },
    });

    if (!spec) {
      throw new NotFoundException(`Product specification with ID ${id} not found`);
    }

    return spec;
  }

  /**
   * Get specifications by category (public)
   */
  async findByCategory(category: string) {
    const specs = await this.prisma.productSpecification.findMany({
      where: { category },
      orderBy: { createdAt: 'desc' },
      include: {
        createdBy: {
          select: {
            id: true,
            email: true,
            fullName: true,
          },
        },
      },
    });

    return specs;
  }

  /**
   * Update product specification
   */
  async update(
    id: string,
    productName?: string,
    specifications?: Record<string, any>,
    performanceMetrics?: Record<string, any>,
    technicalDetails?: Record<string, any>,
    mediaGalleryIds?: string[],
  ) {
    await this.findOne(id); // Check exists

    const data: any = {};

    if (productName) data.productName = productName;
    if (specifications) data.specifications = specifications;
    if (performanceMetrics) data.performanceMetrics = performanceMetrics;
    if (technicalDetails) data.technicalDetails = technicalDetails;
    if (mediaGalleryIds) data.mediaGalleryIds = mediaGalleryIds;

    const updated = await this.prisma.productSpecification.update({
      where: { id },
      data,
      include: {
        createdBy: {
          select: {
            id: true,
            email: true,
            fullName: true,
          },
        },
      },
    });

    return updated;
  }

  /**
   * Delete product specification
   */
  async remove(id: string) {
    await this.findOne(id);

    await this.prisma.productSpecification.delete({
      where: { id },
    });

    return {
      message: 'Product specification deleted successfully',
    };
  }

  /**
   * Get product specs statistics
   */
  async getStats() {
    const total = await this.prisma.productSpecification.count();

    const byCategory = await this.prisma.productSpecification.groupBy({
      by: ['category'],
      _count: true,
    });

    return {
      total,
      byCategory: byCategory.reduce(
        (acc, item) => {
          acc[item.category] = item._count;
          return acc;
        },
        {} as Record<string, number>,
      ),
    };
  }
}

