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
const Channel_1 = require("../../service/service/Channel");
const router = express.Router();
const _channel = new Channel_1.default();
router.get("/Get", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let channels = yield _channel.getUserChannels(req.headers);
    res.json(channels);
    res.end();
}));
router.get("/GetTemproryChannels", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let temproryItems = yield _channel.getTemporaryChannelItems(req.headers);
    res.json(temproryItems);
    res.end();
}));
router.post("/Create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let body = req.body;
    let model = {
        avatar: body.avatar,
        title: body.title,
        link: body.link,
        name: body.name,
        token: '',
        id: ''
    };
    let channel = yield _channel.createChannel(model, req.headers);
    res.json(channel);
    res.end();
}));
router.get("/Channel", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.query.token.toString();
    let channel = yield _channel.getChannel(token, req.headers);
    res.json(channel);
    res.end();
}));
router.post("/Follow", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.body.token;
    let follow = yield _channel.followChannel(token, req.headers);
    res.json(follow);
    res.end();
}));
exports.default = router;
//# sourceMappingURL=channel.js.map