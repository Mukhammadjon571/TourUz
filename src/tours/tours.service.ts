import { Injectable } from '@nestjs/common';
import { ToursRepo } from './repo/tours.repo';
import { CreateTourDTO } from './dto/create-tour.dto';
import { UpdateTourDTO } from './dto/update-tour.dto';

@Injectable()
export class ToursService {
  constructor(private readonly repo: ToursRepo) {}

  async create(data: CreateTourDTO, created_by: number) {
    return await this.repo.create(data, created_by);
  }

  async update(id: number, data: UpdateTourDTO, updated_by: number) {
    return await this.repo.update(id, data, updated_by);
  }

  async delete(id: number, updated_by: number) {
    return await this.repo.remove(id, updated_by);
  }

  async findAll() {
    return await this.repo.findAll();
  }

  async findOne(id: number) {
    return await this.repo.findOne(id);
  }
}
