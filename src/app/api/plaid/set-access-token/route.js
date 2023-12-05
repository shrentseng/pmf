import { getPlaidClient } from '../plaid';

export async function POST(request) {
  const formData = await request.formData();
  const PUBLIC_TOKEN = formData.get('public_token');
  console.log('PUBLIC OTKEN', PUBLIC_TOKEN);

  const plaidClient = getPlaidClient();
  const tokenResponse = await plaidClient.itemPublicTokenExchange({
    public_token: PUBLIC_TOKEN,
  });
  const ACCESS_TOKEN = tokenResponse.data.access_token;
  const ITEM_ID = tokenResponse.data.item_id;
  console.log('tokenres', tokenResponse.data);
  return new Response(
    tokenResponse.json({
      // the 'access_token' is a private token, DO NOT pass this token to the frontend in your production environment
      access_token: ACCESS_TOKEN,
      item_id: ITEM_ID,
      error: null,
    })
  );
}
