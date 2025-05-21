export function generateRandomString(length: number) {
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let text = '';
	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

export const storeState = async (env: Env) => {
	const state = generateRandomString(16);
	await env.AUTH_STATES.put(state, 'yes-its-safe', { expirationTtl: 300 });
	return state;
};

export const validateState = async (env: Env, state?: string | null) => {
	if (!state) return false;

	const stored = await env.AUTH_STATES.get(state);
	if (stored) await env.AUTH_STATES.delete(state);

	return !!stored;
};
