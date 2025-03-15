export interface Post {
  id: string;
  slug: string;
  title: string;
  published: Date;
  content?: string;
  category?: string;
  tags?: string[];
  description?: string;
  thumbnailImage?: string;
  readingMetadata: {
    time: number;
    wordCount: number;
  };
}
