import axios from 'axios';
import { User, HealthMetrics } from '../contexts/UserContext';

const API_URL = 'http://localhost:3000';

// Create an axios instance for consistent configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User APIs
export const getUser = async (userId: number): Promise<User> => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

export const updateUserHealth = async (userId: number, healthMetrics: HealthMetrics): Promise<User> => {
  const response = await api.put(`/users/${userId}/health`, { healthMetrics });
  return response.data;
};

// Health Tips API
export const getHealthTips = async (userId: number): Promise<string[]> => {
  const response = await api.get(`/health-tips/${userId}`);
  return response.data;
};

// Articles APIs
export interface Article {
  id: number;
  title: string;
  content: string;
  category: string;
  summary: string;
  createdAt: string;
}

export const getArticles = async (): Promise<Article[]> => {
  const response = await api.get('/articles');
  return response.data;
};

export const getArticle = async (articleId: number): Promise<Article> => {
  const response = await api.get(`/articles/${articleId}`);
  return response.data;
};

// Polls APIs
export interface PollOption {
  id: number;
  text: string;
  votes: number;
}

export interface Poll {
  id: number;
  question: string;
  options: PollOption[];
  totalVotes: number;
}

export const getPolls = async (): Promise<Poll[]> => {
  const response = await api.get('/polls');
  return response.data;
};

export const voteInPoll = async (pollId: number, optionId: number): Promise<Poll> => {
  const response = await api.post(`/polls/${pollId}/vote`, { optionId });
  return response.data;
};

// Comments APIs
export interface Comment {
  id: number;
  userId: number;
  username: string;
  text: string;
  createdAt: string;
}

export const getComments = async (): Promise<Comment[]> => {
  const response = await api.get('/comments');
  return response.data;
};

export const addComment = async (text: string, userId: number): Promise<Comment> => {
  const response = await api.post('/comments', { text, userId });
  return response.data;
};