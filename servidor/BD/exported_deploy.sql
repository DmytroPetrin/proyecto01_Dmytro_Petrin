-- public.bebida definition

-- Drop table

-- DROP TABLE public.bebida;

CREATE TABLE public.bebida (
	"ID_BEBIDA" numeric(4) DEFAULT nextval('bebida_id_bebida_seq'::regclass) NOT NULL,
	"NOMBRE" varchar(30) NOT NULL,
	"PRECIO" numeric(4, 2) DEFAULT 0.00 NULL,
	"DESCRIPCION" text NULL,
	"TAMAÑO" varchar(20) NOT NULL,
	"IMAGEN" varchar(300) DEFAULT NULL::character varying NULL,
	CONSTRAINT bebida_pkey PRIMARY KEY ("ID_BEBIDA")
);


-- public.cliente definition

-- Drop table

-- DROP TABLE public.cliente;

CREATE TABLE public.cliente (
	"ID_CLIENTE" numeric(10) DEFAULT nextval('cliente_id_cliente_seq'::regclass) NOT NULL,
	"NOMBRE" varchar(40) NOT NULL,
	"APELLIDO" varchar(40) DEFAULT NULL::character varying NULL,
	"FECHA_NACIMIENTO" date NULL,
	"TELEFONO" numeric(9) NOT NULL,
	"DIRECCION" varchar(100) NOT NULL,
	"EMAIL" varchar(40) NOT NULL,
	"CONTRASEÑA" varchar(40) NOT NULL,
	"ROL" varchar(40) DEFAULT 'cliente'::character varying NOT NULL,
	CONSTRAINT cliente_pkey PRIMARY KEY ("ID_CLIENTE")
);


-- public.empleados definition

-- Drop table

-- DROP TABLE public.empleados;

CREATE TABLE public.empleados (
	"ID_EMPLEADO" numeric(4) DEFAULT nextval('empleados_id_empleados_seq'::regclass) NOT NULL,
	"NOMBRE" varchar(40) NOT NULL,
	"APELLIDO" varchar(40) NOT NULL,
	"DNI" varchar(9) NOT NULL,
	"DIRECCION" varchar(40) NOT NULL,
	"EMAIL" varchar(40) NOT NULL,
	"CONTRASEÑA" varchar(40) NOT NULL,
	"ROL" varchar(40) NOT NULL,
	"FECHA_ALTA" date NULL,
	"FECHA_BAJA" date NULL,
	"TELEFONO" numeric(9) NOT NULL,
	CONSTRAINT empleados_pkey PRIMARY KEY ("ID_EMPLEADO")
);


-- public.entrantes definition

-- Drop table

-- DROP TABLE public.entrantes;

CREATE TABLE public.entrantes (
	"ID_ENTRANTES" numeric(4) DEFAULT nextval('entrantes_id_entrantes_seq'::regclass) NOT NULL,
	"NOMBRE" varchar(30) NOT NULL,
	"PRECIO" numeric(4, 2) DEFAULT 0.00 NULL,
	"TAMAÑO" varchar(20) NOT NULL,
	"DESCRIPCION" text NULL,
	"IMAGEN" varchar(300) DEFAULT NULL::character varying NULL,
	CONSTRAINT entrantes_pkey PRIMARY KEY ("ID_ENTRANTES")
);


-- public.ingredientes definition

-- Drop table

-- DROP TABLE public.ingredientes;

CREATE TABLE public.ingredientes (
	"ID_INGREDIENTE" numeric(4) DEFAULT nextval('ingredientes_id_ingredientes_seq'::regclass) NOT NULL,
	"NOMBRE" varchar(30) NOT NULL,
	"ALERGENOS" varchar(20) DEFAULT NULL::character varying NULL,
	"IMAGEN" varchar(300) DEFAULT NULL::character varying NULL,
	CONSTRAINT ingredientes_pkey PRIMARY KEY ("ID_INGREDIENTE")
);


-- public.oferta definition

-- Drop table

-- DROP TABLE public.oferta;

CREATE TABLE public.oferta (
	"ID_OFERTA" numeric(4) DEFAULT nextval('oferta_id_oferta_seq'::regclass) NOT NULL,
	"NOMBRE" varchar(30) NOT NULL,
	"FECHA_FIN" date NULL,
	"IMAGEN" varchar(300) DEFAULT NULL::character varying NULL,
	"DESCRIPCION" text NULL,
	"PRECIO" numeric(4, 2) DEFAULT 0.00 NULL,
	CONSTRAINT oferta_pkey PRIMARY KEY ("ID_OFERTA")
);


-- public.pizza definition

-- Drop table

-- DROP TABLE public.pizza;

