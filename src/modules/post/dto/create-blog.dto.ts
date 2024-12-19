import { PartialType } from '@nestjs/mapped-types'
import { Blog } from '../entities/blog.entity'

export class CreateBlogDto extends PartialType(Blog) {}
