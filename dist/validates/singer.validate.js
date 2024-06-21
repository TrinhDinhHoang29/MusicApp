"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.valiEdit = exports.valiCreate = void 0;
const valiCreate = (req, res, next) => {
    const { fullName, avatar, status } = req.body;
    const trimmedfullName = fullName ? fullName.trim() : '';
    const trimmedAvatar = avatar ? avatar.trim() : '';
    const trimmedStatus = status ? status.trim() : '';
    if (!trimmedfullName || !trimmedAvatar || !trimmedStatus) {
        req["flash"]('error', 'Vui lòng nhập đầy đủ thông tin !!');
        res.redirect('back');
        return;
    }
    next();
};
exports.valiCreate = valiCreate;
const valiEdit = (req, res, next) => {
    const { fullName, status } = req.body;
    const trimmedfullName = fullName ? fullName.trim() : '';
    const trimmedStatus = status ? status.trim() : '';
    if (!trimmedfullName || !trimmedStatus) {
        req["flash"]('error', 'Vui lòng nhập đầy đủ thông tin !!');
        res.redirect('back');
        return;
    }
    next();
};
exports.valiEdit = valiEdit;
