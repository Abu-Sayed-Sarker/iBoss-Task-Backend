import { postgresClient } from "../config/db.js";

export const ensureExamsTables = async () => {
    // Table to track overall exam status for a user
    await postgresClient.query(`
    CREATE TABLE IF NOT EXISTS user_exams (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      test_id INTEGER REFERENCES tests(id) ON DELETE CASCADE,
      score FLOAT DEFAULT 0,
      total_points FLOAT DEFAULT 0,
      is_submitted BOOLEAN DEFAULT FALSE,
      started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      submitted_at TIMESTAMP WITH TIME ZONE,
      UNIQUE(user_id, test_id)
    );
  `);

    // Table to track individual answers
    await postgresClient.query(`
    CREATE TABLE IF NOT EXISTS user_answers (
      id SERIAL PRIMARY KEY,
      user_exam_id INTEGER REFERENCES user_exams(id) ON DELETE CASCADE,
      question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
      selected_option_index INTEGER,
      is_correct BOOLEAN,
      points_earned FLOAT DEFAULT 0,
      UNIQUE(user_exam_id, question_id)
    );
  `);
};

export const startExam = async (userId, testId) => {
    const { rows } = await postgresClient.query(
        `INSERT INTO user_exams (user_id, test_id) 
     VALUES ($1, $2) 
     ON CONFLICT (user_id, test_id) DO UPDATE SET started_at = NOW() 
     RETURNING *`,
        [userId, testId]
    );
    return rows[0];
};

export const saveAnswer = async (userExamId, questionId, selectedOptionIndex, isCorrect, points) => {
    const { rows } = await postgresClient.query(
        `INSERT INTO user_answers (user_exam_id, question_id, selected_option_index, is_correct, points_earned) 
     VALUES ($1, $2, $3, $4, $5) 
     ON CONFLICT (user_exam_id, question_id) 
     DO UPDATE SET selected_option_index = $3, is_correct = $4, points_earned = $5 
     RETURNING *`,
        [userExamId, questionId, selectedOptionIndex, isCorrect, points]
    );
    return rows[0];
};

export const submitExam = async (userExamId) => {
    // Calculate total score from answers
    const { rows: scoreRows } = await postgresClient.query(
        `SELECT SUM(points_earned) as total_score 
     FROM user_answers 
     WHERE user_exam_id = $1`,
        [userExamId]
    );

    const score = scoreRows[0].total_score || 0;

    const { rows } = await postgresClient.query(
        `UPDATE user_exams 
     SET score = $1, is_submitted = TRUE, submitted_at = NOW() 
     WHERE id = $2 
     RETURNING *`,
        [score, userExamId]
    );
    return rows[0];
};

export const getUserExamStatus = async (userId, testId) => {
    const { rows } = await postgresClient.query(
        "SELECT * FROM user_exams WHERE user_id = $1 AND test_id = $2",
        [userId, testId]
    );
    return rows[0] || null;
};

export const getUserExamResults = async (userId) => {
    const { rows } = await postgresClient.query(
        `SELECT ue.*, t.title as test_title 
     FROM user_exams ue 
     JOIN tests t ON ue.test_id = t.id 
     WHERE ue.user_id = $1`,
        [userId]
    );
    return rows;
};
