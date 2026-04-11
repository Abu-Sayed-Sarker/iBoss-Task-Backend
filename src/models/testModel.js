import { postgresClient } from "../config/db.js";

export const ensureTestsTable = async () => {
  await postgresClient.query(`
    CREATE TABLE IF NOT EXISTS tests (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      candidates DATE,
      start_time VARCHAR(50),
      end_time VARCHAR(50),
      duration VARCHAR(100),
      slots INTEGER,
      question_set VARCHAR(100),
      question_type VARCHAR(100),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `);
};

export const createTest = async (testData) => {
  const { title, candidates, start_time, end_time, duration, slots, question_set, question_type } = testData;
  const { rows } = await postgresClient.query(
    `INSERT INTO tests (title, candidates, start_time, end_time, duration, slots, question_set, question_type) 
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
     RETURNING *`,
    [title, candidates, start_time, end_time, duration, slots, question_set, question_type]
  );
  return rows[0];
};

export const updateTest = async (id, testData) => {
  const { title, candidates, start_time, end_time, duration, slots, question_set, question_type } = testData;
  const { rows } = await postgresClient.query(
    `UPDATE tests 
     SET title = COALESCE($1, title), 
         candidates = COALESCE($2, candidates), 
         start_time = COALESCE($3, start_time), 
         end_time = COALESCE($4, end_time), 
         duration = COALESCE($5, duration), 
         slots = COALESCE($6, slots), 
         question_set = COALESCE($7, question_set), 
         question_type = COALESCE($8, question_type),
         updated_at = NOW()
     WHERE id = $9 
     RETURNING *`,
    [title, candidates, start_time, end_time, duration, slots, question_set, question_type, id]
  );
  return rows[0] || null;
};

export const deleteTest = async (id) => {
  const { rows } = await postgresClient.query(
    "DELETE FROM tests WHERE id = $1 RETURNING id",
    [id]
  );
  return rows[0] || null;
};

export const getAllTests = async (userId = null) => {
  const { rows } = await postgresClient.query(`
    SELECT 
      t.*, 
      COALESCE(
        JSON_AGG(q.* ORDER BY q.created_at ASC) FILTER (WHERE q.id IS NOT NULL), 
        '[]'
      ) as questions,
      COALESCE(ue.is_submitted, FALSE) as is_submitted,
      (SELECT COUNT(id) FROM user_exams WHERE test_id = t.id AND is_submitted = TRUE) as submission_count
    FROM tests t
    LEFT JOIN questions q ON t.id = q.test_id
    LEFT JOIN user_exams ue ON t.id = ue.test_id AND ue.user_id = $1
    GROUP BY t.id, ue.is_submitted
    ORDER BY t.created_at DESC
  `, [userId]);
  return rows;
};

export const findTestWithQuestionsById = async (id) => {
  const { rows } = await postgresClient.query(`
    SELECT 
      t.*, 
      COALESCE(
        JSON_AGG(q.* ORDER BY q.created_at ASC) FILTER (WHERE q.id IS NOT NULL), 
        '[]'
      ) as questions,
      (SELECT COUNT(id) FROM user_exams WHERE test_id = t.id AND is_submitted = TRUE) as submission_count
    FROM tests t
    LEFT JOIN questions q ON t.id = q.test_id
    WHERE t.id = $1
    GROUP BY t.id
  `, [id]);
  return rows[0] || null;
};

export const findTestById = async (id) => {
  const { rows } = await postgresClient.query("SELECT * FROM tests WHERE id = $1", [id]);
  return rows[0] || null;
};
