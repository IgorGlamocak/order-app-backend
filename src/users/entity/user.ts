import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from '../../orders/entity/order';

@Entity('users') // ime tabele v bazi
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  avatar?: string;

  // En user ima lahko več naročil
  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
