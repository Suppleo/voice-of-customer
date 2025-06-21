# Customer Experience Maturity Assessment Tool

A web-based assessment tool that helps businesses evaluate their maturity level in listening to customers (Voice of Customer - VoC). The tool provides a structured questionnaire, calculates maturity scores, delivers personalized results, and enables social sharing of achievements.

## 🚀 Features

### Core Features

- **Email Collection System** - Mandatory email input with validation
- **Dynamic Assessment Engine** - 10 questions with progress tracking
- **Score Calculation System** - Intelligent scoring with level mapping
- **Results Display System** - Personalized results with recommendations
- **Dynamic Facebook Sharing** - Server-side rendered share pages with proper OG tags
- **Responsive Design** - Mobile-first approach with cross-device compatibility

### Dynamic Facebook Sharing System

The app implements a sophisticated Facebook sharing system that works without requiring a Facebook App ID:

#### How It Works

1. **Unique Result IDs**: Each assessment result generates a unique ID in format `{level}-{score}-{timestamp}`
2. **Server-Side Rendering**: Netlify Functions generate dynamic HTML pages with proper Open Graph meta tags
3. **Facebook Crawler Compatible**: Static HTML ensures Facebook's crawler can read the correct images and text
4. **Automatic Redirect**: Share pages redirect to the main app after Facebook crawls the content

#### Technical Implementation

- **Netlify Function**: `netlify/functions/share-result.js` generates dynamic share pages
- **URL Structure**: `/share-result/{level}-{score}-{timestamp}`
- **Meta Tags**: Dynamic OG tags with level-specific images and descriptions
- **Image URLs**: `/images/lv1.jpg` through `/images/lv5.jpg` for each maturity level

#### Example Share URL

```
https://yourdomain.com/share-result/3-7.5-1703123456789
```

This generates a page with:

- Level 3 (Vận hành) specific content
- Score of 7.5 points
- Timestamp for uniqueness
- Proper OG tags for Facebook sharing

## 🛠️ Technology Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Netlify
- **Server Functions**: Netlify Functions (Node.js)
- **Sharing**: Dynamic server-side rendered pages

## 📁 Project Structure

```
voice-of-customer/
├── src/
│   ├── components/
│   │   ├── Assessment.tsx      # Main assessment component
│   │   ├── Results.tsx         # Results display
│   │   ├── SharePopup.tsx      # Custom share dialog
│   │   └── ...
│   ├── hooks/
│   │   └── useAssessment.ts    # State management
│   ├── data/
│   │   └── assessment.json     # Questions and results data
│   └── types/
│       └── assessment.ts       # TypeScript definitions
├── public/
│   └── images/                 # Level-specific share images
│       ├── lv1.jpg
│       ├── lv2.jpg
│       └── ...
├── netlify/
│   └── functions/
│       └── share-result.js     # Dynamic share page generator
└── netlify.toml               # Netlify configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- Netlify CLI (for local development)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd voice-of-customer

# Install dependencies
npm install

# Start development server
npm run dev

# For local Netlify Functions testing
netlify dev
```

### Building for Production

```bash
npm run build
```

## 🔧 Configuration

### Environment Variables

- `URL`: Base URL for the application (set automatically by Netlify)

### Netlify Configuration

The `netlify.toml` file configures:

- Build settings and function directory
- Redirect rules for dynamic share pages
- SPA fallback routing

## 📱 Usage

1. **Email Collection**: Users enter their email to start
2. **Assessment**: Answer 10 questions about customer listening practices
3. **Results**: View personalized maturity level and recommendations
4. **Sharing**: Click "Chia sẻ kết quả" to open sharing options
5. **Facebook Share**: Generates unique URL with proper OG tags

## 🎯 Maturity Levels

- **Level 1 (Sơ khai)**: 0-2 points - Basic awareness
- **Level 2 (Thành lập)**: 2-4 points - Initial implementation
- **Level 3 (Vận hành)**: 4-6 points - Operational processes
- **Level 4 (Tối ưu)**: 6-8 points - Optimized practices
- **Level 5 (Thấm nhuần)**: 8-10 points - Mature culture

## 🔗 Social Sharing

### Facebook Sharing

- **Dynamic OG Tags**: Server-side rendered with correct images
- **No App ID Required**: Uses standard Facebook share endpoint
- **Unique URLs**: Each share gets a unique, crawlable page
- **Proper Images**: Level-specific images displayed in Facebook preview

### Email Sharing

- **Pre-filled Content**: Subject and body with result details
- **Image Links**: Direct links to level-specific images

### Link Copying

- **Unique URLs**: Each result gets a shareable link
- **Clipboard Integration**: One-click copying with feedback

## 🚀 Deployment

### Netlify Deployment

1. Connect repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Functions directory: `netlify/functions`

### Environment Setup

- Netlify automatically sets the `URL` environment variable
- Images are served from the `public/images/` directory
- Functions are deployed to `/.netlify/functions/`

## 🧪 Testing

### Local Development

```bash
# Start development server
npm run dev

# Test Netlify Functions locally
netlify dev

# Test share URLs
curl http://localhost:8888/.netlify/functions/share-result/3-7.5-1703123456789
```

### Facebook Sharing Debugger

Use the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) to:

- Test share URLs
- Clear Facebook cache
- Verify OG tags
- Preview share appearance

## 📈 Performance

- **Static Assets**: Images optimized and cached
- **Function Caching**: Share pages cached for 1 hour
- **CDN**: Netlify's global CDN for fast delivery
- **Lazy Loading**: Components loaded on demand

## 🔒 Security

- **Input Validation**: Email and form validation
- **XSS Prevention**: Proper content encoding
- **No Sensitive Data**: No personal data stored
- **HTTPS Only**: Secure connections enforced

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:

- Check the documentation
- Review the code comments
- Test with Facebook Sharing Debugger
- Verify Netlify Function logs
