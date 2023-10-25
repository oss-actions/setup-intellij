import action from "./action";
import { setFailed } from "jamesons-actions-toolkit";

action().catch(setFailed);
