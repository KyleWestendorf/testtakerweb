exports.handler = async (event, context) => {
    const {testIdentifier} = event.pathParameters;
      
    if(!testIdentifier) {
        return {
        statusCode: 404,
        body: JSON.stringify({ error: 'No identifier provided' })
      };
    }
    const dictionary = {
      "abc": [
        { question: "1", correctResponse: "A" },
        { question: "2", correctResponse: "B" },
        { question: "3", correctResponse: "B" }
      ],
      "abcd": [
        { question: "1", correctResponse: "D" },
        { question: "2", correctResponse: "E" },
        { question: "3", correctResponse: "F" }
      ]
    };
  
    const matchingEntries = dictionary[testIdentifier];
  
    if (matchingEntries) {
      return {
        statusCode: 200,
        body: JSON.stringify(matchingEntries)
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: `No matching entries found for ${testIdentifier}` })
      };
    }
  };