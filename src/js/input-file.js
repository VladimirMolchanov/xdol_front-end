import $ from 'jquery';
$(function() {
    let fields = document.querySelectorAll('.field__file');
    Array.prototype.forEach.call(fields, function (input) {
        let label = input.nextElementSibling,
        labelVal = label.querySelector('.field__file-fake').innerText;
        input.addEventListener('click', function (e) {
            let label = $(this).next("label")
            if( label.hasClass('on') ) {
                e.preventDefault()
                label.innerText = labelVal;
                label.removeClass('on')
            }
        });    
        input.addEventListener('change', function (e) {
            let countFiles = '';
            if (this.files && this.files.length >= 1)
                countFiles = this.files.length;

            if (countFiles) {
                label.querySelector('.field__file-fake span').innerText = this.files[0].name;
                label.classList.add('on')
            } 
            else {
                label.querySelector('.field__file-fake span').innerText = labelVal;
                label.classList.remove('on')
            }
        });
    });
});