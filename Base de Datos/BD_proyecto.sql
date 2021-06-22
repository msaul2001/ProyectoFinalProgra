CREATE DATABASE ControlPagos;

USE ControlPagos;

#DROP DATABASE ControlPagos;

-- Tabla Usuarios --
CREATE TABLE IF NOT EXISTS Usuario (
    IdUsuario INT PRIMARY KEY AUTO_INCREMENT,
    Usuario VARCHAR(25) NOT NULL UNIQUE,
    Nombres VARCHAR(75) NOT NULL,
    Contrasenia NVARCHAR(25) NOT NULL,
    Edad INT NOT NULL,
    Correo VARCHAR(75) NOT NULL
);

-- Tabla Categorias --
CREATE TABLE IF NOT EXISTS Categorias (
    IdCategoria INT PRIMARY KEY AUTO_INCREMENT,
    NCategoria VARCHAR(30) NOT NULL
);

-- Tabla Deudas --
CREATE TABLE IF NOT EXISTS Deudas (
    IdDeudas INT PRIMARY KEY AUTO_INCREMENT,
    Monto DOUBLE(9,2) NOT NULL ,
    FechaHoraAd DATETIME NOT NULL,
    Descripcion VARCHAR(100) NOT NULL,

    Username VARCHAR(25) NOT NULL,
    IdCategoria INT NOT NULL,

    CONSTRAINT fk_llaveUsuario FOREIGN KEY (Username)
    REFERENCES Usuario(Usuario)
        ON DELETE NO ACTION
        ON UPDATE CASCADE,
    CONSTRAINT fk_llaveCategoria FOREIGN KEY (IdCategoria)
    REFERENCES Categorias(IdCategoria)
        ON DELETE NO ACTION
        ON UPDATE CASCADE
);

