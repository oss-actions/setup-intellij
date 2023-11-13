import {
	addPath,
	annotation,
	debug,
	endGroup,
	group,
	notice,
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
	const cacheHit = tc.find("ideac", version, arch) as string | undefined;
	if (cacheHit) {
		await addPath(cacheHit);
		notice(
			`${version} (cached)`,
			annotation({ title: "IntelliJ Community Edition" }),
		);
		return;
	}
	const url = downloadUrl(version, os, arch);
	const tarballPath = await tc.downloadTool(url, randomPath());
	group("Extracting contents");
	const dir = await tc.extractTar(tarballPath, await randomDir());
	endGroup();
	const pathToIdea = join(dir, readdirSync(dir)[0], "bin");
	await addPath(pathToIdea);
	debug("IntelliJ IDEA has been installed at %o", dirname(pathToIdea));
	const cacheDir = await tc.cacheDir(dir, "ideac", version, arch);
	debug("Cached to %o", cacheDir);
	notice(`${version}`, annotation({ title: "IntelliJ Community Edition" }));
}

export default downloadAndInstall;
