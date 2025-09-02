# Production Demo System - Test Checklist

## 🧪 Comprehensive Testing Guide

This checklist ensures all production features are working correctly before deployment.

### ✅ Pre-Deployment Testing

#### 1. Database Connection Test
```bash
# Check database connection
curl http://localhost:3009/api/demo
# Should return API info with status: "operational"
```

#### 2. Form Validation Testing

**Valid Demo Request:**
```bash
curl -X POST http://localhost:3009/api/demo \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Smith", 
    "email": "john.smith@testcorp.com",
    "phone": "+44 7442 852675",
    "company": "Test Petroleum Corp",
    "jobTitle": "Operations Manager",
    "companySize": "51-200",
    "industry": "petroleum-trading",
    "currentSoftware": "Legacy ERP System",
    "challenges": "We need better inventory management and real-time tracking of petroleum deliveries",
    "preferredDate": "2024-02-15",
    "preferredTime": "morning",
    "additionalNotes": "Particularly interested in the Ghana banking integration",
    "consent": true
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Demo request submitted successfully",
  "requestId": "demo_...",
  "data": {
    "id": "...",
    "requestId": "...",
    "createdAt": "...",
    "emailStatus": {
      "customerEmail": "sent",
      "salesEmail": "sent"
    }
  }
}
```

#### 3. Rate Limiting Test
```bash
# Send 6 requests quickly to test rate limiting
for i in {1..6}; do
  curl -X POST http://localhost:3009/api/demo \
    -H "Content-Type: application/json" \
    -d '{"firstName":"Test","lastName":"User","email":"test'$i'@example.com","phone":"+1234567890","company":"Test Corp","jobTitle":"Manager","companySize":"1-50","industry":"petroleum-trading","challenges":"Testing rate limits","preferredDate":"2024-02-15","preferredTime":"morning","consent":true}' \
    -w "Request $i: Status %{http_code}\n" -o /dev/null -s
done
```

**Expected:** First 5 requests succeed (200), 6th request fails with 429 (Too Many Requests)

#### 4. Input Validation Tests

**Invalid Email:**
```bash
curl -X POST http://localhost:3009/api/demo \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Smith","email":"invalid-email","phone":"+1234567890","company":"Test Corp","jobTitle":"Manager","companySize":"1-50","industry":"petroleum-trading","challenges":"Test invalid email","preferredDate":"2024-02-15","preferredTime":"morning","consent":true}'
```

**Expected:** 400 Bad Request with validation error

**XSS Attempt:**
```bash
curl -X POST http://localhost:3009/api/demo \
  -H "Content-Type: application/json" \
  -d '{"firstName":"<script>alert(\"XSS\")</script>","lastName":"Smith","email":"test@example.com","phone":"+1234567890","company":"Test Corp","jobTitle":"Manager","companySize":"1-50","industry":"petroleum-trading","challenges":"Test XSS protection","preferredDate":"2024-02-15","preferredTime":"morning","consent":true}'
```

**Expected:** 400 Bad Request with "Invalid content detected" error

#### 5. Missing Required Fields
```bash
curl -X POST http://localhost:3009/api/demo \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","email":"test@example.com"}'
```

**Expected:** 400 Bad Request with field validation errors

### 📧 Email Testing

#### 1. Customer Confirmation Email
- [ ] Email sent to customer's address
- [ ] Professional HTML template renders correctly
- [ ] All request details included
- [ ] Contact information accurate
- [ ] Unsubscribe link works (if implemented)

#### 2. Sales Team Notification
- [ ] Email sent to sales team address
- [ ] All customer details included
- [ ] Business challenges highlighted
- [ ] Request metadata present
- [ ] Actionable format for sales team

### 🗄️ Database Testing

#### 1. Demo Request Storage
```sql
-- Check if demo requests are being saved
SELECT * FROM demo_requests ORDER BY created_at DESC LIMIT 5;
```

#### 2. Email Logging
```sql
-- Check if emails are being logged
SELECT * FROM email_logs ORDER BY sent_at DESC LIMIT 10;
```

#### 3. API Usage Tracking
```sql
-- Check if API calls are being tracked
SELECT * FROM api_usage ORDER BY created_at DESC LIMIT 10;
```

### 🔒 Security Testing

#### 1. SQL Injection Protection
```bash
curl -X POST http://localhost:3009/api/demo \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John'\''DROP TABLE demo_requests;--","lastName":"Smith","email":"test@example.com","phone":"+1234567890","company":"Test Corp","jobTitle":"Manager","companySize":"1-50","industry":"petroleum-trading","challenges":"SQL injection test","preferredDate":"2024-02-15","preferredTime":"morning","consent":true}'
```

**Expected:** Request blocked or sanitized, no database damage

