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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detail = exports.index = void 0;
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const category_model_1 = __importDefault(require("../../models/category.model"));
const song_model_1 = __importDefault(require("../../models/song.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categorys = yield category_model_1.default.find({ status: "active", deleted: false }).lean();
        for (const category of categorys) {
            category.listTopic = yield topic_model_1.default.find({
                categoryId: category._id,
                status: "active",
                deleted: false,
            }).limit(5);
        }
        res.render("client/pages/topics/index", { categorys: categorys });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
exports.index = index;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slug = req.params.slug;
        const topic = yield topic_model_1.default.findOne({ slug: slug, status: "active", deleted: false });
        const songs = yield song_model_1.default.find({ status: "active", deleted: false, topicId: topic._id }).lean();
        const singers = yield singer_model_1.default.find({});
        for (const song of songs) {
            const singer = singers.find(item => item._id == song.singerId);
            song.fullNameSinger = singer.fullName;
        }
        res.render("client/pages/topics/detail", { songs: songs, topic: topic });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
exports.detail = detail;
