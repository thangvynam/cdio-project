import { combineReducers } from "redux";
import { message } from "./message";
import { users } from "./users";
import { user } from "./user";
import { faculties } from "./faculties";
import { programs } from "./programs";
import { subjects } from "./subjects";
import { usingEduPro } from "./usingEduPro";
import { outcomeStandards } from "./outcomeStandards";
import { infoOutcomeStandard } from "./infoOutcomeStandard";
import { detailOutcomeStandard } from "./detailOutcomeStandard";
import { revisions } from "./revisions";
import { levels } from "./levels";
import { majors } from "./majors";
import { eduPrograms } from "./eduPrograms";
import { infoEduProgram } from "./infoEduProgram";
import { detailEduProgram } from "./detailEduProgram";
import { contentNodes } from "./_contentNodes";
import { scheduleNodes } from "./_scheduleNodes";
import { targetNodes } from "./_targetNodes";

const rootReducer = combineReducers({
  faculties,
  programs,
  subjects,
  usingEduPro,
  outcomeStandards,
  infoOutcomeStandard,
  detailOutcomeStandard,
  revisions,
  levels,
  majors,
  eduPrograms,
  message,
  
  infoEduProgram,
  detailEduProgram,
  contentNodes,
  scheduleNodes,
  targetNodes,
  
  users,
  user,
});

export default rootReducer;
