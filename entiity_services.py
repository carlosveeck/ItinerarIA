import re 
import bcrypt

def criar_hash_senha(senha):
    valido = aux(senha)
    if(valido):
        senha_bytes = senha.encode('utf-8')
        salt = bcrypt.gensalt()
        senha_hash = bcrypt.hashpw(senha_bytes,salt)
        return senha_hash
    else:
        raise ValueError("Senha inválida! A senha deve ter pelo menos 8 caracteres, incluindo maiúsculas, minúsculas, números e caracteres especiais.")

def aux(senha):
    padrao = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$'
    # (?=.*[a-z]) → Pelo menos uma letra minúscula
    # (?=.*[A-Z]) → Pelo menos uma letra maiúscula
    # (?=.*\d) → Pelo menos um número
    # (?=.*[@$!%*?&]) → Pelo menos um caractere especial (@$!%*?&)
    # [A-Za-z\d@$!%*?&]{8,} → No mínimo 8 caracteres de qualquer tipo permitido
    return bool(re.match(padrao, senha))

def aux_user(usuario):
    padrao = r'^[a-zA-Z0-9_]{3,}$'
    return bool(re.fullmatch(padrao,usuario))

def criar_nome(usuario):
    if(aux_user(usuario)):
        return usuario
    raise ValueError("usuario inváido")

def verificar_senha(senha_digitada,senha_hash):
    senha_bytes = senha_digitada.encode('utf-8')
    return bcrypt.checkpw(senha_bytes,senha_hash)