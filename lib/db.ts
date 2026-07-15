import { PrismaClient } from './generated/prisma'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const prismaClientSingleton = () => {
  // CRITICAL: AWS Lambda is IPv4 only. We MUST use DATABASE_URL (port 6543 pooler).
  const connectionString = process.env.DATABASE_URL || ''
  
  const pool = new Pool({ 
    connectionString,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined
  })
  
  // Prevent unhandled errors from crashing the Next.js Node process
  pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err)
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
