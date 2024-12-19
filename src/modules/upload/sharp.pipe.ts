import { Injectable, PipeTransform } from '@nestjs/common'
import * as fs from 'fs'
import * as path from 'path'
import * as sharp from 'sharp'
import { CreateFileInterface } from './dto/create-file.dto'
import { CreateImageInterface } from './types/create-image.interface'

@Injectable()
export class SharpPipe
    implements
        PipeTransform<Express.Multer.File[], Promise<CreateFileInterface[]>>
{
    async checkAndCreatePublicFolder(path_name?: string) {
        const folderPath = path_name
            ? path.join(__dirname, '../../public', path_name)
            : path.join(__dirname, '../..', 'public')
        try {
            await fs.promises.access(folderPath)
        } catch (error) {
            await fs.promises.mkdir(folderPath)
        }
    }

    async transform(value: Express.Multer.File[]) {
        const images = value as CreateFileInterface
        const files: CreateImageInterface[] = []
        for (const imagesKey in images) {
            await this.checkAndCreatePublicFolder(imagesKey)
            for (const file of images[imagesKey]) {
                const originalName = path.parse(file.originalname).name
                const filename = Date.now() + '-' + originalName + '.webp'
                const thumbnail_name =
                    Date.now() + '-' + originalName + '.thumbnail' + '.webp'

                await sharp(file.buffer)
                    .resize({ fit: sharp.fit.cover })
                    .webp({ effort: 3 })
                    .toFile(path.join(`public`, imagesKey, filename))

                await sharp(file.buffer)
                    .resize(800, 800)
                    .webp({ effort: 3 })
                    .toFile(path.join('public', imagesKey, thumbnail_name))

                file.path = `\\public\\${imagesKey}\\${filename}`
                file.filename = filename
                file.thumbnail_path = `\\public\\${imagesKey}\\${thumbnail_name}`
                files.push(file)
            }
        }
        return files
    }
}
