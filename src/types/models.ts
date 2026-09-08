export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string;
};

export type Message = {
  id: number;
  userId: number;
  title: string;
  body: string;
  direction?: 'incoming' | 'outgoing';
  pending?: boolean;
};

export type Page<T> = {
  items: T[];
  nextOffset?: number;
};
