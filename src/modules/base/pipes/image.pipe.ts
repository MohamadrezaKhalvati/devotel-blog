import { Injectable, PipeTransform } from '@nestjs/common'
import { Upload } from 'src/modules/upload/entities/upload.entity'
import { DeepPartial } from 'typeorm'
import { transformFile } from '../utils/file.utils'

@Injectable()
export class ImagePipe
    implements PipeTransform<Express.Multer.File, Promise<DeepPartial<Upload>>>
{
    async transform(file: Express.Multer.File): Promise<DeepPartial<Upload>> {
        return transformFile(file)
    }
}
