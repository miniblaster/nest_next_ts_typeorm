import { hash } from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly repository: Repository<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    let { name, email, password } = createUserDto;
    password = await hash(password, 8);
    return await this.repository.create({ name, email, password });
  }

  async findAll(): Promise<User[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.repository.findOne(id);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.repository.findOne({ email });
  }

  async save(user: User): Promise<User> {
    return await this.repository.save(user);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
