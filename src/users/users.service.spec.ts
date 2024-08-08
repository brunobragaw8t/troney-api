import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('hashPassword', () => {
    it('should hash the password', async () => {
      const password = 'Admin_123';
      const hash = await service.hashPassword(password);

      expect(hash).not.toEqual(password);
    });

    it('should accept correct password and reject wrong password', async () => {
      const correctPassword = 'Admin_123';
      const wrongPassword = 'Wrong_123';
      const hash = await service.hashPassword(correctPassword);

      const isCorrectCorrect = await service.isCorrectPassword(
        correctPassword,
        hash,
      );

      const isWrongWrong = await service.isCorrectPassword(wrongPassword, hash);

      expect(isCorrectCorrect).toStrictEqual(true);
      expect(isWrongWrong).toStrictEqual(false);
    });

    it('should accept correct password regardless the hash', async () => {
      const password = 'Admin_123';

      const hash1 = await service.hashPassword(password);
      const hash2 = await service.hashPassword(password);

      const isCorrect1 = await service.isCorrectPassword(password, hash1);
      const isCorrect2 = await service.isCorrectPassword(password, hash2);

      expect(isCorrect1).toStrictEqual(true);
      expect(isCorrect2).toStrictEqual(true);
    });
  });
});
