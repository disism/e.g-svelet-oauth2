import { error, redirect } from '@sveltejs/kit';
import { DISISM_OIDC_CLIENT_ID, DISISM_OIDC_CLIENT_SECRET, DISISM_OIDC_AUTH_URI, APP_BASE_URL, PUBLIC_SAIKAN_BASE_URI } from '$env/static/private';

export const GET = async ({ url, cookies, fetch }) => {
    const code = url.searchParams.get('code') || null;
    const state = url.searchParams.get('state') || null;

    const storedState = cookies.get('disism_auth_state') || null;
    const storedChallengeVerifier = cookies.get('disism_auth_challenge_verifier') || null;


    if (state === null || state !== storedState) {
        throw error(400, 'State Mismatch!');
    }

    const response = await fetch(`${DISISM_OIDC_AUTH_URI}/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${Buffer.from(
                `${DISISM_OIDC_CLIENT_ID}:${DISISM_OIDC_CLIENT_SECRET}`
            ).toString('base64')}`
        },
        body: new URLSearchParams({
            code: code || '',
            redirect_uri: `${APP_BASE_URL}/api/auth/disism/callback`,
            grant_type: 'authorization_code',
            code_verifier: storedChallengeVerifier || '',
            client_id: DISISM_OIDC_CLIENT_ID
        })
    });
    const result = await response.json();

    if (result.error) {
        throw error(400, result.error_description);
    }

    cookies.delete('disism_auth_state');
    cookies.delete('disism_auth_challenge_verifier');

    const authorization = await fetch(`${PUBLIC_SAIKAN_BASE_URI}/authn`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${result.id_token}`
        }
    })

    const result2 = await authorization.json();
    cookies.set('access_token', result2.access_token, { path: '/' });

    throw redirect(303, '/');
};