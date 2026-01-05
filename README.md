# 🌾 Launcher Colheita Feliz 🌾

Um launcher moderno e fofinho para o jogo **Colheita Feliz**, desenvolvido com **Electron** e otimizado para **Flash Player PPAPI**.

## 📋 Sobre o Projeto

O **Launcher Colheita Feliz** é uma aplicação desktop que oferece uma experiência melhorada ao jogar Colheita Feliz no navegador. Com uma interface amigável, gerenciamento automático de credenciais e utilitários práticos, este launcher torna a experiência de jogo mais confortável e intuitiva.

### 🎯 Características Principais

- ✅ **Suporte a Flash Player PPAPI** - Compatível com a versão 34.0.0.330
- ✅ **Interface Fofinha** - Design cute com tema farm (emojis, gradientes coloridos)
- ✅ **Menu Expansível** - Botão ☰ com navegação e utilitários
- ✅ **Auto-Login** - Salva e auto-preenche credenciais do usuário
- ✅ **Confirmação de Senha** - Pergunta se deseja salvar senha antes de submeter
- ✅ **Limpar Cache** - Função para limpar cache do navegador
- ✅ **Botão de Ajuda** - Modal com dicas e informações de atalhos
- ✅ **Decorações Flutuantes** - Emojis animados (🌻🌽🥕🐔)
- ✅ **Barra de Informações** - Rodapé com branding
- ✅ **Atalhos de Teclado** - F5, Alt+← , Alt+→, Esc

## 🚀 Começando

### Pré-requisitos

- **Node.js** 12.0 ou superior
- **npm** ou **yarn**
- **Windows** (otimizado para Win32 ia32)

### Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/magra/launcher-colheita-feliz.git
   cd launcher-colheita-feliz
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Coloque o Flash Player no diretório raiz:**
   - Certifique-se de que o arquivo `pepflashplayer32_34_0_0_330.dll` está presente

4. **Coloque o ícone:**
   - Adicione o arquivo `icon.ico` ao diretório raiz (opcional, mas recomendado)

### Executando o Launcher

**Modo desenvolvimento:**
```bash
npm start
```

**Build (criar executável):**
```bash
npm run build
```

## 📂 Estrutura do Projeto

```
launcher-colheita-feliz/
├── main.js                          # Arquivo principal (Electron)
├── package.json                     # Dependências e scripts
├── .gitignore                       # Arquivos ignorados pelo git
├── icon.ico                         # Ícone da janela
├── trator.png                       # Imagem de branding
├── pepflashplayer32_34_0_0_330.dll  # Plugin Flash PPAPI 32-bit
└── README.md                        # Este arquivo
```

## 🎮 Como Usar

### Navegação

1. **Menu Verde (☰)** - Clique no botão verde no canto superior esquerdo para abrir o menu com:
   - ◀ **Voltar** - Volta à página anterior
   - ▶ **Avançar** - Vai para próxima página
   - ↻ **Recarregar** - Atualiza a página
   - 🏠 **Inicial** - Volta à página inicial
   - 🗑️ **Limpar Cache** - Limpa cache e recarrega

2. **Botão de Ajuda (❓)** - Clique no botão rosa para ver informações de atalhos

### Salvando Credenciais

1. **Primeiro Login:** Ao fazer login, um modal perguntará se você quer salvar a senha
2. **Próximas Vezes:** Os campos de usuário e senha serão preenchidos automaticamente
3. **Privacidade:** As credenciais são armazenadas localmente no navegador (`localStorage`)

### Atalhos de Teclado

| Tecla | Ação |
|-------|------|
| **F5** | Recarregar página |
| **Alt + ←** | Voltar |
| **Alt + →** | Avançar |
| **Esc** | Sair do launcher |

## 🔧 Configuração Técnica

### Flash Player

O launcher está configurado para usar **Flash Player PPAPI** versão 34.0.0.330:

- **Caminho padrão:** `pepflashplayer32_34_0_0_330.dll`
- **Porquê 34.0.0.330?** Última versão do Flash com suporte a PPAPI no Electron
- **Electron 11.5.0:** Versão específica que mantém suporte a PPAPI

