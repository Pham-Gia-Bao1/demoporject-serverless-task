import { Pool, RowDataPacket } from 'mysql2/promise';
import pool from '../config/db';
import { Task } from '../models/task';
import AWS from 'aws-sdk';
import { getDbConnection } from '../utils';
const sns = new AWS.SNS();

export const getTasksByUserId = async (userId: string): Promise<Task[]> => {
  const connection = await getDbConnection();
  try {
    const [rows] = await connection.execute('SELECT * FROM tasks WHERE userId = ?', [userId]);
    return rows as Task[];
  } finally {
    connection.release();
  }
};

export const getAllTasksTest = async (): Promise<Task[]> => {
  const connection = await getDbConnection();
  try {
    const [rows] = await connection.execute('SELECT * FROM tasks');
    return rows as Task[];
  } finally {
    connection.release();
  }
}

export const createTask = async (taskData: {
  title: string;
  status: string;
  priority: string;
  date: string;
  userId: number;
}) => {
  const { title, status, priority, date, userId } = taskData;

  const validDate = new Date(date);
  if (isNaN(validDate.getTime())) {
    throw new Error('Invalid date format');
  }

  const connection = await getDbConnection();
  try {
    const [result] = await connection.execute(
      'INSERT INTO tasks (title, status, priority, date, userId, zohoId) VALUES (?, ?, ?, ?, ?, ?)',
      [title, status, priority, validDate, userId, null]
    );
    return result;
  } finally {
    connection.release();
  }
};

export const updateZohoId = async (taskId: string | number, zohoId: string | number) => {
  const connection = await getDbConnection();
  try {
    await connection.execute(
      'UPDATE tasks SET zohoId = ? WHERE id = ?',
      [zohoId, taskId]
    );
  }
  finally {
    connection.release();
  }
}

export const updateTask = async (taskId: string, taskData: {
  title?: string;
  status?: string;
  priority?: string;
  date?: string;
  userId?: number;
}) => {
  const { title, status, priority, date, userId } = taskData;
  const validDate = date ? new Date(date) : undefined;
  if (date && isNaN(validDate!.getTime())) {
    throw new Error('Invalid date format');
  }
  const connection = await getDbConnection();
  try {
    await connection.execute(
      'UPDATE tasks SET title = ?, status = ?, priority = ?, date = ?, userId = ? WHERE id = ?',
      [title, status, priority, validDate, userId, taskId]
    );
  } finally {
    connection.release();
  }
};

export const getTaskById = async (taskId: string, userId: string): Promise<Task> => {
  const connection = await getDbConnection();
  try {
    const [rows] = await connection.execute<RowDataPacket[]>(
      'SELECT * FROM tasks WHERE id = ? AND userId = ?',
      [taskId, userId]
    );

    if (!rows || rows.length === 0) {
      throw new Error('Task not found');
    }

    return rows[0] as Task;
  } finally {
    connection.release();
  }
};

export const deleteTaskById = async (taskId: string) => {
  const connection = await getDbConnection();
  try {
    await connection.execute('DELETE FROM tasks WHERE id = ?', [taskId]);
  } finally {
    connection.release();
  }
};