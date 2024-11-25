document.addEventListener("DOMContentLoaded", function() {
    const colorDeal = getComputedStyle(document.documentElement).getPropertyValue('--color-deal').trim();

    const listItems = document.querySelectorAll('article ul li');

    listItems.forEach(function(li) {
        const computedStyle = window.getComputedStyle(li, '::after');
        
        if (computedStyle.content !== 'none') {
            const paragraphs = li.querySelectorAll('p');
            if (paragraphs.length >= -10) {
                paragraphs[1].style.color = colorDeal;
            }
        }
    });
});
