import { PrismaClient } from './generated/prisma'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const prismaClientSingleton = () => {
  // CRITICAL FIX: AWS Lambda is IPv4 only. Supabase direct connections (port 5432) are IPv6 only.
  // We MUST use the connection pooler (DATABASE_URL on port 6543) because it provides an IPv4 address!
  const connectionString = `${process.env.DATABASE_URL}`
  
  const pool = new Pool({ 
    connectionString,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined
  })
  
  const adapter = new PrismaPg(pool)
  
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
