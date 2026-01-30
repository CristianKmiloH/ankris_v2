import requests
from bs4 import BeautifulSoup
import sys

# DEBUG ANKIWEB SCRAPER
# Goal: Verify if we can fetch search results and find download forms from AnkiWeb.

BASE_URL = "https://ankiweb.net"
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

def test_search(query):
    print(f"--- Testing Search: '{query}' ---")
    url = f"{BASE_URL}/shared/decks/{query}"
    try:
        res = requests.get(url, headers=HEADERS)
        if res.status_code != 200:
            print(f"FAILED: Status {res.status_code}")
            return
        
        soup = BeautifulSoup(res.text, 'html.parser')
        
        # Log raw HTML snippet to see structure if needed
        # print(soup.prettify()[:1000])

        # Attempt to find decks
        # AnkiWeb structure hypothesis: <div class="deck"><a href="/shared/info/ID">Title</a>...
        # Let's try to find ANY link with /shared/info/
        links = soup.select('a[href*="/shared/info/"]')
        print(f"Found {len(links)} deck links.")
        
        for i, link in enumerate(links[:3]): # Show first 3
            title = link.get_text(strip=True)
            href = link['href']
            print(f"[{i}] Title: {title} | Href: {href}")
            
    except Exception as e:
        print(f"ERROR: {e}")

def test_download_page(deck_id):
    print(f"\n--- Testing Download Page: ID {deck_id} ---")
    url = f"{BASE_URL}/shared/info/{deck_id}"
    try:
        res = requests.get(url, headers=HEADERS)
        if res.status_code != 200:
            print(f"FAILED: Status {res.status_code}")
            return

        soup = BeautifulSoup(res.text, 'html.parser')
        
        # Find download form
        form = soup.find('form', action=True)
        if not form:
            # Maybe it's a button with specific class?
            print("WARNING: No <form> found. checking buttons...")
            buttons = soup.find_all('button')
            for b in buttons:
                print(f"Button: {b.get_text(strip=True)}")
        else:
            action = form['action']
            print(f"Found FORM. Action: {action}")
            inputs = form.find_all('input')
            for inp in inputs:
                print(f"Input: name={inp.get('name')}, value={inp.get('value')}")
                
    except Exception as e:
        print(f"ERROR: {e}")

if __name__ == "__main__":
    # Test with a common term
    test_search("Spanish")
    # Test with a specific known ID if available, or just rely on search first
    # I'll pick a random one if search works, manually passing an ID here for testing if I knew one.
    # For now let's just run search and see the structure.
