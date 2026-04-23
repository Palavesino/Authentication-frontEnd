import type { Rol } from "../enum/rol";

export interface User {
    id: string;
    name: string;
    email: string;
    rol: Rol;
}

export interface UserComplete {
    id: string;
    name: string;
    email: string;
    rol: Rol;
    imageUrl?: string;
    address?: string;
    phone?: string;
    age?: number;
}


