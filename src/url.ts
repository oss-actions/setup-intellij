const base = "https://download-cdn.jetbrains.com/idea/ideaIC-";

export function downloadUrl(version: string, os: string, arch: string): string {
	return `${base}${version}${downloadType(arch)}${downloadExtension(os)}`;
}

export default downloadUrl;

function downloadType(arch: string) {
	return arch === "arm64" ? "-aarch64" : "";
}

function downloadExtension(os: string) {
	switch (os) {
		case "Linux":
			return ".tar.gz";
		case "Windows_NT":
			return ".exe";
		case "Darwin":
			return ".dmg";
		default:
			throw new Error(`Unsupported OS '${os}'`);
	}
}
