-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 14-08-2024 a las 02:36:53
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_agenda24`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contacto`
--

CREATE TABLE `contacto` (
  `cod_contacto` int(11) NOT NULL,
  `nom_contacto` varchar(200) NOT NULL,
  `ape_contacto` varchar(200) NOT NULL,
  `telefono_contacto` varchar(45) DEFAULT NULL,
  `email_contacto` varchar(45) DEFAULT NULL,
  `persona_cod_persona` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `contacto`
--

INSERT INTO `contacto` (`cod_contacto`, `nom_contacto`, `ape_contacto`, `telefono_contacto`, `email_contacto`, `persona_cod_persona`) VALUES
(1, 'Maria', 'Chunchun', '18000123456', 'maria@gmailcom', 1),
(2, 'Pepito', 'Perez', '999999', 'pepin@gmailcom', 2),
(3, 'YYY', 'aaaaaa', 'YYYY', 'YYYYY', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

CREATE TABLE `persona` (
  `cod_persona` int(11) NOT NULL,
  `ci_persona` varchar(12) NOT NULL,
  `nom_persona` varchar(200) NOT NULL,
  `ape_persona` varchar(200) NOT NULL,
  `clave_persona` varchar(45) NOT NULL,
  `correo_persona` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `persona`
--

INSERT INTO `persona` (`cod_persona`, `ci_persona`, `nom_persona`, `ape_persona`, `clave_persona`, `correo_persona`) VALUES
(1, '1803610920', 'fausto', 'viscaino', '123', 'fausto@hotmail.com'),
(2, '123456789', 'Maria', 'Chunchun', '456', 'maria@hotmail.com'),
(9, 'asdasdasdasd', 'asdasd56756765', 'asdasd', 'asdasd', 'asdasdasdasd'),
(13, '6666', 'Maria', 'Chunchun', '', '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `contacto`
--
ALTER TABLE `contacto`
  ADD PRIMARY KEY (`cod_contacto`),
  ADD KEY `fk_contacto_persona_idx` (`persona_cod_persona`);

--
-- Indices de la tabla `persona`
--
ALTER TABLE `persona`
  ADD PRIMARY KEY (`cod_persona`),
  ADD UNIQUE KEY `ci_persona_UNIQUE` (`ci_persona`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `contacto`
--
ALTER TABLE `contacto`
  MODIFY `cod_contacto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `persona`
--
ALTER TABLE `persona`
  MODIFY `cod_persona` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `contacto`
--
ALTER TABLE `contacto`
  ADD CONSTRAINT `fk_contacto_persona` FOREIGN KEY (`persona_cod_persona`) REFERENCES `persona` (`cod_persona`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