-- Tabla Cuentas --
CREATE TABLE IF NOT EXISTS Cuentas(
    IdCuenta INT PRIMARY KEY AUTO_INCREMENT,
    Tipo ENUM('Ahorro','Corriente','Nomina','Remunerada','Chequera','Dolares'),
    Banco VARCHAR(75),
    NumCuenta BIGINT UNIQUE,
    NoTarjeta BIGINT UNIQUE,
    TipoTarjeta ENUM('Credito','Debito'),
    NombrePropietario VARCHAR(75) NOT NULL,
    SaldoCuenta DOUBLE(9,2),
    SaldoTarjeta DOUBLE(9,2),

    Username VARCHAR(25) NOT NULL,

    CONSTRAINT fk_llaveUsuarioCuentas FOREIGN KEY (Username)
    REFERENCES Usuario(Usuario)
        ON DELETE NO ACTION
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Efectivo(
    IdEfectivo INT PRIMARY KEY AUTO_INCREMENT,
    Efectivo DOUBLE(9,2) NOT NULL,

    Username VARCHAR(25) NOT NULL UNIQUE,

    CONSTRAINT fk_llaveUsuarioEfectivo FOREIGN KEY (Username)
    REFERENCES Usuario(Usuario)
        ON DELETE NO ACTION
        ON UPDATE CASCADE
);

-- Tabla Gastos --
CREATE TABLE IF NOT EXISTS Gastos(
    IdGastos INT PRIMARY KEY AUTO_INCREMENT,
    Monto DOUBLE(9,2) NOT NULL ,
    FechaHoraAd DATETIME NOT NULL ,
    TipoG ENUM('Efectivo', 'Tarjeta', 'Cuenta Bancaria', 'Pago Deuda') NOT NULL,
    Descripcion VARCHAR(200),
    NumCuenta BIGINT,
    NoTarjeta BIGINT,

    UsernameCuentas VARCHAR(25),
    UsernameEfectivo VARCHAR(25),
    IdCategoria INT NOT NULL,

    CONSTRAINT fk_llaveCuentaG FOREIGN KEY (UsernameCuentas)
    REFERENCES Cuentas(Username)
        ON DELETE NO ACTION
        ON UPDATE CASCADE,
    CONSTRAINT fk_llaveEfectivoG FOREIGN KEY (UsernameEfectivo)
    REFERENCES Efectivo(Username)
        ON DELETE NO ACTION
        ON UPDATE CASCADE,
    CONSTRAINT fk_llaveCategoriaG FOREIGN KEY (IdCategoria)
    REFERENCES Categorias(IdCategoria)
        ON DELETE NO ACTION
        ON UPDATE CASCADE
);

-- Tabla Ingresos --
CREATE TABLE IF NOT EXISTS Ingresos (
    IdIngresos INT PRIMARY KEY AUTO_INCREMENT,
    Monto DOUBLE(9,2) NOT NULL,
    FechaHora DATETIME NOT NULL,
    TipoI ENUM('Efectivo', 'Tarjeta', 'Cuenta Bancaria', 'Refinanciacion Credito') NOT NULL,
    Descripcion VARCHAR(200),
    NumCuenta BIGINT,
    NoTarjeta BIGINT,

    UsernameCuentas VARCHAR(25),
    UsernameEfectivo VARCHAR(25),
    IdCategoria INT NOT NULL,

    CONSTRAINT fk_IdCategoriaI FOREIGN KEY (IdCategoria)
    REFERENCES Categorias(IdCategoria)
        ON DELETE NO ACTION
        ON UPDATE CASCADE,
    CONSTRAINT fk_IdCuentaI FOREIGN KEY (UsernameCuentas)
    REFERENCES Cuentas(Username)
        ON DELETE NO ACTION
        ON UPDATE CASCADE,
    CONSTRAINT fk_IdEfectivoI FOREIGN KEY (UsernameEfectivo)
    REFERENCES Efectivo(Username)
        ON DELETE NO ACTION
        ON UPDATE CASCADE
);

-- ---------------------------------------- INSERT DE TODAS LAS TABLAS ---------------------------------------- --

-- Insert para Usuarios --
INSERT INTO Usuario(Usuario, Nombres, Contrasenia, Edad, Correo)
    VALUES('S_ruano07', 'Sebastian Ruano', 'La_contraseña', 20, '19000398@galileo.edu');

INSERT INTO Usuario(Usuario, Nombres, Contrasenia, Edad, Correo)
    VALUES('Smc_00', 'Saul Melendez', 'Contraseña', 19, '19007398@galileo.edu');

INSERT INTO Usuario(Usuario, Nombres, Contrasenia, Edad, Correo)
    VALUES('Prengsen', 'Preng Viva', 'UnBaile', 27, 'prengsen@galileo.edu');

INSERT INTO Usuario(Usuario, Nombres, Contrasenia, Edad, Correo)
    VALUES('El_pepe', 'Pepe Aguilar', 'Pepitin', 60, 'elviejo@galileo.edu');

INSERT INTO Usuario(Usuario, Nombres, Contrasenia, Edad, Correo)
    VALUES('Sara_p', 'Sara Palencia', 'QueBaile', 18, 'sarapl@galileo.edu');

-- Insert para Categorias --
INSERT INTO Categorias (NCategoria)
    VALUES ('Comida o Bebida');

INSERT INTO Categorias (NCategoria)
    VALUES ('Compras');

INSERT INTO Categorias (NCategoria)
    VALUES ('Vivienda');

INSERT INTO Categorias (NCategoria)
    VALUES ('Transporte');

INSERT INTO Categorias (NCategoria)
    VALUES ('Vehiculos');

INSERT INTO Categorias (NCategoria)
    VALUES ('Vida');

INSERT INTO Categorias (NCategoria)
    VALUES ('Entretenimiento');

INSERT INTO Categorias (NCategoria)
    VALUES ('Comunicaciones');

INSERT INTO Categorias (NCategoria)
    VALUES ('Gastos Financieros');

INSERT INTO Categorias (NCategoria)
    VALUES ('Inversiones');

INSERT INTO Categorias (NCategoria)
    VALUES ('Ingresos');

INSERT INTO Categorias (NCategoria)
    VALUES ('Otros');

-- Insert para Deudas --
INSERT INTO Deudas (Monto, FechaHoraAd, Descripcion, Username, IdCategoria)
    VALUES (20.00, NOW(), 'Tienda', 'S_ruano07', 5);

INSERT INTO Deudas (Monto, FechaHoraAd, Descripcion, Username, IdCategoria)
    VALUES (200.00, NOW(), 'Audifonos', 'Smc_00', 3);

INSERT INTO Deudas (Monto, FechaHoraAd, Descripcion, Username, IdCategoria)
    VALUES (20000.00, NOW(), 'Computadora', 'Prengsen', 1);

-- Insert para cuentas --
INSERT INTO Cuentas (Tipo, Banco, NumCuenta, NombrePropietario, SaldoCuenta, Username)
    VALUES (3, 'Banco Industrial', 1150122561570, 'Preng Biba', 100000.00, 'Prengsen');

INSERT INTO Cuentas (Tipo, Banco, NumCuenta, NoTarjeta, TipoTarjeta, NombrePropietario, SaldoCuenta, SaldoTarjeta, Username)
    VALUES(2, 'GyT Continental', 1150122561999, 1111110000222554, 2, 'Saul Melendez', 799.99, 700.00, 'Smc_00');

 INSERT INTO Cuentas (Tipo, Banco, NumCuenta, NombrePropietario, SaldoCuenta, Username)
    VALUES (2, 'Banco Industrial', 1150122561888, 'Sara Palencia', 100.00, 'Sara_p');

-- Insert para Efectivo --
INSERT INTO Efectivo (Efectivo, Username)
    VALUES (100, 'S_ruano07');

INSERT INTO Efectivo (Efectivo, Username)
    VALUES (50, 'Smc_00');

INSERT INTO Efectivo (Efectivo, Username)
    VALUES (0, 'Prengsen');

INSERT INTO Efectivo (Efectivo, Username)
    VALUES (0, 'Sara_p');

INSERT INTO Efectivo (Efectivo, Username)
    VALUES (0, 'El_pepe');

-- Insert para Gastos --
INSERT INTO Gastos (Monto, FechaHoraAd, TipoG, Descripcion, NumCuenta, UsernameCuentas,  IdCategoria)
    VALUES (170, '2021-04-04', 3, 'La verdadera descripcion', 1150122561570, 'Prengsen', 1);

INSERT INTO Gastos (Monto, FechaHoraAd, TipoG, NoTarjeta, UsernameCuentas, IdCategoria)
    VALUES (70, '2021-05-04', 2, 1111110000222554, 'Smc_00', 2);

INSERT INTO Gastos (Monto, FechaHoraAd, TipoG, Descripcion, UsernameEfectivo, IdCategoria)
    VALUES (930, NOW(), 1, 'Que gastador', 'S_ruano07', 5);

-- Insert para Ingresos --
INSERT INTO Ingresos (Monto, FechaHora, TipoI, NumCuenta, UsernameCuentas, IdCategoria)
VALUES (800.00, '2021-05-04', 3, 1150122561888, 'Sara_p', 4);

INSERT INTO Ingresos (Monto, FechaHora, TipoI, Descripcion, NoTarjeta, UsernameCuentas, IdCategoria)
VALUES (80.00, '2021-02-04', 2, 'Pagando mi tarjeta', 1111110000222554, 'Smc_00', 6);

INSERT INTO Ingresos (Monto, FechaHora, TipoI, Descripcion, UsernameEfectivo, IdCategoria)
VALUES (28.00, NOW(), 1, 'Soy barbaro', 'S_ruano07', 7);

-- ---------------------------------------- SELECT DE TODAS LAS TABLAS ---------------------------------------- --
SELECT * FROM Usuario;
SELECT * FROM Categorias;
SELECT * FROM Deudas;
SELECT * FROM Cuentas;
SELECT * FROM Gastos;
SELECT * FROM Ingresos;
SELECT * FROM Efectivo;


