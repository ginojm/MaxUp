import cors from 'cors';
import express from 'express';
import pg from 'pg';

const { Pool } = pg;
const port = Number(process.env.PORT ?? 3000);
const pool = new Pool();
const app = express();

app.use(cors({ origin: process.env.FRONTEND_ORIGIN ?? 'http://localhost:4200' }));
app.use(express.json({ limit: '16kb' }));

app.get('/api/health', async (_request, response, next) => {
  try {
    await pool.query('SELECT 1');
    response.json({ status: 'ok' });
  } catch (error) {
    next(error);
  }
});

app.get('/api/modules', async (_request, response, next) => {
  try {
    const result = await pool.query(`
      SELECT id, slug, title, category, description, audience, duration, level,
             symbol, curriculum, benefits
      FROM modules
      ORDER BY sort_order
    `);
    response.json(result.rows);
  } catch (error) {
    next(error);
  }
});

app.get('/api/modules/:slug', async (request, response, next) => {
  try {
    const result = await pool.query(
      `SELECT id, slug, title, category, description, audience, duration, level,
              symbol, curriculum, benefits
       FROM modules WHERE slug = $1`,
      [request.params.slug],
    );
    if (result.rowCount === 0) {
      response.status(404).json({ error: 'Formation introuvable.' });
      return;
    }
    response.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

app.post('/api/inquiries', async (request, response, next) => {
  const { name, email, message, moduleSlug } = request.body ?? {};
  if (
    typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 100 ||
    typeof email !== 'string' || email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    typeof message !== 'string' || message.trim().length < 10 || message.trim().length > 5000 ||
    (moduleSlug !== undefined && (typeof moduleSlug !== 'string' || moduleSlug.length > 100))
  ) {
    response.status(400).json({ error: 'Veuillez vérifier les champs du formulaire.' });
    return;
  }

  try {
    let moduleId = null;
    if (moduleSlug) {
      const moduleResult = await pool.query('SELECT id FROM modules WHERE slug = $1', [moduleSlug]);
      if (moduleResult.rowCount === 0) {
        response.status(400).json({ error: 'La formation sélectionnée est introuvable.' });
        return;
      }
      moduleId = moduleResult.rows[0].id;
    }

    const result = await pool.query(
      `INSERT INTO inquiries (name, email, message, module_id)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [name.trim(), email.trim(), message.trim(), moduleId],
    );
    response.status(201).json({ id: result.rows[0].id });
  } catch (error) {
    next(error);
  }
});

app.use((error, _request, response, _next) => {
  console.error(error);
  response.status(500).json({ error: 'Une erreur interne est survenue.' });
});

const server = app.listen(port, () => {
  console.log(`MaxUp API running on port ${port}`);
});

async function shutdown() {
  server.close();
  await pool.end();
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
