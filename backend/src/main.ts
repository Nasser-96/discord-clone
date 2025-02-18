import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import helmet from '@fastify/helmet';
import multipart from '@fastify/multipart';
import ReturnResponse from './helper/returnResponse';
import { SocketIOAdapter } from './socket/socket.adapter';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import fastifyStatic from '@fastify/static';

const swaggerDocument = new DocumentBuilder()
  .setTitle('API')
  .setDescription('API')
  .setVersion('1.0')
  .addTag('API')
  .build();

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true,
      bodyLimit: 50 * 1024 * 1024 /* 50 MB */,
    }),
  );

  app.enableCors({
    origin: '*',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        throw new BadRequestException(
          ReturnResponse({
            response: validationErrors?.map((error) => ({
              field: error?.property,
              error: Object?.values(error?.constraints)?.join(', '),
            })),
            is_successful: false,
            error_msg: '',
            success: '',
          }),
        );
      },
    }),
  );

  const socketAdapter = new SocketIOAdapter(app);
  app.useWebSocketAdapter(socketAdapter);
  app.register(multipart, {
    limits: {
      fileSize: 50 * 1024 * 1024 /* 50 MB */,
    },
  });
  app.register(fastifyStatic, {
    root: join(__dirname, '../uploaded/images'), // Adjust based on your actual directory
    prefix: '/uploaded/images/', // URL path to access files,
  });

  app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  });
  SwaggerModule.setup(
    'api',
    app,
    SwaggerModule.createDocument(app, swaggerDocument),
  );
  await app.listen(9000);
}
bootstrap();
