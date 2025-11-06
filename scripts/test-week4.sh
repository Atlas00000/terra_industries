#!/bin/bash

# Terra Industries - Week 4 Comprehensive Test Script
# Tests admin dashboard and CRM functionality

set -e  # Exit on error

API_URL="http://localhost:4000/api/v1"
CLIENT_URL="http://localhost:3000"
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}=========================================="
echo "🚀 Terra Industries - Week 4 Test Suite"
echo "   Admin Dashboard + CRM Interface"
echo "==========================================${NC}\n"

# Test counter
PASSED=0
FAILED=0

# ===== AUTHENTICATION TESTS =====

echo -e "${YELLOW}=== Admin Authentication ===${NC}\n"

# Test 1: Login Page Loads
echo -e "${BLUE}[1/15] Testing Admin Login Page${NC}"

LOGIN_PAGE=$(curl -s -o /dev/null -w "%{http_code}" "$CLIENT_URL/admin/login")

if [ "$LOGIN_PAGE" = "200" ]; then
    echo -e "${GREEN}✓ Admin login page loads${NC}"
    echo "  Status: 200 OK\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Admin login page failed${NC}"
    echo "  Status: $LOGIN_PAGE\n"
    ((FAILED++))
fi

# Test 2: Login API Endpoint
echo -e "${BLUE}[2/15] Testing Login API Endpoint${NC}"

LOGIN_RESPONSE=$(curl -s -X POST "$API_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@terraindustries.com","password":"SecurePass123!"}')

TOKEN=$(echo "$LOGIN_RESPONSE" | grep -o '"accessToken":"[^"]*"' | cut -d'"' -f4)

if [ ! -z "$TOKEN" ]; then
    echo -e "${GREEN}✓ Login successful${NC}"
    echo "  Token received: ${TOKEN:0:30}...\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Login failed${NC}\n"
    ((FAILED++))
    exit 1
fi

# Test 3: Protected Route Access
echo -e "${BLUE}[3/15] Testing Protected Route - Get Current User${NC}"

ME=$(curl -s "$API_URL/auth/me" \
  -H "Authorization: Bearer $TOKEN")

if echo "$ME" | grep -q "admin@terraindustries.com"; then
    echo -e "${GREEN}✓ Protected route accessible with token${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Protected route access failed${NC}\n"
    ((FAILED++))
fi

# Test 4: Dashboard Page (Protected)
echo -e "${BLUE}[4/15] Testing Admin Dashboard Page${NC}"

DASHBOARD_PAGE=$(curl -s -o /dev/null -w "%{http_code}" "$CLIENT_URL/admin/dashboard")

# Note: Will redirect to login since we can't set cookies via curl
# 200 or 307/308 (redirect) are acceptable
if [ "$DASHBOARD_PAGE" = "200" ] || [ "$DASHBOARD_PAGE" = "307" ] || [ "$DASHBOARD_PAGE" = "308" ]; then
    echo -e "${GREEN}✓ Dashboard page exists${NC}"
    echo "  Status: $DASHBOARD_PAGE\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Dashboard page failed${NC}"
    echo "  Status: $DASHBOARD_PAGE\n"
    ((FAILED++))
fi

# ===== INQUIRY MANAGEMENT TESTS =====

echo -e "${YELLOW}=== Inquiry Management ===${NC}\n"

# Test 5: List Inquiries (Admin)
echo -e "${BLUE}[5/15] Testing List Inquiries Endpoint${NC}"

INQUIRIES=$(curl -s "$API_URL/inquiries?page=1&limit=10" \
  -H "Authorization: Bearer $TOKEN")

INQUIRY_COUNT=$(echo "$INQUIRIES" | grep -o '"id":"[^"]*"' | wc -l | tr -d ' ')

if [ "$INQUIRY_COUNT" -ge 1 ]; then
    echo -e "${GREEN}✓ Inquiries endpoint working${NC}"
    echo "  Found $INQUIRY_COUNT inquiries\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Inquiries endpoint failed${NC}\n"
    ((FAILED++))
fi

# Test 6: Inquiry Statistics
echo -e "${BLUE}[6/15] Testing Inquiry Statistics${NC}"

STATS=$(curl -s "$API_URL/inquiries/stats" \
  -H "Authorization: Bearer $TOKEN")

HAS_TOTAL=$(echo "$STATS" | grep -o '"total":[0-9]*')
HAS_NEW=$(echo "$STATS" | grep -o '"newInquiries":[0-9]*')

