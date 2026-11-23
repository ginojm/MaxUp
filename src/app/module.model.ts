export interface Module {
  id: number;
  slug: string;
  title: string;
  category: string;
  description: string;
  audience: string;
  duration: string;
  level: string;
  symbol: string;
  curriculum: Array<{ title: string; description: string }>;
  benefits: Array<{ title: string; description: string }>;
}

export interface InquiryRequest {
  name: string;
  email: string;
  message: string;
  moduleSlug?: string;
}
