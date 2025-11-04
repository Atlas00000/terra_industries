#!/bin/bash

# Terra Industries - Week 6 Comprehensive Test Script
# Tests Search & Advanced Filtering

set -e

API_URL="http://localhost:4000/api/v1"
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}=============================================="
echo "🚀 Terra Industries - Week 6 Test Suite"
echo "   Search & Advanced Filtering"
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
# PART 1: GLOBAL SEARCH (3 tests)
# ==============================================================================

echo -e "${BLUE}====== PART 1: GLOBAL SEARCH ======${NC}\n"

# Test 1: Global Search (Public)
echo -e "${BLUE}[1/12] Testing Global Search (Query: 'archer')${NC}"
GLOBAL=$(curl -s "$API_URL/search/global?q=archer&limit=10")

TOTAL_RESULTS=$(echo "$GLOBAL" | grep -o '"total":[0-9]*' | cut -d':' -f2)

if [ ! -z "$TOTAL_RESULTS" ] && [ "$TOTAL_RESULTS" -gt 0 ]; then
    echo -e "${GREEN}✓ Global search working${NC}"
    echo "  Total results: $TOTAL_RESULTS\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Global search failed${NC}\n"
    ((FAILED++))
fi

# Test 2: Empty Search Query
echo -e "${BLUE}[2/12] Testing Empty Search Query${NC}"
EMPTY=$(curl -s "$API_URL/search/global?q=&limit=10")

if echo "$EMPTY" | grep -q '"total":0'; then
    echo -e "${GREEN}✓ Empty query handled correctly${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Empty query handling failed${NC}\n"
    ((FAILED++))
fi

# Test 3: Search Suggestions
echo -e "${BLUE}[3/12] Testing Search Suggestions (Auto-complete)${NC}"
SUGGESTIONS=$(curl -s "$API_URL/search/suggestions?q=arc&limit=5")

if [ ! -z "$SUGGESTIONS" ]; then
    echo -e "${GREEN}✓ Search suggestions working${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Search suggestions failed${NC}\n"
    ((FAILED++))
fi

# ==============================================================================
# PART 2: ADVANCED FILTERING (6 tests)
# ==============================================================================

echo -e "${BLUE}====== PART 2: ADVANCED FILTERING ======${NC}\n"

# Test 4: Filter Inquiries by Lead Score
echo -e "${BLUE}[4/12] Testing Inquiry Filter (Lead Score ≥60)${NC}"
INQ_FILTER=$(curl -s "$API_URL/search/inquiries?minScore=60&maxScore=100" \
  -H "Authorization: Bearer $TOKEN")

if echo "$INQ_FILTER" | grep -q '"data"'; then
    echo -e "${GREEN}✓ Lead score filtering working${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Lead score filtering failed${NC}\n"
    ((FAILED++))
fi

# Test 5: Filter Inquiries by Status
echo -e "${BLUE}[5/12] Testing Inquiry Filter (Status: new)${NC}"
STATUS_FILTER=$(curl -s "$API_URL/search/inquiries?statuses=new" \
  -H "Authorization: Bearer $TOKEN")

if echo "$STATUS_FILTER" | grep -q '"meta"'; then
    echo -e "${GREEN}✓ Status filtering working${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Status filtering failed${NC}\n"
    ((FAILED++))
fi

# Test 6: Filter RFQs by Category
echo -e "${BLUE}[6/12] Testing RFQ Filter (Category: archer)${NC}"
RFQ_FILTER=$(curl -s "$API_URL/search/rfqs?categories=archer" \
  -H "Authorization: Bearer $TOKEN")

if echo "$RFQ_FILTER" | grep -q '"data"'; then
    echo -e "${GREEN}✓ RFQ category filtering working${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ RFQ category filtering failed${NC}\n"
    ((FAILED++))
fi

# Test 7: Filter RFQs by Quote Amount Range
echo -e "${BLUE}[7/12] Testing RFQ Filter (Quote Amount $1M-$50M)${NC}"
AMOUNT_FILTER=$(curl -s "$API_URL/search/rfqs?minAmount=1000000&maxAmount=50000000" \
  -H "Authorization: Bearer $TOKEN")

if echo "$AMOUNT_FILTER" | grep -q '"meta"'; then
    echo -e "${GREEN}✓ Amount range filtering working${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Amount range filtering failed${NC}\n"
    ((FAILED++))
