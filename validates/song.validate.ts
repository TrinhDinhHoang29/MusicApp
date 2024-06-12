import { Request,Response,NextFunction } from "express";


export const valiCreate = (req:Request,res:Response,next:NextFunction):void=>{

    const {title,avatar,singerId,topicId,lyrics,audio,description,status,posision} = req.body;
    const trimmedTitle = title ? title.trim() : '';
    const trimmedAvatar = avatar ? avatar.trim() : '';
    const trimmedDescription = description ? description.trim() : '';
    const trimmedsingerId= singerId ? singerId.trim() : '';
    const trimmedtopicId = topicId ? topicId.trim() : '';
    const trimmedlyrics = lyrics ? lyrics.trim() : '';
    const trimmedaudio = audio ? audio.trim() : '';
    const trimmedStatus = status ? status.trim() : '';

    if (!trimmedaudio||!trimmedTitle || !trimmedAvatar || !trimmedDescription || !trimmedStatus || !trimmedsingerId || !trimmedtopicId || !trimmedlyrics) {
        req["flash"]('error', 'Vui lòng nhập đầy đủ thông tin !!');
        res.redirect('back');
        return;
    }
    next();
}

export const valiEdit = (req:Request,res:Response,next:NextFunction):void=>{

    const {title,singerId,topicId,lyrics,description,status,posision} = req.body;
    const trimmedTitle = title ? title.trim() : '';
    const trimmedDescription = description ? description.trim() : '';
    const trimmedsingerId= singerId ? singerId.trim() : '';
    const trimmedtopicId = topicId ? topicId.trim() : '';
    const trimmedlyrics = lyrics ? lyrics.trim() : '';
    const trimmedStatus = status ? status.trim() : '';
     
    if (posision<1||!trimmedTitle || !trimmedDescription || !trimmedStatus || !trimmedsingerId || !trimmedtopicId || !trimmedlyrics) {
        req["flash"]('error', 'Vui lòng nhập đầy đủ thông tin !!');
        res.redirect('back');
        return;
    }
    next();
}

