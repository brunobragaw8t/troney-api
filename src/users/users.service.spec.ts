import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './aggregate/user.entity';
import { Repository } from 'typeorm';

const usersMock: User[] = [
  {
    id: '123',
    email: 'user1@email.com',
    password: 'abc',
    name: 'User One',
  },
  {
    id: '456',
    email: 'user2@email.com',
    password: 'def',
    name: 'User Two',
  },
];

describe('UsersService', () => {
  let service: UsersService;
  let repo: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn().mockImplementation(({ where }) => {
              if (where && where.email) {
                return Promise.resolve(
                  usersMock.filter((user) => user.email === where.email),
                );
              }
              return Promise.resolve(usersMock);
            }),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll()', () => {
    it('should return array of users', async () => {
      const users = await service.findAll();
      expect(users).toEqual(usersMock);
    });

    it('should filter results by email', async () => {
      const users = await service.findAll({ email: 'user1@email.com' });

      expect(users).toEqual(
        [...usersMock].filter((u) => 'user1@email.com' === u.email),
      );
    });
  });
});
