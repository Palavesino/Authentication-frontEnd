import type { Rol } from "../enum/rol";

export interface User {
    id: string;
    name: string;
    email: string;
    rol: Rol;
}

