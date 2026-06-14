#!/bin/bash
# Lyra's Orb launcher for Linux / macOS (command-line)
# Run: chmod +x start-lyra.sh && ./start-lyra.sh

set -e

PORT=8765
URL="http://localhost:${PORT}/"
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PIDFILE="/tmp/lyrasorb-${PORT}.pid"

server_alive() {
  curl -s -o /dev/null -w "%{http_code}" "$URL" 2>/dev/null | grep -qE "200|301|302"
}

if server_alive; then
  echo "Server already running. Opening browser..."
else
  # Find Python 3
  PYTHON=""
  for p in python3 python py; do
    if command -v "$p" &>/dev/null; then PYTHON="$p"; break; fi
  done

  if [ -z "$PYTHON" ]; then
    echo ""
    echo "  Lyra's Orb requires Python 3."
    echo "  Install it via your package manager (apt, brew, etc.)"
    echo ""
    exit 1
  fi

  # Kill stale server if pidfile exists
  if [ -f "$PIDFILE" ]; then
    OLD_PID=$(cat "$PIDFILE" 2>/dev/null || echo "")
    if [ -n "$OLD_PID" ] && kill -0 "$OLD_PID" 2>/dev/null; then
      kill "$OLD_PID" 2>/dev/null || true
    fi
    rm -f "$PIDFILE"
  fi

  echo "Starting Lyra's Orb on port ${PORT}..."
  cd "$SCRIPT_DIR"
  nohup "$PYTHON" -m http.server "$PORT" --bind 127.0.0.1 > /tmp/lyrasorb.log 2>&1 &
  echo $! > "$PIDFILE"
  disown 2>/dev/null || true

  # Wait for server
  for i in $(seq 1 10); do
    sleep 0.5
    if server_alive; then break; fi
  done

  if ! server_alive; then
    echo "  Could not start server. Check /tmp/lyrasorb.log"
    exit 1
  fi
  echo "Server started."
fi

# Open browser
if command -v xdg-open &>/dev/null; then
  xdg-open "$URL"
elif command -v open &>/dev/null; then
  open "$URL"
else
  echo "Open $URL in your browser to play."
fi
