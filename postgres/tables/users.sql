BEGIN TRANSACTION;
CREATE TABLE users(
    id serial PRIMARY KEY,
    name varchar(255),
    email text UNIQUE NOT NULL,
    entries BIGINT DEFAULT 0,
    joined timestamp NOT NULL
);
COMMIT;