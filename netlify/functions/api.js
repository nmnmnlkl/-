const API_KEYS = new Set([
  'your-secure-api-key-1',
  'your-secure-api-key-2'
]);

exports.handler = async (event, context) => {
  // التحقق من وجود مفتاح API في الرأس
  const apiKey = event.headers['x-api-key'] || event.queryStringParameters?.apiKey;
  
  // إذا لم يتم تقديم مفتاح
  if (!apiKey) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'API key is required' }),
      headers: { 'Content-Type': 'application/json' }
    };
  }
  
  // التحقق من صحة المفتاح
  if (!API_KEYS.has(apiKey)) {
    return {
      statusCode: 403,
      body: JSON.stringify({ error: 'Invalid API key' }),
      headers: { 'Content-Type': 'application/json' }
    };
  }

  // معالجة المسارات المختلفة
  if (event.httpMethod === 'POST' && event.path.endsWith('/test-api-key')) {
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true,
        message: 'API is working!',
        timestamp: new Date().toISOString()
      }),
      headers: { 'Content-Type': 'application/json' }
    };
  }

  // إذا لم يتم العثور على المسار
  return {
    statusCode: 404,
    body: JSON.stringify({ error: 'Endpoint not found' }),
    headers: { 'Content-Type': 'application/json' }
  };
};
