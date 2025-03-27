import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './entity/service';
import { CreateServiceDto } from './entity/create-service.dto';
import { UpdateServiceDto } from './entity/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  create(dto: CreateServiceDto) {
    const service = this.serviceRepository.create(dto);
    return this.serviceRepository.save(service);
  }

  findAll() {
    return this.serviceRepository.find();
  }

  async findOne(id: number) {
    const service = await this.serviceRepository.findOne({ where: { id } });
    if (!service) throw new NotFoundException(`Service ${id} not found`);
    return service;
  }

  async update(id: number, dto: UpdateServiceDto) {
    const service = await this.serviceRepository.preload({ id, ...dto });
    if (!service) throw new NotFoundException(`Service ${id} not found`);
    return this.serviceRepository.save(service);
  }

  async remove(id: number) {
    const service = await this.findOne(id);
    return this.serviceRepository.remove(service);
  }
}


