import {
    Injectable,
    Logger,
    NotFoundException,
    OnModuleInit,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as fs from 'fs'
import * as path from 'path'
import { Repository } from 'typeorm'
import { BaseService } from '../base'
import { CreateUploadDto } from './dto/create-upload.dto'
import { Upload } from './entities/upload.entity'
import { CreateImageInterface } from './types/create-image.interface'

@Injectable()
export class UploadService extends BaseService<Upload> implements OnModuleInit {
    constructor(
        @InjectRepository(Upload)
        private uploadRepository: Repository<Upload>,
    ) {
        super(uploadRepository)
    }

    async createUpload(file: CreateUploadDto, user: number) {
        const upload = this.uploadRepository.create({
            ...file,
        })
        return this.uploadRepository.save(upload)
    }

    async onModuleInit() {
        const filePath = path.join(__dirname, '../../', `uploads`)
        if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath, { recursive: false })
            Logger.log('uploads Create')
        }
    }

    async deletefile(id: number) {
        const file = await this.uploadRepository.findOne({
            where: { id },
        })

        return await fs.unlink(
            path.join(__dirname, '../../', `uploads/${file.name}`),
            e => {
                if (e) {
                    throw new NotFoundException('File not found')
                } else {
                    const deleteFile = super.hardDelete(+id)
                }
            },
        )
    }

    createOne(files: CreateImageInterface[]) {
        console.log('> files ', files)
        return this.uploadRepository.insert(files as Partial<Upload>)
    }
}
