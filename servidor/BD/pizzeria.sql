-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-05-2022 a las 20:04:36
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `pizzeria`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bebida`
--

CREATE TABLE `bebida` (
  `ID_BEBIDA` int(4) NOT NULL,
  `NOMBRE` varchar(30) NOT NULL,
  `PRECIO` float(4,2) DEFAULT 0.00,
  `DESCRIPCION` text DEFAULT NULL,
  `TAMAÑO` varchar(20) NOT NULL,
  `IMAGEN` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `bebida`
--

INSERT INTO `bebida` (`ID_BEBIDA`, `NOMBRE`, `PRECIO`, `DESCRIPCION`, `TAMAÑO`, `IMAGEN`) VALUES
(8, 'Agua', 1.00, 'Agua refrescante', '500 ml', 'http://127.0.0.1:8081/bebida/agua_500ml.jpg'),
(12, 'Aquarius Limón', 1.25, 'Bebida refrescante.', '500 ml', 'http://127.0.0.1:8081/bebida/aquarius_limon_500ml.jpg'),
(13, 'Aquarius Naranja', 1.25, 'Bebida refrescante.', '500 ml', 'http://127.0.0.1:8081/bebida/aquarius_naranja_500ml.jpg'),
(16, 'Bifrutas Tropical', 0.75, 'Bebida refrescante.', '330 ml', 'http://127.0.0.1:8081/bebida/bifrutas_tropical_lata.jpg'),
(17, 'Bifrutas Pacífico', 0.75, 'Bebida refrescante.', '330 ml', 'http://127.0.0.1:8081/bebida/bifutas_pasifico_lata.jpg'),
(18, 'Burn Original', 1.95, 'Bebida energética.', '500 ml', 'http://127.0.0.1:8081/bebida/burn_500ml.jpg'),
(19, 'Cola-Cola Light', 1.45, 'Bebida refrescante.', '500 ml', 'http://127.0.0.1:8081/bebida/coca_cola_lite_500ml.jpg'),
(23, 'Coca-Cola Zero', 1.45, 'Bebida refrescante.', '500 ml', 'http://127.0.0.1:8081/bebida/cocacola-zero_500ml.png'),
(25, 'Fanta Limón', 1.45, 'Bebida refrescante.', '500 ml', 'http://127.0.0.1:8081/bebida/fanta_limon_500ml.jpg'),
(26, 'Fanta Naranja', 1.45, 'Bebida refrescante.', '500 ml', 'http://127.0.0.1:8081/bebida/fanta_naranja_500ml.jpg'),
(30, 'Bifrutas Mediterráneo', 0.75, 'Bebida refrescante.', '330 ml', 'http://127.0.0.1:8081/bebida/bifrutas_mediterraneso_lata.jpg'),
(31, 'Coca-Cola ', 1.45, 'Bebida refrescante.', '500 ml', 'http://127.0.0.1:8081/bebida/coca_cola_500ml.jpg'),
(32, 'Aquarius Limón Lata', 0.95, 'Bebida refrescante.', '330 ml', 'http://127.0.0.1:8081/bebida/aquarius_limon_lata.jpg'),
(33, 'Aquarius Naranja Lata', 0.95, 'Bebida refrescante.', '330 ml', 'http://127.0.0.1:8081/bebida/aquarius_naranja_lata.jpg'),
(34, 'Coca-Cola Light Lata', 0.95, 'Bebida refrescante.', '330 ml', 'http://127.0.0.1:8081/bebida/coca_cola_lite_lata.jpg'),
(35, 'Coca-Cola Lata', 0.95, 'Bebida refrescante.', '330 ml', 'http://127.0.0.1:8081/bebida/Coca-Cola-lata-33cl.jpg'),
(36, 'Coca-Cola Zero Lata', 0.95, 'Bebida refrescante.', '330 ml', 'http://127.0.0.1:8081/bebida/cola_zero_lata.jpg'),
(37, 'Fanta Naranja Lata', 0.95, 'Bebida refrescante.', '330 ml', 'http://127.0.0.1:8081/bebida/fanta_naranja_lata.jpg'),
(38, 'Fanta Limón Lata', 0.95, 'Bebida refrescante.', '330 ml ', 'http://127.0.0.1:8081/bebida/fanta-limon-lata-33-cl.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `ID_CLIENTE` int(10) NOT NULL,
  `NOMBRE` varchar(40) NOT NULL,
  `APELLIDO` varchar(40) DEFAULT NULL,
  `FECHA_NACIMIENTO` date DEFAULT NULL,
  `TELEFONO` int(9) NOT NULL,
  `DIRECCION` varchar(100) NOT NULL,
  `EMAIL` varchar(40) NOT NULL,
  `CONTRASEÑA` varchar(40) NOT NULL,
  `ROL` varchar(40) NOT NULL DEFAULT 'cliente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`ID_CLIENTE`, `NOMBRE`, `APELLIDO`, `FECHA_NACIMIENTO`, `TELEFONO`, `DIRECCION`, `EMAIL`, `CONTRASEÑA`, `ROL`) VALUES
(16, 'test_todo', '', '2022-01-09', 123456789, 'Murcia', 'test_todo@gmail.com', 'Hola1234', 'cliente'),
(27, 'Cliente', 'Cliente', '2022-05-07', 111222333, 'Murcia', 'cliente@gmail.com', '1234Hola', 'cliente'),
(28, 'XXX', 'XXX', '2022-05-14', 111222333, 'Murcia', 'cliente2@gmail.com', '1234Hola', 'cliente'),
(29, 'asdas', 'dsadaasdasd', '2022-05-03', 0, 'asdaasdf', 'asdasdasdas@gmail.com', 'asdasdasasd2423142DFAWDFD', 'cliente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compra`
--

