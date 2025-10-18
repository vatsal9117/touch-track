-- Drop tables if they exist
DROP TABLE IF EXISTS touchpoints;
DROP TABLE IF EXISTS accounts;

-- Create accounts table
CREATE TABLE accounts (
  id SERIAL PRIMARY KEY,
  company_name VARCHAR(255) NOT NULL,
  industry VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create touchpoints table
CREATE TABLE touchpoints (
  id SERIAL PRIMARY KEY,
  account_id INTEGER NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  touchpoint_type VARCHAR(50) NOT NULL, -- 'email_open', 'website_visit', 'demo_request', 'content_download', 'webinar_attended'
  channel VARCHAR(50) NOT NULL, -- 'email', 'linkedin', 'google_ads', 'organic', 'direct'
  page_url VARCHAR(500),
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_touchpoints_account_id ON touchpoints(account_id);
CREATE INDEX idx_touchpoints_created_at ON touchpoints(created_at);
CREATE INDEX idx_touchpoints_type ON touchpoints(touchpoint_type);

-- Insert sample data (optional, but helpful for testing)
INSERT INTO accounts (company_name, industry) VALUES
  ('Acme Corp', 'Technology'),
  ('Global Solutions Inc', 'Finance'),
  ('TechStart Labs', 'SaaS'),
  ('Enterprise Systems', 'Enterprise Software'),
  ('DataFlow Analytics', 'Data Analytics');

-- Insert sample touchpoints
INSERT INTO touchpoints (account_id, touchpoint_type, channel, page_url, description) VALUES
  -- Acme Corp journey
  (1, 'website_visit', 'organic', '/pricing', 'Visited pricing page'),
  (1, 'content_download', 'linkedin', '/whitepaper', 'Downloaded ROI whitepaper'),
  (1, 'email_open', 'email', NULL, 'Opened welcome email'),
  (1, 'website_visit', 'direct', '/features', 'Visited features page'),
  (1, 'demo_request', 'direct', '/contact', 'Requested demo'),
  
  -- Global Solutions Inc journey
  (2, 'website_visit', 'google_ads', '/home', 'First visit from paid ad'),
  (2, 'email_open', 'email', NULL, 'Opened nurture email'),
  (2, 'webinar_attended', 'email', NULL, 'Attended product webinar'),
  
  -- TechStart Labs journey
  (3, 'website_visit', 'linkedin', '/blog', 'Read blog post'),
  (3, 'website_visit', 'direct', '/pricing', 'Checked pricing'),
  (3, 'content_download', 'organic', '/case-study', 'Downloaded case study'),
  (3, 'demo_request', 'direct', '/demo', 'Requested demo'),
  
  -- Enterprise Systems journey
  (4, 'website_visit', 'google_ads', '/home', 'Paid search visit'),
  (4, 'email_open', 'email', NULL, 'Opened intro email'),
  
  -- DataFlow Analytics journey
  (5, 'website_visit', 'organic', '/features', 'Organic search'),
  (5, 'website_visit', 'direct', '/pricing', 'Returned to check pricing'),
  (5, 'email_open', 'email', NULL, 'Opened follow-up email'),
  (5, 'webinar_attended', 'email', NULL, 'Attended live demo'),
  (5, 'demo_request', 'direct', '/contact', 'Requested custom demo');