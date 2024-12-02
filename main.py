from fastapi import FastAPI
from schemas import promptrequest,promptresponse

app = FastAPI()

historico = []

def simulador(obj : promptrequest):
    tam = len(obj.mensagem)
    response = "aqui esta a reposta"
    tam1 = len(response)
    return promptresponse(resposta=response,keys_usadas={"keys_resposta":tam1,"key_pergunta": tam})

@app.post("/prompt")
def prompt(prompt : promptrequest):
    historico.append({"role":"usuario","content": prompt.mensagem})
    saida = simulador(prompt)
    #chat-bot vai receber a mensagem atual e o historico de mensagens,apos isso ele salva a nova resposta e retora ela
    historico.append({"papel":"chatbot","conteudo": saida.resposta})
    return saida
