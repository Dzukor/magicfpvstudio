CREATE DATABASE IF NOT EXISTS database;
USE database;

create table if not exists users (
    id INT primary key auto_increment not null,
    username varchar(255) not null unique,
    password varchar(255) not null
);
insert into users (username, password) values ('app user', 'hashed password');
create table if not exists orders(id INT primary key auto_increment not null, name varchar(255) not null, surname varchar(255) not null, company varchar(255) not null, phone varchar(255) not null, email varchar(255) not null, message varchar(500) not null, created_at timestamp default current_timestamp, ended_at timestamp, status Boolean default false);

create user 'user'@'localhost' identified by 'password';
grant all privileges on magicfpv.* to 'user'@'localhost';
flush privileges;