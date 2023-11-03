import { Tokens } from "@/lib/store/features/auth";

export type SignInRequest = { username: string; password: string };
export type SignInResponse = Tokens;
