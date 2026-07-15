import { PrismaClient } from './generated/prisma'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const prismaClientSingleton = () => {
  // Use DIRECT_URL (port 5432) to avoid PgBouncer prepared statement limits with pg module.
  // CRITICAL: AWS Lambda requires explicit SSL configuration when connecting to Supabase.
  const connectionString = `${process.env.DIRECT_URL || process.env.DATABASE_URL}`
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
