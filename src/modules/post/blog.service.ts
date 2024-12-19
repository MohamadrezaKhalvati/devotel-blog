import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { BaseService } from '../base'
import { CreateImageInterface } from '../upload/types/create-image.interface'
import { UploadService } from '../upload/upload.service'
import { CreateBlogDto } from './dto/create-blog.dto'
import { UpdateBlogDto } from './dto/update-blog.dto'
import { Blog } from './entities/blog.entity'

@Injectable()
export class BlogService extends BaseService<Blog> {
    constructor(
        @InjectRepository(Blog)
        protected blogRepo: Repository<Blog>,
        protected uploadService: UploadService,
    ) {
        super(blogRepo)
    }

    async createOne(input: CreateBlogDto, files?: CreateImageInterface[]) {
        const blog = this.blogRepo.create(input)
        await this.blogRepo.save(blog)

        if (files && files.length > 0) {
            await this.handleUserFiles(files, blog.id)
        }

        return blog
    }

    async updateOne(
        id: number,
        input: UpdateBlogDto,
        files: CreateImageInterface[],
    ) {
        const blog = await this.blogRepo.findOne({
            where: { id },
            relations: { upload: true },
        })

        if (blog && blog.upload.length > 0) {
            await Promise.all(
                blog.upload.map(file => this.uploadService.deletefile(file.id)),
            )
        }
        if (files && files.length > 0) {
            await this.handleUserFiles(files, id)
        }
        return await this.blogRepo.update(id, input)
    }

    async deleteOne(id: number) {
        const blog = await this.blogRepo.findOne({
            where: { id },
            relations: { upload: true },
        })
        if (!blog) {
            throw new Error('Blog not found')
        }

        // await this.uploadService.hardDelete()
        await this.blogRepo.remove(blog)
        await Promise.all(
            blog.upload.map(file => this.uploadService.deletefile(file.id)),
        )
        return blog
    }

    private async handleUserFiles(
        files: CreateImageInterface[],
        user_info_id: number,
    ) {
        if (files?.length > 0) {
            await this.uploadService.createOne(files)
        }
    }
}
