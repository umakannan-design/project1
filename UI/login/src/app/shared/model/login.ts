export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    message: {
    email: string;
    name: string;
    role: string;
    success: boolean;
    token: string;
  };
}