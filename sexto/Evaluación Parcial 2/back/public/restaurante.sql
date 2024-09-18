-- Base de datos

create schema restaurante;
use restaurante;

create table clientes(
id int primary key auto_increment,
nombre varchar(50) not null,
apellido varchar(50) not null,
email varchar(50) not null,
telefono varchar(20) not null
);

create table menus(
id int primary key auto_increment,
nombre varchar(50) not null,
descripcion varchar(100),
precio double not null,
disponible tinyint not null
);

create table ordenes(
id int primary key auto_increment,
cliente_id int not null,
menu_id int not null,
total int not null,
fecha date not null,
foreign key (cliente_id) references clientes(id),
foreign key (menu_id) references menus(id)
);

create table detalle_ordenes(
id int primary key auto_increment,
orden_id int not null,
menu_id int not null,
precio_unitario double not null,
cantidad double not null,
total double not null,
foreign key (orden_id) references ordenes(id),
foreign key (menu_id) references menus(id)
);

-- Inserts
-- Insertar datos en la tabla clientes
insert into clientes (nombre, apellido, email, telefono) values
('Juan', 'Pérez', 'juan.perez@example.com', '1234567890'),
('Ana', 'Gómez', 'ana.gomez@example.com', '0987654321'),
('Luis', 'Martínez', 'luis.martinez@example.com', '1122334455');

-- insertar datos en la tabla menus
insert into menus (nombre, descripcion, precio, disponible) values
('Pizza Margherita', 'Pizza con tomate, mozzarella y albahaca', 8.50, 1),
('Ensalada César', 'Ensalada con pollo, lechuga, croutons y aderezo César', 7.00, 1),
('Hamburguesa con Papas', 'Hamburguesa de carne con papas fritas', 10.00, 1);

-- insertar datos en la tabla ordenes
insert into ordenes (cliente_id, menu_id, total, fecha) values
(1, 1, 8.50, '2024-09-15'),
(2, 2, 7.00, '2024-09-16'),
(3, 3, 10.00, '2024-09-17');

-- insertar datos en la tabla detalle_ordenes
INSERT into detalle_ordenes (orden_id, menu_id, precio_unitario, cantidad, total) values
(1, 1, 8.50, 1, 8.50),
(1, 1, 10, 1, 10),
(2, 2, 7.00, 1, 7.00),
(3, 3, 10.00, 1, 10.00);