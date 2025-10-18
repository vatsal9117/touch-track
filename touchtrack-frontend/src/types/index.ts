export interface Account {
  id: number;
  company_name: string;
  industry: string | null;
  created_at: string;
  touchpoint_count?: number;
  last_touchpoint?: string | null;
}

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
  created_at: string;
}

export interface TimelineData {
  account: Account;
  touchpoints: Touchpoint[];
}

export interface AnalyticsSummary {
  touchpoints_over_time: any;
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

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}