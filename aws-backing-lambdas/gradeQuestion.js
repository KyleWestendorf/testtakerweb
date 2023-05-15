console.log('Loading function');

exports.handler = async (event, context) => {
  const { answer } = event.queryStringParameters;
  const { testIdentifier, questionNumber } = event.pathParameters;
  
  if(!answer) {
     return {
      statusCode: 200,
      body: JSON.stringify({ isCorrect: false })
    };
  }
  
  if(!testIdentifier) {
    return {
      statusCode: 400,
      body: JSON.stringify({error: 'No test identifier provided'})
    };
  }
  
   if(!questionNumber) {
    return {
      statusCode: 400,
      body: JSON.stringify({error: 'No question number provided'})
    };
  }

  const apiEndpoint = `https://gh07niegi4.execute-api.us-east-1.amazonaws.com/default/tests/${testIdentifier}/answers`;
  const response = await fetch(apiEndpoint);
  const results = await response.json();
  
  if (!response.ok) {
    return {
      statusCode: response.status,
      body: JSON.stringify({ error: 'Failed to fetch test information' }),
    };
  }
  
  if(!results) {
     return {
      statusCode: 404,
      body: JSON.stringify({error: 'Test information not found'})
    };
  }
  
  const result = results.find(entry => entry.question === questionNumber);

  if (result) {
    const isCorrect = result.correctResponse.toLowerCase() === answer.toLowerCase();
    return {
      statusCode: 200,
      body: isCorrect
    };
  } else {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: 'Question not found' })
    };
  }
};
