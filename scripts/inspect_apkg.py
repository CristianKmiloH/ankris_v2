import zipfile
import os

file_path = "C:/Users/crist/Downloads/_The_Ultimate_French_Deck_LoF__French_in_Action_.apkg"

try:
    with zipfile.ZipFile(file_path, 'r') as z:
        print("Files in archive:")
        for name in z.namelist():
            if "collection" in name:
                print(f"- {name}")
            else:
                # Print first few media files just to see
                pass
        print(f"Total files: {len(z.namelist())}")
except Exception as e:
    print(f"Error opening zip: {e}")
