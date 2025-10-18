import fs from 'fs';
import path from 'path';
import pool from './connection';

async function seed() {
  console.log('🌱 Starting database seed...');

  try {
    // Read and execute schema.sql
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf-8');

    await pool.query(schema);
    console.log('✅ Database schema created and seeded successfully!');

    // Display some stats
    const accountsResult = await pool.query('SELECT COUNT(*) FROM accounts');
    const touchpointsResult = await pool.query('SELECT COUNT(*) FROM touchpoints');

    console.log(`📊 Seeded ${accountsResult.rows[0].count} accounts`);
    console.log(`📊 Seeded ${touchpointsResult.rows[0].count} touchpoints`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seed();