@echo off
title Legacy Grading - Web Server Launcher
color 0A

echo ========================================================
echo        LEGACY GRADING - NUMISMATIC AI PLATFORM
echo ========================================================
echo.
echo Starting local web server on port 8085...
echo.

:: Get local IP address for phone connection
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /i "IPv4"') do (
    set LOCAL_IP=%%a
    goto :found_ip
)
:found_ip
set LOCAL_IP=%LOCAL_IP: =%

echo Access from this Computer:
echo   http://localhost:8085
echo.
if defined LOCAL_IP (
    echo Access from your Mobile Phone (on same Wi-Fi):
    echo   http://%LOCAL_IP%:8085
    echo.
)
echo Opening your web browser now...
echo.

:: Launch browser in background
start http://localhost:8085

:: Check if Python is installed
python --version >nul 2>&1
if %ERRORLEVEL% equ 0 (
    echo [OK] Using Python HTTP server...
    python -m http.server 8085
    goto :end
)

:: Fallback to Node
node -v >nul 2>&1
if %ERRORLEVEL% equ 0 (
    echo [OK] Using Node.js npx serve...
    npx -y serve -l 8085 .
    goto :end
)

echo [!] Neither Python nor Node.js was found on this system.
echo Please install Python (python.org) or Node.js (nodejs.org) to run the server.
pause

:end
