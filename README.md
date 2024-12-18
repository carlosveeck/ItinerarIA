# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
=======
# ItinerarIA

Projeto feito para a disciplina de Desenvolvimento de Software pela equipe 4.

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
