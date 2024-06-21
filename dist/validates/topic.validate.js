"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.valiEdit = exports.valiCreate = void 0;
const valiCreate = (req, res, next) => {
    const { title, avatar, description, status } = req.body;
    const trimmedTitle = title ? title.trim() : '';
    const trimmedAvatar = avatar ? avatar.trim() : '';
    const trimmedDescription = description ? description.trim() : '';
    const trimmedStatus = status ? status.trim() : '';
    if (!trimmedTitle || !trimmedAvatar || !trimmedDescription || !trimmedStatus) {
        req["flash"]('error', 'Vui lòng nhập đầy đủ thông tin !!');
        res.redirect('back');
        return;
    }
    next();
};
exports.valiCreate = valiCreate;
const valiEdit = (req, res, next) => {
    const { title, avatar, description, status } = req.body;
    const trimmedTitle = title ? title.trim() : '';
    const trimmedDescription = description ? description.trim() : '';
    const trimmedStatus = status ? status.trim() : '';
    if (!trimmedTitle || !trimmedDescription || !trimmedStatus) {
        req["flash"]('error', 'Vui lòng nhập đầy đủ thông tin !!');
        res.redirect('back');
        return;
    }
    next();
};
exports.valiEdit = valiEdit;
