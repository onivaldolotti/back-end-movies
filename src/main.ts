import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.enableCors({
    origin: configService.get('CORS_ORIGIN'),
    credentials: configService.get('CORS_CREDENTIALS') === 'true',
    allowedHeaders: configService.get('CORS_ALLOW_HEADERS'),
    preflightContinue: configService.get('CORS_PREFLIGHT_CONTINUE') === 'true',
    optionsSuccessStatus: +configService.get('CORS_OPTIONS_SUCESS_STATUS'),
  });

  const config = new DocumentBuilder()
    .setTitle('Movies')
    .setDescription('Movie API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(configService.get('PORT'));
}
bootstrap();
