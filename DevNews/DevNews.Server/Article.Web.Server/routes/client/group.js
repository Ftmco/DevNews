"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Group_1 = require("../../service/service/Group");
const router = express.Router();
let _group = new Group_1.default();
router.get("/Get", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let groups = yield _group.getGroups();
    res.json(groups);
    res.end();
}));
exports.default = router;
//# sourceMappingURL=group.js.map