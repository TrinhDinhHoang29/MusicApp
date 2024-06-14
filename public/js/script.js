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