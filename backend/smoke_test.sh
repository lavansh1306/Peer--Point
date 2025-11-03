#!/bin/sh
# Smoke test script for Spark Doubt Backend
# Usage: ./smoke_test.sh [PORT]

PORT=${1:-8080}
BASE="http://localhost:${PORT}/api"

echo "Using base: $BASE"

# 1) Register
echo "\n1) Registering user smoke@example.com"
REGISTER=$(curl -s -X POST "$BASE/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"name":"smoke","email":"smoke@example.com","password":"smokePass1"}')

echo "$REGISTER" | sed 's/^/   /'

# 2) Login
echo "\n2) Logging in"
LOGIN_RESP=$(curl -s -X POST "$BASE/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"smoke@example.com","password":"smokePass1"}')

echo "$LOGIN_RESP" | sed 's/^/   /'

# extract token (works if token field exists)
TOKEN=$(printf "%s" "$LOGIN_RESP" | sed -n 's/.*"token":"\([^\"]*\)".*/\1/p')

if [ -z "$TOKEN" ]; then
  echo "\nERROR: Could not get token from login response. Abort."
  exit 1
fi

echo "\nTOKEN: $TOKEN"

# 3) Fetch pages
echo "\n3) Fetching pages"
PAGES=$(curl -s "$BASE/pages")

echo "$PAGES" | sed 's/^/   /'

# try to get CSE page id
PAGE_ID=$(printf "%s" "$PAGES" | sed -n 's/.*"name":"CSE"[^}]*"id":"\([^\"]*\)".*/\1/p')
if [ -z "$PAGE_ID" ]; then
  # fallback: pick first page id
  PAGE_ID=$(printf "%s" "$PAGES" | sed -n 's/.*"id":"\([^\"]*\)".*/\1/p' | head -n1)
fi

echo "PAGE_ID: $PAGE_ID"

if [ -z "$PAGE_ID" ]; then
  echo "ERROR: Could not determine a page id. Abort."
  exit 1
fi

# 4) Create question
echo "\n4) Creating a question on page $PAGE_ID"
CREATE_Q=$(curl -s -X POST "$BASE/questions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "{\"title\":\"Smoke test question\",\"description\":\"Is this a smoke test?\",\"pageId\":\"$PAGE_ID\"}")

echo "$CREATE_Q" | sed 's/^/   /'

# 5) Fetch questions for page
echo "\n5) Fetching questions for page"
QUESTIONS=$(curl -s "$BASE/questions/page/$PAGE_ID?page=0&size=20")

echo "$QUESTIONS" | sed 's/^/   /'

# Done
echo "\nSmoke test finished. Look above for outputs."
