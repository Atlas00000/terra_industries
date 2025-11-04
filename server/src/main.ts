import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { winstonConfig } from './common/logger/winston.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonConfig),
  });

  // Global prefix for all routes
  app.setGlobalPrefix('api/v1');

  // Global exception filter
  app.useGlobalFilters(new AllExceptionsFilter());

  // Enable CORS
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false, // Allow extra properties for now (using Zod for validation)
    }),
  );

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Terra Industries API')
    .setDescription('Backend API for Terra Industries defense technology platform')
    .setVersion('1.0')
    .addTag('auth', 'Authentication endpoints')
    .addTag('inquiries', 'Contact inquiries management')
    .addTag('health', 'Health check endpoints')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const port = process.env.PORT || 4000;
  await app.listen(port);

  console.log(`
🚀 Terra Industries Backend API
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Environment: ${process.env.NODE_ENV || 'development'}
Server:      http://localhost:${port}
API:         http://localhost:${port}/api/v1
Docs:        http://localhost:${port}/api-docs
Health:      http://localhost:${port}/api/v1/health
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `);
}

bootstrap();

