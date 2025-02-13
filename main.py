from fastapi import FastAPI,Depends,HTTPException
import openai
import json
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
import datetime

from database import login_aux

SECRET_KEY = "voce nao esta vendo isso"
ALGORITHM = "HS256"

# Criando o esquema OAuth2
#OAuth2PasswordBearer: Uma forma de extrair tokens de uma requisição HTTP, normalmente usada para autenticação com OAuth2 e JWT.
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app = FastAPI()

historico = [
    {"role": "system", "content": "Você é um assistente útil e deve fornecer todas as respostas completamente em português (pt-BR)."},
    {"role": "system", "content": "O objetivo é sugerir os 3 pontos turísticos mais relevantes para o itinerário, considerando sua importância histórica e cultural,se o cliente mandar alguma especificação siga elas. sem caracteres invalidos ou quebras de linha na resposta"},
    {"role": "system", "content": "Você deve gerar a resposta no formato JSON com o padrão 'itinerario:[]', sem quebras de linha, para ser transformada em um objeto Python. Se algum dado estiver ausente ou como 'N/A', preencha com informações adequadas, mantendo o formato correto."},
    {"role": "system", "content": "Além disso, leve em consideração as distâncias entre os locais para garantir que o usuário consiga visitar todos os pontos de forma eficiente, estabelecendo horários ideais de visitação. Organize o itinerário por dia, começando sempre pelo ponto mais relevante e acessível."},
    {
    "role": "system", 
    "content": "Ao reportar os dados dos locais turísticos, você deve estruturá-los da seguinte forma: cada local deve ser representado por um objeto com as seguintes chaves: 'Nome', 'descrição', 'categoria', 'endereço', 'horario', 'horario_recomendado_visita', 'instagram','site' e 'telefone'"}
]

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

@app.post("/token")
def login(usuario:str,senha:str):
    if(login_aux(usuario,senha)):
        token = criar_jwt(usuario)
        return {"access_token": token, "token_type": "bearer"}
    else:
        raise HTTPException(status_code=400, detail="Credenciais inválidas")


@app.post("/prompt")
def prompt(prompt : str):
    historico.append({"role": "user","content": prompt})
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
        #historico.append({"role": "assistant", "content": dict_resposta}) (por enquanto nao precisa disso)
        return dict_resposta
    except Exception as e:
        return {"error": str(e)}
