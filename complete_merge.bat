@echo off
cd /d D:\Transport_management\Transport_Management

REM Clear the merge state
del /F /Q .git\MERGE_HEAD .git\MERGE_MSG .git\MERGE_MODE .git\.MERGE_MSG.swp 2>nul

REM Check current status
git status

REM Fetch latest from all branches
git fetch origin

REM Merge routes branch
git merge origin/routes --no-edit

REM Merge deptCoordinatorModule branch
git merge origin/deptCoordinatorModule --no-edit

echo Done!
pause
