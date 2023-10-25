"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jamesons_actions_toolkit_1 = require("jamesons-actions-toolkit");
const node_os_1 = require("node:os");
const url_1 = __importDefault(require("./url"));
const node_path_1 = require("node:path");
const node_fs_1 = require("node:fs");
async function downloadAndInstall(version) {
    const os = (0, node_os_1.type)();
    const arch = (0, node_os_1.arch)();
    if (os !== "Linux")
        (0, jamesons_actions_toolkit_1.panic)("Operative system %o is not supported!", os);
    (0, jamesons_actions_toolkit_1.debug)("Already available versions %o", jamesons_actions_toolkit_1.tc.findAllVersions("IntelliJ-IDEA-C"));
    const url = (0, url_1.default)(version, os, arch);
    const tarballPath = await jamesons_actions_toolkit_1.tc.downloadTool(url, (0, jamesons_actions_toolkit_1.randomPath)());
    (0, jamesons_actions_toolkit_1.group)("Extracting contents");
    const dir = await jamesons_actions_toolkit_1.tc.extractTar(tarballPath, await (0, jamesons_actions_toolkit_1.randomDir)());
    (0, jamesons_actions_toolkit_1.endGroup)();
    const pathToIdea = (0, node_path_1.join)(dir, (0, node_fs_1.readdirSync)(dir)[0], "bin");
    await (0, jamesons_actions_toolkit_1.addPath)(pathToIdea);
    (0, jamesons_actions_toolkit_1.debug)("IntelliJ IDEA has been installed at %o", (0, node_path_1.dirname)(pathToIdea));
    const cacheDir = await jamesons_actions_toolkit_1.tc.cacheDir(dir, "IntelliJ-IDEA-C", version, arch);
    (0, jamesons_actions_toolkit_1.debug)("Cached to %o", cacheDir);
}
exports.default = downloadAndInstall;
