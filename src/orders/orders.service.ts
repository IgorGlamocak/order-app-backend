import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entity/order';
import { CreateOrderDto } from './entity/create-order.dto';
import { UpdateOrderDto } from './entity/update-order.dto';
import { ServicesService } from 'src/services/services.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private usersService: UsersService,
    private servicesService: ServicesService
  ) {}

  create(dto: CreateOrderDto) {
    const order = this.orderRepository.create(dto);
    return this.orderRepository.save(order);
  }

  findAll() {
    return this.orderRepository.find();
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) throw new NotFoundException(`Order ${id} not found`);
    return order;
  }

  async update(id: number, dto: UpdateOrderDto) {
    const order = await this.orderRepository.preload({ id, ...dto });
    if (!order) throw new NotFoundException(`Order ${id} not found`);
    return this.orderRepository.save(order);
  }

  async remove(id: number) {
    const order = await this.findOne(id);
    return this.orderRepository.remove(order);
  }

  async createOrder(userId: number, dto: CreateOrderDto): Promise<Order> {
    const user = await this.usersService.findOne(userId);
    if (!user) throw new NotFoundException('User not found');

    const service = await this.servicesService.findOne(dto.serviceId);
    if (!service) throw new NotFoundException('Service not found');

    const order = this.orderRepository.create({
      user,
      service,
      orderDate: new Date(),
      quantity: dto.quantity,
      totalPrice: dto.totalPrice,
    });
    return this.orderRepository.save(order);
  }
}


