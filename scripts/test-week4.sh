#!/bin/bash

# Terra Industries - Week 4 Comprehensive Test Script
# Tests News/Stories CMS + Product Specifications

set -e

API_URL="http://localhost:4000/api/v1"
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}=============================================="
echo "🚀 Terra Industries - Week 4 Test Suite"
echo "   News/Stories CMS + Product Specifications"
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
# PART 1: NEWS/STORIES CMS TESTS (12 tests)
# ==============================================================================

echo -e "${BLUE}====== PART 1: NEWS/STORIES CMS ======${NC}\n"

# Test 1: News Stats (Empty)
echo -e "${BLUE}[1/18] Getting Initial News Statistics${NC}"
NEWS_STATS=$(curl -s "$API_URL/news/stats" \
  -H "Authorization: Bearer $TOKEN")

if echo "$NEWS_STATS" | grep -q '"total":0'; then
    echo -e "${GREEN}✓ News stats endpoint working${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ News stats failed${NC}\n"
    ((FAILED++))
fi

# Test 2: Create News Story
echo -e "${BLUE}[2/18] Creating News Story (Draft)${NC}"
NEWS=$(curl -s -X POST "$API_URL/news" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Terra Industries Launches Revolutionary Archer VTOL System",
    "content": "Terra Industries today announced the launch of the Archer VTOL reconnaissance system, a groundbreaking autonomous defense technology that combines vertical takeoff and landing capabilities with advanced AI-powered reconnaissance. The system is designed to protect critical infrastructure across Africa.",
    "excerpt": "Revolutionary new VTOL system combines advanced AI with autonomous capabilities",
    "category": "product-updates",
    "tags": ["archer", "vtol", "autonomous", "ai"]
  }')

