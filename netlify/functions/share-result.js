export const handler = async function (event, context) {
  // Get the result ID from the URL path
  const path = event.path;
  const resultId = path.split("/").pop();

  // Parse the result ID to get level and score
  // Format: {level}-{score}-{timestamp}
  const [level, score, timestamp] = resultId.split("-");

  if (!level || !score) {
    return {
      statusCode: 404,
      body: "Result not found",
    };
  }

  // Map level to Vietnamese names
  const levelNames = {
    1: "Sơ khai",
    2: "Thành lập",
    3: "Vận hành",
    4: "Tối ưu",
    5: "Thấm nhuần",
  };

  const levelName = levelNames[level] || "Không xác định";
  const baseUrl =
    process.env.URL || "https://zesty-speculoos-8faf7e.netlify.app";
  const imageUrl = `${baseUrl}/images/lv${level}.jpg`;
  const shareUrl = `${baseUrl}/share-result/${resultId}`;

  const title = `Tôi đạt cấp ${level} - ${levelName} trong đánh giá năng lực Lắng nghe khách hàng!`;
  const description = `Tôi vừa hoàn thành bài đánh giá năng lực Lắng nghe khách hàng và đạt cấp ${level} - ${levelName} với ${score}/10 điểm! Hãy thử đánh giá doanh nghiệp của bạn.`;

  const html = `
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${shareUrl}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${imageUrl}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:locale" content="vi_VN" />
    <meta property="og:site_name" content="Filum.ai Assessment" />
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="${shareUrl}" />
    <meta property="twitter:title" content="${title}" />
    <meta property="twitter:description" content="${description}" />
    <meta property="twitter:image" content="${imageUrl}" />
    
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-align: center;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            max-width: 600px;
            background: rgba(255, 255, 255, 0.1);
            padding: 40px;
            border-radius: 20px;
            backdrop-filter: blur(10px);
        }
        .result-image {
            width: 200px;
            height: 200px;
            object-fit: cover;
            border-radius: 15px;
            margin: 0 auto 20px;
            display: block;
            box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        }
        h1 {
            font-size: 2.5rem;
            margin-bottom: 20px;
            font-weight: bold;
        }
        p {
            font-size: 1.2rem;
            line-height: 1.6;
            margin-bottom: 30px;
        }
        .score {
            font-size: 3rem;
            font-weight: bold;
            color: #ffd700;
            margin: 20px 0;
        }
        .level {
            font-size: 1.5rem;
            color: #90EE90;
            margin-bottom: 20px;
        }
        .redirect-btn {
            background: #4CAF50;
            color: white;
            border: none;
            padding: 15px 30px;
            font-size: 1.1rem;
            border-radius: 10px;
            cursor: pointer;
            transition: background 0.3s;
            margin-top: 20px;
        }
        .redirect-btn:hover {
            background: #45a049;
        }
        .debug-info {
            background: rgba(0,0,0,0.3);
            padding: 15px;
            border-radius: 10px;
            margin-top: 20px;
            font-size: 0.9rem;
            text-align: left;
        }
    </style>
</head>
<body>
    <div class="container">
        <img src="${imageUrl}" alt="Cấp ${level} - ${levelName}" class="result-image" />
        <h1>🎉 Kết quả đánh giá</h1>
        <div class="level">Cấp ${level}: ${levelName}</div>
        <div class="score">${score}/10 điểm</div>
        <p>${description}</p>
        
        <button class="redirect-btn" onclick="window.location.href='${baseUrl}?result=${level}'">
            Làm lại đánh giá
        </button>
    </div>
</body>
</html>`;

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=3600", // Cache for 1 hour
    },
    body: html,
  };
};
