#!/bin/zsh
cd -- "${0:A:h}" || exit 1
exec python3 - <<'PY'
from functools import partial
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import webbrowser
server=ThreadingHTTPServer(('127.0.0.1',0),partial(SimpleHTTPRequestHandler,directory=str(Path.cwd())))
url=f'http://127.0.0.1:{server.server_port}/index.html'
print('Explorer is open at',url,'— keep this window open while browsing.',flush=True)
webbrowser.open(url)
try: server.serve_forever()
except KeyboardInterrupt: pass
finally: server.server_close()
PY
