import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: 'qiafoam7',
    dataset: 'production',
  },
  studioHost: 'kwm-art-center',
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  deployment: { autoUpdates: true },
});
