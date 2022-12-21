import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminsRepo } from './repo/admins.repo';

@Injectable()
export class AdminsService {
  @Inject() private readonly repo: AdminsRepo;

  async create(createAdminDto: CreateAdminDto) {
    const admin = await this.repo.findByAdminId(createAdminDto.userId);

    if (admin) {
      throw new ConflictException('admin already exist');
    }

    return this.repo.create(createAdminDto);
  }

  findAll() {
    return this.repo.findAll();
  }

  async findOne(id: number) {
    const admin = await this.repo.findOne(id);

    if (!admin) {
      throw new NotFoundException('admin not found!');
    }

    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.repo.findOne(id);

    if (!admin) {
      throw new NotFoundException('admin not found!');
    }

    return this.repo.update(id, updateAdminDto);
  }

  async remove(id: number) {
    const admin = await this.repo.findOne(id);

    if (!admin) {
      throw new NotFoundException('admin not found!');
    }

    return this.repo.remove(id);
  }

  async findByAdminId(adminId: number) {
    return this.repo.findByAdminId(adminId);
  }
}
