export type OAuthProviderKey = "google" | "kakao" | "naver";

type ProviderEnvKeys = {
  clientId: string;
  clientSecret: string;
};

const providerEnvKeys: Record<OAuthProviderKey, ProviderEnvKeys> = {
  google: {
    clientId: "GOOGLE_CLIENT_ID",
    clientSecret: "GOOGLE_CLIENT_SECRET",
  },
  kakao: {
    clientId: "KAKAO_CLIENT_ID",
    clientSecret: "KAKAO_CLIENT_SECRET",
  },
  naver: {
    clientId: "NAVER_CLIENT_ID",
    clientSecret: "NAVER_CLIENT_SECRET",
  },
};

export function isProviderEnabled(provider: OAuthProviderKey) {
  const keys = providerEnvKeys[provider];

  return Boolean(process.env[keys.clientId]) && Boolean(process.env[keys.clientSecret]);
}

export function isGoogleEnabled() {
  return isProviderEnabled("google");
}
