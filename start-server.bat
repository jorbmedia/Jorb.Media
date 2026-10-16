@echo off
title JORB.MEDIA - Local Preview Server
echo Starting Jorb.media local server...
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0server.ps1"
pause
