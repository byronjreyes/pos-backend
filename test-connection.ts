import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

async function testConnection() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    console.log('Attempting to connect to database...');
    console.log('Connection string:', process.env.DATABASE_URL);
    
    await client.connect();
    console.log('Successfully connected to the database!');
    
    const result = await client.query('SELECT NOW()');
    console.log('Current database time:', result.rows[0].now);
    
    await client.end();
  } catch (err) {
    console.error('Connection error:', err);
  }
}

testConnection(); 