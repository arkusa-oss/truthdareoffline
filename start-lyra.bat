@echo off
title Lyra's Orb
setlocal

:: Lyra's Orb launcher for Windows
:: Double-click this file to start the game.

set PORT=8765
set URL=http://localhost:%PORT%/

:: Check if server is already running
curl -s -o nul -w "%%{http_code}" %URL% 2>nul | findstr /R "200 301 302" >nul 2>&1
if %errorlevel%==0 (
    echo Server already running. Opening browser...
    start "" %URL%
    goto :end
)

:: Find Python
where python >nul 2>&1
if %errorlevel%==0 (
    set PYTHON=python
    goto :found
)
where python3 >nul 2>&1
if %errorlevel%==0 (
    set PYTHON=python3
    goto :found
)
where py >nul 2>&1
if %errorlevel%==0 (
    set PYTHON=py
    goto :found
)

echo.
echo  Lyra's Orb requires Python 3 to run.
echo  Download it from https://www.python.org/downloads/
echo.
pause
goto :end

:found
echo Starting Lyra's Orb on port %PORT%...

:: Start the server in the background (minimized window)
start /min "LyraServer" %PYTHON% -m http.server %PORT% --bind 127.0.0.1

:: Wait for server to come up
set TRIES=0
:wait_loop
if %TRIES% GEQ 10 goto :server_fail
timeout /t 1 /nobreak >nul
curl -s -o nul -w "%%{http_code}" %URL% 2>nul | findstr /R "200 301 302" >nul 2>&1
if %errorlevel%==0 goto :server_ok
set /a TRIES+=1
goto :wait_loop

:server_ok
echo Server started. Opening browser...
start "" %URL%
goto :end

:server_fail
echo.
echo  Could not start the server. Make sure Python 3 is installed
echo  and port %PORT% is not in use.
echo.
pause

:end
