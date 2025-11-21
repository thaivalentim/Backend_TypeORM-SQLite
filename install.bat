@echo off
echo ========================================
echo  Instalando dependencias do projeto
echo  TypeORM + SQLite + Heroes API
echo ========================================
echo.

echo [1/3] Verificando Node.js...
node --version
if %errorlevel% neq 0 (
    echo ERRO: Node.js nao encontrado! Instale em https://nodejs.org
    pause
    exit /b 1
)

echo [2/3] Verificando npm...
npm --version
if %errorlevel% neq 0 (
    echo ERRO: npm nao encontrado!
    pause
    exit /b 1
)

echo [3/3] Instalando dependencias...
npm install

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo  INSTALACAO CONCLUIDA COM SUCESSO!
    echo ========================================
    echo.
    echo Para executar o projeto:
    echo   npm start
    echo.
    echo Para desenvolvimento com auto-reload:
    echo   npm run dev
    echo.
) else (
    echo.
    echo ========================================
    echo  ERRO NA INSTALACAO!
    echo ========================================
    echo Verifique sua conexao com a internet
    echo e tente novamente.
)

pause