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


WITH
        
feature AS (
  SELECT id, polish, english 
  FROM feature 
  WHERE id = $1 
  LIMIT 1
),

change AS (
  SELECT id, polish, english 
  FROM change 
  ORDER BY RANDOM() 
  LIMIT 1
),

cause AS (
  SELECT id, polish, english 
  FROM cause 
  ORDER BY RANDOM() 
  LIMIT 1
),

character AS (
  SELECT id, polish, english 
  FROM character 
  WHERE id = $2 
  LIMIT 1
)

SELECT
  feature.id AS feature_id,
  feature.polish AS feature_polish,
  feature.english AS feature_english,

  change.id AS change_id,
  change.polish AS change_polish,
  change.english AS change_english,

  cause.id AS cause_id,
  cause.polish AS cause_polish,
  cause.english AS cause_english,

  character.id AS character_id,
  character.polish AS character_polish,
  character.english AS character_english

FROM feature
LEFT JOIN change ON true
LEFT JOIN cause ON true
LEFT JOIN character ON true;