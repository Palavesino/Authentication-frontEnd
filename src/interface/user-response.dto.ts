import type { Rol } from "../enum/rol";

export interface UserResponseDto {
    id: string;
    name: string;
    email: string;
    rol: Rol;
}