from pydantic import BaseModel

class promptrequest(BaseModel):
    mensagem : str
    parametros : dict

class promptresponse(BaseModel):
    resposta : str
    #ajudar no controle de quantas keys estao sendo usadas
    keys_usadas : dict

