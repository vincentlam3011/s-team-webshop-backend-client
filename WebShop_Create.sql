create database Nhom14_WebShop;
use Nhom14_WebShop;

create table users (
	id int auto_increment primary key,
	email nchar(50) unique,
    password nchar(30),
    dial nchar(11),
    address varchar(255),
    status boolean,
    type int default 0
);

create table employees (
	id int auto_increment primary key,
    foreign key (id) references users (id)
);

create table admins (
	id int auto_increment primary key,
    foreign key (id) references users (id)
);

create table banking_cards (
	id int auto_increment primary key,
    id_user int unique,
    cardNum bigint unique,
    type int,
    foreign key (id_user) references users (id)
);

create table categories (
	id int auto_increment primary key,
    name nvarchar(30),
    status boolean
);

create table products (
	id int auto_increment primary key,
    id_category int,
    name nvarchar(50),
    imgUrl text,
    description text,
    price float,
    status int,
    foreign key (id_category) references categories (id)
);

create table invoices (
	id int auto_increment primary key,
    id_customer int,
    status int,
    createDate date,
    estimatedDeliveryDate date,
    total float,
    foreign key (id_customer) references users (id)
);

create table invoiceDetails (
	id_product int,
    id_invoice int,
    quantity int,
    singlePrice float,
    foreign key (id_product) references products (id),
    foreign key (id_invoice) references invoices (id)
);