-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-02-2024 a las 01:28:14
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "-05:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `blog`
--
CREATE SCHEMA if not exists `blog` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
-- --------------------------------------------------------
USE `blog`;

CREATE TABLE `roles` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL
);

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `clave` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `apellido` varchar(255) DEFAULT NULL,
  `nacionalidad` varchar(255) DEFAULT NULL,
  `nacimiento` date DEFAULT NULL,
  `genero` tinyint DEFAULT 1
); 

create table roles_usuarios (
    id int(11) not null primary key auto_increment,
    rol_id int(11) not null,
    usuario_id int(11) not null,

    constraint fk_rol foreign key (rol_id) references roles(id),
    constraint fk_usuario foreign key (usuario_id) references usuarios(id)
);

create table blogs (
  id int(11) not null primary key auto_increment,
  nombre varchar(255) not null,
  tema text not null,
  visitas int(11) default 0,
  fecha_creacion date not null
);

create table blogs_usuarios (
  id int(11) not null primary key auto_increment,
  blog_id int(11) not null,
  usuario_id int(11) not null,

  constraint fk_blog foreign key (blog_id) references blogs(id),
  constraint fk_blog_usuario foreign key (usuario_id) references usuarios(id)
);  

--
-- Inserciones de datos 
--
insert into roles (nombre) values ('ADMINISTRADOR');
insert into roles (nombre) values ('AUTOR');

insert into usuarios (email, clave, nombre) values ('admin@gmail.com', '1234', 'Administrador');
insert into usuarios (email, clave, nombre, apellido, nacionalidad, nacimiento, genero)
values ('autor@gmail.com', '1234', 'Autor', 'Apellido', 'Argentina', '2000-01-01', 1);

insert into roles_usuarios (rol_id, usuario_id) values (1, 1);
insert into roles_usuarios (rol_id, usuario_id) values (2, 2);

insert into blogs (nombre, tema, fecha_creacion)
values ('Blog 1', 'Tema 1', '2024-02-29');

insert into blogs_usuarios (blog_id, usuario_id)
values (1, 1);


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
