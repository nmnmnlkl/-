exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'API is working' })
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
