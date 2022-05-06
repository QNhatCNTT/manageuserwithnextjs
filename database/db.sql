CREATE DATABASE manageuserdb;

use manageuserdb;

CREATE TABLE users(
    _id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    birth_day DATE NOT NULL
);

describe users;
