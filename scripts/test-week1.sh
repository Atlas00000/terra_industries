#!/bin/bash

# Terra Industries - Week 1 Comprehensive Test Script
# Tests all authentication and inquiry endpoints

set -e  # Exit on error

API_URL="http://localhost:4000/api/v1"
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}=========================================="
echo "🚀 Terra Industries - Week 1 Test Suite"
echo "==========================================${NC}\n"

# Test counter
PASSED=0
FAILED=0

# Test 1: Health Check
echo -e "${BLUE}[1/15] Testing Health Check${NC}"
HEALTH=$(curl -s $API_URL/health)
if echo "$HEALTH" | grep -q "ok"; then
    echo -e "${GREEN}✓ Health check passed${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Health check failed${NC}\n"
    ((FAILED++))
fi

# Test 2: Register New User
echo -e "${BLUE}[2/15] Testing User Registration${NC}"
REGISTER=$(curl -s -X POST $API_URL/auth/register \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"test-$(date +%s)@example.com\",
    \"password\": \"TestPass123!\",
    \"fullName\": \"Test User\"
  }")

if echo "$REGISTER" | grep -q "User registered successfully"; then
    echo -e "${GREEN}✓ User registration passed${NC}"
    TEST_EMAIL=$(echo "$REGISTER" | grep -o '"email":"[^"]*"' | cut -d'"' -f4)
    echo "  Email: $TEST_EMAIL\n"
    ((PASSED++))
else
    echo -e "${RED}✗ User registration failed${NC}\n"
    ((FAILED++))
fi

# Test 3: Register Duplicate User (Should Fail)
echo -e "${BLUE}[3/15] Testing Duplicate Email Rejection${NC}"
DUPLICATE=$(curl -s -X POST $API_URL/auth/register \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"admin@terraindustries.com\",
    \"password\": \"TestPass123!\"
  }")

if echo "$DUPLICATE" | grep -q "already exists"; then
    echo -e "${GREEN}✓ Duplicate email properly rejected${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Duplicate email test failed${NC}\n"
    ((FAILED++))
fi

# Test 4: Login with Valid Credentials
echo -e "${BLUE}[4/15] Testing User Login${NC}"
LOGIN=$(curl -s -X POST $API_URL/auth/login \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"admin@terraindustries.com\",
    \"password\": \"SecurePass123!\"
  }")

TOKEN=$(echo "$LOGIN" | grep -o '"accessToken":"[^"]*"' | cut -d'"' -f4)
if [ ! -z "$TOKEN" ]; then
    echo -e "${GREEN}✓ Login successful${NC}"
    echo "  Token: ${TOKEN:0:30}...\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Login failed${NC}\n"
    ((FAILED++))
    exit 1
fi

# Test 5: Login with Wrong Password (Should Fail)
echo -e "${BLUE}[5/15] Testing Wrong Password Rejection${NC}"
WRONG_LOGIN=$(curl -s -X POST $API_URL/auth/login \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"admin@terraindustries.com\",
    \"password\": \"WrongPassword123!\"
  }")

if echo "$WRONG_LOGIN" | grep -q "Invalid credentials"; then
    echo -e "${GREEN}✓ Wrong password properly rejected${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Wrong password test failed${NC}\n"
    ((FAILED++))
fi

# Test 6: Get Current User (Protected Route)
echo -e "${BLUE}[6/15] Testing Protected Route Access${NC}"
ME=$(curl -s $API_URL/auth/me \
  -H "Authorization: Bearer $TOKEN")

if echo "$ME" | grep -q "admin@terraindustries.com"; then
    echo -e "${GREEN}✓ Protected route access successful${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Protected route access failed${NC}\n"
    ((FAILED++))
fi

# Test 7: Protected Route Without Token (Should Fail)
echo -e "${BLUE}[7/15] Testing Unauthorized Access Rejection${NC}"
UNAUTH=$(curl -s $API_URL/auth/me)

