import { redirect } from '@sveltejs/kit';
import pkce from 'pkce-gen';
import {DISISM_OIDC_CLIENT_ID, DISISM_OIDC_AUTH_URI, APP_BASE_URL} from '$env/static/private'

/**
 * Generates a random string of the specified length.
 *
 * @param {number} length - The length of the random string to generate.
 * @return {string} - The randomly generated string.
 */
const generateRandomString = (length) => {
    let randomString = '';
    const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        randomString += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
    }
    return randomString;
};

const state = generateRandomString(16);
const challenge = pkce.create();

const scope = 'openid profile email';

export const GET = ({ cookies }) => {
    cookies.set('disism_auth_state', state);
    cookies.set('disism_auth_challenge_verifier', challenge.code_verifier);
    throw redirect(
        307,
        `${DISISM_OIDC_AUTH_URI}/auth?${new URLSearchParams({
            response_type: 'code',
            client_id: DISISM_OIDC_CLIENT_ID,
            scope,
            redirect_uri: `${APP_BASE_URL}/api/auth/disism/callback`,
            state,
            code_challenge_method: 'S256',
            code_challenge: challenge.code_challenge
        })}`
    );
};