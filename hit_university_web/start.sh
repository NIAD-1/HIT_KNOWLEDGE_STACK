#!/bin/bash

# HIT University Web - Quick Start Script

echo "🎓 HIT University AI Faculty - Setup"
echo "===================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
    echo ""
    echo "🚀 Starting development server..."
    echo ""
    echo "   Opening http://localhost:3000"
    echo ""
    echo "   Press Ctrl+C to stop the server"
    echo ""
    npm run dev
else
    echo "❌ Installation failed. Check for errors above."
    exit 1
fi
