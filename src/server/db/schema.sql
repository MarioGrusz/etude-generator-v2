--  const categories = [feature, change, cause, character];

CREATE TABLE IF NOT EXISTS feature (
  id SERIAL PRIMARY KEY,
  polish TEXT UNIQUE NOT NULL,
  english TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS change (
  id SERIAL PRIMARY KEY,
  polish TEXT UNIQUE NOT NULL,
  english TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS cause (
  id SERIAL PRIMARY KEY,
  polish TEXT UNIQUE NOT NULL,
  english TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS character (
  id SERIAL PRIMARY KEY,
  polish TEXT UNIQUE NOT NULL,
  english TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS user (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT UNIQUE NOT NULL,
  name TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);






        
