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
const Profile_1 = require("../../service/service/Profile");
const router = express.Router();
const _profile = new Profile_1.default();
router.get("/Get", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let profile = yield _profile.get(req.headers);
    res.json(profile);
    res.end();
}));
router.post("/Update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let body = req.body;
    let profile = {
        image: body.image,
        fullName: body.fullName,
        email: body.email,
        phoneNumber: body.phoneNumber,
        userName: body.userName
    };
    let updateProfile = yield _profile.update(req.headers, profile);
    res.json(updateProfile);
    res.end();
}));
exports.default = router;
//# sourceMappingURL=profile.js.map