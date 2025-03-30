export interface UserPayload {
  userId: string;
}

export interface AuthContext {
  Variables: {
    user: UserPayload;
  };
}

export type Weight = {
  id: string;
  weight: number;
  createdAt: Date;
};
