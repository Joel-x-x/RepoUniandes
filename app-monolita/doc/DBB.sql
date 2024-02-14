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
  `tipo_id` int(11) NOT NULL,
  `raza_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Llave foranea relacion 1 a muchos entre mascotas y tipos
ALTER TABLE `mascotas`
  ADD CONSTRAINT `fk_mascotas_tipos` FOREIGN KEY (`tipo_id`) REFERENCES `tipos` (`id`);

ALTER TABLE `mascotas`
  ADD CONSTRAINT `fk_mascotas_razas` FOREIGN KEY (`raza_id`) REFERENCES `razas` (`id`);

-- Inserciones de prueba
INSERT INTO `tipos` (`detalle`) VALUES ('Perro'), ('Gato'), ('Ave'), ('Roedor');
INSERT INTO `razas` (`detalle`) VALUES ('Labrador'), ('Pastor Aleman'), ('Persa'), ('Bombai');
INSERT INTO `mascotas` (`nombre`, `color`, `sexo`, `tipo_id`, `raza_id`) VALUES ('Pelusa', 'Blanco', 'Hembra', 1, 1), ('Luna', 'Negro', 'Hembra', 2, 4), ('Pepe', 'Azul', 'Macho', 3, 3);

-- Consulta para traer todos los datos
select m.nombre, m.color, m.sexo, t.detalle from mascotas m join tipos t on t.id = m.tipo_id;