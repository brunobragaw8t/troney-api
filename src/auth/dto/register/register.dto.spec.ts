import { RegisterDto, registerSchema } from './register.dto';

describe('RegisterDto', () => {
  it('should block non-email strings', () => {
    const dto: RegisterDto = {
      email: 'test',
      password: '',
      name: '',
    };

    const res = registerSchema.safeParse(dto);

    expect(res.success).toBe(false);

    expect(res.error).toBeDefined();

    if ('undefined' !== typeof res.error) {
      const foundError = res.error.issues.some((i) => {
        return (
          JSON.stringify(['email']) === JSON.stringify(i.path) &&
          'invalid_string' === i.code
        );
      });

      expect(foundError).toBe(true);
    }
  });

  it('should require password to be at least 8 characters long', () => {
    const dto: RegisterDto = {
      email: '',
      password: 'Abc_123',
      name: '',
    };

    const res = registerSchema.safeParse(dto);

    expect(res.success).toBe(false);

    expect(res.error).toBeDefined();

    if ('undefined' !== typeof res.error) {
      const foundError = res.error.issues.some((i) => {
        return (
          JSON.stringify(['password']) === JSON.stringify(i.path) &&
          'too_small' === i.code
        );
      });

      expect(foundError).toBe(true);
    }
  });

  it('should require password to have at least 1 lowercase character', () => {
    const dto: RegisterDto = {
      email: '',
      password: 'ABC_1234',
      name: '',
    };

    const res = registerSchema.safeParse(dto);

    expect(res.success).toBe(false);

    expect(res.error).toBeDefined();

    if ('undefined' !== typeof res.error) {
      const foundError = res.error.issues.some((i) => {
        return (
          JSON.stringify(['password']) === JSON.stringify(i.path) &&
          'custom' === i.code &&
          'undefined' !== typeof i.params &&
          'invalid_password_no_lowercase' === i.params.code
        );
      });

      expect(foundError).toBe(true);
    }
  });

  it('should require password to have at least 1 uppercase character', () => {
    const dto: RegisterDto = {
      email: '',
      password: 'abc_1234',
      name: '',
    };

    const res = registerSchema.safeParse(dto);

    expect(res.success).toBe(false);

    expect(res.error).toBeDefined();

    if ('undefined' !== typeof res.error) {
      const foundError = res.error.issues.some((i) => {
        return (
          JSON.stringify(['password']) === JSON.stringify(i.path) &&
          'custom' === i.code &&
          'undefined' !== typeof i.params &&
          'invalid_password_no_uppercase' === i.params.code
        );
      });

      expect(foundError).toBe(true);
    }
  });

  it('should require password to have at least 1 digit', () => {
    const dto: RegisterDto = {
      email: '',
      password: 'abc_defg',
      name: '',
    };

    const res = registerSchema.safeParse(dto);

    expect(res.success).toBe(false);

    expect(res.error).toBeDefined();

    if ('undefined' !== typeof res.error) {
      const foundError = res.error.issues.some((i) => {
        return (
          JSON.stringify(['password']) === JSON.stringify(i.path) &&
          'custom' === i.code &&
          'undefined' !== typeof i.params &&
          'invalid_password_no_digit' === i.params.code
        );
      });

      expect(foundError).toBe(true);
    }
  });

  it('should require password to have at least 1 special character', () => {
    const dto: RegisterDto = {
      email: '',
      password: 'Abc12345',
      name: '',
    };

    const res = registerSchema.safeParse(dto);

    expect(res.success).toBe(false);

    expect(res.error).toBeDefined();

    if ('undefined' !== typeof res.error) {
      const foundError = res.error.issues.some((i) => {
        return (
          JSON.stringify(['password']) === JSON.stringify(i.path) &&
          'custom' === i.code &&
          'undefined' !== typeof i.params &&
          'invalid_password_no_special' === i.params.code
        );
      });

      expect(foundError).toBe(true);
    }
  });

  it('should require a name with at least 2 characters', () => {
    const dto: RegisterDto = {
      email: '',
      password: '',
      name: 'a',
    };

    const res = registerSchema.safeParse(dto);

    expect(res.success).toBe(false);

    expect(res.error).toBeDefined();

    if ('undefined' !== typeof res.error) {
      const foundError = res.error.issues.some((i) => {
        return (
          JSON.stringify(['name']) === JSON.stringify(i.path) &&
          'too_small' === i.code
        );
      });

      expect(foundError).toBe(true);
    }
  });
});
