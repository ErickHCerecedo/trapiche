// Types for dashboard data
export interface User {
  id: number
  nombre: string
  email: string
  created_at: string
}

export interface DashboardStats {
  posts: {
    total: number;
    active: number;
    inactive: number;
  };
  visits: {
    total: number;
    average_per_post: number;
  };
  activity: {
    recent_posts_30d: number;
    engagement_rate: number;
  };
}

export interface AdminPost {
  id: string;
  slug: string;
  titulo: string;
  subtitulo: string;
  categoria: string;
  portada: string;
  tags: string;
  visitas: number;
  estado: number;
  estado_texto: string;
  autor: {
    nombre: string;
    email: string;
  };
  created_at: string;
  updated_at: string | null;
}

export interface VisitData {
  date: string;
  day: string;
  visits: number;
}

export interface TopPost {
  titulo: string;
  visitas: number;
  created_at: string;
}