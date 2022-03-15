export interface IDesk {
  id: number;
  title: string;
  description: string;
  userId: number;
}

export interface IPrayer {
  id?: 0;
  title: string;
  description?: string;
  checked?: boolean;
  columnId: number;
  commentsIds?: string[];
}

export interface IComment {
  id?: number;
  body: number;
  created?: string;
  prayerId: number;
  userId: number;
}

export interface IColumn {
  id: number;
  title: string;
  description: string;
  userId: number;
}

export interface IUser {
  email: string;
  password: string;
  name: string;
  id: string;
  token: string;
}
