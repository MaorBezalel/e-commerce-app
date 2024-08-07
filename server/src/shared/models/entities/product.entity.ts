import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Review } from '@/shared/models/entities';
import { OrderProductLink } from '@/shared/models/relationships';
import { Dimension } from '@/shared/models/composites';
import { Category } from '@/shared/types/enums/db.types';
import { PGDataTransformer } from '@/shared/utils/helpers';

@Entity('Product')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    product_id: string;

    @Column({ type: 'text' })
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'enum', enum: Category })
    category: Category;

    @Column({ type: 'real' })
    price: number;

    @Column({ type: 'real' })
    rating: number;

    @Column({ type: 'integer' })
    stock: number;

    @Column({ type: 'text', array: true, nullable: true })
    images: string[];

    @Column({ type: 'text', nullable: true })
    thumbnail: string;

    @Column({ type: 'text', nullable: true })
    brand: string;

    @Column({ type: 'text', nullable: true })
    return_policy: string;

    @Column({ type: 'text', nullable: true })
    shipping_info: string;

    @Column({ type: 'text', nullable: true })
    warranty_info: string;

    @Column({
        type: 'text',
        transformer: {
            from: PGDataTransformer.fromPGCompositeType(Dimension),
            to: PGDataTransformer.toPGCompositeType(Dimension),
        },
        nullable: true
    })
    dimension: Dimension;

    @OneToMany(() => Review, (review) => review.product)
    reviews: Promise<Review[]>;

    @OneToMany(() => OrderProductLink, (orderProductLink) => orderProductLink.product)
    orderProductLinks: Promise<OrderProductLink[]>;
}
