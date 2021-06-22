from flask import Flask, request, jsonify
import json
import pymysql
import peewee
import datetime
import array
from peewee import fn, JOIN

database = peewee.MySQLDatabase("ControlPagos", 
                                host="localhost", 
                                port=3306,
                                password="SebastianR1",
                                user="root")

#modelo para usuarios
class Users(peewee.Model):
    IdUsuario = peewee.IntegerField(primary_key=True)
    Contrasenia = peewee.CharField(null=False)
    Usuario = peewee.CharField(null=False)
    Nombres = peewee.CharField(null=False)
    Edad = peewee.IntegerField(null=False)
    Correo = peewee.CharField(null=False) 

    class Meta:
        database = database
        db_table = "Usuario"

#Modelo para Categorias
class Categorias(peewee.Model):
    IdCategoria = peewee.IntegerField(primary_key=True)
    NCategoria = peewee.CharField(null=False)

    class Meta:
        database = database
        db_table = "Categorias"

#Modelo para Deudas
class Deudas(peewee.Model):
    IdDeudas = peewee.IntegerField(primary_key=True)
    Monto = peewee.DoubleField(null=False)
    FechaHoraAd = peewee.DateTimeField(null=False)
    Descripcion = peewee.CharField(null=False)
    Username = peewee.CharField(null=False)
    IdCategoria = peewee.IntegerField(null=False)

    class Meta():
        database = database
        db_table = "Deudas"

#Modelo para Cuentas
class Cuentas(peewee.Model):
    IdCuenta = peewee.IntegerField(primary_key=True)
    Tipo = peewee.IntegerField(null=True)
    Banco = peewee.CharField(null=True)
    NumCuenta = peewee.BigIntegerField(null=True)
    NoTarjeta = peewee.CharField(null=True)
    TipoTarjeta = peewee.IntegerField(null=True)
    NombrePropietario = peewee.CharField(null=False)
    SaldoCuenta = peewee.DoubleField(null=True)
    SaldoTarjeta = peewee.DoubleField(null=True)
    Username = peewee.CharField(null=False)

    class Meta():
        database = database
        db_table = "Cuentas"

#Modelo para gastos
class Gastos(peewee.Model):
    IdGastos = peewee.IntegerField(primary_key=True)
    Monto = peewee.DoubleField(null=False)
    FechaHoraAd = peewee.DateTimeField(null=False)
    TipoG = peewee.IntegerField(null=False)
    Descripcion = peewee.CharField(null=True)
    NumCuenta = peewee.IntegerField(null=True)
    NoTarjeta = peewee.IntegerField(null=True)
    UsernameCuentas = peewee.CharField(null=True)
    UsernameEfectivo = peewee.CharField(null=True)
    IdCategoria = peewee.IntegerField(null=False) 

    class Meta():
        database = database
        db_table = "Gastos"

#modelo para ingresos
class Ingresos(peewee.Model):
    IdIngresos = peewee.IntegerField(primary_key=True)
    Monto = peewee.DoubleField(null=False)
    FechaHora = peewee.DateTimeField(null=False)
    TipoI = peewee.IntegerField(null=False)
    Descripcion = peewee.CharField(null=True)
    NumCuenta = peewee.IntegerField(null=True)
    NoTarjeta = peewee.IntegerField(null=True)
    UsernameCuentas = peewee.CharField(null=True)
    UsernameEfectivo = peewee.CharField(null=True)
    IdCategoria = peewee.IntegerField(null=True) 

    class Meta():
        database = database
        db_table = "Ingresos"

#modelo para efectivo
class Efectivo(peewee.Model):
    IdEfectivo = peewee.IntegerField(primary_key=True)
    Efectivo = peewee.DoubleField(null=False)
    Username = peewee.CharField(null=False)
    
    class Meta():
        database = database
        db_table = "Efectivo"

app = Flask(__name__)

