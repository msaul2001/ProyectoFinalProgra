USE ControlPagos;

-- INICIO DE TRIGGERS --
-- Resta del monto total --
DELIMITER $$
CREATE TRIGGER Tr_Resta_Monto
    AFTER INSERT ON gastos
    FOR EACH ROW
    BEGIN
        IF (NEW.TipoG = 1)
            THEN
                UPDATE efectivo SET Efectivo = (Efectivo-NEW.Monto)
                WHERE Username = NEW.UsernameEfectivo;
        ELSEIF (NEW.TipoG = 2)
            THEN
                UPDATE cuentas SET SaldoTarjeta = (SaldoTarjeta-NEW.Monto)
                WHERE Username = NEW.UsernameCuentas AND NoTarjeta = NEW.NoTarjeta;
        ELSEIF (NEW.TipoG = 3)
            THEN
                UPDATE cuentas SET SaldoCuenta = (SaldoCuenta-NEW.Monto)
                WHERE Username = NEW.UsernameCuentas AND NumCuenta = NEW.NumCuenta;
        ELSEIF (NEW.TipoG = 4)
            THEN
                UPDATE deudas SET Monto = (deudas.Monto-NEW.Monto)
                WHERE Username = NEW.UsernameEfectivo;
        END IF;
    END $$
DELIMITER ;

-- Suma del monto total --
DELIMITER $$
CREATE TRIGGER Tr_Suma_Monto
    AFTER INSERT ON ingresos
    FOR EACH ROW
    BEGIN
        IF (NEW.TipoI = 1)
            THEN
                UPDATE efectivo SET Efectivo = (Efectivo+NEW.Monto)
                WHERE Username = NEW.UsernameEfectivo;
        ELSEIF (NEW.TipoI = 2)
            THEN
                UPDATE cuentas SET SaldoTarjeta = (SaldoTarjeta+NEW.Monto)
                WHERE Username = NEW.UsernameCuentas AND NoTarjeta = NEW.NoTarjeta;
        ELSEIF (NEW.TipoI = 3)
            THEN
                UPDATE cuentas SET SaldoCuenta = (SaldoCuenta+NEW.Monto)
                WHERE Username = NEW.UsernameCuentas AND NumCuenta = NEW.NumCuenta;
        ELSEIF (NEW.TipoI = 4)
            THEN
                UPDATE deudas SET Monto = (deudas.Monto+NEW.Monto)
                WHERE Username = NEW.UsernameEfectivo;
        END IF;
    END $$
DELIMITER ;

-- Creacion de efectivo --
DELIMITER $$
CREATE TRIGGER Tr_Efectivo
    AFTER INSERT ON usuario
    FOR EACH ROW
    BEGIN
       INSERT INTO efectivo (Efectivo, Username)
        VALUES(0, NEW.Usuario);
    END $$
DELIMITER ;

-- Borrar las deudas que ya no tienen monto --
DELIMITER $$
CREATE TRIGGER Tr_EliminacionDeuda
    AFTER INSERT ON gastos
    FOR EACH ROW
    BEGIN
        DELETE FROM deudas WHERE Monto = 0;
    END $$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER Tr_SaldoSuficiente
    BEFORE INSERT ON gastos
    FOR EACH ROW
    BEGIN
        IF (NEW.TipoG = 1)
            THEN
                IF(NEW.Monto > (SELECT Efectivo FROM efectivo WHERE Username = NEW.UsernameEfectivo)) THEN
                    SIGNAL SQLSTATE '45001' SET MESSAGE_TEXT = "No es posible hacer esta operacion";
                END IF;

        ELSEIF (NEW.TipoG = 2)
            THEN
                IF(NEW.Monto > (SELECT SaldoCuenta FROM cuentas WHERE Username = NEW.UsernameCuentas)) THEN
                    SIGNAL SQLSTATE '45001' SET MESSAGE_TEXT = "No es posible hacer esta operacion";
                END IF;

        ELSEIF (NEW.TipoG = 3)
            THEN
                 IF(NEW.Monto > (SELECT SaldoTarjeta FROM cuentas WHERE Username = NEW.UsernameCuentas)) THEN
                    SIGNAL SQLSTATE '45001' SET MESSAGE_TEXT = "No es posible hacer esta operacion";
                END IF;

        ELSEIF (NEW.TipoG = 4)
            THEN
                IF(NEW.Monto > (SELECT Monto FROM deudas WHERE Username = NEW.UsernameEfectivo)) THEN
                    SIGNAL SQLSTATE '45001' SET MESSAGE_TEXT = "No es posible hacer esta operacion";
                END IF;

        END IF;
    END $$
DELIMITER ;

-- FINALIZACION DE TRIGGERS --

select * from ingresos;
SELECT * FROM gastos;
SELECT * FROM efectivo;
select * from cuentas;
SELECT * FROM deudas;
SELECT * FROM usuario;
SELECT * FROM categorias;

SHOW TRIGGERS;

