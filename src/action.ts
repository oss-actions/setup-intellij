import { getInput, string } from "jamesons-actions-toolkit";
import downloadAndInstall from "./downloadAndInstall";

export default async function action() {
	const version = getInput("version", { type: string });

	await downloadAndInstall(version);
}
