import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { AuthModule } from './modules/auth/auth.module'
import { MulterOptions } from './modules/base/services/multer.service'
import { DatabaseModule } from './modules/database/database.module'
import { BlogModule } from './modules/post/blog.module'

@Module({
    imports: [
        DatabaseModule,
        BlogModule,
        AuthModule,
        MulterModule.registerAsync({ useClass: MulterOptions }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
