CREATE TABLE Users
(
    user_id VARCHAR(250) PRIMARY KEY,
    userName VARCHAR(250) NOT NULL,
    email VARCHAR(250) NOT NULL UNIQUE,
    password VARCHAR(250) NOT NULL,

)

SELECT *FROM Users

