create schema sexto_parcial_1;
use sexto_parcial_1;

create table cursos(
  id int not null auto_increment,
  nombre varchar(50) not null,
  descripcion varchar(50) not null,
  fecha_inicio date not null,
  fecha_fin date not null,
  primary key(id)
);

create table estudiantes(
  id int not null auto_increment,
  nombre varchar(50) not null,
  apellido varchar(50) not null,
  fecha_nacimiento date not null,
  primary key(id)
);

create table cursos_estudiantes(
  curso_id int not null,
  alumno_id int not null,
  primary key(curso_id, alumno_id),
  foreign key(curso_id) references cursos(id),
  foreign key(alumno_id) references estudiantes(id)
);
