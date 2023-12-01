import {PUBLIC_SAIKAN_BASE_URI} from "$env/static/public";

export async function load({ fetch }) {
    try {
        const response = await fetch(`${PUBLIC_SAIKAN_BASE_URI}/.well-known/node-info`);
        const provider = await response.json();
        return {
            provider: provider
        }
    } catch (error) {
        console.error(error);
    }
}
