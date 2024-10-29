# Setup script for token analyzer project

# Create Next.js project
Write-Host "Creating Next.js project..." -ForegroundColor Green
npx create-next-app@latest token-analyzer --typescript --tailwind --use-npm

# Navigate into project directory
Set-Location token-analyzer

# Create backend directory and Python virtual environment
Write-Host "Setting up Python backend..." -ForegroundColor Green
mkdir backend
python -m venv backend/venv

# Activate virtual environment and install dependencies
Write-Host "Installing Python dependencies..." -ForegroundColor Green
.\backend\venv\Scripts\activate
pip install fastapi uvicorn requests python-dotenv

# Create necessary directories
Write-Host "Creating project structure..." -ForegroundColor Green
mkdir src\app\api\analyze -Force
mkdir src\components -Force

# Create necessary files
$files = @(
    "src\components\TokenAnalyzer.tsx",
    "src\app\api\analyze\route.ts",
    "backend\main.py",
    "backend\token_analyzer.py",
    ".env"
)

foreach ($file in $files) {
    New-Item $file -Force
    Write-Host "Created $file" -ForegroundColor Yellow
}

# Install additional npm packages
Write-Host "Installing npm packages..." -ForegroundColor Green
npm install "@components/ui" axios  # Changed to use quotes around the package name

Write-Host "Project setup complete!" -ForegroundColor Green
Write-Host "To start development:"
Write-Host "1. Start backend: cd backend && uvicorn main:app --reload"
Write-Host "2. Start frontend (in new terminal): npm run dev"
