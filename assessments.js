import { Client } from 'pg';

const client = new Client({
  user: 'your_database_user',
  host: 'localhost',
  database: 'your_database_name',
  password: 'your_database_password',
  port: 5432,
});

client.connect();

export async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const result = await client.query('SELECT * FROM assessments');
      res.status(200).json(result.rows);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch assessments' });
    }
  } else if (req.method === 'PUT') {
    const { id, status, score } = req.body;
    try {
      const result = await client.query(
        'UPDATE assessments SET status = $1, score = $2 WHERE id = $3',
        [status, score, id]
      );
      res.status(200).json({ message: 'Assessment updated successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to update assessment' });
    }
  }
}

