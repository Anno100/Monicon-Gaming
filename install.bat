
@echo off

goto :check_git
:start_call_git
call git clone https://github.com/Anno100/Monicon-Gaming.git


call cd Monicon-Gaming

goto :check_node
:start_call_node

goto :check_npm
:start_call_npm
call npm install --save-dev @electron-forge/cli
call npm exec --package=@electron-forge/cli -c "electron-forge import"

call npm run package





:check_git
    git --version
    if %ERRORLEVEL% NEQ 0 (
        echo Git is not installed. Please install Git and try again.
        exit /b 1
    )
    if %ERRORLEVEL% NEQ 1 (
        goto :start_call_git
    )
    exit /b 0

:check_node
    node --version
    if %ERRORLEVEL% NEQ 0 (
        echo Node.js is not installed. Please install Node.js and try again.
        exit /b 1
    )
    if %ERRORLEVEL% NEQ 1 (
        goto :start_call_node
    )
    exit /b 0

:check_npm
    npm --version
    if %ERRORLEVEL% NEQ 0 (
        echo npm is not installed. Please install npm and try again.
        exit /b 1
    )
    if %ERRORLEVEL% NEQ 1 (
        goto :start_call_npm
    )
    exit /b 0