import axios from "axios";

const API = axios.create({
    baseURL: "https://kickoff.backend.craftedbyshivam.com/api/auth",
});

export interface SignupPayload {
    name: string;
    email: string;
    password: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
    }
}


export async function signup(payload: SignupPayload): Promise<AuthResponse> {
    const {data} = await axios.post<AuthResponse>(
        `${API.defaults.baseURL}/signup`,
        payload
    );
    return data;
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
    const {data} = await axios.post<AuthResponse>(
        `${API.defaults.baseURL}/login`,
        payload
    );
    return data;
}