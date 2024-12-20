from fastapi import FastAPI
from pydantic import BaseModel
import openai
from fastapi.middleware.cors import CORSMiddleware
import json

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

class Request(BaseModel):
    username: str
    user_input: str


historico = [
    {"role": "system", "content": "Você é um assistente útil e deve fornecer todas as respostas completamente em português (pt-BR)."},
    {"role": "system", "content": "O objetivo é sugerir os 3 pontos turísticos mais relevantes para o itinerário, considerando sua importância histórica e cultural,se o cliente mandar alguma especificação siga elas. sem caracteres invalidos ou quebras de linha na resposta"},
    {"role": "system", "content": "Você deve gerar a resposta no formato JSON com o padrão 'itinerario:[]', sem quebras de linha, para ser transformada em um objeto Python. Se algum dado estiver ausente ou como 'N/A', preencha com informações adequadas, mantendo o formato correto."},
    {"role": "system", "content": "Além disso, leve em consideração as distâncias entre os locais para garantir que o usuário consiga visitar todos os pontos de forma eficiente, estabelecendo horários ideais de visitação. Organize o itinerário por dia, começando sempre pelo ponto mais relevante e acessível."},
    {
    "role": "system", 
    "content": "Ao reportar os dados dos locais turísticos, você deve estruturá-los da seguinte forma: cada local deve ser representado por um objeto com as seguintes chaves: 'Nome', 'descricao', 'categoria', 'endereço', 'horario', 'horario_recomendado_visita', 'instagram','site' e 'telefone'"}
]

openai.api_key = ""

@app.post("/prompt")
async def prompt(prompt : Request):
    historico.append({"role": "user","content": prompt.user_input})
    try:
        response = openai.chat.completions.create(
                model="gpt-4o-mini",
                messages=historico,
                max_tokens=6000,
                temperature=0.7
            )
        
        resposta_ia = response.choices[0].message.content
        historico.pop() #para as requisicoes antigas nao ficarem no historico
        dict_resposta = json.dumps(resposta_ia)
        #historico.append({"role": "assistant", "content": dict_resposta}) (por enquanto nao precisa disso)
        return dict_resposta
    except Exception as e:
        return {"error": str(e)}
