from pydantic import BaseModel

class promptrequest(BaseModel):
    model : str
    messages : list
    max_tokens : int
    temperature : float

class promptresponse(BaseModel):
    message : dict
    #para controle de tokens usados
    usage : dict

