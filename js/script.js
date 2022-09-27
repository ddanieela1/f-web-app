const image_upload = document.querySelector('#image-upload');
let uploaded_image = "";

image_upload.addEventListener("change", function(){
    // console.log(image_input.value);
    const reader = new FileReader();
    reader.addEventListener("load", ()=>{
        uploaded_image = reader.result;
        document.querySelector("#display-image").style.backgroundImage = `url(${uploaded_image})`
    })
    reader.readAsDataURL(this.files[0]);
})