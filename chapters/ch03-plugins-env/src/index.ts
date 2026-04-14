import { dashboardContext, featureFlags } from './featureFlags';
import { loadBuildNotes } from './loadBuildNotes';
import { renderFeatureDashboard } from './renderFeatureDashboard';

async function bootstrap() {
  const root = document.querySelector<HTMLElement>('#app');

  if (!root) {
    throw new Error('Expected an element with the id "app".');
  }

  const notes = await loadBuildNotes(dashboardContext.environment);

  renderFeatureDashboard(root, {
    context: dashboardContext,
    flags: featureFlags,
    notes,
  });

  console.table(
    featureFlags.map((flag) => ({
      name: flag.name,
      enabled: flag.enabled,
      releaseChannel: dashboardContext.releaseChannel,
    })),
  );
}

void bootstrap();