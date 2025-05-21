echo "클라이언트 배포 시작: $(date)"

# 4000번 포트 프로세스 종료
echo "4000번 포트 사용 중인 프로세스 종료 중..."
PORT_PID=$(netstat -tulpn 2>/dev/null | grep :4000 | awk '{print $7}' | cut -d'/' -f1)

if [ -n "$PORT_PID" ]; then
  echo "포트 4000 사용 중인 PID: $PORT_PID - 종료 중..."
  sudo kill -9 $PORT_PID
  echo "프로세스 종료됨"
else
  echo "4000번 포트를 사용 중인 프로세스가 없습니다."
fi

# client 디렉토리로 이동
echo "client 디렉토리로 이동"
cd apps/client || { echo "apps/client 디렉토리가 존재하지 않습니다"; exit 1; }

# 빌드 실행
echo "빌드 실행 중..."
sudo pnpm run build

# 권한 설정
echo "dist 폴더 권한 설정 중..."
sudo chmod -R 777 dist

# dist 디렉토리로 이동
echo "dist 디렉토리로 이동 중..."
cd dist || { echo "dist 디렉토리가 존재하지 않습니다"; exit 1; }

# serve 실행
echo "serve 실행 중..."
sudo nohup serve -s . -l 4000 > serve.log 2>&1 &

# PID 확인 및 출력
SERVE_PID=$!
echo "serve가 PID $SERVE_PID로 백그라운드에서 실행 중입니다"
echo "로그는 $(pwd)/serve.log에서 확인할 수 있습니다"

echo "클라이언트 배포 완료: $(date)"