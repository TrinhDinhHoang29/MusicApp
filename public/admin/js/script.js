
//preview start ----------------------------------------
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
//preview end ------------------------------------------


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



//update status 
const buttonStatus = document.querySelectorAll(".button-status");
if(buttonStatus.length>0){
    buttonStatus.forEach(item=>{
        item.addEventListener("click",(e)=>{
            const id = item.getAttribute("data-update").split(" ")[0];
            const status = item.getAttribute("data-update").split(" ")[1];
            const option = {
                method:"PATCH"
            }
            const link = `/admin/topics/status/${id}/${status}`;
            fetch(link,option)
            .then(res=>res.json())
            .then(data=>{
                if(status === "active"){
                    item.setAttribute("data-update",`${id} inactive`)
                    item.classList.replace("bg-danger","bg-success");
                    item.innerHTML = "Đang hoạt động";
                }
                else{
                    item.setAttribute("data-update",`${id} active`)
                    item.classList.replace("bg-success","bg-danger");
                    item.innerHTML = "Dừng hoạt động";

                }
            });
        })
    })
}
// end update status


// delete topics
const buttonDelete = document.querySelectorAll(".btn-delete");
if(buttonDelete.length>0){
    buttonDelete.forEach(item=>{
        item.addEventListener("click",()=>{
            if (window.confirm("Bạn có chất muốn xoá !!")){
                const id = item.getAttribute("data-update");
                const link = `/admin/topics/deleted/${id}/true`;
                fetch(link,{
                    method:"PATCH"
                })
                .then(res=>res.json())
                .then(data=>{
                    if(data.code===200){
                        const trElement = item.closest("tr");
                        trElement.remove();
                    }             
                });
            }
        })
    })
}

// end delete topics


// Tạo thông báo khi cập nhật ở client
// function message(type,time,text){
//     const div = document.createElement('div');
//     div.classList.add(`${type}`);
//     div.classList.add("info");
//     div.classList.add("my-3");
//     div.innerHTML=`<div class="alert alert-${type}" show-alert data-time=${time}> ${text} </div>`;
//     const wrapper = document.querySelector("#wrapper");
//     wrapper.insertBefore(div,wrapper.firstChild);
// }



// end  Tạo thông báo khi cập nhật ở client