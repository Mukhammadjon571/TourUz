import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { compareHash, generateHash } from 'src/utils/bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { IUser } from './interface/user.interface';
import { UsersRepo } from './repo/user.repo';

@Injectable()
export class UsersService {
  constructor(private readonly repo: UsersRepo) {}

  create(data: CreateUserDto): Promise<IUser> {
    return this.repo.create(data);
  }

  findOne(id: number): Promise<IUser | null> {
    return this.repo.findOne(id);
  }

  findByUsername(username: string): Promise<IUser | null> {
    return this.repo.findByUsername(username);
  }

  findByEmail(email: string): Promise<IUser | null> {
    return this.repo.findByEmail(email);
  }

  async findByToken(accessToken: string) {
    return this.repo.findByAccessToken(accessToken);
  }

  async findUserByPhoneNumber(email: string) {
    const user = await this.repo.findByEmail(email);

    return {
      existance: !!user,
    };
  }

  async isEmptyUsername(username: string): Promise<boolean> {
    const user: IUser = await this.findByUsername(username);
    return !user;
  }

  verifyById(id: number) {
    return this.repo.verifyById(id);
  }

  async resetPassword(userId: number, data: ResetPasswordDto) {
    const user = await this.repo.getUserPassword(userId);

    if (!user) {
      throw new NotFoundException('user not found');
    }
    if (!(await compareHash(data.oldPassword, user.password))) {
      throw new ConflictException("user's passwords not match");
    }

    const hashedPassword = await generateHash(data.newPassword);

    this.repo.updatePassword(userId, hashedPassword);

    return {
      code: 200,
      message: 'updated',
      data: null,
    };
  }

  async forgotPassword(id: number, password: string) {
    return await this.repo.updatePassword(id, password);
  }

  update(id: number, body: UpdateUserDTO) {
    return this.repo.updateById(id, body);
  }

  async updatePassword(id: number, password: string) {
    return await this.repo.updatePassword(id, password);
  }
}
