from fastapi import FastAPI,Depends,HTTPException,Body
import openai
import json
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware
from jose import jwt, JWTError
import datetime
from pydantic import BaseModel

from database import login_aux,criar_usuario,atualizar_perfil,pegar_preferencias,salvar_itinerario,pegar_itinerario,pegar_ultimo_itinerario,salvar_ultimo_itinerario,pegar_perfil
SECRET_KEY = "voce nao esta vendo isso"
ALGORITHM = "HS256"

# Criando o esquema OAuth2
#OAuth2PasswordBearer: Uma forma de extrair tokens de uma requisição HTTP, normalmente usada para autenticação com OAuth2 e JWT.
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

app = FastAPI()

origins = [
    "http://localhost:5173", 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

historico = [
    {"role": "system", "content": "Você é um assistente útil e deve fornecer todas as respostas completamente em português (pt-BR)."},
    {"role": "system", "content": "O objetivo é sugerir os 3 pontos turísticos mais relevantes para o itinerário, considerando sua importância histórica e cultural,se o cliente mandar alguma especificação siga elas. sem caracteres invalidos ou quebras de linha na resposta"},
    {"role": "system", "content": "Você deve gerar a resposta no formato JSON com o padrão 'itinerario:[]', sem quebras de linha, para ser transformada em um objeto Python. Se algum dado estiver ausente ou como 'N/A', preencha com informações adequadas, mantendo o formato correto."},
    {"role": "system", "content": "Além disso, leve em consideração as distâncias entre os locais para garantir que o usuário consiga visitar todos os pontos de forma eficiente, estabelecendo horários ideais de visitação. Organize o itinerário por dia, começando sempre pelo ponto mais relevante e acessível."},
    {
    "role": "system", 
    "content": "Ao reportar os dados dos locais turísticos, você deve estruturá-los da seguinte forma: cada local deve ser representado por um objeto com as seguintes chaves: 'Nome', 'descricao', 'categoria', 'endereco' e 'horario_recomendado_visita'"}
]

class RegisterRequest(BaseModel):
    usuario: str
    senha: str

class LoginRequest(BaseModel):
    usuario: str
    senha: str

class PromptRequest(BaseModel):
    prompt: str

class ProfileRequest(BaseModel):
    pais: str
    data_nascimento : datetime.date
    preferencias : str

openai.api_key = ""

def criar_jwt(username: str):
    payload = {
        "sub": username,
        "exp": datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=1)
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return token

def verificar_jwt(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Token inválido")
        return username
    except JWTError:
        raise HTTPException(status_code=401, detail="Token inválido ou expirado")

@app.get("/")
async def base():
    return "OK"

@app.post("/register")
def register(data : RegisterRequest):
    if(criar_usuario(data.usuario,data.senha)):
        return {"validado":"valido"}
    else:
        raise HTTPException(status_code=400, detail="Usuario ou senha inválido")

@app.post("/login")
def login(data : LoginRequest):
    if(login_aux(data.usuario,data.senha)):
        token = criar_jwt(data.usuario)
        return {"access_token": token, "token_type": "bearer"}
    else:
        raise HTTPException(status_code=400, detail="Credenciais inválidas")

@app.post("/prompt")
def prompt(prompt : PromptRequest,usuario :str = Depends(verificar_jwt)):
    if(openai.api_key == ""):
        resposta_ia = {"itinerario": [{"Nome": "Por favor insira uma chave OpenAI"}]}
        return resposta_ia
    else:
        preferencias_usuario = pegar_preferencias(usuario)
        if(preferencias_usuario != None):
            historico.append({"role" : "user","content" : f"preferências do usuário :{preferencias_usuario}"})
        historico.append({"role": "user","content": prompt.prompt})
        try:
            response = openai.chat.completions.create(
                    model="gpt-4o-mini",
                    messages=historico,
                    max_tokens=6000,
                    temperature=0.7
                )   
            resposta_ia = response.choices[0].message.content
            historico.pop() #para as requisicoes antigas nao ficarem no historico
            dict_resposta = json.loads(resposta_ia)
            salvar_itinerario(usuario, dict_resposta)
            return dict_resposta
        except Exception as e:
            return {"error": str(e)}

@app.get("/reload")
def recarregar_itinerario(usuario: str = Depends(verificar_jwt)):
    return pegar_itinerario(usuario)

@app.get("/last_itinerary")
def ultimo_itinerario(usuario:str = Depends(verificar_jwt)):
    return pegar_ultimo_itinerario(usuario)

@app.post("/save")
def salvar(itinerario:dict,usuario:str = Depends(verificar_jwt)):
    salvar_ultimo_itinerario(usuario,itinerario)
    return {"salvo": "salvo"}

@app.post("/att_profile")
def att_perfil(dados : ProfileRequest,usuario:str = Depends(verificar_jwt)):
    atualizar_perfil(usuario,dados.pais,dados.data_nascimento,dados.preferencias)
    return {"att":"att"}

@app.get("/profile")
def perfil(usuario:str = Depends(verificar_jwt)):
    perf = pegar_perfil(usuario)
    return {"usuario" : usuario,"pais" : perf[0],"preferencias" : perf[1],"data_nascimento" : perf[2]}
