import { PrismaClient } from './generated/prisma'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

const prismaClientSingleton = () => {
  const libsql = createClient({
    url: process.env.DATABASE_URL || 'file:./dev.db',
  })
  const adapter = new PrismaLibSql(libsql)
  
  return new PrismaClient({
    adapter,
  })
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