#### 2. Large Payload Protection
```bash
# Send very large request
curl -X POST http://localhost:3009/api/demo \
  -H "Content-Type: application/json" \
  -d '{"firstName":"'$(python -c "print('A'*10000)")'","lastName":"Smith","email":"test@example.com","phone":"+1234567890","company":"Test Corp","jobTitle":"Manager","companySize":"1-50","industry":"petroleum-trading","challenges":"Large payload test","preferredDate":"2024-02-15","preferredTime":"morning","consent":true}'
```

**Expected:** 400 Bad Request (field too long)

### 📊 Monitoring & Logging

#### 1. Log File Generation
- [ ] `logs/combined.log` exists and contains entries
- [ ] `logs/error.log` exists (may be empty if no errors)
- [ ] Console logs show demo requests and email sends

#### 2. Performance Monitoring
- [ ] Response times logged
- [ ] Database query performance acceptable (<1s)
- [ ] Email send performance acceptable (<5s)

### 🌐 Production Environment Testing

#### 1. Environment Variables
- [ ] All required environment variables set
- [ ] Database connection string works
- [ ] Email API keys valid
- [ ] Security secrets properly configured

#### 2. HTTPS Configuration
- [ ] SSL certificate valid
- [ ] Redirects from HTTP to HTTPS
- [ ] Security headers present

#### 3. Domain Configuration
- [ ] Email domain verified with Resend
- [ ] DNS records correctly configured
- [ ] From email address whitelisted

### 📱 Frontend Integration

#### 1. Demo Form Functionality
- [ ] All form fields render correctly
- [ ] Client-side validation works
- [ ] Form submission successful
- [ ] Success message displays
- [ ] Error handling works properly
- [ ] Loading states show during submission

#### 2. User Experience
- [ ] Form is mobile-responsive
- [ ] Accessibility compliance (WCAG)
- [ ] Performance is acceptable (<3s load time)
- [ ] Error messages are user-friendly

### 🚀 Load Testing (Optional)

#### Basic Load Test
```bash
# Install Apache Bench
# Run 100 requests with 10 concurrent connections
ab -n 100 -c 10 -H "Content-Type: application/json" -p demo_request.json http://localhost:3009/api/demo
```

Where `demo_request.json` contains a valid demo request payload.

**Expected Results:**
- [ ] No request failures
- [ ] Reasonable response times (<2s)
- [ ] No memory leaks
- [ ] Database handles concurrent requests

### 🔧 Error Handling Testing

#### 1. Database Connection Failure
- [ ] Graceful error handling when database is unavailable
- [ ] Appropriate error messages returned
- [ ] No sensitive information leaked

#### 2. Email Service Failure
- [ ] Demo request still succeeds if email fails
- [ ] Email failures are logged
- [ ] User still receives success confirmation

#### 3. Invalid Configuration
- [ ] System handles missing environment variables
- [ ] Provides clear error messages for configuration issues

### 📋 Final Production Checklist

#### Security
- [ ] All API endpoints secured
- [ ] Rate limiting functional
- [ ] Input validation comprehensive
- [ ] Error messages don't leak sensitive data
- [ ] HTTPS enforced
- [ ] Security headers configured

#### Performance
- [ ] Database queries optimized
- [ ] Email sending is asynchronous
- [ ] API response times acceptable
- [ ] Memory usage stable
- [ ] CPU usage reasonable

#### Monitoring
- [ ] Logging system operational
- [ ] Error tracking configured
- [ ] Performance metrics collected
- [ ] Health checks functional
- [ ] Alerting system configured

#### Reliability
- [ ] Database backups scheduled
- [ ] Failover strategies in place
- [ ] Graceful error handling
- [ ] Service monitoring enabled
- [ ] Maintenance procedures documented

### 🎯 Success Criteria

The production system is ready when:

1. ✅ All API tests pass
2. ✅ Email delivery works reliably
3. ✅ Database operations are fast and reliable
4. ✅ Security measures are effective
5. ✅ Monitoring and logging are functional
6. ✅ Frontend integration is seamless
7. ✅ Error handling is graceful
8. ✅ Performance meets requirements

### 📞 Post-Deployment Verification

After deploying to production:

1. **Immediate Tests (0-1 hour)**
   - [ ] Submit test demo request
   - [ ] Verify emails are received
   - [ ] Check database entries
   - [ ] Monitor error logs

2. **Short-term Monitoring (1-24 hours)**
   - [ ] Monitor API response times
   - [ ] Check email delivery rates
   - [ ] Review error logs
   - [ ] Verify rate limiting works

3. **Long-term Monitoring (1-7 days)**
   - [ ] Database performance stable
   - [ ] No memory leaks detected
   - [ ] Email delivery rates > 95%
   - [ ] User feedback positive

The system is now production-ready with enterprise-grade reliability! 🚀