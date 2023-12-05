import {
  PLAID_PRODUCTS,
  PLAID_COUNTRY_CODES,
  PLAID_REDIRECT_URI,
  getPlaidClient,
} from '../plaid';

export async function POST(request) {
  const configs = {
    user: {
      // This should correspond to a unique id for the current user.
      client_user_id: 'user-id',
    },
    client_name: 'pmf',
    products: PLAID_PRODUCTS,
    country_codes: PLAID_COUNTRY_CODES,
    language: 'en',
  };

  if (PLAID_REDIRECT_URI !== '') {
    configs.redirect_uri = PLAID_REDIRECT_URI;
  }
  try {
    const plaidClient = getPlaidClient();
    const createTokenResponse = await plaidClient.linkTokenCreate(configs);
    return new Response(JSON.stringify(createTokenResponse.data));
  } catch (error) {
    console.error('error', error);
  }
}
