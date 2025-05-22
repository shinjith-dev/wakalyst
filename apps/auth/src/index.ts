import { storeState, validateState } from './lib';

const CALLBACK_URL = 'https://shinjith.dev/callback';
const PERMISSION_SCOPE = [];
const WAKATIME_BASE_URL = 'https://wakatime.com/oauth';

export default {
	async fetch(request: Request, env: Env, _ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url);

		try {
			if (url.pathname === '/authorize') {
				const params = new URLSearchParams({
					response_type: 'code',
					client_id: env.WAKATIME_CLIENT_ID,
					scope: PERMISSION_SCOPE.join(' '),
					redirect_uri: CALLBACK_URL,
					state: await storeState(env),
				});

				return new Response(`${WAKATIME_BASE_URL}/authorize?${params.toString()}`, {
					status: 200,
				});
			}

			if (url.pathname === '/token') {
				const reqBody = new URLSearchParams(await request.text());

				if (!validateState(env, reqBody.get('state'))) return new Response('state_mismatch', { status: 400 });

				const body = {
					code: reqBody.get('code') || '',
					redirect_uri: PERMISSION_SCOPE,
					grant_type: 'authorization_code',
					client_id: env.WAKATIME_CLIENT_ID,
					client_secret: env.WAKATIME_CLIENT_SECRET,
				};

				const tokenRequest = await fetch(`${WAKATIME_BASE_URL}/token`, {
					method: 'POST',
					body: new URLSearchParams(body),
				});

				const tokenResponse = await tokenRequest.text();

				return new Response(tokenResponse, {
					status: tokenRequest.status,
					headers: {
						'Content-Type': tokenRequest.headers.get('Content-Type') || 'application/json',
					},
				});
			}

			if (url.pathname === '/revoke') {
				const reqBody = new URLSearchParams(await request.text());

				const body = {
					token: reqBody.get('token') || '',
					client_id: env.WAKATIME_CLIENT_ID,
					client_secret: env.WAKATIME_CLIENT_SECRET,
				};

				const revokeRequest = await fetch(`${WAKATIME_BASE_URL}/token`, {
					method: 'POST',
					body: new URLSearchParams(body),
				});

				const revokeResponse = await revokeRequest.text();

				return new Response(revokeResponse, {
					status: revokeRequest.status,
					headers: {
						'Content-Type': revokeRequest.headers.get('Content-Type') || 'application/json',
					},
				});
			}
		} catch (err) {
			console.log(String(err));
			return new Response('server_error', {
				status: 500,
			});
		}

		return new Response('forbidden', {
			status: 403,
			headers: {
				'Access-Control-Allow-Origin': 'null',
			},
		});
	},
} satisfies ExportedHandler<Env>;
