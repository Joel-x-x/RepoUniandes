-- Create schema parqueadero
create schema if not exists parqueadero;
use parqueadero;

/*
*
* Table: usuarios
*
*/
create table if not exists usuarios (
    id int primary key auto_increment,
    nombre_completo varchar(200) not null,
    email varchar(200) not null,
    password varchar(200) not null
);

/*
*
* Table: vehiculos
*
*/
create table if not exists vehiculos (
    id int primary key auto_increment,
    placa varchar(20) not null,
    marca varchar(50) not null,
    modelo varchar(50) not null,
    color varchar(15) not null
);

/*
*
* Table: clientes
*
*/
create table if not exists clientes (
    id int primary key auto_increment,
    nombre_completo varchar(200) not null,
    identificacion varchar(13) not null unique,
    telefono varchar(10) not null
);

/*
*
* Table: registros
*
*/
create table if not exists registros (
    id int primary key auto_increment,
    entrada datetime not null,
    salida datetime,
    total double,
    vehiculo_id int not null,
    constraint fk_vehiculo_id foreign key(vehiculo_id) references vehiculos(id),
    cliente_id int not null,
    constraint fk_cliente_id foreign key(cliente_id) references clientes(id)
);
