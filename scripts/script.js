document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll("footer button");

    buttons.forEach(button => {
        button.addEventListener("click", (event) => {
            event.stopPropagation(); // Stop click propagation to avoid triggering outside clicks
            const parentLi = button.parentElement; // The <li> containing this button
            const isOpen = parentLi.hasAttribute("open");

            // Close all dropdowns
            document.querySelectorAll("footer li[open]").forEach(openLi => {
                openLi.removeAttribute("open");
            });

            // Toggle the current dropdown
            if (!isOpen) {
                parentLi.setAttribute("open", "");
            }
        });

    document.querySelector('button').addEventListener('click', function() {
            const svg = this.querySelector('svg');
            const dropdown = this.nextElementSibling;
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Toggle the aria-expanded state
            this.setAttribute('aria-expanded', !isExpanded);
        
            // Toggle the 'open' attribute to show/hide the dropdown
            if (isExpanded) {
                dropdown.parentElement.removeAttribute('open');
            } else {
                dropdown.parentElement.setAttribute('open', true);
            }
        
            // Rotate the arrow
            svg.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
        });
        
    });
});

// https://chatgpt.com/share/674f0567-8a58-800c-b5fa-a33e57e4d7dd

window.onscroll = function() {stickNav()};

var nav = document.querySelector('nav');
var sticky = nav.offsetTop;

function stickNav() {
  if (window.pageYOffset > sticky) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
}

document.querySelectorAll('.like-button').forEach((button) => {
    const outline = button.querySelector('.heart-outline');
    const filled = button.querySelector('.heart-filled');

    button.addEventListener('click', () => {
        
        if (filled.style.transform === 'scale(1)') {
            
            filled.style.animation = 'heart-shrink 0.4s ease-out forwards';

            filled.addEventListener('animationend', () => {
                filled.style.transform = 'scale(0)';
                filled.style.opacity = '0';
                filled.style.animation = ''; 
                outline.style.opacity = '1'; 
            });
        } else {
            
            filled.style.animation = 'heart-bounce 0.4s ease-out forwards';

            outline.style.opacity = '0';

            filled.addEventListener('animationend', () => {
                filled.style.transform = 'scale(1)';
                filled.style.opacity = '1';
                filled.style.animation = ''; 
            });
        }
    });
});

/*************/
/* Menu open */
/*************/

const menuToggle = document.querySelector('.menu-toggle');
const sideMenu = document.querySelector('#sideMenu');
const closeMenuButton = document.querySelector('.close-menu');

// Open the side menu
menuToggle.addEventListener('click', () => {
    sideMenu.classList.add('open');
});

// Close the side menu
closeMenuButton.addEventListener('click', () => {
    sideMenu.classList.remove('open');
});

// Optional: Close the menu when clicking outside of it
document.addEventListener('click', (event) => {
    if (!sideMenu.contains(event.target) && !menuToggle.contains(event.target)) {
        sideMenu.classList.remove('open');
    }
});