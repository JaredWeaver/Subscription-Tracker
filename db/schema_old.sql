drop database if exists subscriptionTracker_dev;
create database subscriptionTracker_dev;

create table user(
    id int auto_increment primary key,
    firstName varchar(50),
    lastName varchar(50),
    email varchar(50) not null unique,
    password varchar(50) not null,
    isAdmin boolean,
    timestamps datetime
);

create table subscription (
	id int auto_increment primary key,
    name varchar(50),
    amount decimal(5,2),
    due date,
    isAnnual boolean,
    user_id int not null,
    FOREIGN KEY (user_id) REFERENCES user(id)
);

create table setting (
	id int auto_increment primary key,
    color varchar(10),
    user_id int not null,
    FOREIGN KEY (user_id) REFERENCES user(id)
);