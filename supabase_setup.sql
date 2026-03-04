CREATE TABLE IF NOT EXISTS site_settings (
  id integer PRIMARY KEY DEFAULT 1,
  content jsonb NOT NULL DEFAULT '{}'::jsonb
);

-- Ensure only one row exists
ALTER TABLE site_settings ADD CONSTRAINT single_row CHECK (id = 1);

-- Insert default empty settings
INSERT INTO site_settings (id, content) VALUES (1, '{}'::jsonb) ON CONFLICT (id) DO NOTHING;
