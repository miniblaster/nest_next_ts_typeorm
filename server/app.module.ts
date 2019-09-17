import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import {
  NextModule,
  NextMiddleware,
} from '@nestpress/next';
import { EntityModule } from './entities/entity.module';
import { LogicModule } from './logics/logic.module';
import { PageModule } from './pages/page.module';

@Module({
  imports: [
    NextModule,
    EntityModule,
    LogicModule,
    PageModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(NextMiddleware)
      .forRoutes({
        path: '_next*',
        method: RequestMethod.GET,
      });

    consumer
      .apply(NextMiddleware)
      .forRoutes({
        path: 'static*',
        method: RequestMethod.GET,
      });
  }
}
