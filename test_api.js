const { PrismaClient } = require('./lib/generated/prisma');
const prisma = new PrismaClient();
async function run() {
  const key = await prisma.apiKey.findFirst();
  if (!key) {
    console.log('No API keys found in DB.');
    return;
  }
  console.log('Testing with API Key:', key.key);
  const res = await fetch('http://localhost:3000/api/mcp/consume', {
    method: 'POST',
    headers: { 'x-api-key': key.key }
  });
  const data = await res.json();
  console.log('Response status:', res.status);
  console.log('Response body:', data);
}
run().catch(console.error).finally(() => prisma.$disconnect());
