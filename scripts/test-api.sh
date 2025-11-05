#!/bin/bash

# Terra Industries API Test Script
# Quick test of authentication endpoints

API_URL="http://localhost:4000/api/v1"
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}======================================"
echo "Terra Industries API Test Script"
echo -e "======================================${NC}\n"

# Test 1: Health Check
echo -e "${BLUE}Test 1: Health Check${NC}"
echo "GET $API_URL/health"
HEALTH_RESPONSE=$(curl -s $API_URL/health)
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Health check passed${NC}"
    echo "$HEALTH_RESPONSE" | jq '.'
else
    echo -e "${RED}✗ Health check failed${NC}"
    exit 1
fi

echo ""

# Test 2: Register Admin
echo -e "${BLUE}Test 2: Register Admin User${NC}"
echo "POST $API_URL/auth/register"
REGISTER_RESPONSE=$(curl -s -X POST $API_URL/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@terraindustries.com",
    "password": "SecurePass123!",
    "fullName": "Admin User"
  }')

if echo "$REGISTER_RESPONSE" | jq -e '.user.id' > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Registration successful${NC}"
    echo "$REGISTER_RESPONSE" | jq '.'
else
    # Check if user already exists
    if echo "$REGISTER_RESPONSE" | grep -q "already exists"; then
        echo -e "${GREEN}✓ User already exists (that's fine)${NC}"
    else
        echo -e "${RED}✗ Registration failed${NC}"
        echo "$REGISTER_RESPONSE" | jq '.'
    fi
fi

echo ""

# Test 3: Login
echo -e "${BLUE}Test 3: Login${NC}"
echo "POST $API_URL/auth/login"
LOGIN_RESPONSE=$(curl -s -X POST $API_URL/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@terraindustries.com",
    "password": "SecurePass123!"
  }')

TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.accessToken')

if [ "$TOKEN" != "null" ] && [ ! -z "$TOKEN" ]; then
    echo -e "${GREEN}✓ Login successful${NC}"
    echo "$LOGIN_RESPONSE" | jq '.'
    echo ""
    echo -e "${GREEN}Access Token:${NC}"
    echo "$TOKEN"
else
    echo -e "${RED}✗ Login failed${NC}"
    echo "$LOGIN_RESPONSE" | jq '.'
    exit 1
fi

echo ""

# Test 4: Get Current User (Protected Route)
echo -e "${BLUE}Test 4: Get Current User (Protected Route)${NC}"
echo "GET $API_URL/auth/me"
ME_RESPONSE=$(curl -s $API_URL/auth/me \
  -H "Authorization: Bearer $TOKEN")

if echo "$ME_RESPONSE" | jq -e '.id' > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Protected route access successful${NC}"
    echo "$ME_RESPONSE" | jq '.'
else
    echo -e "${RED}✗ Protected route access failed${NC}"
    echo "$ME_RESPONSE" | jq '.'
    exit 1
fi

echo ""
echo -e "${GREEN}======================================"
echo "✓ All tests passed!"
echo "======================================${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "1. View Swagger docs: http://localhost:4000/api-docs"
echo "2. Use this token for testing:"
echo "$TOKEN"

