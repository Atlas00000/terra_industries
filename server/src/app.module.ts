import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { InquiriesModule } from './modules/inquiries/inquiries.module';
import { RfqModule } from './modules/rfq/rfq.module';
import { EmailModule } from './modules/email/email.module';
import { MediaModule } from './modules/media/media.module';
import { ActivityLogsModule } from './modules/activity-logs/activity-logs.module';

@Module({
  imports: [
    // Configuration module (loads .env)
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '../.env'],
    }),

    // Rate limiting
    ThrottlerModule.forRoot([
      {
        ttl: parseInt(process.env.THROTTLE_TTL || '60') * 1000,
        limit: parseInt(process.env.THROTTLE_LIMIT || '10'),
      },
    ]),

    // Database
    PrismaModule,

    // Feature modules
    AuthModule,
    InquiriesModule,
    RfqModule,
    EmailModule,
    MediaModule,
    ActivityLogsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

