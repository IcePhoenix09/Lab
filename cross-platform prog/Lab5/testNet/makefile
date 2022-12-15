run:
	sudo dotnet restore
	sudo dotnet clean
	sudo dotnet publish -c Release -r linux-x64
	sudo dotnet publish -c Release -r linux-x64
	sudo dotnet ${PWD}/bin/Release/net7.0/linux-x64/testNet.dll
clear:
	sudo dotnet restore
	sudo dotnet clean
