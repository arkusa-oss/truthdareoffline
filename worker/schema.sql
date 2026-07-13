CREATE TABLE IF NOT EXISTS events (
  id     INTEGER PRIMARY KEY AUTOINCREMENT,
  ts     INTEGER,
  type   TEXT,
  stage  TEXT,
  mode   TEXT,
  lang   TEXT,
  turns  INTEGER
);
CREATE INDEX IF NOT EXISTS idx_type ON events(type);
