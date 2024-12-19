import { BaseEntity } from 'src/modules/base'
import { Upload } from 'src/modules/upload/entities/upload.entity'
import { Column, Entity, OneToMany, Relation } from 'typeorm'

@Entity()
export class Blog extends BaseEntity {
    @Column({ type: 'varchar' })
    title: string

    @Column({ type: 'text' })
    content: string

    @Column({ nullable: true, type: 'varchar' })
    imageUrl?: string

    @OneToMany('Upload', 'blogs', { cascade: true })
    upload: Relation<Upload[]>
}
