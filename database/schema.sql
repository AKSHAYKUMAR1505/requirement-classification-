-- Create the extractions table in Supabase
CREATE TABLE extractions (
    id SERIAL PRIMARY KEY,
    filename TEXT NOT NULL,
    hardware_requirements JSONB,
    software_requirements JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE extractions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (adjust as needed for security)
CREATE POLICY "Allow all operations" ON extractions FOR ALL USING (true);