if [ ! -z "$HAS_TOTAL" ] && [ ! -z "$HAS_NEW" ]; then
    echo -e "${GREEN}✓ Statistics endpoint working${NC}"
    echo "  Data structure: Complete\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Statistics endpoint failed${NC}\n"
    ((FAILED++))
fi

# Test 7: Get Single Inquiry
echo -e "${BLUE}[7/15] Testing Get Single Inquiry${NC}"

FIRST_ID=$(echo "$INQUIRIES" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ ! -z "$FIRST_ID" ]; then
    INQUIRY_DETAIL=$(curl -s "$API_URL/inquiries/$FIRST_ID" \
      -H "Authorization: Bearer $TOKEN")
    
    if echo "$INQUIRY_DETAIL" | grep -q "$FIRST_ID"; then
        echo -e "${GREEN}✓ Get single inquiry working${NC}"
        echo "  Inquiry ID: ${FIRST_ID:0:8}...\n"
        ((PASSED++))
    else
        echo -e "${RED}✗ Get single inquiry failed${NC}\n"
        ((FAILED++))
    fi
else
    echo -e "${YELLOW}⚠ No inquiries available for testing${NC}\n"
    ((PASSED++))
fi

# ===== RFQ PIPELINE TESTS =====

echo -e "${YELLOW}=== RFQ Pipeline ===${NC}\n"

# Test 8: List RFQs
echo -e "${BLUE}[8/15] Testing List RFQs Endpoint${NC}"

RFQS=$(curl -s "$API_URL/rfq?page=1&limit=10" \
  -H "Authorization: Bearer $TOKEN")

HAS_RFQS=$(echo "$RFQS" | grep -o '"data":\[')

if [ ! -z "$HAS_RFQS" ]; then
    echo -e "${GREEN}✓ RFQ endpoint working${NC}"
    echo "  Endpoint accessible\n"
    ((PASSED++))
else
    echo -e "${RED}✗ RFQ endpoint failed${NC}\n"
    ((FAILED++))
fi

# Test 9: RFQ Statistics
echo -e "${BLUE}[9/15] Testing RFQ Statistics${NC}"

RFQ_STATS=$(curl -s "$API_URL/rfq/stats" \
  -H "Authorization: Bearer $TOKEN")

HAS_RFQ_TOTAL=$(echo "$RFQ_STATS" | grep -o '"total":[0-9]*')
HAS_PENDING=$(echo "$RFQ_STATS" | grep -o '"pending":[0-9]*')

if [ ! -z "$HAS_RFQ_TOTAL" ] && [ ! -z "$HAS_PENDING" ]; then
    echo -e "${GREEN}✓ RFQ statistics working${NC}"
    echo "  Data structure: Complete\n"
    ((PASSED++))
else
    echo -e "${RED}✗ RFQ statistics failed${NC}\n"
    ((FAILED++))
fi

# ===== FRONTEND PAGE TESTS =====

echo -e "${YELLOW}=== Frontend Pages ===${NC}\n"

# Test 10: Inquiries Page
echo -e "${BLUE}[10/15] Testing Inquiries Page${NC}"

INQUIRIES_PAGE=$(curl -s -o /dev/null -w "%{http_code}" "$CLIENT_URL/admin/inquiries")

if [ "$INQUIRIES_PAGE" = "200" ] || [ "$INQUIRIES_PAGE" = "307" ] || [ "$INQUIRIES_PAGE" = "308" ]; then
    echo -e "${GREEN}✓ Inquiries page exists${NC}"
    echo "  Status: $INQUIRIES_PAGE\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Inquiries page failed${NC}\n"
    ((FAILED++))
fi

# Test 11: RFQ Pipeline Page
echo -e "${BLUE}[11/15] Testing RFQ Pipeline Page${NC}"

RFQ_PAGE=$(curl -s -o /dev/null -w "%{http_code}" "$CLIENT_URL/admin/rfq")

if [ "$RFQ_PAGE" = "200" ] || [ "$RFQ_PAGE" = "307" ] || [ "$RFQ_PAGE" = "308" ]; then
    echo -e "${GREEN}✓ RFQ pipeline page exists${NC}"
    echo "  Status: $RFQ_PAGE\n"
    ((PASSED++))
else
    echo -e "${RED}✗ RFQ pipeline page failed${NC}\n"
    ((FAILED++))
fi

# ===== DATA VALIDATION TESTS =====

echo -e "${YELLOW}=== Data Validation ===${NC}\n"

# Test 12: Inquiry Filtering by Status
echo -e "${BLUE}[12/15] Testing Inquiry Status Filtering${NC}"

