@echo off
cd /d "%~dp0"
title Nidhi N D - Portfolio Server
echo ====================================================
echo Starting Nidhi N D Portfolio Local Server...
echo ====================================================
start "" http://localhost:3000
py -m http.server 3000
pause
