CREATE DATABASE IF NOT EXISTS `testdb`;
USE testdb;
CREATE TABLE IF NOT EXISTS `todolists` (
  id int(5) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  body varchar(255),
  completed BOOLEAN NOT NULL DEFAULT false,
  created_at timestamp default now(),
  updated_at timestamp on update current_timestamp default current_timestamp 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;