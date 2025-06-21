# Product Requirements Document (PRD)

## Customer Experience Maturity Assessment Tool

### 1. Product Overview

**Product Name:** Customer Experience Maturity Assessment Tool
**Version:** 1.0
**Target Platform:** Web Application (React-based)

**Product Description:**
A web-based assessment tool that helps businesses evaluate their maturity level in listening to customers (Voice of Customer - VoC). The tool provides a structured questionnaire, calculates maturity scores, delivers personalized results, and enables social sharing of achievements.

### 2. Business Objectives

- **Primary Goal:** Help businesses understand their customer listening maturity level
- **Secondary Goals:**
  - Generate leads through email collection
  - Increase brand awareness through social sharing
  - Position Filum.ai as a thought leader in customer experience
  - Drive traffic to Filum.ai products

### 3. Target Audience

- **Primary:** Business owners, CX managers, Operations managers
- **Secondary:** Consultants, Business analysts, Marketing professionals
- **Company Size:** Small to enterprise businesses
- **Geographic:** Vietnamese market (content in Vietnamese)

### 4. User Journey

1. **Landing:** User arrives at assessment page
2. **Registration:** User provides email address
3. **Assessment:** User answers 10 multiple-choice questions
4. **Results:** User receives maturity level, description, and recommendations
5. **Sharing:** User can share results on Facebook
6. **Follow-up:** User receives email with results and product information

### 5. Functional Requirements

#### 5.1 Core Features

**F1. Email Collection**

- Mandatory email input before starting assessment
- Email validation (format and required field)
- Store email for follow-up marketing

**F2. Dynamic Assessment Engine**

- Display 10 questions from assessment.json
- Three answer options per question (Yes/No/Unsure)
- Score calculation: Yes=1, No=0, Unsure=0.5
- Progress indicator showing completion status

**F3. Intelligent Results Calculation**

- Calculate total score (0-10 range)
- Map score to maturity levels:
  - Level 1 (Sơ khai): 0-2 points
  - Level 2 (Thành lập): 2-4 points
  - Level 3 (Vận hành): 4-6 points
  - Level 4 (Tối ưu): 6-8 points
  - Level 5 (Thấm nhuần): 8-10 points

**F4. Personalized Results Display**

- Show maturity level name and icon
- Display detailed description
- List 4-5 key recommended actions
- Include call-to-action link to Filum.ai products

**F5. Social Media Integration**

- Facebook sharing functionality
- Generate unique result URLs for sharing
- Display correct maturity level image in social previews
- Pre-populated sharing text

**F6. Visual Design Elements**

- Gauge chart visualization
- Responsive design for mobile and desktop
- Clean, professional UI following provided mockups
- Level-specific iconography and branding

#### 5.2 Technical Features

**T1. Single Page Application (SPA)**

- React-based architecture
- Client-side routing for seamless navigation
- State management for user progress

**T2. Data Management**

- Load assessment data from JSON file
- Store user responses in application state
- Generate shareable result URLs

**T3. Responsive Design**

- Mobile-first approach
- Tablet and desktop optimizations
- Cross-browser compatibility

**T4. Performance Optimization**

- Fast loading times
- Optimized images and assets
- Efficient rendering

### 6. Non-Functional Requirements

**Performance:**

- Page load time < 3 seconds
- Smooth transitions and interactions
- Optimized for mobile networks

**Usability:**

- Intuitive navigation
- Clear progress indicators
- Accessible design (WCAG 2.1 AA)

**Security:**

- Input validation and sanitization
- Secure email handling
- No sensitive data storage

**Scalability:**

- Support for high concurrent users
- CDN integration for global access
- Efficient resource utilization

### 7. Technical Constraints

- Must use React framework
- Deploy on Netlify
- Source code on GitHub
- No backend database required
- Client-side only implementation

### 8. Success Metrics

**Primary KPIs:**

- Assessment completion rate > 80%
- Email capture rate > 90%
- Social sharing rate > 15%
- User satisfaction score > 4.0/5.0

**Secondary KPIs:**

- Page load speed < 3 seconds
- Mobile responsiveness score > 95%
- Cross-browser compatibility > 98%

### 9. Future Enhancements (V2.0)

- Multi-language support
- Advanced analytics dashboard
- Email automation sequences
- Additional assessment categories
- Integration with CRM systems
- Detailed reporting exports

### 10. Risk Mitigation

**Technical Risks:**

- Facebook API changes → Implement fallback sharing methods
- Performance issues → Implement lazy loading and optimization
- Browser compatibility → Extensive cross-browser testing

**Business Risks:**

- Low engagement → A/B test different UI approaches
- Email deliverability → Use reputable email service
- Social sharing adoption → Incentivize sharing with additional content
