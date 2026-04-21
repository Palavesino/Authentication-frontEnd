export const Rol = {
  USER: "USER",
  ADMIN: "ADMIN",
  VIEWER: "VIEWER",
} as const;

export type Rol = typeof Rol[keyof typeof Rol];