if echo "$UNAUTH" | grep -q "Unauthorized"; then
    echo -e "${GREEN}✓ Unauthorized access properly rejected${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Unauthorized access test failed${NC}\n"
    ((FAILED++))
fi

# Test 8: Create High-Priority Inquiry
echo -e "${BLUE}[8/15] Testing High-Priority Inquiry Creation${NC}"
HIGH_INQUIRY=$(curl -s -X POST $API_URL/inquiries \
  -H "Content-Type: application/json" \
  -d '{
    "inquiryType": "sales",
    "fullName": "General Ibrahim Babangida",
    "email": "general@defense.gov.ng",
    "phone": "+234-803-555-0123",
    "company": "Nigerian Defense Ministry",
    "country": "NG",
    "message": "We urgently need to purchase 50 Archer VTOL units for border security operations. Budget approved: $10M. Need immediate deployment within 6 months. Please provide full specifications and pricing.",
    "metadata": {
      "budget": ">$1M",
      "timeline": "immediate",
      "orgType": "government"
    }
  }')

HIGH_SCORE=$(echo "$HIGH_INQUIRY" | grep -o '"leadScore":[0-9]*' | cut -d':' -f2)
HIGH_ID=$(echo "$HIGH_INQUIRY" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ "$HIGH_SCORE" -ge 70 ]; then
    echo -e "${GREEN}✓ High-priority inquiry created${NC}"
    echo "  Lead Score: $HIGH_SCORE/100 (HIGH PRIORITY)"
    echo "  Inquiry ID: $HIGH_ID\n"
    ((PASSED++))
else
    echo -e "${RED}✗ High-priority inquiry scoring failed${NC}"
    echo "  Expected: >= 70, Got: $HIGH_SCORE\n"
    ((FAILED++))
fi

# Test 9: Create Low-Priority Inquiry
echo -e "${BLUE}[9/15] Testing Low-Priority Inquiry Creation${NC}"
LOW_INQUIRY=$(curl -s -X POST $API_URL/inquiries \
  -H "Content-Type: application/json" \
  -d '{
    "inquiryType": "general",
    "fullName": "John Doe",
    "email": "john@example.com",
    "country": "US",
    "message": "Just looking for information."
  }')

LOW_SCORE=$(echo "$LOW_INQUIRY" | grep -o '"leadScore":[0-9]*' | cut -d':' -f2)
LOW_ID=$(echo "$LOW_INQUIRY" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ "$LOW_SCORE" -lt 40 ]; then
    echo -e "${GREEN}✓ Low-priority inquiry created${NC}"
    echo "  Lead Score: $LOW_SCORE/100 (LOW PRIORITY)"
    echo "  Inquiry ID: $LOW_ID\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Low-priority inquiry scoring failed${NC}"
    echo "  Expected: < 40, Got: $LOW_SCORE\n"
    ((FAILED++))
fi

# Test 10: List All Inquiries (Admin)
echo -e "${BLUE}[10/15] Testing Inquiry Listing${NC}"
LIST=$(curl -s "$API_URL/inquiries?page=1&limit=10&sortBy=leadScore&order=desc" \
  -H "Authorization: Bearer $TOKEN")

if echo "$LIST" | grep -q '"meta"'; then
    TOTAL=$(echo "$LIST" | grep -o '"total":[0-9]*' | cut -d':' -f2)
    echo -e "${GREEN}✓ Inquiry listing successful${NC}"
    echo "  Total inquiries: $TOTAL\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Inquiry listing failed${NC}\n"
    ((FAILED++))
fi

# Test 11: Get Single Inquiry (Admin)
echo -e "${BLUE}[11/15] Testing Get Single Inquiry${NC}"
SINGLE=$(curl -s "$API_URL/inquiries/$HIGH_ID" \
  -H "Authorization: Bearer $TOKEN")

if echo "$SINGLE" | grep -q "$HIGH_ID"; then
    echo -e "${GREEN}✓ Get single inquiry successful${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Get single inquiry failed${NC}\n"
    ((FAILED++))
