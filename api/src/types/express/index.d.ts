// to make the file a module and to avoid global namespace pollution

export {};

declare global {
  namespace Express {
    export interface Request {
      userId?: number;
      cleanBody?: any;
      role: string;
    }
  }
}
