from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import IntegrityError
from entities import Base,Usuario,Detalhes,Itinerarios
from entiity_services import verificar_senha
import json
from collections import deque

from entiity_services import criar_nome,aux

db = create_engine("sqlite:///dados.db")
Session = sessionmaker(bind=db)
Base.metadata.create_all(bind=db)

with Session() as session:
    def criar_usuario(nome,senha):
        try:
            if(aux(senha) and criar_nome(nome) and verificar_usuario(nome)):
                it = Itinerarios()
                session.add(it)
                session.commit()
                det = Detalhes()
                session.add(det)
                session.commit()
                novo = Usuario(nome,it.id,det.id,senha)
                session.add(novo)
                session.commit()
                return True
        except ValueError:
            session.rollback()
            return False
        except IntegrityError:
            session.rollback()
            return False

    def login_aux(usuario,senha):
        senha_database = session.query(Usuario).filter(Usuario.nome == usuario).with_entities(Usuario.senha).scalar()
        if(senha_database):
            verificacao = verificar_senha(senha,senha_database)
            if(verificacao):
                return True
            else:
                #"Senha incorreta!"
                return False
        else:
            #"Usuário não existe!"
            return False

    def pegar_preferencias(usuario):
        return session.query(Usuario,Detalhes).join(Detalhes).filter(Usuario.nome == usuario).with_entities(Detalhes.preferencias).scalar()

    def salvar_itinerario(usuario,itinerario):
        aux = json.dumps(itinerario)
        it = session.query(Itinerarios).join(Usuario).filter(Usuario.nome == usuario).first()
        it.itinerario_atual = aux
        session.commit()
    
    def pegar_itinerario(usuario):
        it = session.query(Itinerarios).join(Usuario).filter(Usuario.nome == usuario).first()

        if not it or it.itinerario_atual is None: # retorna json vazio caso não haja itinerario
            return []

        return json.loads(it.itinerario_atual)
          
    def atualizar_perfil(usuario,pais,data_nascimento,preferencias):
        aux = session.query(Detalhes).join(Usuario).filter(Usuario.nome == usuario).first()
        aux.pais = pais
        aux.preferencias = preferencias
        aux.data_nascimento = data_nascimento
        session.commit()
    
    def pegar_perfil(usuario):
        aux = session.query(Detalhes.pais,Detalhes.preferencias,Detalhes.data_nascimento).join(Usuario).filter(Usuario.nome == usuario).first()
        return aux
    
    def verificar_usuario(usuario):
        aux = session.query(Usuario).filter(Usuario.nome == usuario).first()
        if aux == None:
            return True
        else:
            return False
        
def salvar_ultimo_itinerario(usuario,itinerario, num):
        aux = json.dumps(itinerario)
        it = session.query(Itinerarios).join(Usuario).filter(Usuario.nome == usuario).first()
        # lista = deque([it._1itinerario,it._2itinerario,it._3itinerario],maxlen=3)
        # lista.appendleft(aux)
        lista = [it._1itinerario, it._2itinerario, it._3itinerario]
        lista[num] = aux
        it._1itinerario,it._2itinerario,it._3itinerario = lista[0],lista[1],lista[2]
        session.commit()    

def pegar_ultimo_itinerario(usuario,num):
    it = session.query(Itinerarios._1itinerario,Itinerarios._2itinerario,Itinerarios._3itinerario).join(Usuario).filter(Usuario.nome == usuario).first()
    if it[num] != None:
        return json.loads(it[num])
    else:
        return None
    
def delete_itinerario(usuario, num):
    it = session.query(Itinerarios).join(Usuario).filter(Usuario.nome == usuario).first()
    # lista = deque([it._1itinerario,it._2itinerario,it._3itinerario],maxlen=3)
    # lista.appendleft(aux)
    lista = [it._1itinerario, it._2itinerario, it._3itinerario]
    lista[num] = None
    it._1itinerario,it._2itinerario,it._3itinerario = lista[0],lista[1],lista[2]
    session.commit() 