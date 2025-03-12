from sqlalchemy import Column,Integer,String,ForeignKey,JSON,Date
from sqlalchemy.orm import declarative_base,relationship

from entiity_services import criar_hash_senha

Base = declarative_base()

class Usuario(Base):
    __tablename__ = "user"
    id = Column(Integer,primary_key=True,autoincrement=True,)
    nome = Column(String,nullable=False,unique=True)
    senha = Column(String,nullable=False)
    detalhes_id = Column(Integer,ForeignKey("detalhes.id"))
    Itinerarios_id = Column(Integer,ForeignKey("itinerarios.id"))

    relacao_detalhes = relationship("Detalhes",back_populates="relacao_usuario")
    relacao_itinerario = relationship("Itinerarios",back_populates="relacao_usuario_2")

    def __init__(self,nome,it,det,senha):
        self.nome = nome
        self.Itinerarios_id = it
        self.detalhes_id = det
        self.senha = criar_hash_senha(senha)
    

class Detalhes(Base):
    __tablename__ = "detalhes"
    id = Column(Integer,primary_key=True,autoincrement=True)
    preferencias = Column(String)
    pais = Column(String)
    data_nascimento = Column(Date)

    relacao_usuario = relationship("Usuario",back_populates="relacao_detalhes")

    def __init__(self):
        pass
        

class Itinerarios(Base):
    __tablename__ = "itinerarios"
    id = Column(Integer,primary_key=True,autoincrement=True)
    itinerario_atual = Column(JSON)
    ultimo_itinerario = Column(JSON)

    relacao_usuario_2 = relationship("Usuario",back_populates="relacao_itinerario")

    def __init__(self):
        pass

