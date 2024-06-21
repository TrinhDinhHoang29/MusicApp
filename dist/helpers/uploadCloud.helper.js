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
exports.upload = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const streamifier_1 = __importDefault(require("streamifier"));
const cloudinary_config_1 = __importDefault(require("../config/cloudinary.config"));
(0, cloudinary_config_1.default)(cloudinary_1.default);
const streamUpload = (buffer) => {
    return new Promise((resolve, reject) => {
        let stream = cloudinary_1.default.v2.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
            if (result) {
                resolve(result);
            }
            else {
                reject(error);
            }
        });
        streamifier_1.default.createReadStream(buffer).pipe(stream);
    });
};
const upload = (buffer) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Bắt đầu upload...");
        let result = yield streamUpload(buffer);
        console.log("Kết quả upload:", result);
        return result["url"];
    }
    catch (error) {
        console.error("Lỗi upload:", error);
        throw error;
    }
});
exports.upload = upload;
