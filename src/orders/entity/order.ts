import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entity/user';
import { Service } from '../../services/entity/service';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.orders, { eager: true })
  user: User;

  @ManyToOne(() => Service, (service) => service.orders, { eager: true })
  service: Service;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  orderDate: Date;

  @Column({ default: 1 })
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  totalPrice: number;
}