fi

# Test 12: Update Inquiry Status (Admin)
echo -e "${BLUE}[12/15] Testing Inquiry Update${NC}"
ADMIN_ID=$(echo "$ME" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
UPDATE=$(curl -s -X PATCH "$API_URL/inquiries/$HIGH_ID" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"status\": \"in_progress\",
    \"assignedToId\": \"$ADMIN_ID\"
  }")

if echo "$UPDATE" | grep -q "in_progress"; then
    echo -e "${GREEN}✓ Inquiry update successful${NC}"
    echo "  Status changed to: in_progress"
    echo "  Assigned to: Admin User\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Inquiry update failed${NC}\n"
    ((FAILED++))
fi

# Test 13: Get Inquiry Statistics (Admin)
echo -e "${BLUE}[13/15] Testing Inquiry Statistics${NC}"
STATS=$(curl -s "$API_URL/inquiries/stats" \
  -H "Authorization: Bearer $TOKEN")

if echo "$STATS" | grep -q "total"; then
    TOTAL_COUNT=$(echo "$STATS" | grep -o '"total":[0-9]*' | cut -d':' -f2)
    IN_PROGRESS=$(echo "$STATS" | grep -o '"inProgress":[0-9]*' | cut -d':' -f2)
    HIGH_PRIORITY=$(echo "$STATS" | grep -o '"highPriority":[0-9]*' | cut -d':' -f2)
    echo -e "${GREEN}✓ Statistics endpoint successful${NC}"
    echo "  Total: $TOTAL_COUNT"
    echo "  In Progress: $IN_PROGRESS"
    echo "  High Priority: $HIGH_PRIORITY\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Statistics endpoint failed${NC}\n"
    ((FAILED++))
fi

# Test 14: Search Inquiries (Admin)
echo -e "${BLUE}[14/15] Testing Inquiry Search${NC}"
SEARCH=$(curl -s "$API_URL/inquiries?search=Nigerian&page=1" \
  -H "Authorization: Bearer $TOKEN")

if echo "$SEARCH" | grep -q "Nigerian"; then
    echo -e "${GREEN}✓ Search functionality working${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Search functionality failed${NC}\n"
    ((FAILED++))
fi

# Test 15: Filter by Status (Admin)
echo -e "${BLUE}[15/15] Testing Status Filtering${NC}"
FILTER=$(curl -s "$API_URL/inquiries?status=in_progress" \
  -H "Authorization: Bearer $TOKEN")

if echo "$FILTER" | grep -q "in_progress"; then
    echo -e "${GREEN}✓ Status filtering working${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Status filtering failed${NC}\n"
    ((FAILED++))
fi

# Summary
echo -e "${BLUE}=========================================="
echo "📊 Test Summary"
echo "==========================================${NC}"
echo -e "${GREEN}Passed: $PASSED${NC}"
if [ $FAILED -gt 0 ]; then
    echo -e "${RED}Failed: $FAILED${NC}"
else
    echo -e "${GREEN}Failed: $FAILED${NC}"
fi
echo -e "${BLUE}Total:  $((PASSED + FAILED))${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}=========================================="
    echo "✅ ALL TESTS PASSED!"
    echo "==========================================${NC}"
    echo ""
    echo -e "${BLUE}📚 Documentation:${NC}"
    echo "  Swagger: http://localhost:4000/api-docs"
    echo "  Backend: http://localhost:4000/api/v1"
    echo ""
    echo -e "${BLUE}🔑 Test Credentials:${NC}"
    echo "  Email: admin@terraindustries.com"
    echo "  Password: SecurePass123!"
    echo ""
    echo -e "${BLUE}🎯 Access Token (valid for 7 days):${NC}"
    echo "  $TOKEN"
    exit 0
else
    echo -e "${RED}=========================================="
    echo "❌ SOME TESTS FAILED"
    echo "==========================================${NC}"
    exit 1
fi

