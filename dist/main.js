"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const action_1 = __importDefault(require("./action"));
const jamesons_actions_toolkit_1 = require("jamesons-actions-toolkit");
(0, action_1.default)().catch(jamesons_actions_toolkit_1.setFailed);
