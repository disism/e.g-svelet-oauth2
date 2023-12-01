import {PUBLIC_SAIKAN_BASE_URI} from "$env/static/public";

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, cookies }) {
    const accessToken = cookies.get('access_token')
    try {
        const response = await fetch(`${PUBLIC_SAIKAN_BASE_URI}/_devices/v1`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });
        const devices = await response.json();
        return {
            devices: devices
        };
    } catch (error) {
        console.error(error);
    }
}