CREATE TABLE public.pizza (
	"ID_PIZZA" numeric(4) DEFAULT nextval('pizza_id_pizza_seq'::regclass) NOT NULL,
	"NOMBRE" varchar(30) NOT NULL,
	"PRECIO" numeric(4, 2) DEFAULT 0.00 NULL,
	"TAMAÑO" varchar(20) NOT NULL,
	"DESCRIPCION" text NULL,
	"IMAGEN" varchar(300) DEFAULT NULL::character varying NULL,
	CONSTRAINT pizza_pkey PRIMARY KEY ("ID_PIZZA")
);


-- public.postres definition

-- Drop table

-- DROP TABLE public.postres;

CREATE TABLE public.postres (
	"ID_POSTRES" numeric(4) DEFAULT nextval('postres_id_postres_seq'::regclass) NOT NULL,
	"NOMBRE" varchar(40) NOT NULL,
	"PRECIO" numeric(4, 2) DEFAULT 0.00 NULL,
	"TAMAÑO" varchar(20) NOT NULL,
	"DESCRIPCION" text NULL,
	"IMAGEN" varchar(300) DEFAULT NULL::character varying NULL,
	CONSTRAINT postres_pkey PRIMARY KEY ("ID_POSTRES")
);


-- public.compra definition

-- Drop table

-- DROP TABLE public.compra;

CREATE TABLE public.compra (
	"ID_COMPRA" numeric(10) DEFAULT nextval('compra_id_compra_seq'::regclass) NOT NULL,
	"FECHA_HORA" timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	"CLIENTE" numeric(10) DEFAULT NULL::numeric NULL,
	"DESCRIPCION" text NULL,
	CONSTRAINT compra_pkey PRIMARY KEY ("ID_COMPRA"),
	CONSTRAINT "COD_COMPRA_CLIENTE_FK" FOREIGN KEY ("CLIENTE") REFERENCES public.cliente("ID_CLIENTE") ON DELETE CASCADE
);


-- public.compra_lista definition

-- Drop table

-- DROP TABLE public.compra_lista;

CREATE TABLE public.compra_lista (
	"COMPRA" numeric(10) NOT NULL,
	"OFERTA" numeric(4) DEFAULT NULL::numeric NULL,
	"PIZZA" numeric(4) DEFAULT NULL::numeric NULL,
	"BEBIDA" numeric(4) DEFAULT NULL::numeric NULL,
	"ENTRANTES" numeric(4) DEFAULT NULL::numeric NULL,
	"POSTRES" numeric(4) DEFAULT NULL::numeric NULL,
	CONSTRAINT "COD_COMPRA_LISTA_BEBIDA_FK" FOREIGN KEY ("BEBIDA") REFERENCES public.bebida("ID_BEBIDA"),
	CONSTRAINT "COD_COMPRA_LISTA_COMPRA_FK" FOREIGN KEY ("COMPRA") REFERENCES public.compra("ID_COMPRA"),
	CONSTRAINT "COD_COMPRA_LISTA_ENTRANTES_FK" FOREIGN KEY ("ENTRANTES") REFERENCES public.entrantes("ID_ENTRANTES"),
	CONSTRAINT "COD_COMPRA_LISTA_OFERTA_FK" FOREIGN KEY ("OFERTA") REFERENCES public.oferta("ID_OFERTA"),
	CONSTRAINT "COD_COMPRA_LISTA_PIZZA_FK" FOREIGN KEY ("PIZZA") REFERENCES public.pizza("ID_PIZZA"),
	CONSTRAINT "COD_COMPRA_LISTA_POSTRES_FK" FOREIGN KEY ("POSTRES") REFERENCES public.postres("ID_POSTRES")
);


-- public.entrantes_ingrediente definition

-- Drop table

-- DROP TABLE public.entrantes_ingrediente;

CREATE TABLE public.entrantes_ingrediente (
	"ENTRANTES" numeric(4) NOT NULL,
	"INGREDIENTE" numeric(4) NOT NULL,
	CONSTRAINT "COD_ENTRANTE_INGREDIENTE_FK" FOREIGN KEY ("ENTRANTES") REFERENCES public.entrantes("ID_ENTRANTES") ON DELETE CASCADE,
	CONSTRAINT "COD_INGREDIENTE_ENTRANTE_FK" FOREIGN KEY ("INGREDIENTE") REFERENCES public.ingredientes("ID_INGREDIENTE") ON DELETE CASCADE
);


-- public.extras definition

-- Drop table

-- DROP TABLE public.extras;

CREATE TABLE public.extras (
	"ID_EXTRA" numeric(4) DEFAULT nextval('extras_id_extras_seq'::regclass) NOT NULL,
	"PRECIO" numeric(4, 2) DEFAULT 0.00 NULL,
	"IMAGEN" varchar(300) DEFAULT NULL::character varying NULL,
	"INGREDIENTE" numeric(4) DEFAULT NULL::numeric NULL,
	CONSTRAINT extras_pkey PRIMARY KEY ("ID_EXTRA"),
	CONSTRAINT "COD_INGREDIENTES_EXTRAS_FK" FOREIGN KEY ("INGREDIENTE") REFERENCES public.ingredientes("ID_INGREDIENTE")
);


