import { BaseEntity } from 'src/modules/base'
import { Blog } from 'src/modules/post/entities/blog.entity'
import { AfterLoad, Column, Entity, ManyToOne, Relation } from 'typeorm'

@Entity()
export class Upload extends BaseEntity {
    @Column('varchar')
    name: string

    @Column('varchar')
    originalname: string

    @Column('int')
    size: number

    @Column('varchar')
    mimetype: string

    @Column('varchar')
    path: string

    @Column({ type: 'varchar', nullable: true })
    image_alt?: string

    @Column({ type: 'varchar' })
    full_path: string

    @ManyToOne('Blog', 'upload')
    blogs: Relation<Blog>

    @AfterLoad()
    setPath() {
        this.full_path = `${process.env.APP_URL}/upload/${this.id}`
    }
}
