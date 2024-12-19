import { Injectable } from '@nestjs/common'
import { MulterOptionsFactory } from '@nestjs/platform-express'
import { MulterOptions as MulterOptionsType } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'
import { memoryStorage } from 'multer'

@Injectable()
export class MulterOptions implements MulterOptionsFactory {
    createMulterOptions(): MulterOptionsType {
        return {
            storage: memoryStorage(),
        }
    }
}
