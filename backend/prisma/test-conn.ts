import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

async function test() {
  console.log('Testing connection...');
  console.log('DB URL:', process.env.DATABASE_URL);
  
  const prisma = new PrismaClient({
    // @ts-ignore
    datasourceUrl: process.env.DATABASE_URL
  });

  try {
    await prisma.$connect();
    console.log('Connected!');
    const count = await prisma.category.count();
    console.log('Category count:', count);
  } catch (e) {
    console.error('Failed:', e);
  } finally {
    await prisma.$disconnect();
  }
}

test();
