@echo off
title StyleSphere - Full Stack Launcher
color 0A

echo.
echo  ╔═══════════════════════════════════════════╗
echo  ║       StyleSphere Project Launcher        ║
echo  ╠═══════════════════════════════════════════╣
echo  ║  Frontend: http://localhost:5173          ║
echo  ║  Backend:  http://localhost:5000          ║
echo  ╚═══════════════════════════════════════════╝
echo.

:: Check if node_modules exist, install if missing
if not exist "backend\node_modules" (
    echo [1/4] Installing backend dependencies...
    cd backend
    npm install
    cd ..
    echo.
) else (
    echo [1/4] Backend dependencies OK
)

if not exist "frontend\node_modules" (
    echo [2/4] Installing frontend dependencies...
    cd frontend
    npm install
    cd ..
    echo.
) else (
    echo [2/4] Frontend dependencies OK
)

echo [3/4] Starting Backend Server (Port 5000)...
cd backend
start "StyleSphere Backend" cmd /k "title StyleSphere Backend && color 0E && node server.js"
cd ..

:: Small delay to let backend start first
timeout /t 2 /nobreak >nul

echo [4/4] Starting Frontend Dev Server (Port 5173)...
cd frontend
start "StyleSphere Frontend" cmd /k "title StyleSphere Frontend && color 0B && npm run dev"
cd ..

echo.
echo  ╔═══════════════════════════════════════════╗
echo  ║  Both servers are starting!               ║
echo  ║                                           ║
echo  ║  Frontend: http://localhost:5173          ║
echo  ║  Backend:  http://localhost:5000          ║
echo  ║                                           ║
echo  ║  Close the terminal windows to stop.      ║
echo  ╚═══════════════════════════════════════════╝
echo.
pause
