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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeMulti = exports.actionUpdate = exports.editPatch = exports.edit = exports.detail = exports.createPost = exports.create = exports.index = void 0;
const isValid = __importStar(require("../../validates/isValids.validates"));
const pagination_1 = __importDefault(require("../../helpers/pagination"));
const category_model_1 = __importDefault(require("../../models/category.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let sort = {
        title: "asc"
    };
    let filter = {
        deleted: false
    };
    if (req.query.typeFilter) {
        filter.status = req.query.typeFilter;
    }
    if (isValid.isValidSort(req.query.sort)) {
        sort.fullName = req.query.sort;
    }
    let objPagination = {
        limiteItem: 4,
        currentPage: 1,
    };
    if (isValid.isValidLimiteItem(req.query.limiteItem)) {
        objPagination.limiteItem = req.query.limiteItem;
    }
    const countcategory = yield category_model_1.default.find(filter).countDocuments();
    objPagination.totalPage = Math.ceil(countcategory / objPagination.limiteItem);
    const resultPagination = (0, pagination_1.default)(objPagination, req.query);
    const categorys = yield category_model_1.default.find(filter).limit(objPagination.limiteItem).skip(objPagination.skipItem).sort(sort).lean();
    res.render("admin/pages/categorys/index", { categorys: categorys, objPagination: resultPagination });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("admin/pages/categorys/create", {});
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryBody = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
    };
    try {
        const category = new category_model_1.default(categoryBody);
        yield category.save();
        req["flash"]("success", "Thêm thành công!!!");
        res.redirect("back");
    }
    catch (error) {
        req["flash"]("error", "Thêm thất bại!!!");
        res.redirect("back");
    }
});
exports.createPost = createPost;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idCategory = req.params.id;
    try {
        const category = yield category_model_1.default.findOne({ _id: idCategory });
        res.render("admin/pages/categorys/detail", { category: category });
    }
    catch (error) {
        res.redirect("back");
    }
});
exports.detail = detail;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idCategory = req.params.id;
    try {
        const category = yield category_model_1.default.findOne({ _id: idCategory });
        res.render("admin/pages/categorys/edit", { category: category, });
    }
    catch (error) {
        res.redirect("back");
    }
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idCategory = req.params.id;
    const categoryBody = {
        title: req.body.title,
        status: req.body.status,
        description: req.body.description
    };
    try {
        yield category_model_1.default.updateOne({
            _id: idCategory
        }, categoryBody);
        req["flash"]("success", "Cập nhật thành công!!!");
        res.redirect("back");
    }
    catch (error) {
        req["flash"]("error", "Cập nhật thất bại!!!" + error);
        res.redirect("back");
    }
});
exports.editPatch = editPatch;
const actionUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idCategory = req.params.id;
    const actionUpdate = req.params.actionUpdate;
    let valueUpdate = req.params.status;
    if (req.params.status == "true")
        valueUpdate = true;
    try {
        yield category_model_1.default.updateOne({
            _id: idCategory
        }, {
            [actionUpdate]: valueUpdate
        });
        res.json({
            code: 200,
            message: "Cập nhật thành công !!"
        });
    }
    catch (error) {
        res.json({
            code: 404,
            message: "Cập nhật thất bại !!"
        });
    }
});
exports.actionUpdate = actionUpdate;
const changeMulti = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const type = req.body.type;
    const value = JSON.parse(req.body.value);
    switch (type) {
        case "active":
            yield category_model_1.default.updateMany({
                _id: value
            }, {
                status: "active"
            });
            break;
        case "inactive":
            yield category_model_1.default.updateMany({
                _id: value
            }, {
                status: "inactive"
            });
            break;
        case "delete-all":
            yield category_model_1.default.updateMany({
                _id: value
            }, {
                deleted: true
            });
            break;
        default:
            req["flash"]("error", "Cập nhật thất bại!!!");
            res.redirect("back");
            return;
    }
    req["flash"]("success", "Cập nhật thành công!!!");
    res.redirect("back");
});
exports.changeMulti = changeMulti;
