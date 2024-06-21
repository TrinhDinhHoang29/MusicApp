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
const topics_router_1 = __importDefault(require("./topics.router"));
const home_router_1 = __importDefault(require("./home.router"));
const songs_router_1 = __importDefault(require("./songs.router"));
const auth_router_1 = __importDefault(require("./auth.router"));
const profile_router_1 = __importDefault(require("./profile.router"));
const otp_router_1 = __importDefault(require("./otp.router"));
const search_router_1 = __importDefault(require("./search.router"));
const favorite_router_1 = __importDefault(require("./favorite.router"));
const authMiddleware = __importStar(require("../../middlewares/auth.middleware"));
exports.default = (app) => {
    app.use(authMiddleware.existsTokenUser);
    app.use("/home", home_router_1.default);
    app.use("/topics", topics_router_1.default);
    app.use("/songs", songs_router_1.default);
    app.use("/", auth_router_1.default);
    app.use("/profile", authMiddleware.existsUserInfo, profile_router_1.default);
    app.use("/otps", otp_router_1.default);
    app.use("/search", search_router_1.default);
    app.use("/favorites", authMiddleware.existsUserInfo, favorite_router_1.default);
};
