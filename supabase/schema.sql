-- Supabase schema for AI chat
create table documents (id uuid primary key default uuid_generate_v4(), name text, content text);
create table doc_embeddings (id uuid primary key default uuid_generate_v4(), document_id uuid references documents(id), embedding vector(1536));
create table sessions (id uuid primary key default uuid_generate_v4(), created_at timestamp default now());
create table messages (id uuid primary key default uuid_generate_v4(), session_id uuid references sessions(id), role text, content text, created_at timestamp default now());