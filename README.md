# ItinerarIA
![Logo](https://i.imgur.com/2TeXYsO.png)

Projeto feito para a disciplina de Desenvolvimento de Software pela equipe 4.

## Frameworks

Segue a documentação dos frameworks e bibliotecas utilizados para o projeto, necessárias para utilização do MVP.

- [Vite](https://vite.dev/guide/) -> Usado para visualizar e editar o site em tempo real remotamente
```
npm install -D vite
```
- [React/JSX](https://react.dev/reference/react) -> A base do nosso front-end, permitindo melhor integração entre javascript e html

- [TailwindCSS](https://tailwindcss.com/docs/installation) -> Integra o CSS ao jsx, simplificando o código e a leitura
```
npm install -D tailwindcss
```
- [FastAPI](https://fastapi.tiangolo.com/reference/) -> Permite a criação de nossa API própria
```
pip install "fastapi[standard]"
```
- [Uvicorn](https://www.uvicorn.org/) -> Cria um ambiente virtual onde nossa API consegue receber requests
```
pip install uvicorn
```
OBS: Uvicorn pode já vir instalado quando baixar a FastAPI
- [OpenAI API](https://platform.openai.com/docs/overview) -> A base da nossa api. Utilizamos o GPT 4o-Mini para selecionar lugares turísticos customizados para o usuário.
```
pip install openai
```

## Como usar

Certifique-se de ter Vite, TailwindCSS, Python3, FastAPI, uvicorn e OpenAI (para python) instalados.
Tenha disponível uma chave da OpenAI API (ou entre em contato com um membro do grupo para testes) e coloque ela entre as aspas da openai.api_key no arquivo api.py.

1. Rode o arquivo main.py no VS Code ou no terminal.

```
python3 main.py
```

2. Em outro terminal, ative a página web com:

```
npm run dev
```

**OBS: Caso ocorra o erro "Cannot find package ‘@vitejs/plugin-react'", utilize o comando abaixo e tente novamente**

```
npm install @vitejs/plugin-react — save-dev
```

3. Por fim, siga para a página indicada, que deve ser "http://localhost:5173".
