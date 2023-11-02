import posthog from "posthog-js";

export default {
    install: (app) => {
        app.config.globalProperties.$posthog = posthog.init(
            "phc_VWrGJ55ur977FBXRgvnm6LAZVQcC342ekqAL5hSKr1T",
            {
              api_host: "https://app.posthog.com",
            }
          );
    }
  }
