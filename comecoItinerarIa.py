import requests
from urllib.parse import quote
import json

# Entrada da cidade pelo usuário
cidade = input("Digite a cidade e estado que voce quer pesquisar no formato (Cidade/ES): ")
cidade_codificada = quote(cidade)
url = f"https://api.foursquare.com/v3/places/search?near={cidade_codificada}"

# Cabeçalhos da API
headers = {
    "accept": "application/json",
    "Authorization": "fsq3yswsYdZ6FnzhCUpBqWcj9IWgCF9f5q9NTKa9B+F3y3E="
}

# Requisição à API
response = requests.get(url, headers=headers)

# Verifica se a resposta é válida
if response.status_code == 200:
    dados = response.json()

    # Organizar os resultados
    resultados = dados.get("results", [])
    informacoes_formatadas = []

    for lugar in resultados:
        nome = lugar.get("name", "N/A")
        endereco = lugar.get("location", {}).get("formatted_address", "N/A")
        categoria = (
            lugar.get("categories", [{}])[0].get("name", "N/A")
            if lugar.get("categories")
            else "N/A"
        )
        distancia = lugar.get("distance", "N/A")
        horario = lugar.get("closed_bucket", "N/A")

        # Adiciona ao formato organizado
        informacoes_formatadas.append(
            f"Nome: {nome}\nCategoria: {categoria}\nEndereço: {endereco}\nDistância: {distancia} metros\nStatus: {horario}\n"
        )

    # Junta todas as informações em um único texto
    texto_final = "\n\n".join(informacoes_formatadas)

    # Caminho do arquivo de saída
    file_path = "output.txt"

    # Salva no arquivo
    with open(file_path, "w", encoding="utf-8") as file:
        file.write(texto_final)

    print(f"Dados salvos no arquivo '{file_path}' com sucesso!")
else:
    print(f"Erro na requisição: {response.status_code}")