-- public.modificado definition

-- Drop table

-- DROP TABLE public.modificado;

CREATE TABLE public.modificado (
	"COMPRA" numeric(10) NOT NULL,
	"PIZZA" numeric(4) DEFAULT NULL::numeric NULL,
	"ENTRANTES" numeric(4) DEFAULT NULL::numeric NULL,
	"EXTRAS" numeric(4) DEFAULT NULL::numeric NULL,
	"COMENTARIO" text NULL,
	"NUM_MOD" numeric(10) NOT NULL,
	"OFERTA" numeric(4) DEFAULT NULL::numeric NULL,
	CONSTRAINT "COD_MOD_COMPRA_FK" FOREIGN KEY ("COMPRA") REFERENCES public.compra("ID_COMPRA") ON DELETE CASCADE,
	CONSTRAINT "COD_MOD_ENTRANTES_FK" FOREIGN KEY ("ENTRANTES") REFERENCES public.entrantes("ID_ENTRANTES") ON DELETE CASCADE,
	CONSTRAINT "COD_MOD_EXTRAS_FK" FOREIGN KEY ("EXTRAS") REFERENCES public.extras("ID_EXTRA") ON DELETE CASCADE,
	CONSTRAINT "COD_MOD_OFERTA_FK" FOREIGN KEY ("OFERTA") REFERENCES public.oferta("ID_OFERTA") ON DELETE CASCADE,
	CONSTRAINT "COD_MOD_PIZZA_FK" FOREIGN KEY ("PIZZA") REFERENCES public.pizza("ID_PIZZA") ON DELETE CASCADE
);


-- public.oferta_lista definition

-- Drop table

-- DROP TABLE public.oferta_lista;

CREATE TABLE public.oferta_lista (
	"OFERTA" numeric(4) NOT NULL,
	"PIZZA" numeric(4) DEFAULT NULL::numeric NULL,
	"ENTRANTES" numeric(4) DEFAULT NULL::numeric NULL,
	"BEBIDA" numeric(4) DEFAULT NULL::numeric NULL,
	"POSTRES" numeric(4) DEFAULT NULL::numeric NULL,
	CONSTRAINT "COD_OFERTA_LISTA_BEBIDA_FK" FOREIGN KEY ("BEBIDA") REFERENCES public.bebida("ID_BEBIDA") ON DELETE CASCADE,
	CONSTRAINT "COD_OFERTA_LISTA_ENTRANTES_FK" FOREIGN KEY ("ENTRANTES") REFERENCES public.entrantes("ID_ENTRANTES") ON DELETE CASCADE,
	CONSTRAINT "COD_OFERTA_LISTA_OFERTA_FK" FOREIGN KEY ("OFERTA") REFERENCES public.oferta("ID_OFERTA") ON DELETE CASCADE,
	CONSTRAINT "COD_OFERTA_LISTA_PIZZA_FK" FOREIGN KEY ("PIZZA") REFERENCES public.pizza("ID_PIZZA") ON DELETE CASCADE,
	CONSTRAINT "COD_OFERTA_LISTA_POSTRES_FK" FOREIGN KEY ("POSTRES") REFERENCES public.postres("ID_POSTRES") ON DELETE CASCADE
);


-- public.pago definition

-- Drop table

-- DROP TABLE public.pago;

CREATE TABLE public.pago (
	"ID_PAGO" numeric(10) DEFAULT nextval('pago_id_pago_seq'::regclass) NOT NULL,
	"COMPRA" numeric(10) NOT NULL,
	"TARJETA" numeric(1) DEFAULT NULL::numeric NULL,
	"EFECTIVO" numeric(1) DEFAULT NULL::numeric NULL,
	"TOTAL_PAGO" numeric(6, 2) DEFAULT NULL::numeric NULL,
	"RECOGIDA" numeric(1) DEFAULT 0 NOT NULL,
	CONSTRAINT pago_pkey PRIMARY KEY ("ID_PAGO"),
	CONSTRAINT "COD_PAGO_COMPRA_FK" FOREIGN KEY ("COMPRA") REFERENCES public.compra("ID_COMPRA")
);


-- public.pizza_ingrediente definition

-- Drop table

-- DROP TABLE public.pizza_ingrediente;

CREATE TABLE public.pizza_ingrediente (
	"PIZZA" numeric(4) NOT NULL,
	"INGREDIENTE" numeric(4) NOT NULL,
	CONSTRAINT "COD_INGREDIENTE_PIZZA_FK" FOREIGN KEY ("INGREDIENTE") REFERENCES public.ingredientes("ID_INGREDIENTE") ON DELETE CASCADE,
	CONSTRAINT "COD_PIZZA_INGREDIENTE_FK" FOREIGN KEY ("PIZZA") REFERENCES public.pizza("ID_PIZZA") ON DELETE CASCADE
);