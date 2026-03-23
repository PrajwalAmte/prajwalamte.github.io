export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  readingTimeMinutes: number;
  html: string;
  sourcePath: string;
}
