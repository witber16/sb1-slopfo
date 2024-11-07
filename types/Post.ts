export interface Post {
  id?: string;
  image: string;
  title: string;
  description: string;
  date: string;
  likes: number;
  comments: number;
  createdAt?: number;
}