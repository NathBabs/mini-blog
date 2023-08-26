import { generateToken } from '../../src/api/common/generateToken';
import jwt from 'jsonwebtoken';

// Mock jwt.sign
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

describe('generateToken', () => {
  it('should generate a token with valid payload', () => {
    // Mock jwt.sign's behavior
    (jwt.sign as jest.Mock).mockReturnValue('fake_token');

    const payload = {
      email: 'user@example.com',
      password: 'hashed_password',
    };

    const token = generateToken(payload);

    expect(token).toBe('fake_token');

    // Check if jwt.sign was called with the correct arguments
    expect(jwt.sign).toHaveBeenCalledWith(
      payload,
      expect.any(String), // This should match the JWT_SECRET
      {
        expiresIn: '1d',
      },
    );
  });
});
