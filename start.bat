@echo off
echo =========================================
echo       Starting StyleSphere Project       
echo =========================================
echo.
echo Launching the production server on Port 5000...
echo Ensure MongoDB is running and IP is whitelisted.
echo.

cd backend
node server.js

pause
