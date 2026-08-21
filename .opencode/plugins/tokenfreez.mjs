// opencode does not auto-scan skills/ from installed plugin packages, so the
// plugin registers its own skills directory (same pattern ponytail uses).
import path from "node:path";
import { fileURLToPath } from "node:url";

const skillsDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../skills",
);

export default async () => ({
  config: async (config) => {
    config.skills = config.skills || {};
    config.skills.paths = config.skills.paths || [];
    if (!config.skills.paths.includes(skillsDir)) {
      config.skills.paths.push(skillsDir);
    }
  },
});
