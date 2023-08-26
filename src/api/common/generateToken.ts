import jwt from 'jsonwebtoken';

type Payload = {
  email: string;
  password: string;
};

export function generateToken({ email, password }: Payload): string {
  const token = jwt.sign(
    {
      email,
      password,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: '1d',
    },
  );

  return token;
}
