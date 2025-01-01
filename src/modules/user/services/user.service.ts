import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

const listUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'phamtrangiaan27@gmail.com',
    password: '123456',
  },
];

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(name: string, email: string): Promise<User> {
    const user = this.userRepository.create({ name, email });
    return this.userRepository.save(user);
  }

  async getUsers(): Promise<User[]> {
    return [...listUsers];
  }
}
