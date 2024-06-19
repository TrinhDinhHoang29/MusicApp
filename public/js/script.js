// show alert -----------------------
const showAlert = document.querySelector("[show-alert]");
if(showAlert){
    const dataTime =parseInt( showAlert.getAttribute("data-time"));
    setTimeout(()=>{
        showAlert.classList.add("alert-hidden");
   },dataTime);
   setTimeout(()=>{
    document.querySelector(".messages").remove();
},dataTime+2000);
}
//end alert--------------------------


//aplayer
const dataSongJson  = document.querySelector("[data-song]");
if(dataSongJson){
    const dataSong = JSON.parse(dataSongJson.getAttribute("data-song"));
    const ap = new APlayer({
        container: document.getElementById('aplayer'),
        theme: '#e9e9e9',
        audio: [{
            name: dataSong.title,
            artist: dataSong.fullNameSinger,
            url: dataSong.audio,
            cover: dataSong.avatar
        }]
    });

}


//end aplayer

//preview img start ----------------------------------------
const uploadImages = document.querySelector("[upload-image]");
if(uploadImages){
    const uploadImagesInput = document.querySelector("[upload-image-input]");
    const uploadImagesPreview = document.querySelector("[upload-image-preview]");
    if(uploadImagesInput){
        uploadImagesInput.addEventListener("change",(e)=>{
            const files = e.target.files[0];
            uploadImagesPreview.src = URL.createObjectURL(files);
        })
    }
}
//preview img end ------------------------------------------


//preview img start ----------------------------------------
const uploadAudio = document.querySelector("[upload-audio]");
if(uploadAudio){
    const uploadAudiosInput = document.querySelector("[upload-audio-input]");
    const uploadAudioPreview = document.querySelector("[upload-audio-preview]");
    if(uploadAudiosInput){
        uploadAudiosInput.addEventListener("change",(e)=>{
            const files = e.target.files[0];
            uploadAudioPreview.src = URL.createObjectURL(files);
        })
    }
}
//preview img end ------------------------------------------

//close img  start ------------------------
const closeImage = document.querySelector("[close-image-upload]");
if(closeImage){
    closeImage.addEventListener("click",()=>{
        const uploadImagesInput = document.querySelector("[upload-image-input]");
        const uploadImagesPreview = document.querySelector("[upload-image-preview]");
        if(uploadImagesInput.value){
            uploadImagesInput.value="";
            uploadImagesPreview.src="";
        }
    })
}
//close img end ---------------------------

//send otp 
const funcSendOtp = (url,option)=>{
    fetch(url,option)
    .then(res=>res.json())
    .then(data=>{
        const mess = document.querySelector("[message-otp]")
        const label = mess.querySelector("label");
        if(data.code==200){
            label.textContent = "Đã gửi otp thành công";
        }else{
            label.textContent = "Không gửi otp được";
        }
    })
}
const sendOtp = document.querySelector("[send-otp-client]");
if(sendOtp){
    sendOtp.addEventListener("click",()=>{
        const option = {
            method:"POST"
        }
        funcSendOtp("/otps/create",option);
    })
}

const sendOtpForgotPassword = document.querySelector("[send-otp-forgot-password]");
if(sendOtpForgotPassword){
    sendOtpForgotPassword.addEventListener("click",()=>{
        const email = document.querySelector("[email-forgot-password]").value;
        const option = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify({
                email:email
              })
            
        }
        funcSendOtp("/otps/create-forgot-password",option);
    })
}

//end send otp