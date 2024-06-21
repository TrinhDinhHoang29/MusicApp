"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const random_token_1 = __importDefault(require("random-token"));
const randomOTP = random_token_1.default.create('abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
const OTPSchema = new mongoose_1.default.Schema({
    email: String,
    expireAt: {
        type: Date,
        expires: 180
    },
    otp: {
        type: String,
        default: randomOTP(5)
    }
}, {
    timestamps: true
});
const OTP = mongoose_1.default.model("OTP", OTPSchema, "otp");
exports.default = OTP;
