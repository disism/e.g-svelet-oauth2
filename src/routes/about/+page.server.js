import {PUBLIC_SAIKAN_BASE_URI} from "$env/static/public";


/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
    try {
        const response = await fetch(`${PUBLIC_SAIKAN_BASE_URI}/version`);
        const version = await response.json();

        return {
            version: version
        };
    } catch (error) {
        console.error(error);
    }
}