const API_BASE_URL = 'http://localhost:8080/api';

// Helper to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface Page {
  id: string;
  name: string;
  description: string;
  questionCount: number;
  createdAt: string;
}

export interface Question {
  id: string;
  title: string;
  description: string;
  userId: string;
  userName: string;
  pageId: string;
  pageName: string;
  replyCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Reply {
  id: string;
  content: string;
  questionId: string;
  userId: string;
  userName: string;
  createdAt: string;
  updatedAt: string;
}

// Auth API
export const authApi = {
  register: async (name: string, email: string, password: string): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }
    const data = await response.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data));
    return data;
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }
    const data = await response.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data));
    return data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: (): User | null => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getToken: (): string | null => {
    return localStorage.getItem('token');
  },
};

// Pages API
export const pagesApi = {
  getAll: async (): Promise<Page[]> => {
    const response = await fetch(`${API_BASE_URL}/pages`);
    if (!response.ok) throw new Error('Failed to fetch pages');
    return response.json();
  },

  getByName: async (name: string): Promise<Page> => {
    const encodedName = encodeURIComponent(name);
    const response = await fetch(`${API_BASE_URL}/pages/name/${encodedName}`);
    if (!response.ok) throw new Error('Page not found');
    return response.json();
  },

  getById: async (id: string): Promise<Page> => {
    const response = await fetch(`${API_BASE_URL}/pages/${id}`);
    if (!response.ok) throw new Error('Page not found');
    return response.json();
  },
};

// Questions API
export const questionsApi = {
  getByPage: async (pageName: string, page = 0, size = 20): Promise<Question[]> => {
    const encodedPageName = encodeURIComponent(pageName);
    const response = await fetch(
      `${API_BASE_URL}/questions/page/name/${encodedPageName}?page=${page}&size=${size}`
    );
    if (!response.ok) throw new Error('Failed to fetch questions');
    return response.json();
  },

  getById: async (id: string): Promise<Question> => {
    const response = await fetch(`${API_BASE_URL}/questions/${id}`);
    if (!response.ok) throw new Error('Question not found');
    return response.json();
  },

  create: async (title: string, description: string, pageId: string): Promise<Question> => {
    const response = await fetch(`${API_BASE_URL}/questions`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ title, description, pageId }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create question');
    }
    return response.json();
  },

  update: async (id: string, title: string, description: string, pageId: string): Promise<Question> => {
    const response = await fetch(`${API_BASE_URL}/questions/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ title, description, pageId }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update question');
    }
    return response.json();
  },

  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/questions/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete question');
    }
  },
};

// Replies API
export const repliesApi = {
  getByQuestion: async (questionId: string): Promise<Reply[]> => {
    const response = await fetch(
      `${API_BASE_URL}/replies/question/${questionId}`
    );
    if (!response.ok) throw new Error('Failed to fetch replies');
    return response.json();
  },

  create: async (questionId: string, content: string): Promise<Reply> => {
    const response = await fetch(
      `${API_BASE_URL}/replies/question/${questionId}`,
      {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ content }),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create reply');
    }
    return response.json();
  },

  update: async (id: string, content: string): Promise<Reply> => {
    const response = await fetch(`${API_BASE_URL}/replies/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ content }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update reply');
    }
    return response.json();
  },

  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/replies/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete reply');
    }
  },
};
