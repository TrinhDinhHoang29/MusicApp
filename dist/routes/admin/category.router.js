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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoryController = __importStar(require("../../controllers/admin/category.controller"));
const validate = __importStar(require("../../validates/category.validate"));
const router = (0, express_1.Router)();
router.get("/", categoryController.index);
router.get("/create", categoryController.create);
router.post("/create", validate.valiCreate, categoryController.createPost);
router.get("/detail/:id", categoryController.detail);
router.get("/edit/:id", categoryController.edit);
router.patch("/edit/:id", validate.valiCreate, categoryController.editPatch);
router.patch("/:actionUpdate/:id/:status", categoryController.actionUpdate);
router.patch("/change-multi", categoryController.changeMulti);
exports.default = router;
