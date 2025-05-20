#!/bin/bash

# 스크립트 실행 중단 시 모든 백그라운드 프로세스 종료를 위한 함수
cleanup() {
  echo "스크립트를 종료합니다. 모든 서버 프로세스를 중지합니다..."
  kill $(jobs -p) 2>/dev/null
  exit
}

# SIGINT (Ctrl+C) 및 SIGTERM 신호 처리
trap cleanup SIGINT SIGTERM

# 필요한 디렉토리가 존재하는지 확인
if [ ! -d "apps/client/dist" ]; then
  echo "오류: apps/client/dist 디렉토리가 존재하지 않습니다."
  echo "먼저 클라이언트 앱을 빌드하세요."
  exit 1
fi

if [ ! -d "apps/mobile/dist" ]; then
  echo "오류: apps/mobile/dist 디렉토리가 존재하지 않습니다."
  echo "먼저 모바일 앱을 빌드하세요."
  exit 1
fi

# Node.js가 설치되어 있는지 확인
if ! command -v node &> /dev/null; then
  echo "오류: Node.js가 설치되어 있지 않습니다."
  exit 1
fi

# http-server 패키지 확인 및 설치
if ! command -v npx http-server &> /dev/null; then
  echo "http-server를 설치합니다..."
  npm install -g http-server
fi

# 이미 실행 중인 서버 확인 및 종료
echo "이미 실행 중인 서버를 확인합니다..."
lsof -i:4000 -t | xargs kill -9 2>/dev/null
lsof -i:4001 -t | xargs kill -9 2>/dev/null

# 클라이언트 앱 서빙 (포트 4000)
echo "클라이언트 앱을 포트 4000에서 시작합니다..."
cd apps/client && npx http-server dist -p 4000 --cors -c-1 &
CLIENT_PID=$!
cd ../../

# 모바일 앱 서빙 (포트 4001)
echo "모바일 앱을 포트 4001에서 시작합니다..."
cd apps/mobile && npx http-server dist -p 4001 --cors -c-1 &
MOBILE_PID=$!
cd ../../

echo "서버가 시작되었습니다."
echo "클라이언트 앱: http://localhost:4000"
echo "모바일 앱: http://localhost:4001"
echo "종료하려면 Ctrl+C를 누르세요."

# 메인 프로세스 유지
wait