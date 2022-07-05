@echo off
set GV_SQLMETAL=C:\Program Files (x86)\Microsoft SDKs\Windows\v10.0A\bin\NETFX 4.8 Tools\SqlMetal.exe
if not exist "%GV_SQLMETAL%" set "GV_SQLMETAL="
::
if "%GV_SQLMETAL%" == "" (
	echo "Create user variable GV_SQLMETAL and write full path to SqlMetal.exe into it (e.g. C:\Program Files (x86)\Microsoft SDKs\Windows\v10.0A\bin\NETFX 4.8 Tools\SqlMetal.exe)"
) else (
    "%GV_SQLMETAL%" /server:localhost /database:paysys /views /dbml:PaySystem.dbml /context:PaySystemDataBase /namespace:AbonentPlus.PaySystem.Server.PaySystemORM /user:sa /password:1 /timeout:0
	AddUpdateCheck.exe PaySystem.dbml
	del PaySystem.dbml
	ren PaySystem.dbml.res PaySystem.dbml
	msxsl.exe PaySystem.dbml ModifyDbml.xslt -o PaySystem.dbml
)
pause