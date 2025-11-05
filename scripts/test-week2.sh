#!/bin/bash

# Terra Industries - Week 2 Comprehensive Test Script
# Tests RFQ system, Email queueing, and full workflow

set -e  # Exit on error

API_URL="http://localhost:4000/api/v1"
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}=============================================="
echo "🚀 Terra Industries - Week 2 Test Suite"
echo "   RFQ System + Email Notifications"
echo "==============================================${NC}\n"

# Test counter
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
# PART 1: RFQ SYSTEM TESTS
# ==============================================================================

echo -e "${BLUE}====== PART 1: RFQ SYSTEM (7 tests) ======${NC}\n"

# Test 1: Create Inquiry (to link RFQ to)
echo -e "${BLUE}[1/20] Creating Inquiry for RFQ Testing${NC}"
INQUIRY=$(curl -s -X POST $API_URL/inquiries \
  -H "Content-Type: application/json" \
  -d '{
    "inquiryType": "sales",
    "fullName": "Major General Abdullahi",
    "email": "general.abdullahi@military.gov.ng",
    "phone": "+234-809-123-4567",
    "company": "Nigerian Military Command",
    "country": "NG",
    "message": "Urgent procurement request for tactical defense systems. Budget: $20M approved. Need deployment in 4 months.",
    "metadata": {
      "budget": ">$1M",
      "timeline": "3-6_months",
      "orgType": "military"
    }
  }')

INQUIRY_ID=$(echo "$INQUIRY" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
LEAD_SCORE=$(echo "$INQUIRY" | grep -o '"leadScore":[0-9]*' | cut -d':' -f2)

if [ ! -z "$INQUIRY_ID" ]; then
    echo -e "${GREEN}✓ Inquiry created successfully${NC}"
    echo "  Inquiry ID: $INQUIRY_ID"
    echo "  Lead Score: $LEAD_SCORE/100\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Inquiry creation failed${NC}\n"
    ((FAILED++))
fi

# Test 2: Create RFQ linked to Inquiry
echo -e "${BLUE}[2/20] Creating RFQ (Public Endpoint)${NC}"
RFQ=$(curl -s -X POST $API_URL/rfq \
  -H "Content-Type: application/json" \
  -d "{
    \"inquiryId\": \"$INQUIRY_ID\",
    \"productCategory\": \"artemis\",
    \"quantity\": 50,
    \"budgetRange\": \">\\$1M\",
    \"timeline\": \"3-6_months\",
    \"requirements\": \"50 Artemis OS systems with full AI integration for command and control operations.\",
    \"specifications\": {
      \"aiCapabilities\": \"advanced mission planning\",
      \"integration\": \"existing infrastructure\",
      \"training\": \"8 weeks required\"
    }
  }")

