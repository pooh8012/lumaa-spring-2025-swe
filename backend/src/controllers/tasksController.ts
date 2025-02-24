import { Request, Response } from "express";
import pool from "../models/db";

// Assumes authMiddleware attaches decoded token info to req.user
export const getTasks = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const tasksRes = await pool.query(
      'SELECT * FROM tasks WHERE "userId" = $1',
      [userId]
    );
    res.json(tasksRes.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const { title, description } = req.body;
    const newTaskRes = await pool.query(
      'INSERT INTO tasks (title, description, "userId") VALUES ($1, $2, $3) RETURNING *',
      [title, description || null, userId]
    );
    res.status(201).json(newTaskRes.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const taskId = req.params.id;
    const { title, description, isComplete } = req.body;

    // Check if task belongs to the user
    const taskRes = await pool.query(
      'SELECT * FROM tasks WHERE id = $1 AND "userId" = $2',
      [taskId, userId]
    );
    if (taskRes.rows.length === 0)
      return res.status(404).json({ message: "Task not found" });

    const updatedTaskRes = await pool.query(
      'UPDATE tasks SET title = $1, description = $2, "isComplete" = $3 WHERE id = $4 RETURNING *',
      [
        title || taskRes.rows[0].title,
        description || taskRes.rows[0].description,
        isComplete !== undefined ? isComplete : taskRes.rows[0].isComplete,
        taskId,
      ]
    );
    res.json(updatedTaskRes.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const taskId = req.params.id;

    // Verify task ownership
    const taskRes = await pool.query(
      'SELECT * FROM tasks WHERE id = $1 AND "userId" = $2',
      [taskId, userId]
    );
    if (taskRes.rows.length === 0)
      return res.status(404).json({ message: "Task not found" });

    await pool.query("DELETE FROM tasks WHERE id = $1", [taskId]);
    res.json({ message: "Task deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
