import API from "../config";
import type { SignupPayload, AuthResponse, LoginPayload } from "../types/auth.types";

export async function signup(payload: SignupPayload): Promise<AuthResponse> {
    const {data} = await API.post<AuthResponse>(
        `${API.defaults.baseURL}/signup`,
        payload
    );
    return data;
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
    const {data} = await API.post<AuthResponse>(
        `${API.defaults.baseURL}/login`,
        payload
    );
    return data;
}