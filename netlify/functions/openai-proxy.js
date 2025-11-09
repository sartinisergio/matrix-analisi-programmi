
// Netlify Function - Proxy per OpenAI API
// Risolve il problema CORS facendo le chiamate lato server

exports.handler = async (event, context) => {
  // Gestisci CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  // Solo POST è permesso
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse del body della richiesta
    const { apiKey: userApiKey, model, messages, temperature, max_tokens } = JSON.parse(event.body);

    // Usa la chiave dell'utente se fornita, altrimenti usa quella di default da variabile d'ambiente
    const apiKey = userApiKey || process.env.OPENAI_API_KEY;

    // Validazione
    if (!apiKey || !messages) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: 'Missing required parameters: apiKey (or OPENAI_API_KEY env var) and messages are required' })
      };
    }

    // Chiamata a OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: model || 'gpt-4o-mini',
        messages: messages,
        temperature: temperature !== undefined ? temperature : 0.2,
        max_tokens: max_tokens || 16000
      })
    });

    const data = await response.json();

    // Se OpenAI restituisce un errore
    if (!response.ok) {
      return {
        statusCode: response.status,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          error: data.error || 'OpenAI API error',
          details: data
        })
      };
    }

    // Successo
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

  } catch (error) {
    console.error('Errore nel proxy OpenAI:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      })
    };
  }
};

