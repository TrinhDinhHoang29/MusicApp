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
const song_model_1 = __importDefault(require("../../models/song.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const pagination_1 = __importDefault(require("../../helpers/pagination"));
const isValid = __importStar(require("../../validates/isValids.validates"));
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
    const countSong = yield song_model_1.default.find(filter).countDocuments();
    objPagination.totalPage = Math.ceil(countSong / objPagination.limiteItem);
    const resultPagination = (0, pagination_1.default)(objPagination, req.query);
    const songs = yield song_model_1.default.find(filter).limit(objPagination.limiteItem).skip(objPagination.skipItem).sort(sort).lean();
    const topicTitles = yield topic_model_1.default.find({}).select("id title");
    const singerFullNames = yield singer_model_1.default.find({}).select("id fullName");
    for (const song of songs) {
        const topic = topicTitles.find(item => item._id == song.topicId);
        song.titleTopic = topic.title;
        const singer = singerFullNames.find(item => item._id == song.singerId);
        song.fullNameSinger = singer.fullName;
    }
    res.render("admin/pages/songs/index", { songs: songs, objPagination: resultPagination });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const singers = yield singer_model_1.default.find({ deleted: false });
    const topics = yield topic_model_1.default.find({ deleted: false });
    res.render("admin/pages/songs/create", { singers: singers, topics: topics });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const countSong = yield song_model_1.default.countDocuments({ deleted: false });
    const songBody = {
        title: req.body.title,
        avatar: req.body.avatar,
        description: req.body.description,
        singerId: req.body.singerId,
        topicId: req.body.topicId,
        lyrics: req.body.lyrics,
        audio: req.body.audio,
        status: req.body.status,
        posision: req.body.posision ? req.body.posision : countSong + 1
    };
    try {
        const song = new song_model_1.default(songBody);
        yield song.save();
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
    const idSong = req.params.id;
    try {
        const song = yield song_model_1.default.findOne({ _id: idSong });
        res.render("admin/pages/songs/detail", { song: song });
    }
    catch (error) {
        res.redirect("back");
    }
});
exports.detail = detail;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.id;
    try {
        const song = yield song_model_1.default.findOne({ _id: idSong }).lean();
        const topics = yield topic_model_1.default.find({}).select("id title");
        const singers = yield singer_model_1.default.find({}).select("id fullName");
        res.render("admin/pages/songs/edit", { song: song, topics: topics, singers: singers });
    }
    catch (error) {
        res.redirect("back");
    }
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.id;
    const songBody = {
        title: req.body.title,
        avatar: req.body.avatar,
        description: req.body.description,
        singerId: req.body.singerId,
        topicId: req.body.topicId,
        lyrics: req.body.lyrics,
        audio: req.body.audio,
        status: req.body.status,
        posision: req.body.posision
    };
    try {
        yield song_model_1.default.updateOne({
            _id: idSong
        }, songBody);
        req["flash"]("success", "Cập nhật thành công!!!");
        res.redirect("back");
    }
    catch (error) {
        req["flash"]("error", "Cập nhật thất bại!!!");
        res.redirect("back");
    }
});
exports.editPatch = editPatch;
const actionUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.id;
    const actionUpdate = req.params.actionUpdate;
    let valueUpdate = req.params.status;
    if (req.params.status == "true")
        valueUpdate = true;
    try {
        yield song_model_1.default.updateOne({
            _id: idSong
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
            yield song_model_1.default.updateMany({
                _id: value
            }, {
                status: "active"
            });
            break;
        case "inactive":
            yield song_model_1.default.updateMany({
                _id: value
            }, {
                status: "inactive"
            });
            break;
        case "delete-all":
            yield song_model_1.default.updateMany({
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