#INSERTS A LAS TABLAS Y LOGIN
@app.route('/login/', methods=['POST'])
def performLogin():
    data = request.get_json()
    print(data)
    query = Users.select().where(Users.Usuario==data['username'], 
                                 Users.Contrasenia==data['password'])
    if(query.exists()):
        print("Login Permitido")
        return jsonify({'Salida':True})
    else:
        print("Usuario no Permitido")
        return jsonify({'Salida':False})

@app.route('/new_user/', methods=['POST'])
def performNewUser():
    try: 
        data = request.get_json()
        print(data)
        query = (Users.create(Usuario=data['username'],
                              Nombres=data['nombres'],
                              Contrasenia=data['password'],
                              Edad=data['edad'],
                              Correo=data['correo']))
        query.save()
        return jsonify({'Salida':True})
    except:
        return jsonify({'Salida':'Ocurrio un problema'})

@app.route('/new_tarjeta/', methods=['POST'])
def performNewTarjeta():
    try: 
        data = request.get_json()
        print(data)
        query = (Cuentas.update(NoTarjeta=data['numtarjeta'],
                                TipoTarjeta=data['tipot'],
                                SaldoTarjeta=data['saldot']).where(Cuentas.NumCuenta==data['nocuenta']))
        print(query)
        query.execute()
        return jsonify({'Salida':True})
    except:
        return jsonify({'Salida':'Ocurrio un problema'})

@app.route('/new_cuenta/<user>', methods=['POST'])
def performNewCuenta(user):
    try: 
        data = request.get_json()
        print(data)
        query = (Cuentas.create(Tipo=data['tipo'],
                                Banco=data['banco'],
                                NumCuenta=data['numcuenta'],
                                NombrePropietario=data['nompropietario'],
                                SaldoCuenta=data['saldocuenta'],
                                Username=user))
        query.save()
        return jsonify({'Salida':True})
    except:
        return jsonify({'Salida':'Ocurrio un problema'})

@app.route('/new_ingreso/', methods=['POST'])
def performNewIngreso():
    try: 
        data = request.get_json()
        print(data)
        query = (Ingresos.create(Monto=data['monto'],
                                 FechaHora=datetime.datetime.now(),
                                 TipoI=data['tipoi'],
                                 Descripcion=data['descripcion'],
                                 NumCuenta=data['nocuenta'],
                                 NoTarjeta=data['notarjeta'],
                                 UsernameCuentas=data['usernameC'],
                                 UsernameEfectivo=data['usernameE'],
                                 IdCategoria=data['Idcategoria']))
        query.save()
        return jsonify({'Salida':True})
    except:
        return jsonify({'Salida':'Ocurrio un problema'})

@app.route('/new_gasto/', methods=['POST'])
def performNewGasto():
    try: 
        data = request.get_json()
        print(data)
        query = (Gastos.create(Monto=data['monto'],
                               FechaHoraAd=datetime.datetime.now(),
                               TipoG=data['tipog'],
                               Descripcion=data['descripcion'],
                               NumCuenta=data['nocuenta'],
                               NoTarjeta=data['notarjeta'],
                               UsernameCuentas=data['usernameC'],
                               UsernameEfectivo=data['usernameE'],
                               IdCategoria=data['Idcategoria']))
        query.save()
        return jsonify({'Salida':True})
    except Exception as ex:
        print(ex)
        return jsonify({'Salida':'Ocurrio un problema'})

@app.route('/new_deuda/<user>', methods=['POST'])
def performNewDeuda(user):
    try: 
        data = request.get_json()
        print(data)
        query = (Deudas.create(Monto=data['monto'],
                               FechaHoraAd=datetime.datetime.now(),
                               Descripcion=data['descripcion'],
                               Username=user,
                               IdCategoria=data['Idcategoria']))
        query.save()
        return jsonify({'Salida':True})
    except:
        return jsonify({'Salida':'Ocurrio un problema'})


