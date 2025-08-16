const ServerUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const API_CONFIG = {
    base_url: ServerUrl,
    refresh_token_url: `${ServerUrl}/auth/refresh-token`,
    logout_url: `${ServerUrl}/auth/logout`,
} as const;