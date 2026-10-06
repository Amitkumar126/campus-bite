#!/usr/bin/env python3
"""
CampusBite Local Development Server
Starts a lightweight local HTTP server and automatically opens the browser.
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 3000

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Enable caching-free local development
        self.send_header('Cache-Control', 'no-store, must-revalidate')
        super().end_headers()

def main():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    # Try finding an open port if 3000 is taken
    port = PORT
    for attempt in range(5):
        try:
            with socketserver.TCPServer(("", port), Handler) as httpd:
                url = f"http://localhost:{port}"
                print("=" * 60)
                print(f"🍔 CampusBite — Student Food Delivery Web App")
                print(f"🚀 Running locally at: {url}")
                print(f"💡 Press Ctrl+C to stop the server")
                print("=" * 60)
                
                try:
                    webbrowser.open(url)
                except Exception:
                    pass
                    
                httpd.serve_forever()
        except OSError:
            port += 1

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n👋 CampusBite server stopped. Happy studying!")
        sys.exit(0)
