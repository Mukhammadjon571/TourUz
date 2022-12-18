import * as bcrypt from 'bcrypt';

function generateHash(password: string): Promise<string> {
  const saltOrRounds = 10;
  return bcrypt.hash(password, saltOrRounds);
}

function compareHash(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export { generateHash, compareHash };
