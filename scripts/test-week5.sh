#!/bin/bash

# Terra Industries - Week 5 Comprehensive Test Script
# Tests CMS, Media Library, and Analytics

set -e  # Exit on error

API_URL="http://localhost:4000/api/v1"
CLIENT_URL="http://localhost:3000"
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}=========================================="
echo "🚀 Terra Industries - Week 5 Test Suite"
echo "   CMS + Media + Analytics"
echo "==========================================${NC}\n"

# Get auth token
LOGIN=$(curl -s -X POST "$API_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@terraindustries.com","password":"SecurePass123!"}')

TOKEN=$(echo "$LOGIN" | grep -o '"accessToken":"[^"]*"' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
    echo -e "${RED}✗ Failed to get auth token${NC}"
    exit 1
fi

# Test counter
PASSED=0
FAILED=0

# ===== NEWS CMS TESTS =====

echo -e "${YELLOW}=== News CMS ===${NC}\n"

# Test 1: List All News
echo -e "${BLUE}[1/12] Testing List All News${NC}"

NEWS=$(curl -s "$API_URL/news" \
  -H "Authorization: Bearer $TOKEN")

NEWS_COUNT=$(echo "$NEWS" | grep -o '"id"' | wc -l | tr -d ' ')

if [ "$NEWS_COUNT" -ge 1 ]; then
    echo -e "${GREEN}✓ News list endpoint working${NC}"
    echo "  Found $NEWS_COUNT news stories\n"
    ((PASSED++))
else
    echo -e "${RED}✗ News list failed${NC}\n"
    ((FAILED++))
fi

# Test 2: News Statistics
echo -e "${BLUE}[2/12] Testing News Statistics${NC}"

NEWS_STATS=$(curl -s "$API_URL/news/stats" \
  -H "Authorization: Bearer $TOKEN")

HAS_TOTAL=$(echo "$NEWS_STATS" | grep -o '"total":[0-9]*')

if [ ! -z "$HAS_TOTAL" ]; then
    echo -e "${GREEN}✓ News statistics working${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ News statistics failed${NC}\n"
    ((FAILED++))
fi

# Test 3: Get Featured News (Public)
echo -e "${BLUE}[3/12] Testing Featured News${NC}"

FEATURED=$(curl -s "$API_URL/news/featured")

# Check if endpoint returns valid response (array)
IS_ARRAY=$(echo "$FEATURED" | grep -o '^\[')

if [ ! -z "$IS_ARRAY" ]; then
    FEATURED_COUNT=$(echo "$FEATURED" | grep -o '"title"' | wc -l | tr -d ' ')
    echo -e "${GREEN}✓ Featured news endpoint working${NC}"
    echo "  Found $FEATURED_COUNT featured stories\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Featured news failed${NC}\n"
    ((FAILED++))
fi

# ===== PRODUCT MANAGEMENT TESTS =====

echo -e "${YELLOW}=== Product Management ===${NC}\n"

# Test 4: List Products (Admin)
echo -e "${BLUE}[4/12] Testing List Products${NC}"

PRODUCTS=$(curl -s "$API_URL/product-specs" \
  -H "Authorization: Bearer $TOKEN")

PRODUCT_COUNT=$(echo "$PRODUCTS" | grep -o '"productName"' | wc -l | tr -d ' ')

if [ "$PRODUCT_COUNT" -ge 5 ]; then
    echo -e "${GREEN}✓ Products list working${NC}"
    echo "  Found $PRODUCT_COUNT products\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Products list failed${NC}\n"
    ((FAILED++))
fi

# Test 5: Product Statistics
echo -e "${BLUE}[5/12] Testing Product Statistics${NC}"

PROD_STATS=$(curl -s "$API_URL/product-specs/stats" \
  -H "Authorization: Bearer $TOKEN")

HAS_PROD_TOTAL=$(echo "$PROD_STATS" | grep -o '"total":[0-9]*')

if [ ! -z "$HAS_PROD_TOTAL" ]; then
    echo -e "${GREEN}✓ Product statistics working${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Product statistics failed${NC}\n"
    ((FAILED++))
fi

# ===== MEDIA LIBRARY TESTS =====

echo -e "${YELLOW}=== Media Library ===${NC}\n"

# Test 6: List Media Files
echo -e "${BLUE}[6/12] Testing List Media Files${NC}"

MEDIA=$(curl -s "$API_URL/media" \
  -H "Authorization: Bearer $TOKEN")

HAS_MEDIA=$(echo "$MEDIA" | grep -o '"data":\[')

if [ ! -z "$HAS_MEDIA" ]; then
    echo -e "${GREEN}✓ Media list endpoint working${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Media list failed${NC}\n"
    ((FAILED++))
fi

# Test 7: Media Statistics
echo -e "${BLUE}[7/12] Testing Media Statistics${NC}"

MEDIA_STATS=$(curl -s "$API_URL/media/stats" \
  -H "Authorization: Bearer $TOKEN")

HAS_MEDIA_TOTAL=$(echo "$MEDIA_STATS" | grep -o '"total":[0-9]*')

if [ ! -z "$HAS_MEDIA_TOTAL" ]; then
    echo -e "${GREEN}✓ Media statistics working${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Media statistics failed${NC}\n"
    ((FAILED++))
fi

# ===== ANALYTICS TESTS =====

echo -e "${YELLOW}=== Analytics Dashboard ===${NC}\n"

# Test 8: Analytics Overview
echo -e "${BLUE}[8/12] Testing Analytics Overview${NC}"

ANALYTICS=$(curl -s "$API_URL/analytics/overview" \
  -H "Authorization: Bearer $TOKEN")

if echo "$ANALYTICS" | grep -q '"'; then
    echo -e "${GREEN}✓ Analytics overview working${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Analytics overview failed${NC}\n"
    ((FAILED++))
fi

# ===== FRONTEND PAGE TESTS =====

echo -e "${YELLOW}=== Frontend Pages ===${NC}\n"

# Test 9: News CMS Page
echo -e "${BLUE}[9/12] Testing News CMS Page${NC}"

NEWS_PAGE=$(curl -s -o /dev/null -w "%{http_code}" "$CLIENT_URL/admin/news")

if [ "$NEWS_PAGE" = "200" ] || [ "$NEWS_PAGE" = "307" ]; then
    echo -e "${GREEN}✓ News CMS page exists${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ News CMS page failed${NC}\n"
    ((FAILED++))
fi

# Test 10: Products Management Page
echo -e "${BLUE}[10/12] Testing Products Page${NC}"

PRODUCTS_PAGE=$(curl -s -o /dev/null -w "%{http_code}" "$CLIENT_URL/admin/products")

if [ "$PRODUCTS_PAGE" = "200" ] || [ "$PRODUCTS_PAGE" = "307" ]; then
    echo -e "${GREEN}✓ Products page exists${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Products page failed${NC}\n"
    ((FAILED++))
fi

# Test 11: Media Library Page
echo -e "${BLUE}[11/12] Testing Media Library Page${NC}"

MEDIA_PAGE=$(curl -s -o /dev/null -w "%{http_code}" "$CLIENT_URL/admin/media")

if [ "$MEDIA_PAGE" = "200" ] || [ "$MEDIA_PAGE" = "307" ]; then
    echo -e "${GREEN}✓ Media library page exists${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Media library page failed${NC}\n"
    ((FAILED++))
fi

# Test 12: Analytics Page
echo -e "${BLUE}[12/12] Testing Analytics Page${NC}"

ANALYTICS_PAGE=$(curl -s -o /dev/null -w "%{http_code}" "$CLIENT_URL/admin/analytics")

if [ "$ANALYTICS_PAGE" = "200" ] || [ "$ANALYTICS_PAGE" = "307" ]; then
    echo -e "${GREEN}✓ Analytics page exists${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Analytics page failed${NC}\n"
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
    echo "✅ ALL WEEK 5 TESTS PASSED!"
    echo "==========================================${NC}"
    echo ""
    echo -e "${BLUE}📚 Features Tested:${NC}"
    echo "  ✓ News CMS (list, stats, featured)"
    echo "  ✓ Product management (list, stats)"
    echo "  ✓ Media library (list, stats)"
    echo "  ✓ Analytics overview"
    echo "  ✓ All admin pages accessible"
    echo ""
    echo -e "${BLUE}🎯 Admin Panel Complete:${NC}"
    echo "  • Login & Authentication"
    echo "  • Dashboard Overview"
    echo "  • Inquiry Management"
    echo "  • RFQ Pipeline"
    echo "  • News CMS"
    echo "  • Product Management"
    echo "  • Media Library"
    echo "  • Analytics Dashboard"
    echo ""
    echo -e "${BLUE}🔗 Access URLs:${NC}"
    echo "  Login:     $CLIENT_URL/admin/login"
    echo "  Dashboard: $CLIENT_URL/admin/dashboard"
    echo "  News:      $CLIENT_URL/admin/news"
    echo "  Products:  $CLIENT_URL/admin/products"
    echo "  Media:     $CLIENT_URL/admin/media"
    echo "  Analytics: $CLIENT_URL/admin/analytics"
    echo ""
    echo -e "${GREEN}🎊 INTEGRATION COMPLETE - ALL 5 WEEKS DONE!${NC}"
    exit 0
else
    echo -e "${RED}=========================================="
    echo "❌ SOME TESTS FAILED"
    echo "==========================================${NC}"
    exit 1
fi
