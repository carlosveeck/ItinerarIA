from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import IntegrityError
from entities import Base,Usuario,Detalhes,Itinerarios
from entiity_services import verificar_senha
import json

from entiity_services import criar_hash_senha,criar_nome,aux

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
    
    def salvar_ultimo_itinerario(usuario,itinerario):
        aux = json.dumps(itinerario)
        it = session.query(Itinerarios).join(Usuario).filter(Usuario.nome == usuario).first()
        it.ultimo_itinerario = aux
        session.commit()

    def pegar_itinerario(usuario):
        it = session.query(Itinerarios).join(Usuario).filter(Usuario.nome == usuario).first()
        return json.loads(it.itinerario_atual)
    
    def pegar_ultimo_itinerario(usuario):
        it = session.query(Itinerarios).join(Usuario).filter(Usuario.nome == usuario).first()
        return json.loads(it.ultimo_itinerario)
    
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
