export const Rol = {
  USER: "USER",
  ADMIN: "ADMIN"
} as const;

export type Rol = typeof Rol[keyof typeof Rol];