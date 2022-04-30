-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-04-2022 a las 01:59:06
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
  `NOMBRE` varchar(20) NOT NULL,
  `PRECIO` float(4,2) DEFAULT 0.00,
  `DESCRIPCION` text DEFAULT NULL,
  `TAMAÑO` varchar(20) NOT NULL,
  `IMAGEN` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `bebida`
--

INSERT INTO `bebida` (`ID_BEBIDA`, `NOMBRE`, `PRECIO`, `DESCRIPCION`, `TAMAÑO`, `IMAGEN`) VALUES
(1, 'coca-cola', 1.25, 'Bebida refrescante', '500 ml', 'https://www.cocacola.es/content/dam/one/es/es2/coca-cola/products/productos/dic-2021/CC_Origal.jpg'),
(2, 'FANTA', 3.00, 'ES LA HOSTIA', 'BIG', 'https://cdn.icon-icons.com/icons2/852/PNG/512/IconoAlergenoGluten-Gluten_icon-icons.com_67600.png'),
(3, 'coca-cola', 1.25, 'Bebida refrescante', '500 ml', 'https://www.cocacola.es/content/dam/one/es/es2/coca-cola/products/productos/dic-2021/CC_Origal.jpg'),
(4, 'margarita', 3.00, 'ES LA HOSTIA', 'BIG', 'https://cdn.icon-icons.com/icons2/852/PNG/512/IconoAlergenoGluten-Gluten_icon-icons.com_67600.png'),
(5, 'margarita', 3.00, 'ES LA HOSTIA', 'BIG', 'https://cdn.icon-icons.com/icons2/852/PNG/512/IconoAlergenoGluten-Gluten_icon-icons.com_67600.png'),
(6, 'margarita', 3.00, 'ES LA HOSTIA', 'BIG', 'https://cdn.icon-icons.com/icons2/852/PNG/512/IconoAlergenoGluten-Gluten_icon-icons.com_67600.png'),
(7, 'es un test', 3.00, '', 'etc', 'https://www.ngenespanol.com/wp-content/uploads/2018/08/La-primera-imagen-de-la-historia.jpg');

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
(1, 'test', 'test', '1991-11-02', 666666666, 'Murcia, calle Norte 5', 'dimapetrin91@gmail.com', '1234hola', 'cliente'),
(15, 'testTelefono', 'test', '2022-01-08', 123456789, 'Plaza Bohemia 15, 3C', 'tel@gmail.com', 'Hola1234', 'cliente'),
(16, 'test_todo', '', '2022-01-09', 123456789, 'Murcia', 'test_todo@gmail.com', 'Hola1234', 'cliente'),
(17, 'Dmytro', '', '2022-01-09', 688398382, 'Plaza Bohemia 15, 3C', 'test_usuario@gmail.com', 'Hola1991', 'cliente'),
(18, 'xxx', 'Petrin', '2022-01-06', 688398382, 'Plaza Bohemia 15, 3C', 'test_usuario2@gmail.com', 'Hola1234', 'cliente'),
(19, 'A', 'B', NULL, 688398382, 'Plaza Bohemia 15, 3C', 'imapetrin91@gmail.com', 'aA000000', 'cliente'),
(20, 'A', 'C', NULL, 688398382, 'Plaza Bohemia 15, 3C', 'diapetrin91@gmail.com', 'aA111111', 'cliente'),
(21, 'A', 's', NULL, 688398382, 'Plaza Bohemia 15, 3C', 'dimapetrin91@gmail.co', 'aA111111', 'cliente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compra`
--

CREATE TABLE `compra` (
  `ID_COMPRA` int(10) NOT NULL,
  `FECHA_HORA` datetime DEFAULT current_timestamp(),
  `RECOGIDA` tinyint(1) DEFAULT NULL,
  `CLIENTE` int(10) DEFAULT NULL,
  `DESCRIPCION` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `compra`
--

INSERT INTO `compra` (`ID_COMPRA`, `FECHA_HORA`, `RECOGIDA`, `CLIENTE`, `DESCRIPCION`) VALUES
(1, '2022-03-22 20:31:03', 0, 1, 'sin lechuga'),
(2, '2022-03-22 20:31:55', 1, 1, 'sin lechuga'),
(3, '2022-03-30 21:23:22', NULL, 1, NULL),
(4, '2022-03-31 20:30:15', NULL, 1, NULL),
(5, '2022-04-05 19:52:20', NULL, 1, NULL);

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
(40, 'test', 'nada', '12345678E', 'Cartagena', 'test@gmail.com', '1234Hola', 'empleado', '2022-04-23', NULL, 111222333),
(42, 'Julio', 'César', '12345658G', 'Roma', 'cesar@gmail.com', '1234Hola', 'empleado', '2020-12-01', NULL, 222333888);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entrantes`
--

CREATE TABLE `entrantes` (
  `ID_ENTRANTES` int(4) NOT NULL,
  `NOMBRE` varchar(20) NOT NULL,
  `PRECIO` float(4,2) DEFAULT 0.00,
  `TAMAÑO` varchar(20) NOT NULL,
  `DESCRIPCION` text DEFAULT NULL,
  `IMAGEN` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `entrantes`
--

INSERT INTO `entrantes` (`ID_ENTRANTES`, `NOMBRE`, `PRECIO`, `TAMAÑO`, `DESCRIPCION`, `IMAGEN`) VALUES
(1, 'ENSALADA', 3.00, 'BIG', 'ES LA HOSTIA', 'https://cdn.icon-icons.com/icons2/852/PNG/512/IconoAlergenoGluten-Gluten_icon-icons.com_67600.png'),
(2, 'ensalada', 3.00, 'BIG', 'ES LA HOSTIA', 'https://cdn.icon-icons.com/icons2/852/PNG/512/IconoAlergenoGluten-Gluten_icon-icons.com_67600.png'),
(3, 'ensalada', 3.00, 'BIG', 'ES LA HOSTIA', 'https://cdn.icon-icons.com/icons2/852/PNG/512/IconoAlergenoGluten-Gluten_icon-icons.com_67600.png'),
(4, 'salsa', 5.00, 'big', '', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entrantes_ingrediente`
--

CREATE TABLE `entrantes_ingrediente` (
  `ENTRANTES` int(4) NOT NULL,
  `INGREDIENTE` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(5, 0.50, 'http://127.0.0.1:8081/ingredientes/salsa_barbacoa.jpg', 22),
(6, 0.50, 'http://127.0.0.1:8081/ingredientes/ketchup.jpg', 24),
(9, 0.30, 'http://127.0.0.1:8081/ingredientes/aceite_vinagre.jpg', 27),
(10, 0.30, 'http://127.0.0.1:8081/ingredientes/mayonesa.jpg', 28),
(11, 0.60, 'http://127.0.0.1:8081/ingredientes/aceituna_negra.png', 29),
(14, 0.60, 'http://127.0.0.1:8081/ingredientes/aceitunas_verdes.jpg', 33),
(15, 0.45, 'http://127.0.0.1:8081/ingredientes/aguacate.jpg', 34),
(16, 0.20, 'http://127.0.0.1:8081/ingredientes/ajo.jpg', 35),
(17, 0.25, 'http://127.0.0.1:8081/ingredientes/albahaca.jpg', 36);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ingredientes`
--

CREATE TABLE `ingredientes` (
  `ID_INGREDIENTE` int(4) NOT NULL,
  `NOMBRE` varchar(20) NOT NULL,
  `ALERGENOS` varchar(20) DEFAULT NULL,
  `IMAGEN` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ingredientes`
--

INSERT INTO `ingredientes` (`ID_INGREDIENTE`, `NOMBRE`, `ALERGENOS`, `IMAGEN`) VALUES
(20, 'Masa de Pizza', 'gluten', 'http://127.0.0.1:8081/alergenos/IconoAlergenoGluten-Gluten_icon-icons.com_67600.svg'),
(21, 'Mejillones', 'moluscos', 'http://127.0.0.1:8081/alergenos/IconoAlergenoMoluscos-Mollusks_icon-icons.com_67596.svg'),
(22, 'Salsa barbacoa', 'gluten', 'http://127.0.0.1:8081/alergenos/IconoAlergenoGluten-Gluten_icon-icons.com_67600.svg'),
(23, 'Salsa tomate', '', ''),
(24, 'Ketchup', NULL, NULL),
(27, 'Aceite y Vinagre', '', ''),
(28, 'Mayonesa', NULL, NULL),
(29, 'Aceitunas Negras', '', ''),
(33, 'Aceitunas Verdes', NULL, NULL),
(34, 'aguacate', '', ''),
(35, 'Ajo', NULL, NULL),
(36, 'Albahaca', NULL, NULL);

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
  `NUM_MOD` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `oferta`
--

CREATE TABLE `oferta` (
  `ID_OFERTA` int(4) NOT NULL,
  `NOMBRE` varchar(20) NOT NULL,
  `FECHA_FIN` date DEFAULT NULL,
  `IMAGEN` varchar(100) DEFAULT NULL,
  `DESCRIPCION` text DEFAULT NULL,
  `PRECIO` float(4,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `oferta`
--

INSERT INTO `oferta` (`ID_OFERTA`, `NOMBRE`, `FECHA_FIN`, `IMAGEN`, `DESCRIPCION`, `PRECIO`) VALUES
(1, 'DOS POR UNO', NULL, '', 'NO PIERDA LA OPORTUNIDAD', 2.35),
(2, 'En Pareja', '2022-04-10', '', 'Vente con tu pareja. La oferta valida hasta 10 de abril.', 12.95),
(3, 'En Pareja', '2022-04-10', '', 'Vente con tu pareja. Valido hasta 10 de abril', 16.95),
(31, 'salsa', '2022-03-25', 'lol', 'asfsdf', 2.00),
(32, 'salsa', '2022-03-25', 'lol', 'asfsdf', 2.00),
(33, 'salsa', '2022-03-25', 'lol', 'asfsdf', 2.00),
(34, 'salsa', '2022-03-25', 'lol', 'asfsdf', 2.00),
(35, 'salsa', '2022-03-25', 'lol', 'asfsdf', 2.00),
(36, 'salsa', '2022-03-25', 'lol', 'asfsdf', 2.00),
(37, 'salsa', '2022-03-25', 'lol', 'asfsdf', 2.00),
(38, 'Dos x uno', '2022-09-23', '', 'Tus pizzas favoritas a mejor precio', 13.99),
(39, 'salsa', '2022-03-24', '', 'hello world', 4.00),
(40, 'prueba', '2022-03-31', '', '31/03/2022', 4.65);

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
(1, 1, NULL, NULL, NULL),
(1, 1, NULL, NULL, NULL),
(3, NULL, NULL, NULL, NULL),
(3, NULL, NULL, NULL, NULL),
(3, NULL, NULL, NULL, NULL),
(3, NULL, NULL, NULL, NULL),
(3, NULL, NULL, NULL, NULL),
(3, NULL, NULL, NULL, NULL),
(3, NULL, NULL, NULL, NULL),
(3, NULL, NULL, NULL, NULL),
(3, NULL, NULL, NULL, NULL),
(3, NULL, NULL, NULL, NULL),
(31, NULL, NULL, NULL, NULL),
(32, NULL, 1, NULL, NULL),
(32, NULL, NULL, 1, NULL),
(32, NULL, NULL, NULL, 1),
(32, NULL, NULL, NULL, 1),
(32, NULL, NULL, NULL, 1),
(33, 1, NULL, NULL, NULL),
(33, 1, NULL, NULL, NULL),
(33, NULL, 1, NULL, NULL),
(33, NULL, NULL, 1, NULL),
(34, 1, NULL, NULL, NULL),
(34, 1, NULL, NULL, NULL),
(34, NULL, 1, NULL, NULL),
(34, NULL, NULL, 1, NULL),
(37, NULL, 2, NULL, NULL),
(37, NULL, 2, NULL, NULL),
(37, 1, NULL, NULL, NULL),
(37, NULL, NULL, NULL, 1),
(37, NULL, NULL, 1, NULL),
(37, NULL, NULL, 1, NULL),
(37, NULL, NULL, 1, NULL),
(38, NULL, NULL, 1, NULL),
(38, NULL, NULL, 1, NULL),
(38, 1, NULL, NULL, NULL),
(38, 6, NULL, NULL, NULL),
(40, 7, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pago`
--

CREATE TABLE `pago` (
  `ID_PAGO` int(10) NOT NULL,
  `COMPRA` int(10) NOT NULL,
  `TARJETA` tinyint(1) DEFAULT NULL,
  `EFECTIVO` tinyint(1) DEFAULT NULL,
  `TOTAL_PAGO` float(4,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pizza`
--

CREATE TABLE `pizza` (
  `ID_PIZZA` int(4) NOT NULL,
  `NOMBRE` varchar(20) NOT NULL,
  `PRECIO` float(4,2) DEFAULT 0.00,
  `TAMAÑO` varchar(20) NOT NULL,
  `DESCRIPCION` text DEFAULT NULL,
  `IMAGEN` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pizza`
--

INSERT INTO `pizza` (`ID_PIZZA`, `NOMBRE`, `PRECIO`, `TAMAÑO`, `DESCRIPCION`, `IMAGEN`) VALUES
(1, 'margarita', 3.00, 'BIG', 'ES LA HOSTIA', 'https://cdn.icon-icons.com/icons2/852/PNG/512/IconoAlergenoGluten-Gluten_icon-icons.com_67600.png'),
(2, 'margarita', 3.00, 'BIG', 'ES LA HOSTIA', 'https://cdn.icon-icons.com/icons2/852/PNG/512/IconoAlergenoGluten-Gluten_icon-icons.com_67600.png'),
(3, 'margarita', 3.00, 'BIG', 'ES LA HOSTIA', 'https://cdn.icon-icons.com/icons2/852/PNG/512/IconoAlergenoGluten-Gluten_icon-icons.com_67600.png'),
(4, 'margarita', 3.00, 'BIG', 'ES LA HOSTIA', 'https://cdn.icon-icons.com/icons2/852/PNG/512/IconoAlergenoGluten-Gluten_icon-icons.com_67600.png'),
(5, 'PROSQUIUTO', 3.00, 'BIG', 'ES LA HOSTIA', 'https://cdn.icon-icons.com/icons2/852/PNG/512/IconoAlergenoGluten-Gluten_icon-icons.com_67600.png'),
(6, 'Peperoni', 8.95, 'Mediano', 'Pizza picante', 'https://cdn7.kiwilimon.com/recetaimagen/28087/640x426/th5-640x426-27404.jpg.webp'),
(7, 'California', 2.00, 'kjlñ', 'b,b,bnm', 'b,bm,'),
(8, 'Peperoni', 8.45, 'mediana', 'Una pizza picante.', ''),
(9, 'test tomate', 3.00, 'ES SOLO UN TOMATE', 'TEST', 'http://127.0.0.1:8081/tomate.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pizza_ingrediente`
--

CREATE TABLE `pizza_ingrediente` (
  `PIZZA` int(4) NOT NULL,
  `INGREDIENTE` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `postres`
--

CREATE TABLE `postres` (
  `ID_POSTRES` int(4) NOT NULL,
  `NOMBRE` varchar(20) NOT NULL,
  `PRECIO` float(4,2) DEFAULT 0.00,
  `TAMAÑO` varchar(20) NOT NULL,
  `DESCRIPCION` text DEFAULT NULL,
  `IMAGEN` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `postres`
--

INSERT INTO `postres` (`ID_POSTRES`, `NOMBRE`, `PRECIO`, `TAMAÑO`, `DESCRIPCION`, `IMAGEN`) VALUES
(1, 'helado', 3.00, 'BIG', 'ES LA HOSTIA', 'https://cdn.icon-icons.com/icons2/852/PNG/512/IconoAlergenoGluten-Gluten_icon-icons.com_67600.png');

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
  ADD KEY `COD_MOD_EXTRAS_FK` (`EXTRAS`);

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
  MODIFY `ID_BEBIDA` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `ID_CLIENTE` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `compra`
--
ALTER TABLE `compra`
  MODIFY `ID_COMPRA` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `ID_EMPLEADO` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT de la tabla `entrantes`
--
ALTER TABLE `entrantes`
  MODIFY `ID_ENTRANTES` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `extras`
--
ALTER TABLE `extras`
  MODIFY `ID_EXTRA` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `ingredientes`
--
ALTER TABLE `ingredientes`
  MODIFY `ID_INGREDIENTE` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `oferta`
--
ALTER TABLE `oferta`
  MODIFY `ID_OFERTA` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT de la tabla `pizza`
--
ALTER TABLE `pizza`
  MODIFY `ID_PIZZA` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `postres`
--
ALTER TABLE `postres`
  MODIFY `ID_POSTRES` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `compra`
--
ALTER TABLE `compra`
  ADD CONSTRAINT `COD_COMPRA_CLIENTE_FK` FOREIGN KEY (`CLIENTE`) REFERENCES `cliente` (`ID_CLIENTE`);

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
