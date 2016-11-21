@ECHO off
if "%1"=="" goto blank

ECHO "Releasing version %1 ..."

call gulp

git commit -am "Release version %1"
git tag -a v%1 -m "Release version %1"
git push origin master --tags
echo Ok
goto :end

:blank
ECHO Usage: Release "version"

:end