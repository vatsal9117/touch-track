// Account types
export interface Account {
  id: number;
  company_name: string;
  industry: string | null;
  created_at: Date;
}

export interface CreateAccountRequest {
  company_name: string;
  industry?: string;
}

export interface AccountWithStats extends Account {
  touchpoint_count: number;
  last_touchpoint: Date | null;
}

// Touchpoint types
export type TouchpointType = 
  | 'email_open' 
  | 'website_visit' 
  | 'demo_request' 
  | 'content_download' 
  | 'webinar_attended';

export type Channel = 
  | 'email' 
  | 'linkedin' 
  | 'google_ads' 
  | 'organic' 
  | 'direct';

export interface Touchpoint {
  id: number;
  account_id: number;
  touchpoint_type: TouchpointType;
  channel: Channel;
  page_url: string | null;
  description: string | null;
  created_at: Date;
}

export interface CreateTouchpointRequest {
  account_id: number;
  touchpoint_type: TouchpointType;
  channel: Channel;
  page_url?: string;
  description?: string;
}

export interface TouchpointWithAccount extends Touchpoint {
  company_name: string;
}

// Analytics types
export interface AnalyticsSummary {
  total_accounts: number;
  total_touchpoints: number;
  touchpoints_by_type: {
    type: TouchpointType;
    count: number;
  }[];
  touchpoints_by_channel: {
    channel: Channel;
    count: number;
  }[];
  avg_touchpoints_per_account: number;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}