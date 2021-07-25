CREATE DATABASE `blog`;

Use `blog`;

CREATE TABLE `members` (
    `m_num` int(100) NOT NULL AUTO_INCREMENT,
    `m_id` varchar(20) NOT NULL,
    `m_pw` varchar(20) NOT NULL,
    `m_name` varchar(20) NOT NULL,
    `m_email` varchar(30) NOT NULL,
    PRIMARY KEY (`m_num`)
);

CREATE TABLE `categories` (
    `ct_num` int(100) NOT NULL AUTO_INCREMENT,
    `ct_name` varchar(20) NOT NULL,
    PRIMARY KEY (`ct_num`)
);

CREATE TABLE `boards` (
    `b_num` int(100) NOT NULL AUTO_INCREMENT,
    `b_category` varchar(20) NOT NULL,
    `b_title` varchar(30) NOT NULL,
    `b_id` varchar(20) NOT NULL,
    `b_content` text,
    `b_date` datetime NOT NULL,
    `b_hit` int(30) NOT NULL,
    PRIMARY KEY (`b_num`)
);

CREATE TABLE `comments`(
    `cm_num` int(100) NOT NULL AUTO_INCREMENT,
    `cm_id` varchar(20) NOT NULL,
    `cm_contect` text,
    PRIMARY KEY (`cm_num`)
);