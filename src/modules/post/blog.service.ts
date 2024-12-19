import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { BaseService } from '../base'
import { Blog } from './entities/blog.entity'

@Injectable()
export class BlogService extends BaseService<Blog> {
    constructor(
        @InjectRepository(Blog)
        protected blogRepo: Repository<Blog>,
    ) {
        super(blogRepo)
    }

    async createOne() {}

    async fineOne() {}

    async findAllBlog() {}

    async updateOne() {}

    async deleteOne() {}
}
