#!/usr/bin/env python3
"""Local static server for the StoreMind showcase (offline, no dependencies).

  python3 serve.py            # http://localhost:8080
  python3 serve.py 9000       # another port

Threaded, no-cache, correct module MIME types. Binds to localhost only.
"""
import http.server, socketserver, sys, os, webbrowser, threading

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
os.chdir(os.path.dirname(os.path.abspath(__file__)))

class H(http.server.SimpleHTTPRequestHandler):
    extensions_map = {**http.server.SimpleHTTPRequestHandler.extensions_map,
                      '.js': 'text/javascript', '.mjs': 'text/javascript', '.woff2': 'font/woff2', '.svg': 'image/svg+xml'}
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()
    def log_message(self, *a):  # keep the console quiet
        pass

class T(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True
    allow_reuse_address = True

if __name__ == '__main__':
    with T(('127.0.0.1', PORT), H) as srv:
        url = f'http://localhost:{PORT}/'
        print(f'StoreMind showcase → {url}   (Ctrl+C to stop)')
        if '--no-open' not in sys.argv:
            threading.Timer(.6, lambda: webbrowser.open(url)).start()
        try: srv.serve_forever()
        except KeyboardInterrupt: pass
