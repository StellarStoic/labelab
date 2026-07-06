import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const deployRoot = resolve(process.argv[2] || ".");
const fullCommit = runGit("rev-parse HEAD");
const shortCommit = runGit("rev-parse --short HEAD");
const commitDate = runGit("show -s --format=%cs HEAD");
const changes = runGit("log -5 --pretty=format:%s")
  .split("\n")
  .map((line) => line.trim())
  .filter(Boolean);

const versionInfo = {
  commit: fullCommit,
  shortCommit,
  date: commitDate,
  changes,
};

writeFileSync(join(deployRoot, "version.json"), `${JSON.stringify(versionInfo, null, 2)}\n`);
stampAssetVersions(join(deployRoot, "index.html"), shortCommit);

function runGit(command) {
  // Execute trusted Git metadata commands used to build the public version descriptor.
  return execSync(`git ${command}`, { encoding: "utf8" }).trim();
}

function stampAssetVersions(indexPath, version) {
  // Add commit query strings to root CSS and JS files in the deploy artifact only.
  const html = readFileSync(indexPath, "utf8")
    .replace(/href="styles\.css(?:\?v=[^"]*)?"/, `href="styles.css?v=${version}"`)
    .replace(/src="app\.js(?:\?v=[^"]*)?"/, `src="app.js?v=${version}"`);
  writeFileSync(indexPath, html);
}
