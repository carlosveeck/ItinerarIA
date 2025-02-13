from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from entities import Base,Usuario,Detalhes,Itinerarios
from entiity_services import verificar_senha

db = create_engine("sqlite:///dados.db")
Session = sessionmaker(bind=db)
Base.metadata.create_all(bind=db)

with Session() as session:
    def criar_usuario(nome,email,senha):
        try:
            it = Itinerarios()
            session.add(it)
            session.commit()
            det = Detalhes()
            session.add(det)
            session.commit()
            novo = Usuario(nome,email,it.id,det.id,senha)
            session.add(novo)
            session.commit()
        except ValueError as e:
             return {"error": str(e)}

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
