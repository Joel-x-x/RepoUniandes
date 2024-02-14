-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:8889
-- Tiempo de generación: 10-02-2024 a las 00:06:39
-- Versión del servidor: 5.7.39
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Base de datos: `mascotas`
--
CREATE DATABASE IF NOT EXISTS `mascotas` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `mascotas`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo`
--

CREATE TABLE `tipos` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `detalle` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo`
--

CREATE TABLE `razas` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `detalle` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mascotas`
--

CREATE TABLE `mascotas` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `nombre` text NOT NULL,
  `color` text NOT NULL,
  `sexo` text NOT NULL,
  `tipo_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Llave foranea relacion 1 a muchos entre mascotas y tipos
ALTER TABLE `mascotas`
  ADD CONSTRAINT `fk_mascotas_tipo` FOREIGN KEY (`tipo_id`) REFERENCES `tipos` (`id`);

-- Inserciones de prueba
INSERT INTO `tipos` (`detalle`) VALUES ('Perro'), ('Gato'), ('Ave'), ('Roedor');
INSERT INTO `mascotas` (`nombre`, `color`, `sexo`, `tipo_id`) VALUES ('Pelusa', 'Blanco', 'Hembra', 1), ('Luna', 'Negro', 'Macho',3);

-- Consulta para traer todos los datos
select m.nombre, m.color, m.sexo, t.detalle from mascotas m join tipos t on t.id = m.tipo_id;