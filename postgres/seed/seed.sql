BEGIN TRANSACTION;
INSERT INTO users (name, email, entries, joined) VALUES ('Jessie','jessie@gmail.com', 5, '2020-01-01'); 
INSERT INTO login (hash, email) VALUES ('123456', 'jessie@gmail.com');
COMMIT;