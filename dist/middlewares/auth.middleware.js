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
exports.existsUserInfo = exports.existsTokenUser = exports.checkToken = void 0;
const account_model_1 = __importDefault(require("../models/account.model"));
const roles_model_1 = __importDefault(require("../models/roles.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const favorite_music_model_1 = __importDefault(require("../models/favorite-music.model"));
const checkToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.cookies.token) {
        res.redirect("/admin/auth/login");
        return;
    }
    const account = yield account_model_1.default.findOne({ deleted: false, token: req.cookies.token }).select("-password");
    if (!account) {
        res.redirect("/admin/auth/login");
        return;
    }
    res.locals.account = account;
    res.locals.role = yield roles_model_1.default.findOne({ _id: account.roleId, deleted: false });
    next();
});
exports.checkToken = checkToken;
const existsTokenUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.cookies.tokenUser) {
        const user = yield user_model_1.default.findOne({ deleted: false, status: "active", tokenUser: req.cookies.tokenUser }).select("-password");
        if (user) {
            const favorites = yield favorite_music_model_1.default.find({ userId: user.id });
            res.locals.favoritesLocal = favorites;
            res.locals.userInfo = user;
        }
    }
    next();
});
exports.existsTokenUser = existsTokenUser;
const existsUserInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (res.locals.userInfo) {
        next();
    }
    else {
        res.redirect("/login");
    }
});
exports.existsUserInfo = existsUserInfo;
