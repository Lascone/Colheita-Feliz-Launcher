# 🛠️ Guia de Desenvolvimento

## Como Contribuir ao Projeto

### Estrutura de Commits

Use mensagens descritivas em português:

```bash
git commit -m "Adiciona: descrição breve"
git commit -m "Corrige: descrição do bug"
git commit -m "Melhora: descrição da otimização"
```

### Branches para Desenvolvimento

Se quer adicionar features:

```bash
git checkout -b feature/sua-feature
# ... faça as mudanças ...
git push -u origin feature/sua-feature
```

### Como Adicionar Novas Features

1. **Editar main.js**
2. **Testar localmente:** `npm start`
3. **Criar commit:** `git add . && git commit -m "..."`
4. **Fazer push:** `git push`

## Modificações Comuns

### Adicionar Novo Item ao Menu

Edite a seção `CRIA MENU DROPDOWN` em main.js:

```javascript
dropdown.innerHTML = \`
  // ... itens existentes ...
  <div class="menu-item" onclick="window.sua_funcao()" title="Descrição">
    <span class="menu-icon">emoji</span> Seu Item
  </div>
\`;
```

Depois crie a função:

```javascript
window.sua_funcao = () => require('electron').ipcRenderer.send('seu-evento');
```

E o handler IPC:

```javascript
ipcMain.on('seu-evento', () => {
  // Lógica aqui
});
```

### Alterar Cores do Tema

Procure por `/* ... */` no CSS injetado em main.js:

```javascript
mainWindow.webContents.insertCSS(`
  /* EDITE AS CORES AQUI */
  .launcher-menu-toggle {
    background: linear-gradient(135deg, #COR1 0%, #COR2 100%);
  }
`);
```

Cores recomendadas:
- Verde: `#90EE90`, `#7CFC00`, `#228B22`
- Ouro: `#FFD700`, `#FFA500`, `#FF8C00`
- Rosa: `#FFB6C1`, `#FFC0CB`, `#FF1493`
- Marrom: `#8B4513`, `#A0522D`, `#654321`

### Adicionar Nova Função de Atalho

1. Registre o atalho em `Atalhos de teclado globais`:

```javascript
globalShortcut.register('Ctrl+S', () => {
  mainWindow.webContents.send('seu-evento');
});
```

2. Adicione ao console logs para debug:

```javascript
console.log('🎮 Atalho pressionado!');
```

## Debugging

### Ver Console do Navegador

Pressione **F12** enquanto o launcher está rodando.

### Ver Logs do Electron

```bash
npm start 2>&1 | tee output.log
```

### Inspecionar Elementos

1. Pressione **F12**
2. Clique em "Inspector"
3. Clique no elemento que quer inspecionar

### Verificar Performance

No console:

```javascript
console.time('meu-teste');
// ... código ...
console.timeEnd('meu-teste');
```

## Testes

### Testar em Diferentes Resoluções

1. Abra DevTools (F12)
2. Clique em "Responsive Design Mode"
3. Teste diferentes tamanhos

### Testar Funcionalidades

**Menu:**
- [ ] ☰ Menu abre/fecha
- [ ] Cada botão funciona
- [ ] Menu fecha ao clicar em um item

**Credenciais:**
- [ ] Modal aparece ao fazer login
- [ ] Sim/Não funcionam
- [ ] Próximo login preenchido automaticamente
- [ ] Não salvar = sem preenchimento

**Cache:**
- [ ] Clique em "Limpar Cache"
- [ ] Página recarrega
- [ ] Histórico permanece

**Atalhos:**
- [ ] F5 = recarrega
- [ ] Alt+← = volta
- [ ] Alt+→ = avança
- [ ] Esc = sai

## Build para Distribuição

### Criar Executável Windows 32-bit

```bash
npm run build
```

O executável será criado em:
```
./Colheita Feliz-win32-ia32/
```

### Criar Installer (Opcional)

Instale `electron-builder`:

```bash
npm install --save-dev electron-builder
```

Adicione ao package.json:

```json
"build": {
  "appId": "br.com.colheitafeliz.launcher",
  "productName": "Launcher Colheita Feliz",
  "win": {
    "target": ["nsis"],
    "certificateFile": null,
    "certificatePassword": null
  }
}
```

Execute:

```bash
npx electron-builder
```

## Problemas Comuns

### Erro: "Flash Player não encontrado"

```
❌ Solução: Coloque pepflashplayer32_34_0_0_330.dll no diretório raiz
```

### Erro: "Cannot find module 'electron'"

```bash
npm install
```

### Erro: "Port 3000 already in use"

Flash já está rodando em outra instância. Feche todas e tente novamente.

### Menu não aparece

Verifique se o JavaScript foi injetado:

```javascript
console.log('🌾 Interface Launcher injetada com sucesso!');
```

Procure esta mensagem no console (F12).

## Recursos Úteis

- [Documentação Electron](https://www.electronjs.org/docs)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Node.js Docs](https://nodejs.org/docs/)
- [CSS Tricks](https://css-tricks.com/)

## Roadmap Futuro

- [ ] Suporte a múltiplas contas (beta v2.0)
- [ ] Tema escuro (v2.0)
- [ ] Notificações (v2.1)
- [ ] Discord RPC (v2.2)
- [ ] Configurações persistentes (v2.3)

---

Happy coding! 🌾✨