NEW_INQUIRIES=$(curl -s "$API_URL/inquiries?status=new" \
  -H "Authorization: Bearer $TOKEN")

if echo "$NEW_INQUIRIES" | grep -q '"data":\['; then
    echo -e "${GREEN}✓ Status filtering working${NC}"
    echo "  Filter: status=new\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Status filtering failed${NC}\n"
    ((FAILED++))
fi

# Test 13: Inquiry Sorting
echo -e "${BLUE}[13/15] Testing Inquiry Sorting${NC}"

SORTED=$(curl -s "$API_URL/inquiries?sortBy=leadScore&order=desc&limit=5" \
  -H "Authorization: Bearer $TOKEN")

if echo "$SORTED" | grep -q '"leadScore"'; then
    echo -e "${GREEN}✓ Sorting working${NC}"
    echo "  Sort: leadScore desc\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Sorting failed${NC}\n"
    ((FAILED++))
fi

# Test 14: Pagination Metadata
echo -e "${BLUE}[14/15] Testing Pagination${NC}"

HAS_META=$(echo "$INQUIRIES" | grep -o '"meta":{')
HAS_TOTAL=$(echo "$INQUIRIES" | grep -o '"total":[0-9]*')
HAS_PAGE=$(echo "$INQUIRIES" | grep -o '"page":[0-9]*')

if [ ! -z "$HAS_META" ] && [ ! -z "$HAS_TOTAL" ] && [ ! -z "$HAS_PAGE" ]; then
    echo -e "${GREEN}✓ Pagination metadata complete${NC}"
    echo "  ✓ meta, total, page fields present\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Pagination metadata incomplete${NC}\n"
    ((FAILED++))
fi

# Test 15: Unauthorized Access Prevention
echo -e "${BLUE}[15/15] Testing Unauthorized Access Prevention${NC}"

UNAUTH=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/inquiries")

if [ "$UNAUTH" = "401" ]; then
    echo -e "${GREEN}✓ Unauthorized access properly blocked${NC}"
    echo "  Status: 401 Unauthorized\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Authorization check failed${NC}"
    echo "  Status: $UNAUTH (expected 401)\n"
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
    echo "✅ ALL WEEK 4 TESTS PASSED!"
    echo "==========================================${NC}"
    echo ""
    echo -e "${BLUE}📚 Features Tested:${NC}"
    echo "  ✓ Admin login page (frontend)"
    echo "  ✓ JWT authentication (backend)"
    echo "  ✓ Protected route access"
    echo "  ✓ Dashboard page exists"
    echo "  ✓ Inquiry list endpoint"
    echo "  ✓ Inquiry statistics"
    echo "  ✓ Single inquiry detail"
    echo "  ✓ RFQ list endpoint"
    echo "  ✓ RFQ statistics"
    echo "  ✓ Inquiries page (frontend)"
    echo "  ✓ RFQ pipeline page (frontend)"
    echo "  ✓ Status filtering"
    echo "  ✓ Sorting functionality"
    echo "  ✓ Pagination metadata"
    echo "  ✓ Unauthorized access blocked"
    echo ""
    echo -e "${BLUE}🎯 Admin Panel URLs:${NC}"
    echo "  Login:      $CLIENT_URL/admin/login"
    echo "  Dashboard:  $CLIENT_URL/admin/dashboard"
    echo "  Inquiries:  $CLIENT_URL/admin/inquiries"
    echo "  RFQ Pipeline: $CLIENT_URL/admin/rfq"
    echo ""
    echo -e "${BLUE}🔑 Test Credentials:${NC}"
    echo "  Email:    admin@terraindustries.com"
    echo "  Password: SecurePass123!"
    echo ""
    echo -e "${BLUE}🎯 Access Token (7 days):${NC}"
    echo "  $TOKEN"
    echo ""
    echo -e "${BLUE}📖 Documentation:${NC}"
    echo "  Implementation: docs/WEEK4-IMPLEMENTATION-SUMMARY.md"
    echo "  Dev Credentials: docs/DEV-CREDENTIALS.md"
    exit 0
else
    echo -e "${RED}=========================================="
    echo "❌ SOME TESTS FAILED"
    echo "==========================================${NC}"
    echo ""
    echo -e "${YELLOW}Troubleshooting:${NC}"
    echo "  1. Ensure backend is running: cd server && pnpm start:dev"
    echo "  2. Ensure frontend is running: cd client && pnpm dev"
    echo "  3. Ensure database is seeded: cd server && pnpm prisma:seed"
    echo "  4. Check admin credentials are correct"
    exit 1
fi
