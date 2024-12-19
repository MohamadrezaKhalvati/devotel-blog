import {
    Controller,
    Delete,
    FileTypeValidator,
    Param,
    ParseFilePipe,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Public } from '../base/decorators'
import { ImagePipe } from '../base/pipes'
import { CreateUploadDto } from './dto/create-upload.dto'
import { UploadService } from './upload.service'

@Controller('upload')
@Public()
export class UploadController {
    constructor(private readonly uploadService: UploadService) {}

    @Post(':id')
    @Public()
    @UseInterceptors(FileInterceptor('image'))
    create(
        @Param('id') id: number,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new FileTypeValidator({ fileType: '.(png|jpeg|jpg|webp)' }),
                ],
            }),
            ImagePipe,
        )
        file: CreateUploadDto,
    ) {
        return this.uploadService.createUpload(file, id)
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.uploadService.deletefile(+id)
    }
}