CREATE TABLE `compra` (
  `ID_COMPRA` int(10) NOT NULL,
  `FECHA_HORA` datetime DEFAULT current_timestamp(),
  `CLIENTE` int(10) DEFAULT NULL,
  `DESCRIPCION` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `compra`
--

INSERT INTO `compra` (`ID_COMPRA`, `FECHA_HORA`, `CLIENTE`, `DESCRIPCION`) VALUES
(14, '2022-05-18 21:11:25', 27, NULL),
(15, '2022-05-18 21:13:31', 27, NULL),
(16, '2022-05-18 21:13:49', 27, NULL),
(17, '2022-05-18 21:14:58', 27, NULL),
(18, '2022-05-18 21:15:31', 27, NULL),
(19, '2022-05-18 21:15:57', 27, NULL),
(20, '2022-05-19 00:38:36', 27, NULL),
(21, '2022-05-19 00:44:17', 27, NULL),
(22, '2022-05-19 00:44:37', 27, NULL),
(23, '2022-05-19 00:45:57', 27, NULL),
(24, '2022-05-19 00:47:53', 27, NULL),
(25, '2022-05-19 00:48:51', 27, NULL),
(26, '2022-05-19 00:52:31', 27, NULL),
(27, '2022-05-19 00:58:57', 27, NULL),
(28, '2022-05-19 23:42:25', 27, NULL),
(29, '2022-05-19 23:43:38', 27, NULL),
(31, '2022-05-19 23:52:44', 27, NULL),
(32, '2022-05-19 23:54:59', 27, NULL),
(33, '2022-05-20 00:01:56', 27, NULL),
(34, '2022-05-20 00:02:34', 27, NULL),
(35, '2022-05-20 00:04:39', 27, NULL),
(36, '2022-05-20 00:25:54', 27, NULL),
(37, '2022-05-20 10:02:45', 27, NULL),
(38, '2022-05-20 16:50:51', 27, NULL),
(39, '2022-05-20 16:53:41', 27, NULL),
(40, '2022-05-20 16:58:43', 27, NULL),
(41, '2022-05-20 18:22:36', 27, NULL),
(42, '2022-05-21 12:08:39', 27, NULL),
(43, '2022-05-21 15:43:29', 27, NULL),
(44, '2022-05-21 15:43:42', 27, NULL),
(45, '2022-05-21 20:24:13', 27, NULL),
(46, '2022-05-21 20:26:02', 27, NULL),
(47, '2022-05-21 20:27:39', 27, NULL),
(48, '2022-05-21 20:31:51', 27, NULL),
(49, '2022-05-24 20:14:31', 27, NULL),
(50, '2022-05-24 20:57:44', 27, NULL),
(51, '2022-05-24 20:58:47', 27, NULL),
(52, '2022-05-25 22:56:58', 27, NULL),
(53, '2022-05-26 14:31:32', 27, NULL),
(54, '2022-05-26 19:19:27', 27, NULL),
(55, '2022-05-26 19:20:23', 27, NULL),
(56, '2022-05-28 17:42:05', 27, NULL),
(57, '2022-05-28 17:44:56', 27, NULL),
(58, '2022-05-28 18:06:37', 27, NULL),
(59, '2022-05-28 21:32:03', 27, NULL),
(60, '2022-05-29 11:24:18', 27, NULL),
(61, '2022-05-29 19:15:04', 27, NULL),
(62, '2022-05-29 19:28:01', 27, NULL),
(63, '2022-05-29 19:30:35', 27, NULL),
(64, '2022-05-29 19:44:34', 27, NULL),
(65, '2022-05-29 20:53:48', 27, NULL),
(66, '2022-05-29 21:40:38', 27, NULL),
(67, '2022-05-30 10:58:33', 27, NULL),
(68, '2022-05-30 12:15:52', 27, NULL),
(69, '2022-05-30 12:50:41', 27, NULL),
(70, '2022-05-30 12:50:50', 27, NULL),
(71, '2022-05-30 12:57:37', 27, NULL),
(72, '2022-05-30 13:47:33', 27, NULL),
(73, '2022-05-30 14:02:38', 27, NULL),
(74, '2022-05-30 16:36:58', 27, NULL),
(75, '2022-05-30 16:56:34', 27, NULL),
(76, '2022-05-30 16:57:05', 27, NULL),
(77, '2022-05-30 16:58:20', 27, NULL),
(78, '2022-05-30 16:59:21', 27, NULL),
(79, '2022-05-30 18:05:40', 27, NULL),
(80, '2022-05-30 18:23:58', 27, NULL),
(81, '2022-05-30 18:28:37', 27, NULL),
(82, '2022-05-30 19:48:47', 27, NULL),
(83, '2022-05-30 19:50:50', 27, NULL),
(84, '2022-05-30 19:53:44', 27, NULL),
(85, '2022-05-30 19:53:50', 27, NULL),
(86, '2022-05-30 19:54:35', 27, NULL),
(87, '2022-05-30 20:02:19', 27, NULL),
(88, '2022-05-30 20:02:27', 27, NULL),
(89, '2022-05-30 20:02:36', 27, NULL),
(90, '2022-05-30 20:03:05', 27, NULL),
(91, '2022-05-30 20:03:12', 27, NULL),
(92, '2022-05-30 20:03:40', 27, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compra_lista`
--

CREATE TABLE `compra_lista` (
  `COMPRA` int(10) NOT NULL,
  `OFERTA` int(4) DEFAULT NULL,
  `PIZZA` int(4) DEFAULT NULL,
  `BEBIDA` int(4) DEFAULT NULL,
  `ENTRANTES` int(4) DEFAULT NULL,
  `POSTRES` int(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `compra_lista`
--

INSERT INTO `compra_lista` (`COMPRA`, `OFERTA`, `PIZZA`, `BEBIDA`, `ENTRANTES`, `POSTRES`) VALUES
(8, 64, NULL, NULL, NULL, NULL),
(8, NULL, 27, NULL, NULL, NULL),
(8, NULL, 21, NULL, NULL, NULL),
(8, NULL, 21, NULL, NULL, NULL),
(8, NULL, NULL, 8, NULL, NULL),
(8, NULL, NULL, 8, NULL, NULL),
(0, 65, NULL, NULL, NULL, NULL),
(0, 65, NULL, NULL, NULL, NULL),
(0, 65, NULL, NULL, NULL, NULL),
(0, 65, NULL, NULL, NULL, NULL),
(0, 65, NULL, NULL, NULL, NULL),
(0, 65, NULL, NULL, NULL, NULL),
(24, 57, NULL, NULL, NULL, NULL),
(25, 57, NULL, NULL, NULL, NULL),
(26, 57, NULL, NULL, NULL, NULL),
(27, 57, NULL, NULL, NULL, NULL),
(28, 57, NULL, NULL, NULL, NULL),
(29, 57, NULL, NULL, NULL, NULL),
(30, 57, NULL, NULL, NULL, NULL),
(31, 57, NULL, NULL, NULL, NULL),
(32, 57, NULL, NULL, NULL, NULL),
(32, NULL, 26, NULL, NULL, NULL),
(32, NULL, NULL, 32, NULL, NULL),
(32, NULL, NULL, 32, NULL, NULL),
(32, NULL, NULL, NULL, NULL, 6),
(33, NULL, 26, NULL, NULL, NULL),
(34, NULL, 26, NULL, NULL, NULL),
(35, 56, NULL, NULL, NULL, NULL),
(35, NULL, 26, NULL, NULL, NULL),
(35, NULL, 26, NULL, NULL, NULL),
(35, NULL, NULL, 32, NULL, NULL),
(35, NULL, NULL, 32, NULL, NULL),
(35, NULL, NULL, 12, NULL, NULL),
(35, NULL, NULL, NULL, 6, NULL),
(35, NULL, NULL, NULL, NULL, 3),
(36, 56, NULL, NULL, NULL, NULL),
(36, NULL, 26, NULL, NULL, NULL),
(36, NULL, 26, NULL, NULL, NULL),
(36, NULL, NULL, 32, NULL, NULL),
(36, NULL, NULL, 32, NULL, NULL),
(36, NULL, NULL, 12, NULL, NULL),
(36, NULL, NULL, NULL, 6, NULL),
(36, NULL, NULL, NULL, 6, NULL),
(36, NULL, NULL, NULL, NULL, 3),
(36, NULL, NULL, NULL, NULL, 3),
(37, 56, NULL, NULL, NULL, NULL),
(37, NULL, 26, NULL, NULL, NULL),
(37, NULL, 26, NULL, NULL, NULL),
(37, NULL, NULL, 32, NULL, NULL),
(37, NULL, NULL, 32, NULL, NULL),
(37, NULL, NULL, 12, NULL, NULL),
(37, NULL, NULL, NULL, 6, NULL),
(37, NULL, NULL, NULL, 6, NULL),
(37, NULL, NULL, NULL, NULL, 3),
(37, NULL, NULL, NULL, NULL, 3),
(38, NULL, 26, NULL, NULL, NULL),
(38, NULL, 29, NULL, NULL, NULL),
(38, NULL, 29, NULL, NULL, NULL),
(38, NULL, NULL, NULL, 7, NULL),
(39, NULL, 26, NULL, NULL, NULL),
(39, NULL, 29, NULL, NULL, NULL),
(39, NULL, 29, NULL, NULL, NULL),
(39, NULL, NULL, NULL, 7, NULL),
(40, NULL, 26, NULL, NULL, NULL),
(40, NULL, 29, NULL, NULL, NULL),
(40, NULL, 29, NULL, NULL, NULL),
(40, NULL, NULL, NULL, 7, NULL),
(41, 65, NULL, NULL, NULL, NULL),
(41, 65, NULL, NULL, NULL, NULL),
(42, 66, NULL, NULL, NULL, NULL),
(42, NULL, 29, NULL, NULL, NULL),
(42, NULL, 29, NULL, NULL, NULL),
(42, NULL, NULL, NULL, 5, NULL),
(42, NULL, NULL, NULL, NULL, 4),
(43, NULL, NULL, NULL, NULL, 4),
(44, NULL, NULL, NULL, NULL, 4),
(45, NULL, NULL, NULL, NULL, 4),
(49, 65, NULL, NULL, NULL, NULL),
(49, 57, NULL, NULL, NULL, NULL),
(50, 65, NULL, NULL, NULL, NULL),
(50, 57, NULL, NULL, NULL, NULL),
(51, 65, NULL, NULL, NULL, NULL),
(51, 57, NULL, NULL, NULL, NULL),
(52, 65, NULL, NULL, NULL, NULL),
(52, 65, NULL, NULL, NULL, NULL),
(52, 57, NULL, NULL, NULL, NULL),
(53, 65, NULL, NULL, NULL, NULL),
(53, 65, NULL, NULL, NULL, NULL),
(53, 57, NULL, NULL, NULL, NULL),
(53, 63, NULL, NULL, NULL, NULL),
(53, NULL, 29, NULL, NULL, NULL),
(53, NULL, 35, NULL, NULL, NULL),
(53, NULL, NULL, 12, NULL, NULL),
(53, NULL, NULL, 12, NULL, NULL),
(53, NULL, NULL, NULL, 6, NULL),
(53, NULL, NULL, NULL, 9, NULL),
(53, NULL, NULL, NULL, NULL, 3),
(54, NULL, NULL, NULL, 7, NULL),
(55, 66, NULL, NULL, NULL, NULL),
(55, NULL, NULL, NULL, 7, NULL),
(56, 56, NULL, NULL, NULL, NULL),
(56, 65, NULL, NULL, NULL, NULL),
(56, NULL, 28, NULL, NULL, NULL),
(56, NULL, NULL, 12, NULL, NULL),
(56, NULL, NULL, NULL, NULL, 3),
(57, 56, NULL, NULL, NULL, NULL),
(57, 65, NULL, NULL, NULL, NULL),
(57, NULL, 28, NULL, NULL, NULL),
(57, NULL, NULL, 12, NULL, NULL),
(57, NULL, NULL, NULL, NULL, 3),
(58, NULL, NULL, 12, NULL, NULL),
(59, 71, NULL, NULL, NULL, NULL),
(59, 71, NULL, NULL, NULL, NULL),
(59, 57, NULL, NULL, NULL, NULL),
(59, NULL, 36, NULL, NULL, NULL),
(60, 71, NULL, NULL, NULL, NULL),
(60, 71, NULL, NULL, NULL, NULL),
(60, 57, NULL, NULL, NULL, NULL),
(60, NULL, 36, NULL, NULL, NULL),
(60, NULL, 36, NULL, NULL, NULL),
(61, 73, NULL, NULL, NULL, NULL),
(61, 73, NULL, NULL, NULL, NULL),
(61, 73, NULL, NULL, NULL, NULL),
(61, NULL, NULL, 32, NULL, NULL),
(61, NULL, NULL, NULL, 9, NULL),
(61, NULL, NULL, NULL, 9, NULL),
(61, NULL, NULL, NULL, 9, NULL),
(61, NULL, NULL, NULL, NULL, 2),
(62, 73, NULL, NULL, NULL, NULL),
(62, 73, NULL, NULL, NULL, NULL),
(62, 73, NULL, NULL, NULL, NULL),
(63, 72, NULL, NULL, NULL, NULL),
(63, 72, NULL, NULL, NULL, NULL),
(64, 63, NULL, NULL, NULL, NULL),
(65, 74, NULL, NULL, NULL, NULL),
(65, 75, NULL, NULL, NULL, NULL),
(66, NULL, 28, NULL, NULL, NULL),
(67, NULL, 28, NULL, NULL, NULL),
(68, 71, NULL, NULL, NULL, NULL),
(68, 71, NULL, NULL, NULL, NULL),
(68, 57, NULL, NULL, NULL, NULL),
(68, 57, NULL, NULL, NULL, NULL),
(69, 71, NULL, NULL, NULL, NULL),
(70, 71, NULL, NULL, NULL, NULL),
(70, 71, NULL, NULL, NULL, NULL),
(71, 71, NULL, NULL, NULL, NULL),
(71, 71, NULL, NULL, NULL, NULL),
(71, NULL, 28, NULL, NULL, NULL),
(71, NULL, NULL, 32, NULL, NULL),
(71, NULL, NULL, NULL, 9, NULL),
(71, NULL, NULL, NULL, NULL, 3),
(72, NULL, 29, NULL, NULL, NULL),
(73, NULL, NULL, 12, NULL, NULL),
(74, NULL, 26, NULL, NULL, NULL),
(75, NULL, 20, NULL, NULL, NULL),
(76, NULL, NULL, NULL, NULL, 15),
(77, NULL, NULL, NULL, NULL, 10),
(78, NULL, NULL, NULL, NULL, 2),
(78, NULL, NULL, NULL, NULL, 6),
(79, NULL, 30, NULL, NULL, NULL),
(80, NULL, NULL, NULL, 6, NULL),
(81, 75, NULL, NULL, NULL, NULL),
(82, NULL, 29, NULL, NULL, NULL),
(83, NULL, 20, NULL, NULL, NULL),
(84, NULL, 20, NULL, NULL, NULL),
(85, NULL, 20, NULL, NULL, NULL),
(85, NULL, NULL, 12, NULL, NULL),
(86, NULL, NULL, 12, NULL, NULL),
(87, NULL, 20, NULL, NULL, NULL),
(88, NULL, NULL, NULL, 6, NULL),
(88, NULL, NULL, NULL, 7, NULL),
(89, NULL, NULL, 32, NULL, NULL),
(90, NULL, 26, NULL, NULL, NULL),
(91, NULL, NULL, 12, NULL, NULL),
(92, 75, NULL, NULL, NULL, NULL),
(92, 71, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `ID_EMPLEADO` int(4) NOT NULL,
  `NOMBRE` varchar(40) NOT NULL,
  `APELLIDO` varchar(40) NOT NULL,
  `DNI` varchar(9) NOT NULL,
  `DIRECCION` varchar(40) NOT NULL,
  `EMAIL` varchar(40) NOT NULL,
  `CONTRASEÑA` varchar(40) NOT NULL,
  `ROL` varchar(40) NOT NULL,
  `FECHA_ALTA` date DEFAULT NULL,
  `FECHA_BAJA` date DEFAULT NULL,
  `TELEFONO` int(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`ID_EMPLEADO`, `NOMBRE`, `APELLIDO`, `DNI`, `DIRECCION`, `EMAIL`, `CONTRASEÑA`, `ROL`, `FECHA_ALTA`, `FECHA_BAJA`, `TELEFONO`) VALUES
(25, 'admin', 'admin', '12345678X', 'MURCIA', 'admin@gmail.com', '1234Hola', 'admin', '2022-04-23', NULL, 111111111),
(26, 'empleado', 'empleado', '12345678X', 'MURCIA', 'empleado@gmail.com', '1234Hola', 'empleado', '2022-04-23', NULL, 666555666),
(32, 'Sandra ', 'Bullock', 'X5566688T', 'EEUU', 'bullock@email.com', '1234Hola', 'empleado', '2021-11-10', NULL, 987456120),
(36, 'Cleopatra', 'VII', '11111111O', 'Egipto', 'cleo@gmail.com', '1234Hola', 'empleado', '2022-04-27', NULL, 111111111),
(39, 'Antonio ', 'Banderas', '78594612F', 'Madrid', 'banderas@gmail.com', '1234Hola', 'empleado', '2022-04-10', NULL, 877569123),
(42, 'Julio', 'César', '12345658G', 'Roma', 'cesar@gmail.com', '1234Hola', 'empleado', '2020-12-01', NULL, 222333888),
(47, 'Maria', 'del Oro Martínez', '33399902W', 'Murcia', 'maria@gmail.com', '1234Hola', 'empleado', '2022-05-08', NULL, 666777444);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entrantes`
--

CREATE TABLE `entrantes` (
  `ID_ENTRANTES` int(4) NOT NULL,
  `NOMBRE` varchar(30) NOT NULL,
  `PRECIO` float(4,2) DEFAULT 0.00,
  `TAMAÑO` varchar(20) NOT NULL,
  `DESCRIPCION` text DEFAULT NULL,
  `IMAGEN` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `entrantes`
--

INSERT INTO `entrantes` (`ID_ENTRANTES`, `NOMBRE`, `PRECIO`, `TAMAÑO`, `DESCRIPCION`, `IMAGEN`) VALUES
(5, 'Alitas de Pollo', 6.00, 'Mediano', 'Siete alitas de pollo crujientes', 'http://127.0.0.1:8081/entrante/alitas_pollo.png'),
(6, 'Aros de Cebolla', 5.00, 'Mediano', 'Una cesta de aros de cebolla muy crujientes.', 'http://127.0.0.1:8081/entrante/aros_cebolla.png'),
(7, 'Bacon Cheese Fries', 4.50, 'Mediana', '¡Un entrante especial!', 'http://127.0.0.1:8081/entrante/bacon-cheese-fries.png'),
(8, 'Chicken Fingers', 5.50, 'Mediano', 'Trozos de pechuga de pollo empandas.', 'http://127.0.0.1:8081/entrante/chicken_fingers.png'),
(9, 'Ensalada Griega', 6.75, 'Mediana', 'Ensalada es un entremeses estupendo.', 'http://127.0.0.1:8081/entrante/ensalada%20griega.jpg'),
(10, 'Ensalada Caprece', 6.50, 'Mediana', 'Ensalada simple pero rica.', 'http://127.0.0.1:8081/entrante/ensalada_caprese.jpg'),
(11, 'Ensalada Mixta', 7.25, 'Mediana', 'Ensalada tradicional.', 'http://127.0.0.1:8081/entrante/ensalada_mixta.jpg'),
(12, 'Ensaladilla Rusa', 6.25, 'Mediana', 'Ensaladilla rusa con rosquilla.', 'http://127.0.0.1:8081/entrante/ensaladilla_rusa.jpg'),
(13, 'Nachos', 7.00, 'Mediano', '¡Unos nachos perfectos para compartir!', 'http://127.0.0.1:8081/entrante/nachos.png'),
(14, 'Palitos de Mozarrela', 6.50, 'Mediano', '¡Perfectas para empezar!', 'http://127.0.0.1:8081/entrante/palitos_mozzarella.jpg'),
(15, 'Patatas Fritas', 3.00, 'Ración', 'Simples pero sabrosas', 'http://127.0.0.1:8081/entrante/patatas_fritas.jpg'),
(16, 'Patatas Gajo', 3.50, 'Ración', '¡El rey entre las patatas fritas!', 'http://127.0.0.1:8081/entrante/patatas_gajo.png'),
(17, 'Kebab', 3.50, 'Ración', '¡Un kebab muy suculento porque contiene mucha salsa!', 'http://127.0.0.1:8081/entrante/kebab.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entrantes_ingrediente`
--

CREATE TABLE `entrantes_ingrediente` (
  `ENTRANTES` int(4) NOT NULL,
  `INGREDIENTE` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `entrantes_ingrediente`
--

INSERT INTO `entrantes_ingrediente` (`ENTRANTES`, `INGREDIENTE`) VALUES
(5, 72),
(6, 54),
(6, 117),
(7, 39),
(7, 56),
(7, 74),
(7, 75),
(7, 81),
(7, 85),
(8, 117),
(8, 72),
(9, 27),
(9, 29),
(9, 115),
(9, 64),
(9, 77),
(9, 67),
(9, 79),
(9, 86),
(10, 27),
(10, 36),
(10, 77),
(10, 86),
(11, 27),
(11, 38),
(11, 54),
(11, 60),
(11, 118),
(11, 67),
(11, 69),
(11, 79),
(11, 86),
(12, 38),
(12, 56),
(12, 60),
(12, 112),
(12, 67),
(12, 68),
(13, 54),
(13, 56),
(13, 74),
(13, 76),
(13, 85),
(13, 86),
(14, 117),
(14, 77),
(15, 119),
(16, 119),
(17, 54),
(17, 55),
(17, 58),
(17, 117),
(17, 24),
(17, 118),
(17, 64),
(17, 65),
(17, 67),
(17, 68),
(17, 69),
(17, 72),
(17, 76),
(17, 79),
(17, 84),
(17, 85),
(17, 86);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `extras`
--

CREATE TABLE `extras` (
  `ID_EXTRA` int(4) NOT NULL,
  `PRECIO` float(4,2) DEFAULT 0.00,
  `IMAGEN` varchar(100) DEFAULT NULL,
  `INGREDIENTE` int(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `extras`
--

INSERT INTO `extras` (`ID_EXTRA`, `PRECIO`, `IMAGEN`, `INGREDIENTE`) VALUES
(4, 1.15, 'http://127.0.0.1:8081/ingredientes/mejillones.jpg', 21),
(6, 0.50, 'http://127.0.0.1:8081/ingredientes/ketchup.jpg', 24),
(9, 0.30, 'http://127.0.0.1:8081/ingredientes/aceite_vinagre.jpg', 27),
(11, 0.60, 'http://127.0.0.1:8081/ingredientes/aceituna_negra.png', 29),
(14, 0.60, 'http://127.0.0.1:8081/ingredientes/aceitunas_verdes.jpg', 33),
(16, 0.20, 'http://127.0.0.1:8081/ingredientes/ajo.jpg', 35),
(17, 0.25, 'http://127.0.0.1:8081/ingredientes/albahaca.jpg', 36),
(18, 0.75, 'http://127.0.0.1:8081/ingredientes/alcachofa.jpg', 37),
(19, 1.25, 'http://127.0.0.1:8081/ingredientes/atun.jpg', 38),
(20, 1.00, 'http://127.0.0.1:8081/ingredientes/bacon.jpg', 39),
(21, 0.40, 'http://127.0.0.1:8081/ingredientes/berenjena.jpg', 40),
(30, 0.25, 'http://127.0.0.1:8081/ingredientes/cebolla.jpg', 54),
(31, 0.55, 'http://127.0.0.1:8081/ingredientes/champi%C3%B1ones.jpg', 55),
(32, 0.15, 'http://127.0.0.1:8081/ingredientes/cilantro.jpg', 56),
(33, 1.35, 'http://127.0.0.1:8081/ingredientes/gambas.jpg', 57),
(34, 0.35, 'http://127.0.0.1:8081/ingredientes/guindilla.jpg', 58),
(35, 0.65, 'http://127.0.0.1:8081/ingredientes/guacamole.png', 59),
(36, 0.50, 'http://127.0.0.1:8081/ingredientes/huevo.jpg', 60),
(37, 0.40, 'http://127.0.0.1:8081/ingredientes/jalope%C3%B1os.jpg', 61),
(38, 0.75, 'http://127.0.0.1:8081/ingredientes/jamon_serrano.jpg', 62),
(39, 0.55, 'http://127.0.0.1:8081/ingredientes/jamon_york.jpg', 63),
(40, 0.25, 'http://127.0.0.1:8081/ingredientes/maiz.jpg', 64),
(41, 0.45, 'http://127.0.0.1:8081/ingredientes/mostaza.jpg', 65),
(42, 0.15, 'http://127.0.0.1:8081/ingredientes/oregano.jpg', 66),
(43, 0.35, 'http://127.0.0.1:8081/ingredientes/pepino.jpg', 67),
(44, 0.35, 'http://127.0.0.1:8081/ingredientes/pimiento_rojo.jpg', 68),
(45, 0.35, 'http://127.0.0.1:8081/ingredientes/pimiento_verde.jpg', 69),
(46, 0.35, 'http://127.0.0.1:8081/ingredientes/pimiento-amarillo.jpg', 70),
(48, 0.95, 'http://127.0.0.1:8081/ingredientes/pollo_filete.png', 72),
(50, 0.55, 'http://127.0.0.1:8081/ingredientes/queso_cheddar.jpg', 74),
(51, 0.65, 'http://127.0.0.1:8081/ingredientes/queso_elemental.jpg', 75),
(52, 0.70, 'http://127.0.0.1:8081/ingredientes/queso_grana_padano.jpg', 76),
(53, 0.55, 'http://127.0.0.1:8081/ingredientes/queso_mozzarela.jpg', 77),
(54, 0.65, 'http://127.0.0.1:8081/ingredientes/queso_roquefort.jpg', 78),
(55, 0.15, 'http://127.0.0.1:8081/ingredientes/rucula.jpg', 79),
(56, 1.10, 'http://127.0.0.1:8081/ingredientes/salmon..jpg', 80),
(57, 0.50, 'http://127.0.0.1:8081/ingredientes/salsa_cesar.jpg', 81),
(60, 0.50, 'http://127.0.0.1:8081/ingredientes/salsa_barbacoa.jpg', 84),
(61, 0.65, 'http://127.0.0.1:8081/ingredientes/salsa_yogur.jpg', 85),
(62, 0.25, 'http://127.0.0.1:8081/ingredientes/tomate.jpg', 86),
(79, 0.45, 'http://127.0.0.1:8081/ingredientes/mayonesa.jpg', 112),
(80, 0.65, 'http://127.0.0.1:8081/ingredientes/aguacate.jpg', 115),
(81, 0.65, 'http://127.0.0.1:8081/ingredientes/pina.jpg', 125);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ingredientes`
--

CREATE TABLE `ingredientes` (
  `ID_INGREDIENTE` int(4) NOT NULL,
  `NOMBRE` varchar(30) NOT NULL,
  `ALERGENOS` varchar(20) DEFAULT NULL,
  `IMAGEN` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ingredientes`
--

INSERT INTO `ingredientes` (`ID_INGREDIENTE`, `NOMBRE`, `ALERGENOS`, `IMAGEN`) VALUES
(20, 'Masa de Pizza', 'gluten', 'http://127.0.0.1:8081/alergenos/IconoAlergenoGluten-Gluten_icon-icons.com_67600.svg'),
(21, 'Mejillones', 'moluscos', 'http://127.0.0.1:8081/alergenos/IconoAlergenoMoluscos-Mollusks_icon-icons.com_67596.svg'),
(24, 'Ketchup', NULL, NULL),
(27, 'Aceite y Vinagre', '', ''),
(29, 'Aceitunas Negras', '', ''),
(33, 'Aceitunas Verdes', NULL, NULL),
(35, 'Ajo', NULL, NULL),
(36, 'Albahaca', NULL, NULL),
(37, 'Alcachofa', '', ''),
(38, 'Atún', 'pescado', 'http://127.0.0.1:8081/alergenos/Fish_icon-icons.com_67594.svg'),
(39, 'Bacon', '', ''),
(40, 'Berenjena', '', ''),
(54, 'Cebolla', '', ''),
(55, 'Champiñones', NULL, NULL),
(56, 'Cilantro', NULL, NULL),
(57, 'Gambas', 'crustáceo', 'http://127.0.0.1:8081/alergenos/IconoAlergenoCrustaceo-Crustaceans_icon-icons.com_67603.svg'),
(58, 'Guindilla', '', ''),
(59, 'Guacamole', NULL, NULL),
(60, 'Huevo', 'huevo', 'http://127.0.0.1:8081/alergenos/IconoAlergenoHuevo-Egg_icon-icons.com_67598.svg'),
(61, 'Jalopeños', '', ''),
(62, 'Jamón Serrano', NULL, NULL),
(63, 'Jamón York', NULL, NULL),
(64, 'Maíz', NULL, NULL),
(65, 'Moztaza', NULL, NULL),
(66, 'Orégano', NULL, NULL),
(67, 'Pepino', NULL, NULL),
(68, 'Pimiento Rojo', NULL, NULL),
(69, 'Pimiento verde', NULL, NULL),
(70, 'Pimiento Amarillo', NULL, NULL),
(72, 'Pollo', NULL, NULL),
(74, 'Queso Cheddar', 'lácteos', 'http://127.0.0.1:8081/alergenos/IconoAlergenoLacteos-DairyProducts_icon-icons.com_67597.svg'),
(75, 'Queso Elemental', 'lácteos', 'http://127.0.0.1:8081/alergenos/IconoAlergenoLacteos-DairyProducts_icon-icons.com_67597.svg'),
(76, 'Queso Grana Padano', 'lácteos', 'http://127.0.0.1:8081/alergenos/IconoAlergenoLacteos-DairyProducts_icon-icons.com_67597.svg'),
(77, 'Mozarrela', 'lácteos', 'http://127.0.0.1:8081/alergenos/IconoAlergenoLacteos-DairyProducts_icon-icons.com_67597.svg'),
(78, 'Queso Roquefort', 'lácteos', 'http://127.0.0.1:8081/alergenos/IconoAlergenoLacteos-DairyProducts_icon-icons.com_67597.svg'),
(79, 'Rúcula', '', ''),
(80, 'Salmón', 'pescado', 'http://127.0.0.1:8081/alergenos/Fish_icon-icons.com_67594.svg'),
(81, 'Salsa César', 'lácteos', 'http://127.0.0.1:8081/alergenos/IconoAlergenoLacteos-DairyProducts_icon-icons.com_67597.svg'),
(84, 'Salsa Barbacoa', 'gluten', 'http://127.0.0.1:8081/alergenos/IconoAlergenoGluten-Gluten_icon-icons.com_67600.svg'),
(85, 'Salsa Yogur', 'lácteos', 'http://127.0.0.1:8081/alergenos/IconoAlergenoLacteos-DairyProducts_icon-icons.com_67597.svg'),
(86, 'Tomate', '', ''),
(103, 'Chorizo', '', ''),
(112, 'Mayonesa', 'huevo', 'http://127.0.0.1:8081/alergenos/IconoAlergenoHuevo-Egg_icon-icons.com_67598.svg'),
(113, 'Salsa Tomate', '', ''),
(115, 'Aguacate', '', ''),
(117, 'Harina', 'gluten', 'http://127.0.0.1:8081/alergenos/IconoAlergenoGluten-Gluten_icon-icons.com_67600.svg'),
(118, 'Lechuga', '', ''),
(119, 'Patata', '', ''),
(120, 'Guisante', NULL, NULL),
(121, 'Zanahoria', NULL, NULL),
(125, 'Piña', NULL, NULL),
(127, 'Cacahuete', '', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modificado`
--

CREATE TABLE `modificado` (
  `COMPRA` int(10) NOT NULL,
  `PIZZA` int(4) DEFAULT NULL,
  `ENTRANTES` int(4) DEFAULT NULL,
  `EXTRAS` int(4) DEFAULT NULL,
  `COMENTARIO` text DEFAULT NULL,
  `NUM_MOD` int(10) NOT NULL,
  `OFERTA` int(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `modificado`
--

INSERT INTO `modificado` (`COMPRA`, `PIZZA`, `ENTRANTES`, `EXTRAS`, `COMENTARIO`, `NUM_MOD`, `OFERTA`) VALUES
(31, 20, NULL, 33, NULL, 2, 57),
(31, NULL, 8, 35, NULL, 3, 57),
(31, NULL, 8, 40, NULL, 4, 57),
(31, NULL, 8, 40, NULL, 5, 57),
(32, 26, NULL, 35, NULL, 7, NULL),
(32, 26, NULL, 37, NULL, 8, NULL),
(32, 26, NULL, 39, NULL, 9, NULL),
(33, 26, NULL, 35, NULL, 10, NULL),
(33, 26, NULL, 37, NULL, 11, NULL),
(33, 26, NULL, 39, NULL, 12, NULL),
(34, 26, NULL, 35, NULL, 13, NULL),
(34, 26, NULL, 39, NULL, 14, NULL),
(34, 26, NULL, 39, NULL, 15, NULL),
(35, 26, NULL, 35, NULL, 16, NULL),
(35, 26, NULL, 35, NULL, 17, NULL),
(35, 26, NULL, 33, NULL, 18, NULL),
(35, 26, NULL, 35, NULL, 19, NULL),
(35, 26, NULL, 35, NULL, 20, NULL),
(35, 26, NULL, 33, NULL, 21, NULL),
(35, NULL, 6, 40, NULL, 27, NULL),
(35, NULL, 6, 40, NULL, 28, NULL),
(35, NULL, 6, 40, NULL, 29, NULL),
(35, NULL, 6, 9, NULL, 30, NULL),
(36, 26, NULL, 80, NULL, 31, NULL),
(36, 26, NULL, 9, NULL, 32, NULL),
(36, 26, NULL, 9, NULL, 33, NULL),
(36, NULL, 6, 30, NULL, 41, NULL),
(36, NULL, 6, 35, NULL, 42, NULL),
(36, NULL, 6, 37, NULL, 43, NULL),
(37, 26, NULL, 80, NULL, 0, NULL),
(37, 26, NULL, 14, NULL, 1, NULL),
(37, 26, NULL, 16, NULL, 1, NULL),
(37, 26, NULL, 16, NULL, 1, NULL),
(37, NULL, 6, 30, NULL, 4, NULL),
(37, NULL, 6, 35, NULL, 5, NULL),
(37, NULL, 6, 37, NULL, 5, NULL),
(31, 20, NULL, NULL, 'algo', 0, NULL),
(31, 20, NULL, 4, NULL, 0, NULL),
(31, 20, NULL, 11, NULL, 0, NULL),
(31, NULL, 10, NULL, 'algo', 0, NULL),
(31, NULL, 10, 4, NULL, 0, NULL),
(31, NULL, 10, 11, NULL, 0, NULL),
(38, 26, NULL, NULL, NULL, 0, NULL),
(38, 26, NULL, 16, NULL, 0, NULL),
(38, 26, NULL, NULL, 'comentario 4queso', 1, NULL),
(39, 26, NULL, NULL, 'coment 1', 0, NULL),
(39, 26, NULL, 80, NULL, 0, NULL),
(39, 26, NULL, 16, NULL, 0, NULL),
(40, 26, NULL, NULL, 'comentario 1 para 4queso.', 0, NULL),
(40, 29, NULL, NULL, 'Comentario 1 para gourmet', 1, NULL),
(40, 29, NULL, 80, NULL, 1, NULL),
(40, 29, NULL, 16, NULL, 1, NULL),
(40, 29, NULL, 19, NULL, 2, NULL),
(40, 29, NULL, 19, NULL, 2, NULL),
(40, NULL, 7, NULL, 'Comentario 1 bacon cheese', 3, NULL),
(40, NULL, 7, 21, NULL, 3, NULL),
(42, NULL, 5, NULL, 'son alitas de pollo', 0, NULL),
(42, NULL, 5, 80, NULL, 0, NULL),
(42, 29, NULL, NULL, 'pizza 1 gourmet', 1, NULL),
(42, 29, NULL, 14, NULL, 1, NULL),
(42, 29, NULL, 16, NULL, 1, NULL),
(42, 29, NULL, NULL, 'pizza2 gourmet ', 2, NULL),
(42, 29, NULL, 19, NULL, 2, NULL),
(42, 29, NULL, 20, NULL, 2, NULL),
(42, 29, NULL, 21, NULL, 2, NULL),
(42, 31, NULL, NULL, 'menu del dia: rustica ', 3, 66),
(42, 31, NULL, 14, NULL, 3, 66),
(42, 31, NULL, 14, NULL, 3, 66),
(42, 31, NULL, 14, NULL, 3, 66),
(42, 31, NULL, 35, NULL, 3, 66),
(42, NULL, 10, NULL, 'menu del dia: ensalada caprece', 4, 66),
(42, NULL, 10, 30, NULL, 4, 66),
(42, NULL, 10, 30, NULL, 4, 66),
(42, NULL, 10, 32, NULL, 4, 66),
(42, NULL, 10, 32, NULL, 4, 66),
(42, NULL, 10, 32, NULL, 4, 66),
(52, NULL, 5, NULL, 'MUCHA SALSA', 3, 57),
(52, NULL, 5, 60, NULL, 3, 57),
(53, 29, NULL, NULL, 'pizza 1 gourmet', 4, NULL),
(53, 29, NULL, 14, NULL, 4, NULL),
(53, 29, NULL, 80, NULL, 4, NULL),
(53, NULL, 6, NULL, 'entrante aros de cebolla', 5, NULL),
(53, NULL, 6, 80, NULL, 5, NULL),
(57, 28, NULL, 11, NULL, 0, NULL),
(57, 28, NULL, 14, NULL, 0, NULL),
(57, 28, NULL, 80, NULL, 0, NULL),
(57, 28, NULL, 17, NULL, 0, NULL),
(57, 28, NULL, 17, NULL, 0, NULL),
(57, 28, NULL, 30, NULL, 0, NULL),
(59, 36, NULL, NULL, 'Cena para dos 1 deliciosa aceitunas negras, ajo', 0, 71),
(59, 36, NULL, 11, NULL, 0, 71),
(59, 36, NULL, 16, NULL, 0, 71),
(59, 36, NULL, NULL, 'cena para dos 2 deliciosa atun, berenjena', 1, 71),
(59, 36, NULL, 19, NULL, 1, 71),
(59, 36, NULL, 21, NULL, 1, 71),
(59, 36, NULL, NULL, 'pizza deliciosa alcachofa', 2, NULL),
(59, 36, NULL, 18, NULL, 2, NULL),
(59, 20, NULL, NULL, 'pizza campesina aguacate', 3, 57),
(59, 20, NULL, 80, NULL, 3, 57),
(60, 29, NULL, NULL, 'cena para dos 1 gourmet bacon', 0, 71),
(60, 29, NULL, 20, NULL, 0, 71),
(60, 36, NULL, NULL, 'cena para dos 1 deliciosa berenjena', 1, 71),
(60, 36, NULL, 21, NULL, 1, 71),
(60, NULL, 7, NULL, 'cena para dos 1 bacon cheese fries cebolla', 2, 71),
(60, NULL, 7, 30, NULL, 2, 71),
(60, 29, NULL, NULL, 'cena para dos 2 gourmet ajo', 3, 71),
(60, 29, NULL, 16, NULL, 3, 71),
(60, 36, NULL, NULL, 'cena para dos 2 deliciosa albahaca', 4, 71),
(60, 36, NULL, 17, NULL, 4, 71),
(60, NULL, 7, NULL, 'cena para dos 2 baconCheese alcachofa', 5, 71),
(60, NULL, 7, 18, NULL, 5, 71),
(60, 36, NULL, NULL, 'deliciosa 1 aceite-vinagre', 6, NULL),
(60, 36, NULL, 9, NULL, 6, NULL),
(60, 36, NULL, NULL, 'deliciosa 2 aceitunas-negras', 7, NULL),
(60, 36, NULL, 11, NULL, 7, NULL),
(60, 20, NULL, NULL, 'love chicken1 campesina cilantro', 8, 57),
(60, 20, NULL, 32, NULL, 8, 57),
(60, NULL, 5, NULL, 'love chicken alitas de pollo gambas', 9, 57),
(60, NULL, 5, 33, NULL, 9, 57),
(60, NULL, 8, NULL, 'love chicken fingers guacamole', 10, 57),
(60, NULL, 8, 35, NULL, 10, 57),
(61, 33, NULL, NULL, 'nunca falla1 proscuito aceiteVinagre', 0, 73),
(61, 33, NULL, 9, NULL, 0, 73),
(61, 35, NULL, NULL, 'nunca falla 1 peperoni aceitunas negras', 1, 73),
(61, 35, NULL, 11, NULL, 1, 73),
(61, 33, NULL, NULL, 'nunca falla 2 proscuito alcachofa', 2, 73),
(61, 33, NULL, 18, NULL, 2, 73),
(61, 35, NULL, NULL, 'nunca falla 2 peperoni aguacate', 3, 73),
(61, 35, NULL, 80, NULL, 3, 73),
(61, 33, NULL, NULL, 'nunca falla 3 proscuito ajo', 4, 73),
(61, 33, NULL, 16, NULL, 4, 73),
(61, 35, NULL, NULL, 'nunca falla 3 peperoni albahaca', 5, 73),
(61, 35, NULL, 17, NULL, 5, 73),
(61, NULL, 9, NULL, 'e griega 1 atun', 6, NULL),
(61, NULL, 9, 19, NULL, 6, NULL),
(61, NULL, 9, NULL, 'e griega 2 bacon', 7, NULL),
(61, NULL, 9, 20, NULL, 7, NULL),
(61, NULL, 9, NULL, 'e griega 3 berenjena', 8, NULL),
(61, NULL, 9, 21, NULL, 8, NULL),
(62, 33, NULL, NULL, 'nunca falla 2 proscuito ajo', 0, 73),
(62, 33, NULL, 16, NULL, 0, 73),
(62, 35, NULL, NULL, 'nunca falla 3 peperoni cebolla', 1, 73),
(62, 35, NULL, 30, NULL, 1, 73),
(65, NULL, 9, 9, NULL, 0, 74),
(65, NULL, 17, 11, NULL, 1, 74),
(65, 28, NULL, 14, NULL, 2, 75),
(65, 31, NULL, 80, NULL, 3, 75),
(67, 28, NULL, 80, NULL, 0, NULL),
(67, 28, NULL, 16, NULL, 0, NULL),
(68, 29, NULL, NULL, 'cena para dos 1 gourmet aceitunas negras', 0, 71),
(68, 29, NULL, 11, NULL, 0, 71),
(68, 36, NULL, NULL, 'cena para dos 1deliciosa aceitunas verdes', 1, 71),
(68, 36, NULL, 14, NULL, 1, 71),
(68, NULL, 7, NULL, 'cena para dos 1 bacon cheese aguacate', 2, 71),
(68, NULL, 7, 80, NULL, 2, 71),
(68, 29, NULL, NULL, 'cena para dos 2 gourmet ajo', 3, 71),
(68, 29, NULL, 16, NULL, 3, 71),
(68, 36, NULL, NULL, 'cena para dos 2 deliciosa albahaca', 4, 71),
(68, 36, NULL, 17, NULL, 4, 71),
(68, NULL, 7, NULL, 'cena para dos 2 bacon cheese alchachofa', 5, 71),
(68, NULL, 7, 18, NULL, 5, 71),
(68, 20, NULL, NULL, 'love chicken 1 campesina  bacon', 6, 57),
(68, 20, NULL, 20, NULL, 6, 57),
(68, NULL, 5, NULL, 'love chicken 1 alitas berenjena', 7, 57),
(68, NULL, 5, 21, NULL, 7, 57),
(68, NULL, 8, NULL, 'love chicken 1 fingers cebolla', 8, 57),
(68, NULL, 8, 30, NULL, 8, 57),
(68, NULL, 5, NULL, 'love chicken 2 alitas guacamole', 9, 57),
(68, NULL, 5, 35, NULL, 9, 57),
(79, 30, NULL, NULL, 'vale???', 0, NULL),
(79, 30, NULL, 80, NULL, 0, NULL),
(79, 30, NULL, 16, NULL, 0, NULL),
(80, NULL, 6, 6, NULL, 0, NULL),
(82, 29, NULL, NULL, 'que todo este fresco', 0, NULL),
(82, 29, NULL, 80, NULL, 0, NULL),
(83, 20, NULL, 80, NULL, 0, NULL),
(83, 20, NULL, 21, NULL, 0, NULL),
(92, 29, NULL, 80, NULL, 0, 71);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `oferta`
--

CREATE TABLE `oferta` (
  `ID_OFERTA` int(4) NOT NULL,
  `NOMBRE` varchar(30) NOT NULL,
  `FECHA_FIN` date DEFAULT NULL,
  `IMAGEN` varchar(100) DEFAULT NULL,
  `DESCRIPCION` text DEFAULT NULL,
  `PRECIO` float(4,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `oferta`
--

INSERT INTO `oferta` (`ID_OFERTA`, `NOMBRE`, `FECHA_FIN`, `IMAGEN`, `DESCRIPCION`, `PRECIO`) VALUES
(57, 'I ♡ Chicken', '2022-11-24', 'http://127.0.0.1:8081/oferta/I_love_chicken.png', 'Nuestros productos especiales elaborados con gallinas de alta calidad.', 16.50),
(64, 'Solo Entrante', '2022-06-05', 'http://127.0.0.1:8081/oferta/solo_entrante.png', 'Si solo queréis picotear...', 18.00),
(66, 'Menú del Dia', '1970-01-01', 'http://127.0.0.1:8081/oferta/menu_del_dia.png', 'Valido todos los días solo hasta las 17:00.', 10.50),
(71, 'Cena para Dos', '2022-10-22', 'http://127.0.0.1:8081/oferta/completo_para_dos.png', '¡Una oferta especial para las parejas que quieren pasarlo a lo GRANDE!', 20.00),
(73, 'Nunca Falla', '1970-01-01', 'http://127.0.0.1:8081/oferta/nunca_falla.png', 'Para los amantes de simplicidad.', 12.00),
(74, 'Saturday Night', '1970-01-01', 'http://127.0.0.1:8081/oferta/saturday_night.png', 'Esta promoción es para siempre.', 9.45),
(75, '2 X UNO', '2022-05-15', 'http://127.0.0.1:8081/oferta/dos_por_uno.png', 'No dejes escapar esta oportunidad', 8.45);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `oferta_lista`
--

CREATE TABLE `oferta_lista` (
  `OFERTA` int(4) NOT NULL,
  `PIZZA` int(4) DEFAULT NULL,
  `ENTRANTES` int(4) DEFAULT NULL,
  `BEBIDA` int(4) DEFAULT NULL,
  `POSTRES` int(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `oferta_lista`
--

INSERT INTO `oferta_lista` (`OFERTA`, `PIZZA`, `ENTRANTES`, `BEBIDA`, `POSTRES`) VALUES
(57, NULL, 8, NULL, NULL),
(57, NULL, 5, NULL, NULL),
(57, 20, NULL, NULL, NULL),
(64, NULL, 6, NULL, NULL),
(64, NULL, 14, NULL, NULL),
(64, NULL, 5, NULL, NULL),
(64, NULL, 13, NULL, NULL),
(66, NULL, NULL, 35, NULL),
(66, NULL, 10, NULL, NULL),
(66, 31, NULL, NULL, NULL),
(71, NULL, NULL, 31, NULL),
(71, NULL, NULL, 31, NULL),
(71, NULL, 7, NULL, NULL),
(71, 29, NULL, NULL, NULL),
(71, 36, NULL, NULL, NULL),
(73, 35, NULL, NULL, NULL),
(73, 33, NULL, NULL, NULL),
(74, NULL, 9, NULL, NULL),
(74, NULL, NULL, 18, NULL),
(74, NULL, NULL, 18, NULL),
(74, NULL, 17, NULL, NULL),
(75, 31, NULL, NULL, NULL),
(75, 28, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pago`
--

CREATE TABLE `pago` (
  `ID_PAGO` int(10) NOT NULL,
  `COMPRA` int(10) NOT NULL,
  `TARJETA` tinyint(1) DEFAULT NULL,
  `EFECTIVO` tinyint(1) DEFAULT NULL,
  `TOTAL_PAGO` float(6,2) DEFAULT NULL,
  `RECOGIDA` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pago`
--

INSERT INTO `pago` (`ID_PAGO`, `COMPRA`, `TARJETA`, `EFECTIVO`, `TOTAL_PAGO`, `RECOGIDA`) VALUES
(1, 39, 1, 0, 50.00, 0),
(6, 45, 1, 0, 4.95, 0),
(7, 40, 1, 0, 34.25, 0),
(9, 53, 1, 0, 108.05, 0),
(10, 54, 1, 0, 4.50, 0),
(11, 55, 0, 1, 15.00, 0),
(12, 58, 0, 1, 1.25, 1),
(13, 65, 0, 1, 20.05, 1),
(14, 66, 1, 0, 8.45, 0),
(16, 68, 1, 0, 78.35, 0),
(17, 71, 1, 0, 61.10, 0),
(18, 72, 1, 0, 9.25, 0),
(19, 73, 0, 1, 1.25, 0),
(20, 74, 0, 1, 7.50, 1),
(21, 75, 1, 0, 8.45, 0),
(22, 76, 1, 0, 1.00, 0),
(23, 77, 0, 1, 1.00, 1),
(24, 78, 0, 1, 9.90, 1),
(25, 79, 0, 1, 8.80, 0),
(26, 80, 1, 0, 5.50, 1),
(27, 81, 1, 0, 8.45, 0),
(28, 82, 0, 1, 9.90, 1),
(29, 83, 1, 0, 9.50, 1),
(30, 84, 1, 0, 8.45, 0),
(31, 85, 1, 0, 9.70, 0),
(32, 86, 1, 0, 1.25, 0),
(33, 87, 1, 0, 8.45, 0),
(34, 88, 1, 0, 9.50, 1),
(35, 89, 1, 0, 0.95, 0),
(36, 90, 1, 0, 7.50, 0),
(37, 91, 1, 0, 1.25, 0),
(38, 92, 1, 0, 29.10, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pizza`
--

CREATE TABLE `pizza` (
  `ID_PIZZA` int(4) NOT NULL,
  `NOMBRE` varchar(30) NOT NULL,
  `PRECIO` float(4,2) DEFAULT 0.00,
  `TAMAÑO` varchar(20) NOT NULL,
  `DESCRIPCION` text DEFAULT NULL,
  `IMAGEN` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pizza`
--

INSERT INTO `pizza` (`ID_PIZZA`, `NOMBRE`, `PRECIO`, `TAMAÑO`, `DESCRIPCION`, `IMAGEN`) VALUES
(20, 'Campesina', 8.45, 'Mediana', '¡Un sabor rustico! ', 'http://127.0.0.1:8081/pizza/pizza_campesina.png'),
(21, 'Picante', 8.35, 'Mediana', 'Pizza picante para los que gustan sabores fuertes.', 'http://127.0.0.1:8081/pizza/pizza_picante.jpg'),
(26, '4 Queso', 7.50, 'Mediana', '¡Para los amantes de queso!', 'http://127.0.0.1:8081/pizza/pizza_4_queso.png'),
(27, 'Especial', 8.95, 'Mediana', 'Una pizza realmente especial.', 'http://127.0.0.1:8081/pizza/pizza_aceituna_chorrizo.png'),
(28, 'Barbacoa', 8.45, 'Mediana', 'Una pizza exquisita con sabor autentico a la barbacoa.', 'http://127.0.0.1:8081/pizza/pizza_barbacoa.png'),
(29, 'Gourmet', 9.25, 'Mediana', '¡Una pizza de lujo!', 'http://127.0.0.1:8081/pizza/pizza_gourmet.png'),
(30, 'Marinera', 7.95, 'Mediana', 'Deliciosa pizza de atún', 'http://127.0.0.1:8081/pizza/pizza_marinera.jpg'),
(31, 'Rustica', 8.50, 'Mediana', '¡Una pizza rustica!', 'http://127.0.0.1:8081/pizza/pizza_rustica.png'),
(32, 'Tradicional', 7.75, 'Mediana', 'La pizza de siempre...', 'http://127.0.0.1:8081/pizza/pizza_tradicional.png'),
(33, 'Proscuito', 7.65, 'Mediana', 'Una pizza simple pero deliciosa.', 'http://127.0.0.1:8081/pizza/Pizza-Prosciutto.jpeg'),
(35, 'Peperoni', 7.55, 'Mediana', 'Una pizza preferida por la mayoría.', 'http://127.0.0.1:8081/pizza/pizza_peperoni.png'),
(36, 'Deliciosa', 7.95, 'Mediana', '¡Una pizza realmente deliciosa!', 'http://127.0.0.1:8081/pizza/pizza_deliciosa.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pizza_ingrediente`
--

CREATE TABLE `pizza_ingrediente` (
  `PIZZA` int(4) NOT NULL,
  `INGREDIENTE` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pizza_ingrediente`
--

INSERT INTO `pizza_ingrediente` (`PIZZA`, `INGREDIENTE`) VALUES
(20, 35),
(20, 39),
(20, 54),
(20, 56),
(20, 60),
(20, 20),
(20, 66),
(20, 72),
(20, 74),
(20, 75),
(20, 113),
(21, 35),
(21, 103),
(21, 61),
(21, 63),
(21, 20),
(21, 66),
(21, 74),
(21, 75),
(21, 113),
(26, 20),
(26, 77),
(26, 66),
(26, 74),
(26, 75),
(26, 76),
(26, 78),
(26, 113),
(27, 29),
(27, 35),
(27, 36),
(27, 39),
(27, 54),
(27, 103),
(27, 60),
(27, 63),
(27, 20),
(27, 69),
(27, 74),
(27, 75),
(27, 113),
(28, 39),
(28, 63),
(28, 20),
(28, 66),
(28, 74),
(28, 75),
(28, 84),
(28, 113),
(29, 35),
(29, 39),
(29, 40),
(29, 63),
(29, 64),
(29, 20),
(29, 77),
(29, 66),
(29, 70),
(29, 68),
(29, 69),
(29, 72),
(29, 74),
(29, 75),
(29, 113),
(30, 29),
(30, 33),
(30, 38),
(30, 54),
(30, 57),
(30, 20),
(30, 74),
(30, 75),
(30, 113),
(31, 29),
(31, 37),
(31, 54),
(31, 55),
(31, 103),
(31, 20),
(31, 66),
(31, 72),
(31, 74),
(31, 75),
(31, 113),
(32, 29),
(32, 54),
(32, 63),
(32, 20),
(32, 66),
(32, 68),
(32, 74),
(32, 75),
(32, 113),
(33, 63),
(33, 20),
(33, 66),
(33, 74),
(33, 75),
(33, 113),
(35, 103),
(35, 20),
(35, 66),
(35, 74),
(35, 75),
(35, 113),
(36, 27),
(36, 39),
(36, 40),
(36, 54),
(36, 55),
(36, 103),
(36, 20),
(36, 66),
(36, 69),
(36, 74),
(36, 75),
(36, 76),
(36, 113);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `postres`
--

CREATE TABLE `postres` (
  `ID_POSTRES` int(4) NOT NULL,
  `NOMBRE` varchar(40) NOT NULL,
  `PRECIO` float(4,2) DEFAULT 0.00,
  `TAMAÑO` varchar(20) NOT NULL,
  `DESCRIPCION` text DEFAULT NULL,
  `IMAGEN` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `postres`
--

INSERT INTO `postres` (`ID_POSTRES`, `NOMBRE`, `PRECIO`, `TAMAÑO`, `DESCRIPCION`, `IMAGEN`) VALUES
(2, 'BJ Half Baked', 4.95, '465 ml', 'EL helado Ben & Jarry´s half baked', 'http://127.0.0.1:8081/postres/helado_ben_jerry_half-baked_465ml.jpg'),
(3, 'BJ Chunky Monkey', 4.95, '465 ml', 'El helado Ben&Jarry´s Chunky Monkey.', 'http://127.0.0.1:8081/postres/helado_ben_jerrys_chunky-monkey_465ml.jpg'),
(4, 'BJ Fairly Nuts', 4.95, '465 ml', 'El helado Ben&Jerry´s Fairly Nuts.', 'http://127.0.0.1:8081/postres/helado_ben_jerrys_fairly_nuts_465ml.jpg'),
(5, 'BJ Cherry Garcia', 4.95, '465 ml', 'El helado Ben&Jerry´s Cherry Garcia.', 'http://127.0.0.1:8081/postres/helado_bj_cherry_garcia_465ml.jpg'),
(6, 'BJ Chocolate Fudge Brownie', 4.95, '465 ml', 'El helado Ben&Jerry´s Chocolate Fudge Brownie.', 'http://127.0.0.1:8081/postres/helado_bj_chocolate_fudge_brownie_465ml.jpg'),
(7, 'BJ Cookie Dough', 4.95, '465 ml', 'El helado Ben&Jerry´s Cookie Dough.', 'http://127.0.0.1:8081/postres/helado_bj_cookie_dough_465ml.jpg'),
(8, 'BJ Hazel-Nuttin but Chocolate', 4.95, '465 ml', 'El helado Ben&Jarry´s Hazel-Nuttin but Chocolate.', 'http://127.0.0.1:8081/postres/helado_bj_sundae_465ml.jpg'),
(10, 'Magnum Almendras Chocolate Blanco', 1.00, '90 ml', 'El helado Magnum Almendras Chocolate Blanco.', 'http://127.0.0.1:8081/postres/magnum_chocolate_blanco_almentras.png'),
(11, 'Magnum Ruby', 1.00, '90 ml', 'El helado Magnum Ruby.', 'http://127.0.0.1:8081/postres/magnum_collection_ruby.png'),
(12, 'Magnum Cookie', 1.00, '90 ml', 'El helado Magnum Cookie.', 'http://127.0.0.1:8081/postres/magnum_cookie.jpeg'),
(13, 'Magnum Doble Caramelo', 1.00, '90 ml', 'El helado Magnum Doble Caramelo.', 'http://127.0.0.1:8081/postres/magnum_doble_caramelo.jpg'),
(14, 'Magnum Doble Chocolate', 1.00, '90 ml', 'El helado Magnum Doble Chocolate.', 'http://127.0.0.1:8081/postres/magnum_doble_chocolate.jpg'),
(15, 'Magnum Almendras', 1.00, '90 ml', 'El helado Magnum Almendras.', 'http://127.0.0.1:8081/postres/magnum-almendras.jpg');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `bebida`
--
ALTER TABLE `bebida`
  ADD PRIMARY KEY (`ID_BEBIDA`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`ID_CLIENTE`);

--
-- Indices de la tabla `compra`
--
ALTER TABLE `compra`
  ADD PRIMARY KEY (`ID_COMPRA`),
  ADD KEY `COD_COMPRA_CLIENTE_FK` (`CLIENTE`);

--
-- Indices de la tabla `compra_lista`
--
ALTER TABLE `compra_lista`
  ADD KEY `COD_COMPRA_LISTA_COMPRA_FK` (`COMPRA`),
  ADD KEY `COD_COMPRA_LISTA_OFERTA_FK` (`OFERTA`),
  ADD KEY `COD_COMPRA_LISTA_PIZZA_FK` (`PIZZA`),
  ADD KEY `COD_COMPRA_LISTA_BEBIDA_FK` (`BEBIDA`),
  ADD KEY `COD_COMPRA_LISTA_ENTRANTES_FK` (`ENTRANTES`),
  ADD KEY `COD_COMPRA_LISTA_POSTRES_FK` (`POSTRES`);

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`ID_EMPLEADO`);

--
-- Indices de la tabla `entrantes`
--
ALTER TABLE `entrantes`
  ADD PRIMARY KEY (`ID_ENTRANTES`);

--
-- Indices de la tabla `entrantes_ingrediente`
--
ALTER TABLE `entrantes_ingrediente`
  ADD KEY `COD_ENTRANTE_INGREDIENTE_FK` (`ENTRANTES`),
  ADD KEY `COD_INGREDIENTE_ENTRANTE_FK` (`INGREDIENTE`);

--
-- Indices de la tabla `extras`
--
ALTER TABLE `extras`
  ADD PRIMARY KEY (`ID_EXTRA`),
  ADD KEY `COD_INGREDIENTES_EXTRAS_FK` (`INGREDIENTE`);

--
-- Indices de la tabla `ingredientes`
--
ALTER TABLE `ingredientes`
  ADD PRIMARY KEY (`ID_INGREDIENTE`);

--
-- Indices de la tabla `modificado`
--
ALTER TABLE `modificado`
  ADD KEY `COD_MOD_COMPRA_FK` (`COMPRA`),
  ADD KEY `COD_MOD_PIZZA_FK` (`PIZZA`),
  ADD KEY `COD_MOD_ENTRANTES_FK` (`ENTRANTES`),
  ADD KEY `COD_MOD_EXTRAS_FK` (`EXTRAS`),
  ADD KEY `COD_MOD_OFERTA_FK` (`OFERTA`);

--
-- Indices de la tabla `oferta`
--
ALTER TABLE `oferta`
  ADD PRIMARY KEY (`ID_OFERTA`);

--
-- Indices de la tabla `oferta_lista`
--
ALTER TABLE `oferta_lista`
  ADD KEY `COD_OFERTA_LISTA_BEBIDA_FK` (`BEBIDA`),
  ADD KEY `COD_OFERTA_LISTA_ENTRANTES_FK` (`ENTRANTES`),
  ADD KEY `COD_OFERTA_LISTA_OFERTA_FK` (`OFERTA`),
  ADD KEY `COD_OFERTA_LISTA_PIZZA_FK` (`PIZZA`),
  ADD KEY `COD_OFERTA_LISTA_POSTRES_FK` (`POSTRES`);

--
-- Indices de la tabla `pago`
--
ALTER TABLE `pago`
  ADD PRIMARY KEY (`ID_PAGO`),
  ADD KEY `COD_PAGO_COMPRA_FK` (`COMPRA`);

--
-- Indices de la tabla `pizza`
--
ALTER TABLE `pizza`
  ADD PRIMARY KEY (`ID_PIZZA`);

--
-- Indices de la tabla `pizza_ingrediente`
--
ALTER TABLE `pizza_ingrediente`
  ADD KEY `COD_PIZZA_INGREDIENTE_FK` (`PIZZA`),
  ADD KEY `COD_INGREDIENTE_PIZZA_FK` (`INGREDIENTE`);

--
-- Indices de la tabla `postres`
--
ALTER TABLE `postres`
  ADD PRIMARY KEY (`ID_POSTRES`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `bebida`
--
ALTER TABLE `bebida`
  MODIFY `ID_BEBIDA` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `ID_CLIENTE` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `compra`
--
ALTER TABLE `compra`
  MODIFY `ID_COMPRA` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `ID_EMPLEADO` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT de la tabla `entrantes`
--
ALTER TABLE `entrantes`
  MODIFY `ID_ENTRANTES` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `extras`
--
ALTER TABLE `extras`
  MODIFY `ID_EXTRA` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT de la tabla `ingredientes`
--
ALTER TABLE `ingredientes`
  MODIFY `ID_INGREDIENTE` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=128;

--
-- AUTO_INCREMENT de la tabla `oferta`
--
ALTER TABLE `oferta`
  MODIFY `ID_OFERTA` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT de la tabla `pago`
--
ALTER TABLE `pago`
  MODIFY `ID_PAGO` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT de la tabla `pizza`
--
ALTER TABLE `pizza`
  MODIFY `ID_PIZZA` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `postres`
--
ALTER TABLE `postres`
  MODIFY `ID_POSTRES` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `compra`
--
ALTER TABLE `compra`
  ADD CONSTRAINT `COD_COMPRA_CLIENTE_FK` FOREIGN KEY (`CLIENTE`) REFERENCES `cliente` (`ID_CLIENTE`) ON DELETE CASCADE;

--
-- Filtros para la tabla `entrantes_ingrediente`
--
ALTER TABLE `entrantes_ingrediente`
  ADD CONSTRAINT `COD_ENTRANTE_INGREDIENTE_FK` FOREIGN KEY (`ENTRANTES`) REFERENCES `entrantes` (`ID_ENTRANTES`) ON DELETE CASCADE,
  ADD CONSTRAINT `COD_INGREDIENTE_ENTRANTE_FK` FOREIGN KEY (`INGREDIENTE`) REFERENCES `ingredientes` (`ID_INGREDIENTE`) ON DELETE CASCADE;

--
-- Filtros para la tabla `extras`
--
ALTER TABLE `extras`
  ADD CONSTRAINT `COD_INGREDIENTES_EXTRAS_FK` FOREIGN KEY (`INGREDIENTE`) REFERENCES `ingredientes` (`ID_INGREDIENTE`) ON DELETE CASCADE;

--
-- Filtros para la tabla `modificado`
--
ALTER TABLE `modificado`
  ADD CONSTRAINT `COD_MOD_COMPRA_FK` FOREIGN KEY (`COMPRA`) REFERENCES `compra` (`ID_COMPRA`) ON DELETE CASCADE,
  ADD CONSTRAINT `COD_MOD_ENTRANTES_FK` FOREIGN KEY (`ENTRANTES`) REFERENCES `entrantes` (`ID_ENTRANTES`) ON DELETE CASCADE,
  ADD CONSTRAINT `COD_MOD_EXTRAS_FK` FOREIGN KEY (`EXTRAS`) REFERENCES `extras` (`ID_EXTRA`) ON DELETE CASCADE,
  ADD CONSTRAINT `COD_MOD_OFERTA_FK` FOREIGN KEY (`OFERTA`) REFERENCES `oferta` (`ID_OFERTA`) ON DELETE CASCADE,
  ADD CONSTRAINT `COD_MOD_PIZZA_FK` FOREIGN KEY (`PIZZA`) REFERENCES `pizza` (`ID_PIZZA`) ON DELETE CASCADE;

--
-- Filtros para la tabla `oferta_lista`
--
ALTER TABLE `oferta_lista`
  ADD CONSTRAINT `COD_OFERTA_LISTA_BEBIDA_FK` FOREIGN KEY (`BEBIDA`) REFERENCES `bebida` (`ID_BEBIDA`) ON DELETE CASCADE,
  ADD CONSTRAINT `COD_OFERTA_LISTA_ENTRANTES_FK` FOREIGN KEY (`ENTRANTES`) REFERENCES `entrantes` (`ID_ENTRANTES`) ON DELETE CASCADE,
  ADD CONSTRAINT `COD_OFERTA_LISTA_OFERTA_FK` FOREIGN KEY (`OFERTA`) REFERENCES `oferta` (`ID_OFERTA`) ON DELETE CASCADE,
  ADD CONSTRAINT `COD_OFERTA_LISTA_PIZZA_FK` FOREIGN KEY (`PIZZA`) REFERENCES `pizza` (`ID_PIZZA`) ON DELETE CASCADE,
  ADD CONSTRAINT `COD_OFERTA_LISTA_POSTRES_FK` FOREIGN KEY (`POSTRES`) REFERENCES `postres` (`ID_POSTRES`) ON DELETE CASCADE;

--
-- Filtros para la tabla `pago`
--
ALTER TABLE `pago`
  ADD CONSTRAINT `COD_PAGO_COMPRA_FK` FOREIGN KEY (`COMPRA`) REFERENCES `compra` (`ID_COMPRA`);

--
-- Filtros para la tabla `pizza_ingrediente`
--
ALTER TABLE `pizza_ingrediente`
  ADD CONSTRAINT `COD_INGREDIENTE_PIZZA_FK` FOREIGN KEY (`INGREDIENTE`) REFERENCES `ingredientes` (`ID_INGREDIENTE`) ON DELETE CASCADE,
  ADD CONSTRAINT `COD_PIZZA_INGREDIENTE_FK` FOREIGN KEY (`PIZZA`) REFERENCES `pizza` (`ID_PIZZA`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