RFQ_ID=$(echo "$RFQ" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
RFQ_STATUS=$(echo "$RFQ" | grep -o '"status":"[^"]*"' | cut -d'"' -f4)

if [ "$RFQ_STATUS" = "pending" ]; then
    echo -e "${GREEN}✓ RFQ created successfully${NC}"
    echo "  RFQ ID: $RFQ_ID"
    echo "  Status: $RFQ_STATUS\n"
    ((PASSED++))
else
    echo -e "${RED}✗ RFQ creation failed${NC}\n"
    ((FAILED++))
fi

# Test 3: List RFQs (Admin)
echo -e "${BLUE}[3/20] Listing RFQs with Pagination${NC}"
LIST=$(curl -s "$API_URL/rfq?page=1&limit=10" \
  -H "Authorization: Bearer $TOKEN")

TOTAL_RFQS=$(echo "$LIST" | grep -o '"total":[0-9]*' | cut -d':' -f2)

if [ ! -z "$TOTAL_RFQS" ]; then
    echo -e "${GREEN}✓ RFQ listing successful${NC}"
    echo "  Total RFQs: $TOTAL_RFQS\n"
    ((PASSED++))
else
    echo -e "${RED}✗ RFQ listing failed${NC}\n"
    ((FAILED++))
fi

# Test 4: Get Single RFQ (Admin)
echo -e "${BLUE}[4/20] Getting Single RFQ Details${NC}"
SINGLE_RFQ=$(curl -s "$API_URL/rfq/$RFQ_ID" \
  -H "Authorization: Bearer $TOKEN")

if echo "$SINGLE_RFQ" | grep -q "$RFQ_ID"; then
    echo -e "${GREEN}✓ Get single RFQ successful${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Get single RFQ failed${NC}\n"
    ((FAILED++))
fi

# Test 5: Send Quote (Status Workflow Test)
echo -e "${BLUE}[5/20] Sending Quote to Customer${NC}"
QUOTE=$(curl -s -X POST "$API_URL/rfq/$RFQ_ID/quote" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "quoteAmount": 20000000,
    "notes": "Quote for 50 Artemis OS systems includes: AI software, hardware, installation, 8-week training for 100 personnel, and 10-year support contract.",
    "specifications": {
      "deliveryTime": "4 months",
      "training": "8 weeks on-site",
      "warranty": "10 years",
      "support": "24/7 dedicated support team"
    }
  }')

QUOTE_STATUS=$(echo "$QUOTE" | grep -o '"status":"[^"]*"' | cut -d'"' -f4)
QUOTE_AMOUNT=$(echo "$QUOTE" | grep -o '"quoteAmount":"[^"]*"' | cut -d'"' -f4)

if [ "$QUOTE_STATUS" = "quoted" ]; then
    echo -e "${GREEN}✓ Quote sent successfully${NC}"
    echo "  Status changed: pending → quoted"
    echo "  Quote Amount: \$$QUOTE_AMOUNT\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Quote sending failed${NC}\n"
    ((FAILED++))
fi

# Test 6: RFQ Statistics
echo -e "${BLUE}[6/20] Getting RFQ Statistics${NC}"
RFQ_STATS=$(curl -s "$API_URL/rfq/stats" \
  -H "Authorization: Bearer $TOKEN")

TOTAL_RFQ_COUNT=$(echo "$RFQ_STATS" | grep -o '"total":[0-9]*' | cut -d':' -f2)
QUOTED_COUNT=$(echo "$RFQ_STATS" | grep -o '"quoted":[0-9]*' | cut -d':' -f2)

if [ ! -z "$TOTAL_RFQ_COUNT" ]; then
    echo -e "${GREEN}✓ RFQ statistics successful${NC}"
    echo "  Total RFQs: $TOTAL_RFQ_COUNT"
    echo "  Quoted: $QUOTED_COUNT\n"
    ((PASSED++))
else
    echo -e "${RED}✗ RFQ statistics failed${NC}\n"
    ((FAILED++))
fi

# Test 7: Invalid Status Transition (Should Fail)
echo -e "${BLUE}[7/20] Testing Invalid Status Transition${NC}"
INVALID=$(curl -s -X PATCH "$API_URL/rfq/$RFQ_ID" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status": "pending"}')

if echo "$INVALID" | grep -q "Invalid status transition"; then
    echo -e "${GREEN}✓ Invalid transition properly blocked${NC}"
    echo "  Cannot transition: quoted → pending\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Invalid transition test failed${NC}\n"
    ((FAILED++))
fi

# Test 8: Valid Status Transition (quoted → won)
echo -e "${BLUE}[8/20] Testing Valid Status Transition${NC}"
UPDATE=$(curl -s -X PATCH "$API_URL/rfq/$RFQ_ID" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status": "won", "decisionDate": "2025-12-15"}')

FINAL_STATUS=$(echo "$UPDATE" | grep -o '"status":"[^"]*"' | cut -d'"' -f4)

if [ "$FINAL_STATUS" = "won" ]; then
    echo -e "${GREEN}✓ Status transition successful${NC}"
    echo "  Status changed: quoted → won ✅\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Status transition failed${NC}\n"
    ((FAILED++))
fi

# Test 9: Filter RFQs by Status
echo -e "${BLUE}[9/20] Testing RFQ Filtering by Status${NC}"
FILTER=$(curl -s "$API_URL/rfq?status=won" \
  -H "Authorization: Bearer $TOKEN")

if echo "$FILTER" | grep -q "won"; then
    echo -e "${GREEN}✓ Status filtering working${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Status filtering failed${NC}\n"
    ((FAILED++))
fi

# Test 10: Filter RFQs by Product Category
echo -e "${BLUE}[10/20] Testing RFQ Filtering by Product${NC}"
PRODUCT_FILTER=$(curl -s "$API_URL/rfq?productCategory=artemis" \
  -H "Authorization: Bearer $TOKEN")

if echo "$PRODUCT_FILTER" | grep -q "artemis"; then
    echo -e "${GREEN}✓ Product filtering working${NC}\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Product filtering failed${NC}\n"
    ((FAILED++))
fi

# ==============================================================================
# PART 2: EMAIL SYSTEM TESTS
# ==============================================================================

echo -e "${BLUE}====== PART 2: EMAIL SYSTEM (10 tests) ======${NC}\n"

# Test 11: Email Queue Statistics
echo -e "${BLUE}[11/20] Checking Email Queue Statistics${NC}"
EMAIL_STATS=$(curl -s "$API_URL/email/stats" \
  -H "Authorization: Bearer $TOKEN")

TOTAL_EMAILS=$(echo "$EMAIL_STATS" | grep -o '"total":[0-9]*' | cut -d':' -f2)
PENDING_EMAILS=$(echo "$EMAIL_STATS" | grep -o '"pending":[0-9]*' | cut -d':' -f2)

if [ ! -z "$TOTAL_EMAILS" ]; then
    echo -e "${GREEN}✓ Email statistics working${NC}"
    echo "  Total Emails: $TOTAL_EMAILS"
    echo "  Pending: $PENDING_EMAILS\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Email statistics failed${NC}\n"
    ((FAILED++))
fi

# Test 12: Create Inquiry (Should Queue 2 Emails)
echo -e "${BLUE}[12/20] Testing Inquiry Email Automation${NC}"
BEFORE_COUNT=$TOTAL_EMAILS

TEST_INQUIRY=$(curl -s -X POST $API_URL/inquiries \
  -H "Content-Type: application/json" \
  -d '{
    "inquiryType": "sales",
    "fullName": "Colonel Test User",
    "email": "colonel.test@example.com",
    "company": "Test Defense Ministry",
    "country": "NG",
    "message": "Test inquiry with high priority keywords: military procurement urgent budget government contract.",
    "metadata": {"budget": ">$1M", "timeline": "immediate"}
  }')

TEST_INQUIRY_ID=$(echo "$TEST_INQUIRY" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)

sleep 1

EMAIL_STATS_AFTER=$(curl -s "$API_URL/email/stats" \
  -H "Authorization: Bearer $TOKEN")
AFTER_COUNT=$(echo "$EMAIL_STATS_AFTER" | grep -o '"total":[0-9]*' | cut -d':' -f2)

EMAILS_QUEUED=$((AFTER_COUNT - BEFORE_COUNT))

if [ $EMAILS_QUEUED -ge 2 ]; then
    echo -e "${GREEN}✓ Inquiry email automation working${NC}"
    echo "  Emails queued: $EMAILS_QUEUED (customer confirmation + admin notification)\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Inquiry email automation failed${NC}"
    echo "  Expected: 2 emails, Got: $EMAILS_QUEUED\n"
    ((FAILED++))
fi

# Test 13: Create RFQ (Should Queue 1 Email)
echo -e "${BLUE}[13/20] Testing RFQ Email Automation${NC}"
BEFORE_COUNT=$AFTER_COUNT

TEST_RFQ=$(curl -s -X POST $API_URL/rfq \
  -H "Content-Type: application/json" \
  -d "{
    \"inquiryId\": \"$TEST_INQUIRY_ID\",
    \"productCategory\": \"kallon\",
    \"quantity\": 15,
    \"budgetRange\": \">\\$1M\",
    \"timeline\": \"immediate\",
    \"requirements\": \"15 Kallon Intelligence systems for data analysis\"
  }")

TEST_RFQ_ID=$(echo "$TEST_RFQ" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)

sleep 1

EMAIL_STATS_AFTER=$(curl -s "$API_URL/email/stats" \
  -H "Authorization: Bearer $TOKEN")
AFTER_COUNT=$(echo "$EMAIL_STATS_AFTER" | grep -o '"total":[0-9]*' | cut -d':' -f2)

EMAILS_QUEUED=$((AFTER_COUNT - BEFORE_COUNT))

if [ $EMAILS_QUEUED -ge 1 ]; then
    echo -e "${GREEN}✓ RFQ email automation working${NC}"
    echo "  Emails queued: $EMAILS_QUEUED (RFQ confirmation)\n"
    ((PASSED++))
else
    echo -e "${RED}✗ RFQ email automation failed${NC}\n"
    ((FAILED++))
fi

# Test 14: Send Quote (Should Queue 1 Email)
echo -e "${BLUE}[14/20] Testing Quote Email Automation${NC}"
BEFORE_COUNT=$AFTER_COUNT

QUOTE_SEND=$(curl -s -X POST "$API_URL/rfq/$TEST_RFQ_ID/quote" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "quoteAmount": 7500000,
    "notes": "Quote for 15 Kallon Intelligence systems",
    "specifications": {
      "deliveryTime": "3 months",
      "support": "5 years"
    }
  }')

sleep 1

EMAIL_STATS_AFTER=$(curl -s "$API_URL/email/stats" \
  -H "Authorization: Bearer $TOKEN")
AFTER_COUNT=$(echo "$EMAIL_STATS_AFTER" | grep -o '"total":[0-9]*' | cut -d':' -f2)

EMAILS_QUEUED=$((AFTER_COUNT - BEFORE_COUNT))

if [ $EMAILS_QUEUED -ge 1 ]; then
    echo -e "${GREEN}✓ Quote email automation working${NC}"
    echo "  Emails queued: $EMAILS_QUEUED (quote sent notification)\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Quote email automation failed${NC}\n"
    ((FAILED++))
fi

# Test 15: Manual Email Processing
echo -e "${BLUE}[15/20] Testing Manual Email Processing${NC}"
PROCESS=$(curl -s -X POST "$API_URL/email/process" \
  -H "Authorization: Bearer $TOKEN")

PROCESSED=$(echo "$PROCESS" | grep -o '"processed":[0-9]*' | cut -d':' -f2)

if [ ! -z "$PROCESSED" ]; then
    echo -e "${GREEN}✓ Manual email processing successful${NC}"
    echo "  Processed: $PROCESSED emails\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Manual email processing failed${NC}\n"
    ((FAILED++))
fi

# Test 16: RFQ Statistics with Real Data
echo -e "${BLUE}[16/20] Verifying RFQ Statistics${NC}"
STATS=$(curl -s "$API_URL/rfq/stats" \
  -H "Authorization: Bearer $TOKEN")

TOTAL=$(echo "$STATS" | grep -o '"total":[0-9]*' | cut -d':' -f2)
WON=$(echo "$STATS" | grep -o '"won":[0-9]*' | cut -d':' -f2)
QUOTED=$(echo "$STATS" | grep -o '"quoted":[0-9]*' | cut -d':' -f2)

if [ ! -z "$TOTAL" ]; then
    echo -e "${GREEN}✓ RFQ statistics working${NC}"
    echo "  Total: $TOTAL | Won: $WON | Quoted: $QUOTED\n"
    ((PASSED++))
else
    echo -e "${RED}✗ RFQ statistics failed${NC}\n"
    ((FAILED++))
fi

# Test 17: CSV Export
echo -e "${BLUE}[17/20] Testing CSV Export${NC}"
EXPORT=$(curl -s "$API_URL/rfq/export" \
  -H "Authorization: Bearer $TOKEN")

if echo "$EXPORT" | grep -q "ID,Product,Quantity"; then
    LINE_COUNT=$(echo "$EXPORT" | wc -l | tr -d ' ')
    echo -e "${GREEN}✓ CSV export working${NC}"
    echo "  Exported $((LINE_COUNT - 1)) RFQs\n"
    ((PASSED++))
else
    echo -e "${RED}✗ CSV export failed${NC}\n"
    ((FAILED++))
fi

# Test 18: Create Standalone RFQ (No Inquiry Link)
echo -e "${BLUE}[18/20] Testing Standalone RFQ Creation${NC}"
STANDALONE=$(curl -s -X POST $API_URL/rfq \
  -H "Content-Type: application/json" \
  -d '{
    "productCategory": "iroko",
    "quantity": 10,
    "budgetRange": "$500K-$1M",
    "timeline": "6-12_months",
    "requirements": "10 Iroko surveillance systems"
  }')

STANDALONE_ID=$(echo "$STANDALONE" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ ! -z "$STANDALONE_ID" ]; then
    echo -e "${GREEN}✓ Standalone RFQ created${NC}"
    echo "  No inquiry link required ✓\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Standalone RFQ creation failed${NC}\n"
    ((FAILED++))
fi

# Test 19: Update RFQ Status
echo -e "${BLUE}[19/20] Testing RFQ Status Update${NC}"
UPDATE_RFQ=$(curl -s -X PATCH "$API_URL/rfq/$STANDALONE_ID" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status": "lost", "notes": "Customer went with competitor"}')

UPDATE_STATUS=$(echo "$UPDATE_RFQ" | grep -o '"status":"[^"]*"' | cut -d'"' -f4)

if [ "$UPDATE_STATUS" = "lost" ]; then
    echo -e "${GREEN}✓ RFQ status update working${NC}"
    echo "  Status: pending → lost\n"
    ((PASSED++))
else
    echo -e "${RED}✗ RFQ status update failed${NC}\n"
    ((FAILED++))
fi

# Test 20: Final Email Queue Check
echo -e "${BLUE}[20/20] Final Email Queue Verification${NC}"
FINAL_STATS=$(curl -s "$API_URL/email/stats" \
  -H "Authorization: Bearer $TOKEN")

FINAL_TOTAL=$(echo "$FINAL_STATS" | grep -o '"total":[0-9]*' | cut -d':' -f2)
FINAL_PENDING=$(echo "$FINAL_STATS" | grep -o '"pending":[0-9]*' | cut -d':' -f2)
FINAL_FAILED=$(echo "$FINAL_STATS" | grep -o '"failed":[0-9]*' | cut -d':' -f2)

if [ ! -z "$FINAL_TOTAL" ]; then
    echo -e "${GREEN}✓ Email queue operational${NC}"
    echo "  Total: $FINAL_TOTAL | Pending: $FINAL_PENDING | Failed: $FINAL_FAILED"
    echo "  (Failed expected - no Resend API key configured)\n"
    ((PASSED++))
else
    echo -e "${RED}✗ Email queue check failed${NC}\n"
    ((FAILED++))
fi

# ==============================================================================
# SUMMARY
# ==============================================================================

echo -e "${BLUE}=============================================="
echo "📊 Week 2 Test Summary"
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
    echo "✅ ALL WEEK 2 TESTS PASSED!"
    echo "==============================================${NC}"
    echo ""
    echo -e "${BLUE}🎉 What's Working:${NC}"
    echo "  ✅ RFQ creation & management"
    echo "  ✅ Status workflow validation"
    echo "  ✅ Quote sending"
    echo "  ✅ RFQ statistics & export"
    echo "  ✅ Email queue system"
    echo "  ✅ Automated email triggers"
    echo "  ✅ Email processing & retry"
    echo ""
    echo -e "${BLUE}📚 Documentation:${NC}"
    echo "  Swagger: http://localhost:4000/api-docs"
    echo "  Backend Progress: BACKEND-PROGRESS.md"
    echo ""
    echo -e "${YELLOW}⚠️  Note: Emails are queued but not sent (RESEND_API_KEY not configured)${NC}"
    echo -e "${YELLOW}   To enable email sending, add RESEND_API_KEY to .env${NC}"
    exit 0
else
    echo -e "${RED}=============================================="
    echo "❌ SOME TESTS FAILED"
    echo "==============================================${NC}"
    exit 1
fi

