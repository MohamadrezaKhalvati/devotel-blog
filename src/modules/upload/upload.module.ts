import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { UploadController } from './upload.controller'
import { UploadService } from './upload.service'

@Module({
    imports: [DatabaseModule],
    controllers: [UploadController],
    providers: [UploadService],
    exports: [UploadService],
})
export class UploadModule {}