### Segurança

O launcher desativa algumas proteções de segurança para permitir Flash Player funcionar:

```javascript
app.commandLine.appendSwitch('disable-web-security');
app.commandLine.appendSwitch('allow-running-insecure-content');
app.commandLine.appendSwitch('no-sandbox');
```

**⚠️ Nota:** Isso é necessário APENAS para sites HTTP legados com Flash.

### Armazenamento Local

As credenciais são armazenadas com a chave:
```
launcher-credenciais-colheita
```

Formato:
```json
{
  "usuario": "seu_usuario",
  "senha": "sua_senha",
  "data": "2026-01-05T12:34:56.789Z"
}
```

## 🎨 Design e Temas

### Paleta de Cores

- **Barra de Título:** Ouro/Laranja (`#FFD700` - `#FFA500`)
- **Menu:** Verde Limão (`#90EE90` - `#7CFC00`)
- **Ajuda:** Rosa (`#FFB6C1` - `#FFC0CB`)
- **Cache:** Verde Escuro (`#228B22`)
- **Rodapé:** Marrom (`#8B4513`)

### Tipografia

- **Fonte Principal:** Comic Sans MS (cursiva)
- **Tamanho Base:** 16px
- **Emojis:** 🌾🌻🌽🥕🐔

## 📦 Dependências Principais

```json
{
  "electron": "^11.5.0",
  "electron-packager": "^17.1.2"
}
```

### Por que Electron 11.5.0?

- Última versão com suporte nativo a **Flash PPAPI**
- Versões mais recentes removeram PPAPI completamente
- Mantém compatibilidade com Windows 7+

## 🐛 Troubleshooting

### "Flash Player não funciona"

1. Verifique se `pepflashplayer32_34_0_0_330.dll` está no diretório raiz
2. Certifique-se de usar **Electron 11.5.0** (não mais recente)
3. Teste em modo desenvolvimento: `npm start`

### "Não consigo salvar credenciais"

1. Verifique se o `localStorage` está habilitado
2. Confirme o modal antes de fazer o login
3. Limpe o cache e tente novamente

### "Menu não aparece"

1. Aguarde a página carregar completamente
2. Tente recarregar: F5
3. Verifique o console: F12

## 🔄 Atualizações Futuras

- [ ] Suporte a múltiplas contas
- [ ] Configurações de zoom persistentes
- [ ] Tema escuro
- [ ] Notificações de eventos do jogo
- [ ] Integração com Discord RPC

## 📄 Licença

Este projeto é de uso pessoal e educacional. O jogo Colheita Feliz pertence aos seus respectivos donos.

## 👨‍💻 Desenvolvimento

### Estrutura do Código Principal

**main.js** é dividido em seções:

1. **Configuração de Flash** (linhas 1-23)
   - Switches de command line
   - Caminho do plugin PPAPI

2. **Criação da Janela** (linhas 25-685)
   - Configuração de webPreferences
   - Injeção de CSS
   - Injeção de JavaScript

3. **CSS Injetado** (linhas 61-410)
   - Estilos do menu
   - Estilos do modal
   - Animações

4. **JavaScript Injetado** (linhas 412-685)
   - Criação de elementos DOM
   - Sistema de credenciais
   - Event listeners

5. **Atalhos de Teclado** (linhas 687-700)
   - F5, Escape, Alt+Left, Alt+Right

6. **IPC Handlers** (linhas 702-741)
   - launcher-back
   - launcher-forward
   - launcher-reload
   - launcher-home
   - launcher-clear-cache

## 🤝 Contribuindo

Sinta-se à vontade para abrir issues e pull requests!

## 📞 Contato

- **Criador:** Magra
- **Email:** seu-email@example.com
- **GitHub:** https://github.com/magra

---

**🌾 Feliz em Jogar! 🌾**

Desenvolvido com ❤️ para tornar a experiência de Colheita Feliz ainda melhor.
