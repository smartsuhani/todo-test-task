export interface ITodoModel {
  title: string;
  completed: boolean;
  order?: number; // optional
  url?: string; // optional
  isDelete?: boolean;
}
