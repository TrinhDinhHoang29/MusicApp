"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.valiEdit = exports.valiCreate = void 0;
const valiCreate = (req, res, next) => {
    const { title, avatar, singerId, topicId, lyrics, audio, description, status, posision } = req.body;
    const trimmedTitle = title ? title.trim() : '';
    const trimmedAvatar = avatar ? avatar.trim() : '';
    const trimmedDescription = description ? description.trim() : '';
    const trimmedsingerId = singerId ? singerId.trim() : '';
    const trimmedtopicId = topicId ? topicId.trim() : '';
    const trimmedlyrics = lyrics ? lyrics.trim() : '';
    const trimmedaudio = audio ? audio.trim() : '';
    const trimmedStatus = status ? status.trim() : '';
    if (!trimmedaudio || !trimmedTitle || !trimmedAvatar || !trimmedDescription || !trimmedStatus || !trimmedsingerId || !trimmedtopicId || !trimmedlyrics) {
        req["flash"]('error', 'Vui lòng nhập đầy đủ thông tin !!');
        res.redirect('back');
        return;
    }
    next();
};
exports.valiCreate = valiCreate;
const valiEdit = (req, res, next) => {
    const { title, singerId, topicId, lyrics, description, status, posision } = req.body;
    const trimmedTitle = title ? title.trim() : '';
    const trimmedDescription = description ? description.trim() : '';
    const trimmedsingerId = singerId ? singerId.trim() : '';
    const trimmedtopicId = topicId ? topicId.trim() : '';
    const trimmedlyrics = lyrics ? lyrics.trim() : '';
    const trimmedStatus = status ? status.trim() : '';
    if (posision < 1 || !trimmedTitle || !trimmedDescription || !trimmedStatus || !trimmedsingerId || !trimmedtopicId || !trimmedlyrics) {
        req["flash"]('error', 'Vui lòng nhập đầy đủ thông tin !!');
        res.redirect('back');
        return;
    }
    next();
};
exports.valiEdit = valiEdit;
