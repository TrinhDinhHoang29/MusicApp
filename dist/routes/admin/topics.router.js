"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const topicController = __importStar(require("../../controllers/admin/topics.controller"));
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)();
const uploadCloud = __importStar(require("../../middlewares/uploadCloud.middleware"));
const validate = __importStar(require("../../validates/topic.validate"));
const router = (0, express_1.Router)();
router.get("/", topicController.index);
router.get("/create", topicController.create);
router.post("/create", upload.single('avatar'), uploadCloud.uploadSingle, validate.valiCreate, topicController.createPost);
router.get("/detail/:id", topicController.detail);
router.get("/edit/:id", topicController.edit);
router.patch("/edit/:id", upload.single('avatar'), uploadCloud.uploadSingle, validate.valiEdit, topicController.editPatch);
router.patch("/:actionUpdate/:id/:status", topicController.actionUpdate);
router.patch("/change-multi", topicController.changeMulti);
exports.default = router;