NEWS_ID=$(echo "$NEWS" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
NEWS_SLUG=$(echo "$NEWS" | grep -o '"slug":"[^"]*"' | cut -d'"' -f4)

if [ ! -z "$NEWS_ID" ]; then
    echo -e "${GREEN}✓ News story created${NC}"
    echo "  ID: $NEWS_ID"
    echo "  Slug: $NEWS_SLUG\n"
    ((PASSED++))
else
    echo -e "${RED}✗ News creation failed${NC}\n"
    ((FAILED++))
fi

# Test 3: List News (Admin)
echo -e "${BLUE}[3/18] Listing News Stories${NC}"
LIST=$(curl -s "$API_URL/news?status=draft" \
  -H "Authorization: Bearer $TOKEN")

if echo "$LIST" | grep -q "$NEWS_ID"; then
    echo -e "${GREEN}✓ News listing working${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ News listing failed${NC}\n"
    ((FAILED++))
fi

# Test 4: Update News Story
echo -e "${BLUE}[4/18] Updating News Story${NC}"
UPDATE=$(curl -s -X PATCH "$API_URL/news/$NEWS_ID" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "excerpt": "Updated: Revolutionary VTOL system with cutting-edge AI",
    "tags": ["archer", "vtol", "autonomous", "ai", "updated"]
  }')

if echo "$UPDATE" | grep -q "Updated"; then
    echo -e "${GREEN}✓ News update successful${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ News update failed${NC}\n"
    ((FAILED++))
fi

# Test 5: Publish News Story
echo -e "${BLUE}[5/18] Publishing News Story${NC}"
PUBLISH=$(curl -s -X POST "$API_URL/news/$NEWS_ID/publish" \
  -H "Authorization: Bearer $TOKEN")

if echo "$PUBLISH" | grep -q '"status":"published"'; then
    echo -e "${GREEN}✓ News published successfully${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ News publishing failed${NC}\n"
    ((FAILED++))
fi

# Test 6: Get News by Slug (Public)
echo -e "${BLUE}[6/18] Getting Published News by Slug (Public)${NC}"
PUBLIC=$(curl -s "$API_URL/news/slug/$NEWS_SLUG")

if echo "$PUBLIC" | grep -q "$NEWS_ID"; then
    echo -e "${GREEN}✓ Public news access working${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Public news access failed${NC}\n"
    ((FAILED++))
fi

# Test 7: Get Featured News
echo -e "${BLUE}[7/18] Getting Featured News${NC}"
FEATURED=$(curl -s "$API_URL/news/featured?limit=3")

if [ ! -z "$FEATURED" ]; then
    echo -e "${GREEN}✓ Featured news endpoint working${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Featured news failed${NC}\n"
    ((FAILED++))
fi

# Test 8: Unpublish News Story
echo -e "${BLUE}[8/18] Unpublishing News Story${NC}"
UNPUBLISH=$(curl -s -X POST "$API_URL/news/$NEWS_ID/unpublish" \
  -H "Authorization: Bearer $TOKEN")

if echo "$UNPUBLISH" | grep -q '"status":"draft"'; then
    echo -e "${GREEN}✓ News unpublished successfully${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ News unpublishing failed${NC}\n"
    ((FAILED++))
fi

# Test 9: Delete (Archive) News Story
echo -e "${BLUE}[9/18] Archiving News Story${NC}"
DELETE=$(curl -s -X DELETE "$API_URL/news/$NEWS_ID" \
  -H "Authorization: Bearer $TOKEN")

if echo "$DELETE" | grep -q "archived successfully"; then
    echo -e "${GREEN}✓ News archived successfully${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ News archiving failed${NC}\n"
    ((FAILED++))
fi

# ==============================================================================
# PART 2: PRODUCT SPECIFICATIONS TESTS (9 tests)
# ==============================================================================

echo -e "${BLUE}====== PART 2: PRODUCT SPECIFICATIONS ======${NC}\n"

# Test 10: Product Specs Stats (Empty)
echo -e "${BLUE}[10/18] Getting Initial Product Specs Statistics${NC}"
SPEC_STATS=$(curl -s "$API_URL/product-specs/stats" \
  -H "Authorization: Bearer $TOKEN")

if echo "$SPEC_STATS" | grep -q '"total":0'; then
    echo -e "${GREEN}✓ Product specs stats endpoint working${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Product specs stats failed${NC}\n"
    ((FAILED++))
fi

# Test 11: Create Product Specification
echo -e "${BLUE}[11/18] Creating Product Specification (Archer)${NC}"
SPEC=$(curl -s -X POST "$API_URL/product-specs" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "productName": "Archer VTOL Reconnaissance System",
    "category": "archer",
    "specifications": {
      "dimensions": {
        "length": "3.2m",
        "wingspan": "4.5m",
        "height": "0.9m",
        "weight": "45kg"
      },
      "materials": ["Carbon fiber composite", "Aluminum alloy", "Kevlar"],
      "capabilities": ["VTOL operation", "Autonomous flight", "AI reconnaissance"]
    },
    "performanceMetrics": {
      "maxSpeed": "120 km/h",
      "cruiseSpeed": "80 km/h",
      "range": "200 km",
      "endurance": "8 hours",
      "maxAltitude": "5000m",
      "payload": "15kg"
    },
    "technicalDetails": {
      "powerSystem": "Hybrid electric",
      "sensors": ["4K camera", "Thermal imaging", "LiDAR"],
      "communication": "Encrypted RF link up to 50km",
      "autonomy": "Full autonomous mission planning with AI"
    }
  }')

SPEC_ID=$(echo "$SPEC" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ ! -z "$SPEC_ID" ]; then
    echo -e "${GREEN}✓ Product spec created${NC}"
    echo "  ID: $SPEC_ID\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Product spec creation failed${NC}\n"
    ((FAILED++))
fi

# Test 12: List Product Specs
echo -e "${BLUE}[12/18] Listing Product Specifications${NC}"
LIST_SPECS=$(curl -s "$API_URL/product-specs")

if echo "$LIST_SPECS" | grep -q "$SPEC_ID"; then
    echo -e "${GREEN}✓ Product specs listing working${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Product specs listing failed${NC}\n"
    ((FAILED++))
fi

# Test 13: Get Product Spec by ID
echo -e "${BLUE}[13/18] Getting Product Spec by ID${NC}"
GET_SPEC=$(curl -s "$API_URL/product-specs/$SPEC_ID")

if echo "$GET_SPEC" | grep -q "Archer VTOL"; then
    echo -e "${GREEN}✓ Get product spec working${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Get product spec failed${NC}\n"
    ((FAILED++))
fi

# Test 14: Get Product Specs by Category
echo -e "${BLUE}[14/18] Getting Product Specs by Category${NC}"
CATEGORY=$(curl -s "$API_URL/product-specs/category/archer")

if echo "$CATEGORY" | grep -q "$SPEC_ID"; then
    echo -e "${GREEN}✓ Category filtering working${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Category filtering failed${NC}\n"
    ((FAILED++))
fi

# Test 15: Update Product Specification
echo -e "${BLUE}[15/18] Updating Product Specification${NC}"
UPDATE_SPEC=$(curl -s -X PATCH "$API_URL/product-specs/$SPEC_ID" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "performanceMetrics": {
      "maxSpeed": "125 km/h",
      "range": "220 km",
      "endurance": "10 hours"
    }
  }')

if echo "$UPDATE_SPEC" | grep -q "125 km/h"; then
    echo -e "${GREEN}✓ Product spec update successful${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Product spec update failed${NC}\n"
    ((FAILED++))
fi

# Test 16: Create Second Product (Duma)
echo -e "${BLUE}[16/18] Creating Second Product Spec (Duma)${NC}"
DUMA=$(curl -s -X POST "$API_URL/product-specs" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "productName": "Duma Border Surveillance System",
    "category": "duma",
    "specifications": {
      "coverage": "360-degree surveillance",
      "detection": "AI-powered threat detection"
    },
    "performanceMetrics": {
      "range": "10km",
      "accuracy": "99.5%"
    },
    "technicalDetails": {
      "sensors": ["Multi-spectrum cameras", "Radar", "Acoustic sensors"]
    }
  }')

DUMA_ID=$(echo "$DUMA" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ ! -z "$DUMA_ID" ]; then
    echo -e "${GREEN}✓ Second product spec created${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Second product spec creation failed${NC}\n"
    ((FAILED++))
fi

# Test 17: Filter by Category (Duma)
echo -e "${BLUE}[17/18] Testing Category Filtering (Duma)${NC}"
DUMA_CAT=$(curl -s "$API_URL/product-specs?category=duma")

if echo "$DUMA_CAT" | grep -q "$DUMA_ID"; then
    echo -e "${GREEN}✓ Duma category filter working${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Duma category filter failed${NC}\n"
    ((FAILED++))
fi

# Test 18: Final Statistics Check
echo -e "${BLUE}[18/18] Verifying Final Statistics${NC}"
FINAL_STATS=$(curl -s "$API_URL/product-specs/stats" \
  -H "Authorization: Bearer $TOKEN")

TOTAL_SPECS=$(echo "$FINAL_STATS" | grep -o '"total":[0-9]*' | cut -d':' -f2)

if [ "$TOTAL_SPECS" = "2" ]; then
    echo -e "${GREEN}✓ Statistics correctly showing 2 specs${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Statistics incorrect${NC}\n"
    ((FAILED++))
fi

# ==============================================================================
# SUMMARY
# ==============================================================================

echo -e "${BLUE}=============================================="
echo "📊 Week 4 Test Summary"
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
    echo "✅ ALL WEEK 4 TESTS PASSED!"
    echo "==============================================${NC}"
    echo ""
    echo -e "${BLUE}🎉 What's Working:${NC}"
    echo "  ✅ News/Stories CMS (create, publish, unpublish, archive)"
    echo "  ✅ Slug generation & public access"
    echo "  ✅ Featured news for homepage"
    echo "  ✅ Product specifications CRUD"
    echo "  ✅ Category filtering"
    echo "  ✅ Statistics dashboards"
    echo ""
    echo -e "${BLUE}📚 New Endpoints (14 total):${NC}"
    echo "  News: 9 endpoints"
    echo "  Product Specs: 6 endpoints"
    echo ""
    echo -e "${BLUE}📈 Total Backend API:${NC}"
    echo "  Total Endpoints: 41 (28 from W1-3 + 14 from W4)"
    echo "  Database Tables: 8"
    echo "  Modules: 10"
    echo ""
    exit 0
else
    echo -e "${RED}=============================================="
    echo "❌ SOME TESTS FAILED"
    echo "==============================================${NC}"
    exit 1
fi

