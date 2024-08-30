@echo off
echo Starting Node.js server in the background...
start /b node server.js >nul 2>&1
timeout /t 3 > nul
echo Opening browser...
start http://localhost:3000
exit
