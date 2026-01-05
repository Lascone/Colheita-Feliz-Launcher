# 📤 Como Enviar para GitHub

## Passo 1: Criar Repositório no GitHub

1. Acesse [github.com](https://github.com)
2. Clique em **"New repository"** (canto superior direito)
3. Nome: `launcher-colheita-feliz`
4. Descrição: `Um launcher moderno para Colheita Feliz com suporte a Flash PPAPI`
5. Escolha **Private** (privado) ou **Public** (público)
6. ⚠️ **NÃO** selecione "Initialize with README" (já criamos um)
7. Clique em **"Create repository"**

## Passo 2: Conectar Repositório Local com GitHub

Depois de criar o repositório, você verá instruções. Execute estes comandos:

```bash
cd "c:\Users\magra\OneDrive\Documentos\Launcher Colheita Feliz"

git remote add origin https://github.com/SEU_USUARIO/launcher-colheita-feliz.git

git branch -M main

git push -u origin main
```

**Substitua `SEU_USUARIO` pelo seu nome de usuário do GitHub!**

## Passo 3: Autenticação

Se pedir **token de acesso**:

1. Acesse: https://github.com/settings/tokens
2. Clique em **"Generate new token"**
3. Selecione escopos: `repo` (completo)
4. Clique em **"Generate token"**
5. **Copie o token** (aparece apenas uma vez!)
6. Cola no terminal quando pedir senha

Se pedir **senha normalmente**:
- Use seu **email** como usuário
- Use sua **senha do GitHub**

## Status Atual do Repositório

```
✅ Git inicializado
✅ .gitignore criado (exclui node_modules)
✅ README.md detalhado criado
✅ Primeiro commit feito localmente
⏳ Aguardando: Envio para GitHub (git push)
```

## Verificar Status Local

```bash
git status              # Ver status
git log                 # Ver commits
git remote -v          # Ver repositórios remotos
```

## 🎯 Próximos Passos Recomendados

1. ✅ Crie conta no GitHub (se não tiver)
2. ✅ Execute os comandos de push
3. ✅ Verifique se aparece no GitHub
4. ✅ Configure as descrições do repositório
5. ✅ Adicione badges ao README (opcional)

## Dúvidas Frequentes

**P: Preciso instalar Git?**
- Sim, se ainda não tem: https://git-scm.com/download/win

**P: Posso fazer isso sem terminal?**
- Sim! Use **GitHub Desktop**: https://desktop.github.com/

**P: Como faço commits depois?**
```bash
git add .
git commit -m "Descrição das mudanças"
git push
```

**P: Qual token/senha usar?**
- Se GitHub pediu para gerar token, use o token
- Se GitHub pediu senha, use sua senha
- Email sempre é seu email do GitHub

---

## ⚠️ IMPORTANTE

Não faça commit dos arquivos:
- `node_modules/` (está em .gitignore)
- `pepflashplayer32_34_0_0_330.dll` (arquivo grande, opcional)
- `pepflashplayer64_34_0_0_330.dll` (arquivo grande, opcional)

O `.gitignore` já está configurado para isso!

---

Qualquer dúvida, avise! 🌾
