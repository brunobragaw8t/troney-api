import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { CommandBus, CqrsModule, QueryBus } from '@nestjs/cqrs';
import { RegisterDto } from './dto/register/register.dto';
import { ConflictException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      controllers: [AuthController],
      providers: [
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    queryBus = module.get<QueryBus>(QueryBus);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should throw 409 if email already registered', async () => {
      const conflictingEmail = 'example@email.com';

      const registerDto: RegisterDto = {
        email: conflictingEmail,
        password: 'sample',
        name: 'Name',
      };

      jest.spyOn(queryBus, 'execute').mockResolvedValueOnce([
        {
          email: conflictingEmail,
          password: 'example',
          name: 'Another person',
        },
      ]);

      await expect(controller.register(registerDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });
});