#BORRADO DE DATOS
@app.route('/delete_tarjeta/<Ntarjeta>', methods=['POST'])
def performdDeleteTarjeta(Ntarjeta):
    try: 
        #data = request.get_json()
        #print(data)
        print('Prueba1')
        query = (Cuentas.update(NoTarjeta=None,
                                TipoTarjeta=None,
                                SaldoTarjeta=None).where(Cuentas.NoTarjeta == Ntarjeta))
        print('Prueba2')
        print(query)
        query.execute()
        return jsonify({'Salida':True})
    except Exception as ex:
        print(ex)
        return jsonify({'Salida':'Ocurrio un problema'})

@app.route('/delete_deuda/<user>', methods=['POST'])
def performDeleteDeuda(user):
    try: 
        data = request.get_json()
        print(data)
        query = (Deudas.get(Monto=data['monto'],
                            Username=user))
        query.delete_instance()
        return jsonify({'Salida':True})
    except:
        return jsonify({'Salida':'Ocurrio un problema'})

@app.route('/delete_cuenta/<user>', methods=['POST'])
def performDeleteCuenta(user):
    try: 
        data = request.get_json()
        print(data)
        query = (Cuentas.get(NumCuenta=data['nocuenta'],
                            Username=user))
        query.delete_instance()
        return jsonify({'Salida':True})
    except:
        return jsonify({'Salida':'Ocurrio un problema'})

#GETS PARA REUNIR LA INFORMACION NECESARIA
@app.route('/cuentas/<usuario>', methods=['GET'])
def getCuentas(usuario):
    try:
        arreglo = []
        for Username in Cuentas.select().where(Cuentas.Username == usuario):
            print(Username.NumCuenta)
            tipo = Username.Tipo
            banco = Username.Banco
            numero = Username.NumCuenta
            nombre = Username.NombrePropietario
            saldo = Username.SaldoCuenta
            arreglo.append(tipo)
            arreglo.append(banco)
            arreglo.append(numero)
            arreglo.append(nombre)
            arreglo.append(saldo)
        return jsonify(arreglo)

    except:
        return jsonify("Error")

@app.route('/tarjetas/<usuario>', methods=['GET'])
def getTarjetas(usuario):
    try:
        arreglo = []
        for Username in Cuentas.select().where(Cuentas.Username == usuario):
            print(Username.NoTarjeta)
            num = Username.NoTarjeta 
            tip = Username.TipoTarjeta
            nombre = Username.NombrePropietario
            saldo = Username.SaldoTarjeta
            arreglo.append(num)
            arreglo.append(tip)
            arreglo.append(nombre)
            arreglo.append(saldo)
        return jsonify(arreglo)

    except Exception as ex:
        print(ex)
        return jsonify("Error")

@app.route('/deudas/<usuario>', methods=['GET'])
def getDeudas(usuario):
    try:
        arreglo = []
        for Username in Deudas.select().where(Deudas.Username == usuario):
            print (Username.Descripcion)
            mon = Username.Monto
            desc = Username.Descripcion
            arreglo.append(desc)
            arreglo.append(mon)
        return jsonify(arreglo)

    except Exception as ex:
        print(ex)
        return jsonify("Error")

@app.route('/Efectivo/<user>', methods=['GET'])
def getefectivo(user):
    try:
        query = (Efectivo.select().where(Efectivo.Username == user).get().Efectivo)
        return jsonify({'monto':query})
    except:
        return jsonify({'Salida':False})

#JOINS ENTRE TABLAS
@app.route('/inicio/<user>', methods=['GET'])
def getInicioCT(user):
    try:
        query = (Cuentas
                    .select((fn.IFNULL(Cuentas.SaldoTarjeta, 0) + fn.IFNULL(Cuentas.SaldoCuenta, 0) + Efectivo.Efectivo).alias('suma'))
                    .join(Users, join_type=JOIN.INNER, on=(Cuentas.Username == Users.Usuario))
                    .join(Efectivo, join_type=JOIN.INNER, on=(Efectivo.Username == Users.Usuario))
                    .where(Users.Usuario == user))
        for Saldo in query: 
            print(Saldo.suma)
            suma = Saldo.suma
        return jsonify(suma)
    except Exception as ex:
        print(ex)
        return jsonify("No Tienes Ingresos")


if __name__ == '__main__':
    app.debug = True