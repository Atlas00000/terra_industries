import { Module } from '@nestjs/common';
import { InquiriesController } from './inquiries.controller';
import { InquiriesService } from './inquiries.service';
import { LeadScoringService } from './services/lead-scoring.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [InquiriesController],
  providers: [InquiriesService, LeadScoringService],
  exports: [InquiriesService],
})
export class InquiriesModule {}

