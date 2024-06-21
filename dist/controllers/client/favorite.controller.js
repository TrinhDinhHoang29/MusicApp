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
exports.create = exports.index = void 0;
const song_model_1 = __importDefault(require("../../models/song.model"));
const favorite_music_model_1 = __importDefault(require("../../models/favorite-music.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mySongFavorites = yield favorite_music_model_1.default.find({ userId: res.locals.userInfo.id })
        .select("-_id -userId -createdAt -updatedAt -__v");
    const formatMySongFavorites = mySongFavorites.map(item => item.songId);
    const songs = yield song_model_1.default.find({
        _id: {
            $in: formatMySongFavorites
        }
    });
    res.render("client/pages/favorites/index", { songs: songs });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idSong = req.params.idSong;
        const idUser = res.locals.userInfo.id;
        const favorite = yield favorite_music_model_1.default.findOne({
            userId: idUser,
            songId: idSong
        });
        if (favorite) {
            yield favorite_music_model_1.default.deleteOne({
                userId: idUser,
                songId: idSong
            });
            res.json({
                code: 200,
                idSong: idSong,
                type: "Delete favorite"
            });
        }
        else {
            const favorite = new favorite_music_model_1.default({
                userId: idUser,
                songId: idSong
            });
            yield favorite.save();
            res.json({
                code: 200,
                idSong: idSong,
                type: "add favorite"
            });
        }
    }
    catch (error) {
        console.error(error);
        res.json({
            code: 404
        });
    }
});
exports.create = create;
