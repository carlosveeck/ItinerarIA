from fastapi import FastAPI
from schemas import promptrequest,promptresponse

app = FastAPI()
# colocar essa mensagem como primeira interação({"role": "system", "content": "Você é um assistente útil."})
historico = []

#url para chat interativo(https://api.openai.com/v1/chat/completions)

def simulador(obj : promptrequest):
    tam = len(obj.mensagem)
    response = "aqui esta a reposta"
    tam1 = len(response)
    return promptresponse(resposta=response,keys_usadas={"keys_resposta":tam1,"key_pergunta": tam})

@app.post("/prompt")
def prompt(prompt : promptrequest):
    historico.append({"role":"user","content": prompt.mensagem})
    saida = simulador(prompt)
    #chat-bot vai receber a mensagem atual e o historico de mensagens,apos isso ele salva a nova resposta e retora ela
    historico.append({"role":"assistant","content": saida.resposta})
    return saida
