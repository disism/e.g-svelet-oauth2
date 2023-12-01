import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies, url }) => {
    const token = cookies.get('access_token');
    if (token && url.pathname === '/authx') {
        throw redirect(307, '/');
    }
    if (!token && url.pathname !== '/authx') {
        throw redirect(307, '/authx');
    }
};