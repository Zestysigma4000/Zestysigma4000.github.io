const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': 'https://answerai500.netlify.app',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod === 'POST') {
    try {
      const body = JSON.parse(event.body);
      const { question, platform } = body;

      const answer = await generateAnswer(question, platform);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          answer: answer,
          message: 'Processed by AnswerAI5000 Netlify',
          timestamp: new Date().toISOString()
        })
      };
      
    } catch (error) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          error: error.message
        })
      };
    }
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ error: 'Method not allowed' })
  };
};

async function generateAnswer(question, platform) {
  const answers = {
    'math': '42',
    'geometry': '2',
    'algebra': 'x = 5',
    'default': 'The solution requires careful analysis.'
  };
  
  return answers[platform] || answers.default;
}

