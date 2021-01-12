var angle = 0;function carrousel(sign){

    spinner=document.querySelector(".carrousel");
    
    if(!sign){angle = angle + 60}
    else{ 
    
    angle = angle - 60
    
    }
    
    spinner.setAttribute("style","transform:rotateY("+ angle +"deg);")}	