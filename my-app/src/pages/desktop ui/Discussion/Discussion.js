let flag1 = 0, flag2 = 0;
document.getElementsByClassName('reply-btn')[0].addEventListener('click', function() {
    window.location.href = 'Reply.html'; 
});
document.getElementsByClassName('vote-up')[0].addEventListener('click', function() {
    if(!flag1){
        this.classList.remove('unclicked'); 
        this.classList.add('clicked'); 
        document.getElementsByClassName('vote-down')[0].classList.remove('clicked');
        document.getElementsByClassName('vote-down')[0].classList.add('unclicked');
        flag2 = 0;
        flag1 = 1;
    }else{
        this.classList.remove('clicked'); 
        this.classList.add('unclicked'); 
        flag1 = 0;
    }
});
document.getElementsByClassName('vote-down')[0].addEventListener('click', function() {
    if(!flag2){
        this.classList.remove('unclicked'); 
        this.classList.add('clicked'); 
        document.getElementsByClassName('vote-up')[0].classList.remove('clicked');
        document.getElementsByClassName('vote-up')[0].classList.add('unclicked');
        flag1 = 0;
        flag2 = 1;
    }else{
        this.classList.remove('clicked'); 
        this.classList.add('unclicked'); 
        flag2 = 0;
    }
});
