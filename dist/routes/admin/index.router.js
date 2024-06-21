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
const singer_router_1 = __importDefault(require("./singer.router"));
const songs_router_1 = __importDefault(require("./songs.router"));
const account_router_1 = __importDefault(require("./account.router"));
const auth_router_1 = __importDefault(require("./auth.router"));
const authMiddleware = __importStar(require("../../middlewares/auth.middleware"));
const profile_router_1 = __importDefault(require("./profile.router"));
const roles_router_1 = __importDefault(require("./roles.router"));
const otp_router_1 = __importDefault(require("./otp.router"));
const category_router_1 = __importDefault(require("./category.router"));
exports.default = (app) => {
    app.use("/admin/home", authMiddleware.checkToken, home_router_1.default);
    app.use("/admin/topics", authMiddleware.checkToken, topics_router_1.default);
    app.use("/admin/singers", authMiddleware.checkToken, singer_router_1.default);
    app.use("/admin/songs", authMiddleware.checkToken, songs_router_1.default);
    app.use("/admin/accounts", authMiddleware.checkToken, account_router_1.default);
    app.use("/admin/auth", auth_router_1.default);
    app.use("/admin/profile", authMiddleware.checkToken, profile_router_1.default);
    app.use("/admin/roles", authMiddleware.checkToken, roles_router_1.default);
    app.use("/admin/otps", authMiddleware.checkToken, otp_router_1.default);
    app.use("/admin/categorys", authMiddleware.checkToken, category_router_1.default);
};
