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
const Article_1 = require("../../service/service/Article");
const router = express.Router();
const _article = new Article_1.default();
router.post("/Create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let body = req.body;
    let article = {
        title: body.title,
        text: body.text,
        shortDescription: body.shortDescription,
        file: body.file,
        attachments: body.attachments,
        channelToken: body.channelToken,
        isActive: body.isActive,
        ownerType: body.ownerType,
        tags: body.tags
    };
    let create = yield _article.createArticle(article, req.headers);
    res.json(create);
    res.end();
}));
exports.default = router;
//# sourceMappingURL=article.js.map