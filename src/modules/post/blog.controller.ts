import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
} from '@nestjs/common'
import { QueryParams, SingleQueryParams } from '../base'
import { BlogService } from './blog.service'
import { Blog } from './entities/blog.entity'

@Controller('posts')
export class BlogController {
    constructor(private readonly blogService: BlogService) {}

    @Post('')
    create(@Body() input) {}

    @Get(':id')
    findOne(@Param('id') id: number, @Query() query: SingleQueryParams<Blog>) {}

    @Get('')
    findAll(@Query() query: QueryParams<Blog>) {}

    @Put(':id')
    update(@Param('id') id: string) {}

    @Delete(':id')
    delete(@Param('id') id: string) {}
}