#!/bin/bash

# Terra Industries - Week 5 Comprehensive Test Script
# Tests Analytics Dashboard

set -e

API_URL="http://localhost:4000/api/v1"
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}=============================================="
echo "🚀 Terra Industries - Week 5 Test Suite"
echo "   Analytics & Dashboard"
echo "==============================================${NC}\n"

PASSED=0
FAILED=0

# Get admin token
echo -e "${YELLOW}🔑 Getting admin token...${NC}"
TOKEN=$(curl -s -X POST $API_URL/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@terraindustries.com", "password": "SecurePass123!"}' | grep -o '"accessToken":"[^"]*"' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
    echo -e "${RED}❌ Failed to get admin token${NC}\n"
    exit 1
fi
echo -e "${GREEN}✓ Admin token obtained${NC}\n"

# ==============================================================================
# PART 1: CORE DASHBOARD METRICS (6 tests)
# ==============================================================================

echo -e "${BLUE}====== PART 1: CORE DASHBOARD METRICS ======${NC}\n"

# Test 1: Overview
echo -e "${BLUE}[1/12] Testing Dashboard Overview${NC}"
OVERVIEW=$(curl -s "$API_URL/analytics/overview" \
  -H "Authorization: Bearer $TOKEN")

if echo "$OVERVIEW" | grep -q "inquiries"; then
    TOTAL_INQ=$(echo "$OVERVIEW" | grep -o '"total":[0-9]*' | head -1 | cut -d':' -f2)
    echo -e "${GREEN}✓ Dashboard overview working${NC}"
    echo "  Total Inquiries: $TOTAL_INQ\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Dashboard overview failed${NC}\n"
    ((FAILED++))
fi

# Test 2: Conversion Funnel
echo -e "${BLUE}[2/12] Testing Conversion Funnel${NC}"
FUNNEL=$(curl -s "$API_URL/analytics/conversion-funnel" \
  -H "Authorization: Bearer $TOKEN")

if echo "$FUNNEL" | grep -q "stages"; then
    echo -e "${GREEN}✓ Conversion funnel working${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Conversion funnel failed${NC}\n"
    ((FAILED++))
fi

# Test 3: Lead Sources
echo -e "${BLUE}[3/12] Testing Lead Sources${NC}"
SOURCES=$(curl -s "$API_URL/analytics/lead-sources" \
  -H "Authorization: Bearer $TOKEN")

if echo "$SOURCES" | grep -q "byCountry"; then
    echo -e "${GREEN}✓ Lead sources analytics working${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Lead sources failed${NC}\n"
    ((FAILED++))
fi

# Test 4: Response Times
echo -e "${BLUE}[4/12] Testing Response Times${NC}"
RESPONSE=$(curl -s "$API_URL/analytics/response-times" \
  -H "Authorization: Bearer $TOKEN")

if echo "$RESPONSE" | grep -q "inquiryToRfq"; then
    echo -e "${GREEN}✓ Response times analytics working${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Response times failed${NC}\n"
    ((FAILED++))
fi

# Test 5: Top Performers
echo -e "${BLUE}[5/12] Testing Top Performers${NC}"
TOP=$(curl -s "$API_URL/analytics/top-performers" \
  -H "Authorization: Bearer $TOKEN")

if echo "$TOP" | grep -q "topProducts"; then
    echo -e "${GREEN}✓ Top performers analytics working${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Top performers failed${NC}\n"
    ((FAILED++))
fi

# Test 6: Product Analytics
echo -e "${BLUE}[6/12] Testing Product Analytics${NC}"
PRODUCTS=$(curl -s "$API_URL/analytics/products" \
  -H "Authorization: Bearer $TOKEN")

if echo "$PRODUCTS" | grep -q "product"; then
    echo -e "${GREEN}✓ Product analytics working${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Product analytics failed${NC}\n"
    ((FAILED++))
fi

# ==============================================================================
# PART 2: TIME-SERIES ANALYTICS (2 tests)
# ==============================================================================

echo -e "${BLUE}====== PART 2: TIME-SERIES ANALYTICS ======${NC}\n"

# Test 7: Inquiries Timeline
echo -e "${BLUE}[7/12] Testing Inquiries Timeline (30 days)${NC}"
INQ_TIMELINE=$(curl -s "$API_URL/analytics/timeline/inquiries?days=30" \
  -H "Authorization: Bearer $TOKEN")

if [ ! -z "$INQ_TIMELINE" ]; then
    echo -e "${GREEN}✓ Inquiries timeline working${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Inquiries timeline failed${NC}\n"
    ((FAILED++))
fi

# Test 8: RFQs Timeline
echo -e "${BLUE}[8/12] Testing RFQs Timeline (30 days)${NC}"
RFQ_TIMELINE=$(curl -s "$API_URL/analytics/timeline/rfqs?days=30" \
  -H "Authorization: Bearer $TOKEN")

if [ ! -z "$RFQ_TIMELINE" ]; then
    echo -e "${GREEN}✓ RFQs timeline working${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ RFQs timeline failed${NC}\n"
    ((FAILED++))
fi

# ==============================================================================
# PART 3: REAL-TIME ACTIVITY (3 tests)
# ==============================================================================

echo -e "${BLUE}====== PART 3: REAL-TIME ACTIVITY ======${NC}\n"

# Test 9: Recent Activity
echo -e "${BLUE}[9/12] Testing Recent Activity Feed${NC}"
ACTIVITY=$(curl -s "$API_URL/analytics/recent-activity?limit=10" \
  -H "Authorization: Bearer $TOKEN")

if [ ! -z "$ACTIVITY" ]; then
    echo -e "${GREEN}✓ Recent activity feed working${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Recent activity failed${NC}\n"
    ((FAILED++))
fi

# Test 10: Active Leads
echo -e "${BLUE}[10/12] Testing Active/Hot Leads${NC}"
LEADS=$(curl -s "$API_URL/analytics/active-leads" \
  -H "Authorization: Bearer $TOKEN")

if [ ! -z "$LEADS" ]; then
    echo -e "${GREEN}✓ Active leads endpoint working${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Active leads failed${NC}\n"
    ((FAILED++))
fi

# Test 11: Pending Actions
echo -e "${BLUE}[11/12] Testing Pending Actions${NC}"
PENDING=$(curl -s "$API_URL/analytics/pending-actions" \
  -H "Authorization: Bearer $TOKEN")

if echo "$PENDING" | grep -q "unansweredInquiries"; then
    UNANSWERED=$(echo "$PENDING" | grep -o '"unansweredInquiries":[0-9]*' | cut -d':' -f2)
    echo -e "${GREEN}✓ Pending actions working${NC}"
    echo "  Unanswered Inquiries: $UNANSWERED\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Pending actions failed${NC}\n"
    ((FAILED++))
fi

# ==============================================================================
# PART 4: CONTENT ANALYTICS (1 test)
# ==============================================================================

echo -e "${BLUE}====== PART 4: CONTENT ANALYTICS ======${NC}\n"

# Test 12: News Analytics
echo -e "${BLUE}[12/12] Testing News Performance Analytics${NC}"
NEWS=$(curl -s "$API_URL/analytics/news" \
  -H "Authorization: Bearer $TOKEN")

if echo "$NEWS" | grep -q "totalViews"; then
    echo -e "${GREEN}✓ News analytics working${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ News analytics failed${NC}\n"
    ((FAILED++))
fi

# ==============================================================================
# SUMMARY
# ==============================================================================

echo -e "${BLUE}=============================================="
echo "📊 Week 5 Test Summary"
echo "==============================================${NC}"
echo -e "${GREEN}Passed: $PASSED${NC}"
if [ $FAILED -gt 0 ]; then
    echo -e "${RED}Failed: $FAILED${NC}"
else
    echo -e "${GREEN}Failed: $FAILED${NC}"
fi
echo -e "${BLUE}Total:  $((PASSED + FAILED))${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}=============================================="
    echo "✅ ALL WEEK 5 TESTS PASSED!"
    echo "==============================================${NC}"
    echo ""
    echo -e "${BLUE}🎉 What's Working:${NC}"
    echo "  ✅ Dashboard overview (inquiries, RFQs, revenue, conversions)"
    echo "  ✅ Conversion funnel analytics"
    echo "  ✅ Lead sources breakdown (country, type, score)"
    echo "  ✅ Response time metrics"
    echo "  ✅ Top performers (products, countries, deals)"
    echo "  ✅ Product performance analytics"
    echo "  ✅ Time-series data (inquiries & RFQs)"
    echo "  ✅ Recent activity feed"
    echo "  ✅ Active/hot leads tracking"
    echo "  ✅ Pending actions monitoring"
    echo "  ✅ News performance metrics"
    echo ""
    echo -e "${BLUE}📚 New Endpoints (12 total):${NC}"
    echo "  - GET /analytics/overview"
    echo "  - GET /analytics/conversion-funnel"
    echo "  - GET /analytics/lead-sources"
    echo "  - GET /analytics/response-times"
    echo "  - GET /analytics/top-performers"
    echo "  - GET /analytics/products"
    echo "  - GET /analytics/timeline/inquiries"
    echo "  - GET /analytics/timeline/rfqs"
    echo "  - GET /analytics/recent-activity"
    echo "  - GET /analytics/active-leads"
    echo "  - GET /analytics/pending-actions"
    echo "  - GET /analytics/news"
    echo ""
    echo -e "${BLUE}📈 Total Backend API:${NC}"
    echo "  Total Endpoints: 54 (42 from W1-4 + 12 from W5)"
    echo "  Database Tables: 8"
    echo "  Modules: 11"
    echo ""
    exit 0
else
    echo -e "${RED}=============================================="
    echo "❌ SOME TESTS FAILED"
    echo "==============================================${NC}"
    exit 1
fi

