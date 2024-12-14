from fastapi import FastAPI
import openai
import requests
from urllib.parse import quote
import json

app = FastAPI()

historico = [
    {"role": "system", "content": "Você é um assistente útil."},
    {"role": "system", "content": "Você deve fazer um itinerario personalizado usando os dasos enviados pelo sistema"},
    {"role": "system", "content": "Você deve gerar uma resposta em string no formato json,mas sem quebra de linhas,para ser transformado em um objeto python,se os dados enviados a voce estiverem como N/A complemente eles com seus dados"},
    {"role": "system", "content": "Você deve considerar as distâncias entre os locais e fornecer um horário ideal para a visita a cada local, garantindo que o usuário consiga visitar todos os pontos de forma eficiente."}
]

openai.api_key = ""

@app.post("/prompt")
def prompt(prompt : str):

    cidade_codificada = quote(prompt)
    url = f"https://api.foursquare.com/v3/places/search?near={cidade_codificada}"
    headers = {
    "accept": "application/json",
    "Authorization": "fsq3yswsYdZ6FnzhCUpBqWcj9IWgCF9f5q9NTKa9B+F3y3E="
    }
    request = requests.get(url,headers=headers)
    resposta_dict = request.json()
    data = []
    for local in resposta_dict["results"]:
        nome = local.get("name")
        categoria = local.get("categories",[{}])[0].get("name","N/A")
        endereço = local.get("location",{}).get("formatted_address","N/A")
        horario = local.get("hours",{}).get("display","N/A")
        instagram = local.get("social_media",{}).get("instagram","N/A")
        telefone = local.get("tel","N/A")
        obj = {
            "Nome": nome,
            "descrição": "N/A", 
            "categoria" : categoria, 
            "endereço" : endereço, 
            "horario": horario, 
            "horario_recomendado_visita" : "N/A" ,
            "instagram" : instagram, 
            "telefone" : telefone}
        data.append(obj)
    historico.append({"role": "system", "content": f"Dados externos{data}"})


    try:
        response = openai.chat.completions.create(
                model="gpt-4",
                messages=historico,
                max_tokens=2000,
                temperature=0.7
            )
        
        resposta_ia = response.choices[0].message.content
        dict_resposta = json.loads(resposta_ia)
        historico.append({"role": "assistant", "content": dict_resposta})
        return historico
    except Exception as e:
        return {"error": str(e)}
