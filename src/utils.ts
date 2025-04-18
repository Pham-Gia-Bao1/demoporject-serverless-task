import { Pool } from 'mysql2/promise';
import pool from './config/db';
// Utility functions for the authService
const typedPool: Pool = pool;
export const getDbConnection = async () => {
  return await typedPool.getConnection();
};
/**
 * Formats a response for API Gateway
 */
export const formatResponse = <T = any, E = string>(
    statusCode: number,
    message: string,
    data: T | null = null,
    error: Error | null = null
  ): { statusCode: number; headers: { "Access-Control-Allow-Origin": string; "Access-Control-Allow-Methods": string; "Access-Control-Allow-Headers": string,  'Access-Control-Allow-Credentials': boolean }; body: string } => {
    const body: { message: string; data?: T; error?: E } = { message };
    if (data !== null) {
      body.data = data;
    }
    if (error !== null) {
      body.error = error.message as E;
    }
    return {
      statusCode,
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow all FE domains
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET", // Adjust according to your needs
        "Access-Control-Allow-Headers": "Content-Type,Authorization", // Adjust if needed
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(body),
    };
  };
export const validateTaskInput = (input: any): string | null => {
  return null;
};
