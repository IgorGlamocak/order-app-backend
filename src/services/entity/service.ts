import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from '../../orders/entity/order';

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  serviceName: string;

  @Column({ nullable: true })
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ nullable: true })
  executionTime?: string;

  @Column({ nullable: true })
  imageUrl?: string;

  // Povezava z naročili (en service -> več orders)
  @OneToMany(() => Order, (order) => order.service)
  orders: Order[];
}
