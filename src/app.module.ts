import { Module } from '@nestjs/common'
import { AuthModule } from './modules/auth/auth.module'
import { DatabaseModule } from './modules/database/database.module'
import { BlogModule } from './modules/post/blog.module'

@Module({
    imports: [DatabaseModule, BlogModule, AuthModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
