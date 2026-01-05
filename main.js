const { app, BrowserWindow, globalShortcut, Menu, ipcMain } = require('electron');
const path = require('path');

// 1. DESATIVA TOTALMENTE A GPU E ACELERAÇÃO
app.disableHardwareAcceleration();

// 2. PARÂMETROS DE LINHA DE COMANDO
app.commandLine.appendSwitch('disable-web-security');
app.commandLine.appendSwitch('allow-running-insecure-content');
app.commandLine.appendSwitch('no-sandbox');
app.commandLine.appendSwitch('disable-site-isolation-trials');
app.commandLine.appendSwitch('disable-features', 'BlockInsecurePrivateNetworkRequests,IsolateOrigins,site-per-process');

// 3. CONFIGURA A DLL DO FLASH
const pluginPath = path.join(__dirname, 'pepflashplayer32_34_0_0_330.dll');
app.commandLine.appendSwitch('ppapi-flash-path', pluginPath);
app.commandLine.appendSwitch('ppapi-flash-version', '34.0.0.330');

// 4. DESABILITA SSL/HTTPS
app.commandLine.appendSwitch('ignore-certificate-errors');
app.commandLine.appendSwitch('ignore-urlfetcher-cert-requests');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    title: "Launcher Colheita Feliz",
    icon: path.join(__dirname, 'icon.ico'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      plugins: true,
      webSecurity: false,
      allowRunningInsecureContent: true,
      backgroundThrottling: false,
      experimentalFeatures: true,
      offscreen: false
    }
  });

  mainWindow.maximize();
  mainWindow.webContents.session.clearStorageData();

  const userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.75 Safari/537.36";
  
  mainWindow.setMenu(null);
  
  mainWindow.webContents.on('context-menu', (e) => {
    e.preventDefault();
  });
  
  mainWindow.loadURL('http://fazendinha.drimvo.top/', { userAgent });

  // --- APÓS CARREGAR, INJETA A INTERFACE BONITA ---
  mainWindow.webContents.on('did-finish-load', () => {
    console.log('✅ Jogo carregado! Injetando interface...');
    
    // Injeta CSS
    mainWindow.webContents.insertCSS(`
      * {
        box-sizing: border-box;
      }
      
      body {
        margin: 0 !important;
        padding: 0 !important;
      }
      
      /* BARRA DE TÍTULO - REMOVIDA */
      /* BOTÕES DE CONTROLE DA JANELA */
      .launcher-title-btn {
        width: 40px;
        height: 40px;
        border: none;
        background: linear-gradient(135deg, #FFE4B5 0%, #FFDAB9 100%);
        color: #8B4513;
        font-size: 20px;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.2s;
        box-shadow: 0 3px 8px rgba(139, 69, 19, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .launcher-title-btn:hover {
        transform: scale(1.15);
        background: linear-gradient(135deg, #FFDAB9 0%, #FFD4A3 100%);
        box-shadow: 0 5px 12px rgba(139, 69, 19, 0.5);
      }
      
      .launcher-title-btn:active {
        transform: scale(0.9);
      }
      
      .launcher-title-btn.close:hover {
        background: linear-gradient(135deg, #FF6B9D 0%, #FF5583 100%);
        color: white;
      }
      
      /* MENU EXPANSÍVEL */
      .launcher-menu-toggle {
        position: fixed;
        top: 37px;
        left: 15px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #90EE90 0%, #7CFC00 100%);
        border: 3px solid #228B22;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28px;
        z-index: 999998;
        box-shadow: 0 4px 12px rgba(34, 139, 34, 0.5);
        transition: all 0.3s;
      }
      
      .launcher-menu-toggle:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 16px rgba(34, 139, 34, 0.7);
      }
      
      .launcher-menu-toggle.active {
        background: linear-gradient(135deg, #7CFC00 0%, #90EE90 100%);
      }
      
      /* MENU DROPDOWN */
      .launcher-menu-dropdown {
        position: fixed;
        top: 100px;
        left: 15px;
        width: 180px;
        background: linear-gradient(135deg, #FFFACD 0%, #FFE4B5 100%);
        border: 3px solid #8B4513;
        border-radius: 15px;
        z-index: 999997;
        box-shadow: 0 6px 20px rgba(139, 69, 19, 0.4);
        padding: 10px;
        opacity: 0;
        visibility: hidden;
        transform: scale(0.8);
        transform-origin: top left;
        transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }
      
      .launcher-menu-dropdown.active {
        opacity: 1;
        visibility: visible;
        transform: scale(1);
      }
      
      .menu-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px 15px;
        margin: 5px 0;
        background: linear-gradient(135deg, #FFE4B5 0%, #FFDAB9 100%);
        border: 2px solid #8B4513;
        border-radius: 10px;
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
        color: #333;
        transition: all 0.2s;
        font-family: 'Comic Sans MS', cursive;
      }
      
      .menu-item:hover {
        transform: translateX(5px) scale(1.02);
        background: linear-gradient(135deg, #FFDAB9 0%, #FFD4A3 100%);
        box-shadow: 0 3px 10px rgba(139, 69, 19, 0.3);
      }
      
      .menu-item:active {
        transform: translateX(3px) scale(0.98);
      }
      
      .menu-icon {
        font-size: 20px;
      }
      
      /* BOTÃO DE AJUDA */
      .launcher-help-btn {
        position: fixed;
        top: 37px;
        right: 70px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #FFB6C1 0%, #FFC0CB 100%);
        border: 3px solid #FF1493;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28px;
        z-index: 999998;
        box-shadow: 0 4px 12px rgba(255, 20, 147, 0.4);
        transition: all 0.3s;
      }
      
      .launcher-help-btn:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 16px rgba(255, 20, 147, 0.6);
      }
      
      /* MODAL DE AJUDA */
      .launcher-help-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 999996;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s;
      }
      
      .launcher-help-modal.active {
        opacity: 1;
        visibility: visible;
      }
      
      .help-content {
        background: linear-gradient(135deg, #FFFACD 0%, #FFE4B5 100%);
        border: 4px solid #FF8C00;
        border-radius: 20px;
        padding: 25px;
        max-width: 500px;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
        font-family: 'Comic Sans MS', cursive;
      }
      
      .help-header {
        font-size: 28px;
        font-weight: bold;
        color: #FF8C00;
        margin-bottom: 15px;
        text-align: center;
      }
      
      .help-section {
        margin: 15px 0;
        padding: 10px;
        background: rgba(255, 255, 255, 0.7);
        border-radius: 10px;
        border-left: 4px solid #90EE90;
      }
      
      .help-section-title {
        font-weight: bold;
        color: #228B22;
        font-size: 16px;
        margin-bottom: 8px;
      }
      
      .help-text {
        color: #333;
        font-size: 14px;
        line-height: 1.6;
      }
      
      .help-close-btn {
        margin-top: 20px;
        padding: 12px 25px;
        background: linear-gradient(135deg, #FF6B6B 0%, #FF5252 100%);
        color: white;
        border: none;
        border-radius: 10px;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.2s;
        display: block;
        margin-left: auto;
        margin-right: auto;
      }
      
      .help-close-btn:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(255, 107, 107, 0.4);
      }
      
      /* BARRA DE INFORMAÇÕES */
      .launcher-info-bar {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 30px;
        background: linear-gradient(90deg, #8B4513 0%, #A0522D 100%);
        color: #FFFACD;
        display: flex;
        align-items: center;
        padding: 0 20px;
        z-index: 999997;
        font-size: 13px;
        font-family: 'Comic Sans MS', cursive;
        border-top: 2px solid #654321;
      }
      
      .info-text {
        flex: 1;
        text-align: center;
      }
      
      /* MODAL DE CONFIRMAÇÃO */
      .launcher-confirm-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 999996;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s;
      }
      
      .launcher-confirm-modal.active {
        opacity: 1;
        visibility: visible;
      }
      
      .confirm-content {
        background: linear-gradient(135deg, #FFFACD 0%, #FFE4B5 100%);
        border: 4px solid #FF8C00;
        border-radius: 20px;
        padding: 30px;
        max-width: 400px;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
        font-family: 'Comic Sans MS', cursive;
        text-align: center;
      }
      
      .confirm-header {
        font-size: 24px;
        font-weight: bold;
        color: #FF8C00;
        margin-bottom: 15px;
      }
      
      .confirm-text {
        color: #333;
        font-size: 16px;
        margin-bottom: 25px;
        line-height: 1.6;
      }
      
      .confirm-buttons {
        display: flex;
        gap: 15px;
        justify-content: center;
      }
      
      .confirm-btn {
        padding: 12px 25px;
        border: none;
        border-radius: 10px;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.2s;
        font-family: 'Comic Sans MS', cursive;
      }
      
      .confirm-btn-yes {
        background: linear-gradient(135deg, #90EE90 0%, #7CFC00 100%);
        color: #333;
        border: 2px solid #228B22;
      }
      
      .confirm-btn-yes:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(34, 139, 34, 0.4);
      }
      
      .confirm-btn-no {
        background: linear-gradient(135deg, #FF6B6B 0%, #FF5252 100%);
        color: white;
        border: 2px solid #CC0000;
      }
      
      .confirm-btn-no:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(255, 107, 107, 0.4);
      }
      
      /* MARCA D'ÁGUA */
      .custom-launcher-watermark {
        position: fixed;
        top: 100px;
        right: 20px;
        font-size: 28px;
        opacity: 0.3;
        z-index: 999996;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        pointer-events: none;
      }
      
      /* DECORAÇÕES FLUTUANTES */
      .launcher-decoration {
        position: fixed;
        font-size: 32px;
        opacity: 0.25;
        z-index: 999995;
        pointer-events: none;
        animation: float 5s ease-in-out infinite;
      }
      
      .dec-1 {
        top: 150px;
        right: 50px;
        animation-delay: 0s;
      }
      
      .dec-2 {
        top: 350px;
        left: 20px;
        animation-delay: 1s;
      }
      
      .dec-3 {
        bottom: 80px;
        right: 30px;
        animation-delay: 2s;
      }
      
      .dec-4 {
        top: 500px;
        right: 100px;
        animation-delay: 3s;
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-25px) rotate(5deg); }
      }
    `);
    
    // Injeta JavaScript para criar elementos e gerenciar credenciais
    mainWindow.webContents.executeJavaScript(`
      // VARIÁVEIS GLOBAIS
      let menuOpen = false;
      let helpOpen = false;

      // CRIA BOTÃO DE MENU (EXPANSÍVEL)
      const menuBtn = document.createElement('div');
      menuBtn.className = 'launcher-menu-toggle';
      menuBtn.innerHTML = '☰';
      menuBtn.onclick = () => {
        menuOpen = !menuOpen;
        menuBtn.classList.toggle('active');
        dropdown.classList.toggle('active');
      };
      document.body.appendChild(menuBtn);

      // CRIA MENU DROPDOWN
      const dropdown = document.createElement('div');
      dropdown.className = 'launcher-menu-dropdown';
      dropdown.innerHTML = \`
        <div class="menu-item" onclick="window.launcher_back()" title="Voltar">
          <span class="menu-icon">◀</span> Voltar
        </div>
        <div class="menu-item" onclick="window.launcher_forward()" title="Avançar">
          <span class="menu-icon">▶</span> Avançar
        </div>
        <div class="menu-item" onclick="window.launcher_reload()" title="Recarregar">
          <span class="menu-icon">↻</span> Recarregar
        </div>
        <div class="menu-item" onclick="window.launcher_home()" title="Ir para Inicial">
          <span class="menu-icon">🏠</span> Inicial
        </div>
        <div class="menu-item" onclick="window.launcher_clear_cache()" title="Limpar Cache">
          <span class="menu-icon">🗑️</span> Limpar Cache
        </div>
      \`;
      document.body.appendChild(dropdown);

      // CRIA BOTÃO DE AJUDA
      const helpBtn = document.createElement('div');
      helpBtn.className = 'launcher-help-btn';
      helpBtn.innerHTML = '❓';
      helpBtn.onclick = () => {
        helpOpen = true;
        helpModal.classList.add('active');
      };
      document.body.appendChild(helpBtn);

      // CRIA MODAL DE AJUDA
      const helpModal = document.createElement('div');
      helpModal.className = 'launcher-help-modal';
      helpModal.innerHTML = \`
        <div class="help-content">
          <div class="help-header">❓ Bem-vindo! 🌾</div>
          
          <div class="help-section">
            <div class="help-section-title">📱 Navegação</div>
            <div class="help-text">
              Use o menu verde (☰) para voltar, avançar, recarregar ou ir à página inicial!
            </div>
          </div>
          
          <div class="help-section">
            <div class="help-section-title">🔐 Suas Credenciais</div>
            <div class="help-text">
              Seus dados de login são salvos automaticamente. Próxima vez que entrar, os campos vão ficar preenchidos!
            </div>
          </div>
          
          <div class="help-section">
            <div class="help-section-title">⌨️ Atalhos</div>
            <div class="help-text">
              • F5 = Recarregar<br>
              • Alt + ← = Voltar<br>
              • Alt + → = Avançar<br>
              • Esc = Sair
            </div>
          </div>
          
          <button class="help-close-btn" onclick="window.close_help()">Entendi! 👍</button>
        </div>
      \`;
      helpModal.onclick = (e) => {
        if (e.target === helpModal) {
          helpModal.classList.remove('active');
          helpOpen = false;
        }
      };
      document.body.appendChild(helpModal);

      // CRIA MODAL DE CONFIRMAÇÃO
      const confirmModal = document.createElement('div');
      confirmModal.className = 'launcher-confirm-modal';
      confirmModal.innerHTML = \`
        <div class="confirm-content">
          <div class="confirm-header">💾 Salvar Senha?</div>
          <div class="confirm-text">Deseja salvar sua senha para próximas vezes?</div>
          <div class="confirm-buttons">
            <button class="confirm-btn confirm-btn-yes" onclick="window.confirm_save_pwd(true)">Sim! 👍</button>
            <button class="confirm-btn confirm-btn-no" onclick="window.confirm_save_pwd(false)">Não, Obrigado</button>
          </div>
        </div>
      \`;
      confirmModal.onclick = (e) => {
        if (e.target === confirmModal) {
          confirmModal.classList.remove('active');
        }
      };
      document.body.appendChild(confirmModal);

      // CRIA MARCA D'ÁGUA
      const watermark = document.createElement('div');
      watermark.className = 'custom-launcher-watermark';
      watermark.textContent = '🌾';
      document.body.appendChild(watermark);

      // CRIA DECORAÇÕES
      const decorations = ['🌻', '🌽', '🥕', '🐔'];
      const classes = ['dec-1', 'dec-2', 'dec-3', 'dec-4'];
      decorations.forEach((dec, i) => {
        const elem = document.createElement('div');
        elem.className = 'launcher-decoration ' + classes[i];
        elem.textContent = dec;
        document.body.appendChild(elem);
      });

      // CRIA BARRA DE INFORMAÇÕES (rodapé)
      const infoBar = document.createElement('div');
      infoBar.className = 'launcher-info-bar';
      infoBar.innerHTML = '<span class="info-text">🌾 Colheita Feliz - Feliz em Jogar! 🌾</span>';
      document.body.appendChild(infoBar);

      // VARIÁVEIS PARA CONTROLE DE CREDENCIAIS
      let credencialsPendentes = null;
      let permitirSubmit = false;

      // ========== SISTEMA DE CREDENCIAIS ==========
      
      function salvarCredenciais(usuario, senha) {
        const dados = {
          usuario: usuario,
          senha: senha,
          data: new Date().toISOString()
        };
        localStorage.setItem('launcher-credenciais-colheita', JSON.stringify(dados));
        console.log('✅ Credenciais salvas!');
      }
      
      function carregarCredenciais() {
        const dados = localStorage.getItem('launcher-credenciais-colheita');
        if (dados) {
          try {
            return JSON.parse(dados);
          } catch (e) {
            console.error('Erro ao carregar credenciais:', e);
            return null;
          }
        }
        return null;
      }
      
      function autoPreencherLogin() {
        const credenciais = carregarCredenciais();
        if (credenciais) {
          const inputs = document.querySelectorAll('input[type="text"], input[type="password"]');
          if (inputs.length >= 2) {
            inputs[0].value = credenciais.usuario;
            inputs[1].value = credenciais.senha;
            console.log('✅ Campos preenchidos automaticamente!');
          }
        }
      }
      
      autoPreencherLogin();
      
      document.addEventListener('submit', (e) => {
        // Se foi liberado para submeter, deixa passar
        if (permitirSubmit) {
          permitirSubmit = false;
          return true;
        }
        
        const form = e.target;
        const inputs = form.querySelectorAll('input');
        if (inputs.length >= 2) {
          const usuario = inputs[0].value;
          const senha = inputs[1].value;
          if (usuario && senha) {
            e.preventDefault();
            e.stopPropagation();
            credencialsPendentes = { usuario, senha, form: form };
            confirmModal.classList.add('active');
            return false;
          }
        }
      }, true);
      
      const observer = new MutationObserver(() => {
        autoPreencherLogin();
      });
      
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
      
      console.log('🔐 Sistema de credenciais ativado!');
      
      // ========== FUNÇÕES DE CONTROLE ==========
      
      window.launcher_back = () => require('electron').ipcRenderer.send('launcher-back');
      window.launcher_forward = () => require('electron').ipcRenderer.send('launcher-forward');
      window.launcher_reload = () => require('electron').ipcRenderer.send('launcher-reload');
      window.launcher_home = () => require('electron').ipcRenderer.send('launcher-home');
      window.launcher_clear_cache = () => require('electron').ipcRenderer.send('launcher-clear-cache');
      
      window.confirm_save_pwd = (save) => {
        confirmModal.classList.remove('active');
        
        if (credencialsPendentes) {
          if (save) {
            salvarCredenciais(credencialsPendentes.usuario, credencialsPendentes.senha);
          }
          
          // Permite o formulário continuar o submit após decisão
          if (credencialsPendentes.form) {
            permitirSubmit = true;
            setTimeout(() => {
              credencialsPendentes.form.submit();
            }, 50);
          }
        }
        
        credencialsPendentes = null;
      };
      
      window.close_help = () => {
        helpOpen = false;
        helpModal.classList.remove('active');
      };

      console.log('🌾 Interface Launcher NOVA injetada com sucesso!');
    `);
  });

  // Atalhos de teclado globais
  globalShortcut.register('F5', () => {
    mainWindow.webContents.reload();
  });
  
  globalShortcut.register('Escape', () => {
    app.quit();
  });
  
  globalShortcut.register('Alt+Left', () => {
    mainWindow.webContents.goBack();
  });
  
  globalShortcut.register('Alt+Right', () => {
    mainWindow.webContents.goForward();
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// ========== IPC HANDLERS ==========

ipcMain.on('launcher-back', () => {
  if (mainWindow.webContents.canGoBack()) {
    mainWindow.webContents.goBack();
  }
});

ipcMain.on('launcher-forward', () => {
  if (mainWindow.webContents.canGoForward()) {
    mainWindow.webContents.goForward();
  }
});

ipcMain.on('launcher-reload', () => {
  mainWindow.webContents.reload();
});

ipcMain.on('launcher-home', () => {
  mainWindow.webContents.loadURL('http://fazendinha.drimvo.top/');
});

ipcMain.on('launcher-clear-cache', () => {
  mainWindow.webContents.session.clearCache(() => {
    console.log('🗑️ Cache limpo!');
    mainWindow.webContents.reload();
  });
});
