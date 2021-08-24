CREATE DATABASE blog;

Use blog;

CREATE TABLE members (
    id varchar(30) NOT NULL,
    email varchar(30),
    name varchar(30) NOT NULL,
    picture varchar(50),
    PRIMARY KEY (id)
);

CREATE TABLE categories (
    category varchar(30) NOT NULL,
    PRIMARY KEY (category)
);

CREATE TABLE boards (
    num int(100) NOT NULL AUTO_INCREMENT,
    category varchar(30) NOT NULL,
    title varchar(30) NOT NULL,
    id varchar(30) NOT NULL,
    content text,
    date datetime NOT NULL,
    hit int(30) default 0 NOT NULL,
    PRIMARY KEY (num),
    CONSTRAINT fk_b_id FOREIGN KEY (id) REFERENCES members(id),
    CONSTRAINT fk_ct FOREIGN KEY (category) REFERENCES categories(category)
);

CREATE TABLE comments(
    num int(100) NOT NULL AUTO_INCREMENT,
    board_num int(100) NOT NULL,
    id varchar(30) NOT NULL,
    content text,
    PRIMARY KEY (num),
    CONSTRAINT fk_c_id FOREIGN KEY (id) REFERENCES members(id),
    CONSTRAINT fk_b_num FOREIGN KEY (board_num) REFERENCES boards(num)
);

