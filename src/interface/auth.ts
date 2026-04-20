import type { User } from "./user";

export interface AuthRequestDto {
    id: string;
    email: string;
    password: string;
}

export interface AuthResponseDto {
    id: string;
    token: string;
    user: User;
}

export interface RegisterRequestDto {
    id: string;
    name: string;
    email: string;
    password: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
}