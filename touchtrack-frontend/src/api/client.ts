import axios from 'axios';
import type { Account, TimelineData, AnalyticsSummary, ApiResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const accountsApi = {
  getAll: async (): Promise<Account[]> => {
    const response = await api.get<ApiResponse<Account[]>>('/api/accounts');
    return response.data.data || [];
  },

  getById: async (id: number): Promise<Account> => {
    const response = await api.get<ApiResponse<Account>>(`/api/accounts/${id}`);
    if (!response.data.data) throw new Error('Account not found');
    return response.data.data;
  },

  getTimeline: async (id: number): Promise<TimelineData> => {
    const response = await api.get<ApiResponse<TimelineData>>(`/api/accounts/${id}/timeline`);
    if (!response.data.data) throw new Error('Timeline not found');
    return response.data.data;
  },

  create: async (data: { company_name: string; industry?: string }): Promise<Account> => {
    const response = await api.post<ApiResponse<Account>>('/api/accounts', data);
    if (!response.data.data) throw new Error('Failed to create account');
    return response.data.data;
  },
};

export const analyticsApi = {
  getSummary: async (): Promise<AnalyticsSummary> => {
    const response = await api.get<ApiResponse<AnalyticsSummary>>('/api/analytics');
    if (!response.data.data) throw new Error('Failed to fetch analytics');
    return response.data.data;
  },
};

export default api;