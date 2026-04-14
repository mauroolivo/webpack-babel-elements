export type FeatureFlag = {
  name: string;
  enabled: boolean;
  description: string;
};

export type DashboardContext = {
  title: string;
  environment: string;
  releaseChannel: string;
  apiBaseUrl: string;
};

export const dashboardContext: DashboardContext = {
  title: __DASHBOARD_TITLE__,
  environment: __APP_ENV__,
  releaseChannel: __RELEASE_CHANNEL__,
  apiBaseUrl: __API_BASE_URL__,
};

export const featureFlags: FeatureFlag[] = [
  {
    name: 'Guided setup',
    enabled: __FEATURE_GUIDED_SETUP__,
    description: 'Controlled by DefinePlugin so the value is replaced at build time.',
  },
  {
    name: 'Insights panel',
    enabled: __FEATURE_INSIGHTS__,
    description: 'Changes across .env.development and .env.production to show environment-specific output.',
  },
  {
    name: 'Release channel badge',
    enabled: true,
    description: 'Always on so the dashboard can surface the chosen release channel clearly.',
  },
];