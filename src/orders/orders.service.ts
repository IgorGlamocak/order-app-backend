import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entity/order';
import { User } from '../users/entity/user';
import { Service } from '../services/entity/service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  findAll() {
    return this.orderRepository.find();
  }

  findOne(id: number) {
    return this.orderRepository.findOne({ where: { id } });
  }

  async create(data: {
    user: User;
    service: Service;
    quantity: number;
    totalPrice?: number;
  }) {
    // Lahko dodaš logiko za izračun totalPrice = price * quantity
    // ali pa prej dobiš user/service iz baz
    const order = this.orderRepository.create(data);
    return this.orderRepository.save(order);
  }
}


