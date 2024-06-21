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
const singerController = __importStar(require("../../controllers/admin/singer.controller"));
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)();
const uploadCloud = __importStar(require("../../middlewares/uploadCloud.middleware"));
const singerValidate = __importStar(require("../../validates/singer.validate"));
const router = (0, express_1.Router)();
router.get("/", singerController.index);
router.get("/create", singerController.create);
router.post("/create", upload.single('avatar'), uploadCloud.uploadSingle, singerValidate.valiCreate, singerController.createPost);
router.get("/detail/:id", singerController.detail);
router.get("/edit/:id", singerController.edit);
router.patch("/edit/:id", upload.single('avatar'), uploadCloud.uploadSingle, singerValidate.valiEdit, singerController.editPatch);
router.patch("/:actionUpdate/:id/:status", singerController.actionUpdate);
router.patch("/change-multi", singerController.changeMulti);
exports.default = router;
