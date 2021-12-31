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
const Account_1 = require("../../service/service/Account");
const router = express.Router();
const _account = new Account_1.default();
router.post("/Login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let body = req.body;
    let model = { userName: body.userName, password: body.password };
    let login = yield _account.login(model);
    res.json(login);
    res.end();
}));
router.post("/SignUp", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let body = req.body;
    let model = { userName: body.userName, password: body.password, email: body.email, fullName: body.fullName, phoneNumber: body.phoneNumber };
    let signup = yield _account.signUp(model);
    res.json(signup);
    res.end();
}));
router.post("/Activation", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let body = req.body;
    let model = { userName: body.userName, activeCode: body.activeCode };
    let activation = yield _account.activation(model);
    res.json(activation);
    res.end();
}));
exports.default = router;
//# sourceMappingURL=account.js.map