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
exports.changeMulti = exports.editPatch = exports.actionUpdate = exports.edit = exports.detail = exports.createPost = exports.create = exports.index = void 0;
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const pagination_1 = __importDefault(require("../../helpers/pagination"));
const isValid = __importStar(require("../../validates/isValids.validates"));
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
        sort.title = req.query.sort;
    }
    let objPagination = {
        limiteItem: 4,
        currentPage: 1,
    };
    if (isValid.isValidLimiteItem(req.query.limiteItem)) {
        objPagination.limiteItem = req.query.limiteItem;
    }
    const countTopic = yield topic_model_1.default.find(filter).countDocuments();
    objPagination.totalPage = Math.ceil(countTopic / objPagination.limiteItem);
    const resultPagination = (0, pagination_1.default)(objPagination, req.query);
    const topics = yield topic_model_1.default.find(filter).limit(objPagination.limiteItem).skip(objPagination.skipItem).sort(sort);
    res.render("admin/pages/topics/index", { topics: topics, objPagination: resultPagination });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categorys = yield category_model_1.default.find();
    res.render("admin/pages/topics/create", { categorys: categorys });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topicBody = {
        title: req.body.title,
        avatar: req.body.avatar,
        description: req.body.description,
        status: req.body.status,
        categoryId: req.body.categoryId,
    };
    try {
        const topic = new topic_model_1.default(topicBody);
        yield topic.save();
        req["flash"]("success", "Thêm chủ đề thành công!!!");
        res.redirect("back");
    }
    catch (error) {
        req["flash"]("error", "Thêm chủ đề thất bại!!!");
        res.redirect("back");
    }
});
exports.createPost = createPost;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idTopic = req.params.id;
    try {
        const topic = yield topic_model_1.default.findOne({ _id: idTopic });
        res.render("admin/pages/topics/detail", { topic: topic });
    }
    catch (error) {
        res.redirect("back");
    }
});
exports.detail = detail;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idTopic = req.params.id;
    try {
        const categorys = yield category_model_1.default.find({});
        const topic = yield topic_model_1.default.findOne({ _id: idTopic });
        res.render("admin/pages/topics/edit", { topic: topic, categorys: categorys });
    }
    catch (error) {
        res.redirect("back");
    }
});
exports.edit = edit;
const actionUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idTopic = req.params.id;
    const actionUpdate = req.params.actionUpdate;
    let valueUpdate = req.params.status;
    if (req.params.status == "true")
        valueUpdate = true;
    try {
        yield topic_model_1.default.updateOne({
            _id: idTopic
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
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idTopic = req.params.id;
    const topicBody = {
        title: req.body.title,
        avatar: req.body.avatar,
        description: req.body.description,
        status: req.body.status,
        categoryId: req.body.categoryId
    };
    try {
        yield topic_model_1.default.updateOne({
            _id: idTopic
        }, topicBody);
        req["flash"]("success", "Cập nhật chủ đề thành công!!!");
        res.redirect("back");
    }
    catch (error) {
        req["flash"]("error", "Cập nhật chủ đề thất bại!!!");
        res.redirect("back");
    }
});
exports.editPatch = editPatch;
const changeMulti = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const type = req.body.type;
    const value = JSON.parse(req.body.value);
    switch (type) {
        case "active":
            yield topic_model_1.default.updateMany({
                _id: value
            }, {
                status: "active"
            });
            break;
        case "inactive":
            yield topic_model_1.default.updateMany({
                _id: value
            }, {
                status: "inactive"
            });
            break;
        case "delete-all":
            yield topic_model_1.default.updateMany({
                _id: value
            }, {
                deleted: true
            });
            break;
        default:
            req["flash"]("error", "Cập nhật chủ đề thất bại!!!");
            res.redirect("back");
            return;
    }
    req["flash"]("success", "Cập nhật chủ đề thành công!!!");
    res.redirect("back");
});
exports.changeMulti = changeMulti;
