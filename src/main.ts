import { NestFactory } from '@nestjs/core';
import * as cookies from 'cookie-parser';
import { AppModule } from './app.module';

(async () => {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(cookies());
  app.setGlobalPrefix('/api/v1');

  await app.listen(3030);
})();
