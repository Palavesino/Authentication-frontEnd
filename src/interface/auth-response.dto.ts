import type { UserResponseDto } from "./user-response.dto";


export interface AuthResponseDto {
    id: string;
    token: string;
    user: UserResponseDto;
}