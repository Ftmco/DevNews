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
const context_1 = require("../../data base/context");
const Base_1 = require("../../service/base/Base");
const router = express.Router();
const _base = new Base_1.default(context_1.default, 'Group');
router.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    next();
}));
router.get("/Get", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let page = parseInt(req.query.page.toString());
    let count = parseInt(req.query.count.toString());
    let objects = yield _base.getAll({
        offset: page,
        limit: count
    });
    res.json({
        Status: true,
        Code: 200,
        Title: '',
        Result: objects
    });
    res.end();
}));
router.post("/Create", (req, res) => {
    let body = req.body;
});
exports.default = router;
//# sourceMappingURL=group.js.map