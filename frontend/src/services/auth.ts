import api from './api'

interface LoginCredentials {
  email: string
  password: string
}

interface SignupData {
  username: string
  email: string
  password: string
  role: 'CREATOR' | 'SUBSCRIBER'
}

interface AuthResponse {
  user: {
    id: string
    username: string
    email: string
    role: 'CREATOR' | 'SUBSCRIBER' | 'ADMIN'
    walletAddress?: string
  }
  token: string
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', credentials)
    localStorage.setItem('token', response.data.token)
    return response.data
  },

  async signup(data: SignupData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', data)
    localStorage.setItem('token', response.data.token)
    return response.data
  },

  async logout(): Promise<void> {
    localStorage.removeItem('token')
    return Promise.resolve()
  },

  async getCurrentUser(): Promise<AuthResponse['user'] | null> {
    try {
      const response = await api.get<AuthResponse['user']>('/users/me')
      return response.data
    } catch (error) {
      return null
    }
  },

  getToken(): string | null {
    return localStorage.getItem('token')
  },

  isAuthenticated(): boolean {
    return !!this.getToken()
  }
} 