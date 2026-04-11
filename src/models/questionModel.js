import { postgresClient } from "../config/db.js";

export const ensureQuestionsTable = async () => {
  await postgresClient.query(`
    CREATE TABLE IF NOT EXISTS questions (
      id SERIAL PRIMARY KEY,
      test_id INTEGER REFERENCES tests(id) ON DELETE CASCADE,
      question TEXT NOT NULL,
      description TEXT,
      options JSONB,
      points VARCHAR(255),
      type VARCHAR(100),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `);
};

export const createQuestion = async (questionData) => {
  const { test_id, question, description, options, points, type } = questionData;
  const { rows } = await postgresClient.query(
    `INSERT INTO questions (test_id, question, description, options, points, type) 
     VALUES ($1, $2, $3, $4, $5, $6) 
     RETURNING *`,
    [test_id, question, description, JSON.stringify(options), points, type]
  );
  return rows[0];
};

export const updateQuestion = async (id, questionData) => {
  const { question, description, options, points, type } = questionData;
  const { rows } = await postgresClient.query(
    `UPDATE questions 
     SET question = COALESCE($1, question), 
         description = COALESCE($2, description), 
         options = COALESCE($3, options), 
         points = COALESCE($4, points), 
         type = COALESCE($5, type),
         updated_at = NOW()
     WHERE id = $6 
     RETURNING *`,
    [question, description, options ? JSON.stringify(options) : null, points, type, id]
  );
  return rows[0] || null;
};

export const deleteQuestion = async (id) => {
  const { rows } = await postgresClient.query(
    "DELETE FROM questions WHERE id = $1 RETURNING id",
    [id]
  );
  return rows[0] || null;
};

export const findQuestionById = async (id) => {
  const { rows } = await postgresClient.query("SELECT * FROM questions WHERE id = $1", [id]);
  return rows[0] || null;
};

export const getQuestionsByTestId = async (testId) => {
  const { rows } = await postgresClient.query("SELECT * FROM questions WHERE test_id = $1 ORDER BY created_at ASC", [testId]);
  return rows;
};
