import sys
import os

content = ""

if (len(sys.argv) > 0):
    os.system(f"hugo new blog/{'-'.join(sys.argv[1:]).lower()}.md")
    