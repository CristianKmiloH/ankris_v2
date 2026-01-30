import requests
import time
import random

BASE_URL = "http://localhost:3000/api/auth"

def test_auth():
    print("--- Starting Auth Verification ---")
    
    # Generate random user
    rand_id = int(time.time())
    email = f"test_user_{rand_id}@example.com"
    password = "password123"
    username = f"User_{rand_id}"
    
    print(f"Testing with: {email}")

    # 1. REGISTER
    print("\n1. Testing Registration...")
    try:
        reg_payload = {"email": email, "password": password, "username": username}
        reg_res = requests.post(f"{BASE_URL}/register", json=reg_payload)
        
        if reg_res.status_code == 200:
            print("✅ Registration SUCCESS")
            print(f"Response: {reg_res.json().keys()}")
        else:
            print(f"❌ Registration FAILED: {reg_res.status_code}")
            print(reg_res.text)
            return False
            
    except Exception as e:
        print(f"❌ Connection Error (Is backend running?): {e}")
        return False

    # 2. LOGIN
    print("\n2. Testing Login...")
    try:
        login_payload = {"email": email, "password": password}
        login_res = requests.post(f"{BASE_URL}/login", json=login_payload)
        
        if login_res.status_code == 200:
            data = login_res.json()
            if "token" in data:
                print("✅ Login SUCCESS")
                print(f"Token received: {data['token'][:20]}...")
                return True
            else:
                print("❌ Login Failed: No token in response")
                return False
        else:
            print(f"❌ Login FAILED: {login_res.status_code}")
            print(login_res.text)
            return False

    except Exception as e:
        print(f"❌ Connection Error: {e}")
        return False

if __name__ == "__main__":
    success = test_auth()
    if success:
        print("\n✨ SYSTEM HEALTHY: Auth flow is working correctly.")
        exit(0)
    else:
        print("\n💀 SYSTEM BROKEN: Fix required.")
        exit(1)