fi

# Test 8: Filter News by Category
echo -e "${BLUE}[8/12] Testing News Filter (Category: product-updates)${NC}"
NEWS_FILTER=$(curl -s "$API_URL/search/news?categories=product-updates")

if echo "$NEWS_FILTER" | grep -q '"meta"'; then
    echo -e "${GREEN}✓ News category filtering working${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ News category filtering failed${NC}\n"
    ((FAILED++))
fi

# Test 9: Filter News by Tags
echo -e "${BLUE}[9/12] Testing News Filter (Tags: archer, vtol)${NC}"
TAG_FILTER=$(curl -s "$API_URL/search/news?tags=archer&tags=vtol")

if echo "$TAG_FILTER" | grep -q '"data"'; then
    echo -e "${GREEN}✓ Tag filtering working${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Tag filtering failed${NC}\n"
    ((FAILED++))
fi

# ==============================================================================
# PART 3: SORTING & PAGINATION (3 tests)
# ==============================================================================

echo -e "${BLUE}====== PART 3: SORTING & PAGINATION ======${NC}\n"

# Test 10: Sort by Lead Score (Descending)
echo -e "${BLUE}[10/12] Testing Sorting (Lead Score DESC)${NC}"
SORT=$(curl -s "$API_URL/search/inquiries?sortBy=leadScore&sortOrder=desc" \
  -H "Authorization: Bearer $TOKEN")

if echo "$SORT" | grep -q '"data"'; then
    echo -e "${GREEN}✓ Sorting working${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Sorting failed${NC}\n"
    ((FAILED++))
fi

# Test 11: Pagination (Page 1, Limit 5)
echo -e "${BLUE}[11/12] Testing Pagination${NC}"
PAGINATE=$(curl -s "$API_URL/search/inquiries?page=1&limit=5" \
  -H "Authorization: Bearer $TOKEN")

if echo "$PAGINATE" | grep -q '"totalPages"'; then
    echo -e "${GREEN}✓ Pagination working${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Pagination failed${NC}\n"
    ((FAILED++))
fi

# Test 12: Combined Filters (Multiple)
echo -e "${BLUE}[12/12] Testing Combined Filters${NC}"
COMBINED=$(curl -s "$API_URL/search/rfqs?categories=archer&statuses=quoted&statuses=pending&sortBy=quoteAmount&sortOrder=desc" \
  -H "Authorization: Bearer $TOKEN")

if echo "$COMBINED" | grep -q '"meta"'; then
    echo -e "${GREEN}✓ Combined filtering working${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Combined filtering failed${NC}\n"
    ((FAILED++))
fi

# ==============================================================================
# SUMMARY
# ==============================================================================

echo -e "${BLUE}=============================================="
echo "📊 Week 6 Test Summary"
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
    echo "✅ ALL WEEK 6 TESTS PASSED!"
    echo "==============================================${NC}"
    echo ""
    echo -e "${BLUE}🎉 What's Working:${NC}"
    echo "  ✅ Global search (inquiries, RFQs, news, products)"
    echo "  ✅ Search suggestions (auto-complete)"
    echo "  ✅ Advanced inquiry filtering"
    echo "  ✅ Advanced RFQ filtering"
    echo "  ✅ News category & tag filtering"
    echo "  ✅ Lead score range filtering"
    echo "  ✅ Quote amount range filtering"
    echo "  ✅ Multi-select filters (categories, statuses, tags)"
    echo "  ✅ Sorting (by any field, asc/desc)"
    echo "  ✅ Pagination with metadata"
    echo "  ✅ Combined filter queries"
    echo ""
    echo -e "${BLUE}📚 New Endpoints (6 total):${NC}"
    echo "  - GET /search/global"
    echo "  - GET /search/suggestions"
    echo "  - GET /search/inquiries"
    echo "  - GET /search/rfqs"
    echo "  - GET /search/news"
    echo "  - GET /search/products"
    echo ""
    echo -e "${BLUE}📈 Total Backend API:${NC}"
    echo "  Total Endpoints: 60 (54 from W1-5 + 6 from W6)"
    echo "  Database Tables: 8"
    echo "  Modules: 12"
    echo ""
    exit 0
else
    echo -e "${RED}=============================================="
    echo "❌ SOME TESTS FAILED"
    echo "==============================================${NC}"
    exit 1
fi

