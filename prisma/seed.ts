import { PrismaClient } from '@prisma/client';
import * as argon from 'argon2';

const prisma = new PrismaClient()
async function main() {
  const hashPassword = await argon.hash('123456')
  const fredrick = await prisma.user.upsert({
    where: { email: 'yalleyfred@gmail.com' },
    update: {},
    create: {
      email: 'yalleyfred@gmail.com',
      clubId: "000000",
      name: 'Fredrick Yalley',
      password: hashPassword,
      role: 'ADMIN'
    },
  })
  const Benjamin = await prisma.user.upsert({
    where: { email: 'majorcaios@gmail.com' },
    update: {},
    create: {
      email: 'majorcaios@gmail.com',
      clubId: "000001",
      name: 'Benjamin Arthur',
      password: hashPassword,
      role: 'ADMIN'
    },
  })
  console.log({ fredrick, Benjamin })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })