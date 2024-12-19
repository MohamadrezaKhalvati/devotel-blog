import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseFilePipe,
    Post,
    Put,
    Query,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { ApiBody, ApiConsumes } from '@nestjs/swagger'
import { QueryParams, SingleQueryParams } from '../base'
import { MaxFileSizeValidator } from '../base/validators/file-max-size.validator'
import { FileTypeValidator } from '../base/validators/file-type.validator'
import { SharpPipe } from '../upload/sharp.pipe'
import { CreateImageInterface } from '../upload/types/create-image.interface'
import { BlogService } from './blog.service'
import { CreateBlogDto } from './dto/create-blog.dto'
import { UpdateBlogDto } from './dto/update-blog.dto'
import { Blog } from './entities/blog.entity'

@Controller('posts')
@UseGuards(AuthGuard())
export class BlogController {
    constructor(private readonly blogService: BlogService) {}

    @Post('')
    @ApiBody({ type: CreateBlogDto })
    @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 3 }]))
    @ApiConsumes('multipart/form-data')
    async create(
        @UploadedFiles(
            new ParseFilePipe({
                validators: [
                    new FileTypeValidator({ fileType: '.(png|jpeg|jpg|webp)' }),
                    new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 1 }),
                ],
                fileIsRequired: true,
            }),
            SharpPipe,
        )
        files: CreateImageInterface[],
        @Body() input: CreateBlogDto,
    ) {
        return await this.blogService.createOne(input, files)
    }

    @Get(':id')
    async findOne(
        @Param('id') id: number,
        @Query() query: SingleQueryParams<Blog>,
    ) {
        return await this.blogService.findOne(id, query)
    }

    @Get('')
    async findAll(@Query() query: QueryParams<Blog>) {
        return await this.blogService.findAll(query)
    }

    @Put(':id')
    @ApiBody({ type: UpdateBlogDto })
    @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 3 }]))
    @ApiConsumes('multipart/form-data')
    async update(
        @UploadedFiles(
            new ParseFilePipe({
                validators: [
                    new FileTypeValidator({ fileType: '.(png|jpeg|jpg|webp)' }),
                    new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 1 }),
                ],
                fileIsRequired: true,
            }),
            SharpPipe,
        )
        files: CreateImageInterface[],
        @Param('id') id: string,
        @Body() input: UpdateBlogDto,
    ) {
        return await this.blogService.updateOne(Number(id), input, files)
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.blogService.deleteOne(Number(id))
    }
}
