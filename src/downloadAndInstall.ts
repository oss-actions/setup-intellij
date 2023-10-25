import {
	addPath,
	debug,
	panic,
	randomDir,
	randomPath,
	tc,
} from "jamesons-actions-toolkit";
import { type as sysType, arch as sysArch } from "node:os";
import downloadUrl from "./url";
import { dirname, join } from "node:path";
import { readdirSync } from "node:fs";

async function downloadAndInstall(version: string) {
	const os = sysType();
	const arch = sysArch();

	if (os !== "Linux") panic("Operative system %o is not supported!", os);

	debug("Already available versions %o", tc.findAllVersions("IntelliJ-IDEA-C"));

	const url = downloadUrl(version, os, arch);

	const tarballPath = await tc.downloadTool(url, randomPath());
	const dir = await tc.extractTar(tarballPath, await randomDir());
	const pathToIdea = join(dir, readdirSync(dir)[0], "bin");

	await addPath(pathToIdea);

	debug("IntelliJ IDEA has been installed at %o", dirname(pathToIdea));

	const cacheDir = await tc.cacheDir(dir, "IntelliJ-IDEA-C", version, arch);

	debug("Cached to %o", cacheDir);
}

export default downloadAndInstall;
