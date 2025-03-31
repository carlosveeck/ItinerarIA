import pytest
from database import *
from entiity_services import *
from datetime import datetime


#TESTES INDIVIDUAIS DE SERVIÇOS

def test_senha_valida():
    teste = aux("Kk1*1111")
    assert teste == True

def test_senha_invalida():
    teste = aux("kk1*1111")
    assert teste == False

def test_user_valido():
    teste = aux_user("teste")
    assert teste == True

def test_user_invalido():
    teste = aux_user("te")
    assert teste == False

#TESTES DE INTEGRAÇÃO COM DB

def test_usuario_inexistente():
    assert verificar_usuario("teste") == True

def test_criar_usuario():
    assert criar_usuario("teste","Kk1*1111") == True

def test_criar_usuario_senha_errada():
    assert criar_usuario("teste","aaaaaa") == None

def test_criar_usuario_errado():
    assert criar_usuario("te&&","Kk1*1111") == False

def test_usuario_existente():
    assert verificar_usuario("teste") == False

def test_login_cred_certas():
    assert login_aux("teste","Kk1*1111") == True

def test_login_cred_erradas():
    assert login_aux("tese","Kk1*1111") == False

def test_salvar_pegar_itinerario():
    salvar_itinerario("teste",{"a" : "a"})
    assert pegar_itinerario("teste") == {"a" : "a"}

def test_att_pegar_perfil():
    atualizar_perfil("teste","Brasil",datetime.strptime("2000-01-01","%Y-%m-%d"),"jogos") 
    assert pegar_perfil("teste") == ("Brasil","jogos",datetime(2000,1,1).date())

def test_salvar_pegar_itinerarios_antigos():
    salvar_ultimo_itinerario("teste",{"a" : "a"},0)
    salvar_ultimo_itinerario("teste",{"b" : "b"},1)
    salvar_ultimo_itinerario("teste",{"c" : "c"},2)

    assert pegar_ultimo_itinerario("teste",0) == {"a" : "a"}
    assert pegar_ultimo_itinerario("teste",1) == {"b" : "b"}
    assert pegar_ultimo_itinerario("teste",2) == {"c" : "c"}

    salvar_ultimo_itinerario("teste",{"d" : "d"},0)

    assert pegar_ultimo_itinerario("teste",0) == {"d" : "d"}


