from fastapi import FastAPI
import openai

app = FastAPI()
# essa primeira mensagem é tipo uma instruçao para a ia
historico = [{"role": "system", "content": "Você é um assistente útil."}]

# Sua chave de API da OpenAI
openai.api_key = ""

@app.post("/prompt")
def prompt(prompt : str):
    historico.append({"role":"user","content": prompt})
    try:
        response = openai.chat.completions.create(
                model="gpt-4",
                messages=historico,
                max_tokens=20,
                temperature=0.7
            )
        
        resposta_ia = response.choices[0].message.content
        historico.append({"role": "assistant", "content": resposta_ia})
        #printando o historico por enquanto para visualizar no /docs
        return historico
    except Exception as e:
        return {"error": str(e)}
