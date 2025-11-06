# 🔐 Development Test Credentials

**Purpose:** Quick reference for test accounts and sample data during development  
**Environment:** Local development only  
**Last Updated:** November 6, 2025

> ⚠️ **IMPORTANT:** This file contains ONLY test/development credentials. Never commit production credentials or API keys to version control.

---

## 👤 Admin User

### Default Admin Account
```
Email:    admin@terraindustries.com
Password: SecurePass123!
Role:     admin
```

**Usage:**
- Login endpoint: `POST /api/v1/auth/login`
- Access all protected routes
- Manage all system resources
- Default account created by database seed

---

## 🧪 Test Users

### Sample Test User (Created during tests)
```
Email:    test-{timestamp}@example.com
Password: TestPass123!
Role:     admin
```

**Note:** Test users are created dynamically during automated tests with timestamp-based emails.

---

## 🔗 API Endpoints

### Base URLs
```
Backend API:  http://localhost:4000/api/v1
Swagger Docs: http://localhost:4000/api-docs
Frontend:     http://localhost:3000
```

### Quick Test Endpoints
```bash
# Health Check
curl http://localhost:4000/api/v1/health

# Login
curl -X POST http://localhost:4000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@terraindustries.com", "password": "SecurePass123!"}'

# Get Current User (requires token)
curl http://localhost:4000/api/v1/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📊 Sample Database Data

### Sample Inquiries (Created by seed script)

#### High Priority Inquiry
```
Type:     sales
Name:     General Ibrahim Babangida
Email:    general@defense.gov.ng
Phone:    +234-803-555-0123
Company:  Nigerian Defense Ministry
Country:  NG
Score:    85/100 (High Priority)
```

#### Medium Priority Inquiry
```
Type:     partnership
Name:     Dr. Sarah Chen
Email:    sarah.chen@techcorp.com
Phone:    +1-415-555-0789
Company:  TechCorp Defense Solutions
Country:  US
Score:    55/100 (Medium Priority)
```

#### Low Priority Inquiry
```
Type:     general
Name:     John Doe
Email:    john.doe@example.com
Country:  US
Score:    25/100 (Low Priority)
```

---

## 📰 Sample News Stories

### Featured News (3 stories)

1. **Terra Industries Announces New VTOL Technology**
   - Slug: `terra-industries-announces-new-vtol-technology`
   - Category: Technology
   - Status: Published
   - Tags: VTOL, Innovation, Featured

2. **Partnership with Nigerian Defense Ministry**
   - Slug: `partnership-with-nigerian-defense-ministry`
   - Category: Partnerships
   - Status: Published
   - Tags: Partnership, Defense, Featured

3. **Artemis UAV Completes Successful Field Trials**
   - Slug: `artemis-uav-completes-successful-field-trials`
   - Category: Product Updates
   - Status: Published
   - Tags: Artemis, Testing, UAV

---

## 🎯 JWT Token Information

### Token Properties
```
Algorithm:  HS256
Expiration: 7 days
Format:     Bearer {token}
```

### Sample Token Structure
```json
{
  "sub": "user-uuid",
  "email": "admin@terraindustries.com",
  "role": "admin",
  "iat": 1234567890,
  "exp": 1234567890
}
```

### Using Tokens in Requests
```bash
# Set token as environment variable
export TOKEN="your_jwt_token_here"

# Use in curl requests
curl http://localhost:4000/api/v1/auth/me \
  -H "Authorization: Bearer $TOKEN"
```

---

## 🗄️ Database Access

### PostgreSQL (Docker)
```
Host:     localhost
Port:     5432
Database: terra_industries
User:     terra_user
Password: secure_password_change_me (from .env)
```

### Access via Docker
```bash
# Connect to PostgreSQL
docker exec -it terra-db psql -U terra_user -d terra_industries

# Common queries
SELECT * FROM users;
SELECT * FROM inquiries ORDER BY lead_score DESC;
SELECT * FROM news_stories WHERE status = 'published';
```

### Redis (Docker)
```
Host:     localhost
Port:     6379
Password: redis_password (from .env)
```

---

## 🧪 Running Tests

### Week 1 Test Suite
```bash
# Run all Week 1 tests (15 tests)
bash scripts/test-week1.sh

# Expected output: 15/15 tests passed
```

### Database Seeding
```bash
# Seed database with test data
cd server
pnpm prisma:seed

# Reset database (caution: deletes all data)
pnpm prisma migrate reset
```

---

## 📝 Common Test Scenarios

### 1. Register New User
```bash
curl -X POST http://localhost:4000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "SecurePass123!",
    "fullName": "New User"
  }'
```

### 2. Create High-Priority Inquiry
```bash
curl -X POST http://localhost:4000/api/v1/inquiries \
  -H "Content-Type: application/json" \
  -d '{
    "inquiryType": "sales",
    "fullName": "Test Customer",
    "email": "customer@example.com",
    "phone": "+1-555-0123",
    "company": "Test Corp",
    "country": "US",
    "message": "Interested in purchasing VTOL units. Budget: $5M",
    "metadata": {
      "budget": ">$1M",
      "timeline": "immediate",
      "orgType": "commercial"
    }
  }'
```

### 3. List All Inquiries (Protected)
```bash
curl http://localhost:4000/api/v1/inquiries?page=1&limit=10 \
  -H "Authorization: Bearer $TOKEN"
```

### 4. Get Featured News (Public)
```bash
curl http://localhost:4000/api/v1/news/featured
```

---

## 🔄 Lead Scoring Examples

### High Priority (70-100 points)
- Government/military inquiries
- Large budget (>$1M)
- Immediate timeline
- Complete contact information
- Specific product interest

### Medium Priority (40-69 points)
- Commercial/enterprise inquiries
- Medium budget ($100K-$1M)
- 3-6 month timeline
- Partial contact information
- Partnership inquiries

### Low Priority (0-39 points)
- General information requests
- No budget specified
- No timeline
- Minimal contact information
- Student/research inquiries

---

## 🚀 Quick Start Checklist

- [ ] Services running (Docker, Server, Client)
- [ ] Database seeded with test data
- [ ] Admin user credentials tested
- [ ] JWT token obtained from login
- [ ] Protected routes accessible with token
- [ ] Week 1 test suite passing (15/15)

---

## 📚 Related Documentation

- **Backend Progress:** `BACKEND-PROGRESS.md`
- **Integration Roadmap:** `integration.md`
- **Development Roadmap:** `development-roadmap.md`
- **Test Scripts:** `/scripts/test-week*.sh`

---

## ⚠️ Security Reminders

1. **Never use these credentials in production**
2. **Change all default passwords in production**
3. **Use environment variables for sensitive data**
4. **Keep .env files out of version control**
5. **Rotate JWT secrets in production**
6. **Use strong passwords for production accounts**

---

**Note:** This file is for development convenience only. All credentials listed here are for local testing and should never be used in production environments.

