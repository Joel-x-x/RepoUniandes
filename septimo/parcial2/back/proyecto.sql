create schema if not exists proyecto;
use proyecto;

/**
*
* Tabla Proyectos
*
**/
create table if not exists proyectos(
    id int primary key auto_increment,
    nombre varchar(50),
    descripcion varchar(250),
    creacion timestamp default current_timestamp,
    actualizacion timestamp default current_timestamp on update current_timestamp
);

/**
*
* Tabla Tareas
*
**/
create table if not exists tareas(
    id int primary key auto_increment,
    nombre varchar(50),
    descripcion varchar(250),
    estado enum('pendiente', 'en-progreso', 'completada') default 'pendiente',
    creacion timestamp default current_timestamp,
    actualizacion timestamp default current_timestamp on update current_timestamp,
    proyecto_id int not null,
    constraint fk_tareas_proyectos_id foreign key (proyecto_id) references proyectos(id)
);