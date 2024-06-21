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
exports.suggestFindMusic = exports.index = void 0;
const song_model_1 = __importDefault(require("../../models/song.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const convertToSlug_helper_1 = __importDefault(require("../../helpers/convertToSlug.helper"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const keyword = req.query.keyword;
    const songs = yield song_model_1.default.find({ status: "active", deleted: false, slug: new RegExp((0, convertToSlug_helper_1.default)(keyword)) });
    res.render("client/pages/searchs/index", { songs: songs });
});
exports.index = index;
const suggestFindMusic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const keyWord = req.query.keyword;
    const singers = yield singer_model_1.default.find({});
    const songs = yield song_model_1.default.find({ slug: new RegExp((0, convertToSlug_helper_1.default)(keyWord)) }).select("title slug avatar singerId").lean().limit(6);
    songs.forEach(song => {
        const singer = singers.find(singer => singer._id == song.singerId);
        song.fullNameSinger = singer.fullName;
    });
    res.json({
        code: 200,
        data: songs
    });
});
exports.suggestFindMusic = suggestFindMusic;
