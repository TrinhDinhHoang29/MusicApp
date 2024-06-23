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
exports.views = exports.like = exports.detail = exports.index = void 0;
const song_model_1 = __importDefault(require("../../models/song.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slug = req.params["slug"];
        const song = yield song_model_1.default.findOne({ slug: slug }).lean();
        const singer = yield singer_model_1.default.findOne({ _id: song.singerId }).select("fullName");
        song.fullNameSinger = singer.fullName;
        res.render("client/pages/songs/index", { song: song });
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
        const song = yield song_model_1.default.findOne({ slug: slug }).lean();
        const singer = yield singer_model_1.default.findOne({ _id: song.singerId }).select("fullName");
        const dataTime = new Date(song.createdAt);
        song.dateTime = `${dataTime.getDay()}/${dataTime.getMonth()}/${dataTime.getFullYear()}`;
        song.fullNameSinger = singer.fullName;
        res.render("client/pages/songs/index", { song: song });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
exports.detail = detail;
const like = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idSong = req.params.idSong;
        const idUser = res.locals.userInfo.id;
        const song = yield song_model_1.default.findOne({
            _id: idSong,
            like: {
                $in: idUser
            }
        });
        if (song) {
            const songUpdated = yield song_model_1.default.findOneAndUpdate({
                _id: idSong
            }, {
                $pull: {
                    like: idUser
                }
            }, {
                new: true
            });
            res.json({
                code: 200,
                data: {
                    id: idSong,
                    like: songUpdated.like
                },
                type: "Cancel"
            });
            console.log(songUpdated);
        }
        else {
            const songUpdated = yield song_model_1.default.findOneAndUpdate({
                _id: idSong
            }, {
                $push: {
                    like: idUser
                }
            }, {
                new: true
            });
            res.json({
                code: 200,
                data: {
                    id: idSong,
                    like: songUpdated.like
                },
                type: "Like"
            });
            console.log(songUpdated);
        }
    }
    catch (error) {
        console.error(error);
        res.json({
            code: 404
        });
    }
});
exports.like = like;
const views = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slug = req.params.slug;
        const songViews = yield song_model_1.default.findOne({ slug: slug }).select("views");
        const views = songViews.views + 1;
        const songUpdate = yield song_model_1.default.findOneAndUpdate({
            slug: slug
        }, {
            views: views
        }, {
            new: true
        });
        res.json({
            code: 200,
            views: songUpdate.views
        });
    }
    catch (error) {
        res.json({
            code: 404,
            mess: "Update error"
        });
    }
});
exports.views = views;
