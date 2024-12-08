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

// https://chatgpt.com/share/674f0567-8a58-800c-b5fa-a33e57e4d7dd //

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

/****************/
/* Scroll wheel */
/****************/

// https://chatgpt.com/share/67532a38-8e00-800c-9ced-50a321bd1c3d //

// Select the container
const scrollContainer = document.querySelector('#detail section:first-of-type article:first-of-type');

// Add smooth scrolling behavior for the mouse wheel
scrollContainer.addEventListener('wheel', (e) => {
  e.preventDefault(); // Prevent default scroll behavior
  scrollContainer.scrollBy({
    left: e.deltaY > 0 ? window.innerWidth : -window.innerWidth, // Adjust scroll step based on screen width
    behavior: 'smooth',
  });
});

// Function to determine if an element is in view
const isInView = (element) => {
  const rect = element.getBoundingClientRect();
  return rect.left >= 0 && rect.right <= window.innerWidth;
};

// Ensure snapping to the nearest item after manual scroll and autoplay videos
scrollContainer.addEventListener('scroll', () => {
  clearTimeout(scrollContainer.snapTimeout); // Clear any previous timeout
  scrollContainer.snapTimeout = setTimeout(() => {
    const scrollPosition = scrollContainer.scrollLeft;
    const items = scrollContainer.querySelectorAll('img, video');
    let closestItem = null;
    let minDistance = Infinity;

    items.forEach((item) => {
      const itemPosition = item.offsetLeft;
      const distance = Math.abs(itemPosition - scrollPosition);

      // Check for the closest item
      if (distance < minDistance) {
        closestItem = item;
        minDistance = distance;
      }

      // Autoplay videos that are in view, pause others
      if (item.tagName === 'VIDEO') {
        if (isInView(item)) {
          item.play().catch((err) => console.warn('Video playback failed:', err));
        } else {
          item.pause();
        }
      }
    });

    // Snap to the closest item's position
    if (closestItem) {
      scrollContainer.scrollTo({
        left: closestItem.offsetLeft,
        behavior: 'smooth',
      });
    }
  }, 100); // Wait 100ms after scrolling to find the nearest snap point
});


const videos = scrollContainer.querySelectorAll('video');
videos.forEach((video) => {
  if (isInView(video)) {
    video.play().catch((err) => console.warn('Video playback failed:', err));
  } else {
    video.pause();
  }
});

/************************/
/* Scroll wheel counter */
/************************/

  const itemTracker = document.getElementById('item-tracker'); 
  const items = scrollContainer.querySelectorAll('img, video'); 
  const totalItems = items.length; 

  
  scrollContainer.addEventListener('wheel', (e) => {
    const containerScrollWidth = scrollContainer.scrollWidth;
    const containerWidth = scrollContainer.clientWidth;
    const scrollLeft = scrollContainer.scrollLeft;

  
    if ((e.deltaY > 0 && scrollLeft + containerWidth >= containerScrollWidth) || 
        (e.deltaY < 0 && scrollLeft <= 0)) {
      e.preventDefault(); 
    } else {
      scrollContainer.scrollBy({
        left: e.deltaY > 0 ? window.innerWidth : -window.innerWidth, 
        behavior: 'smooth',
      });
    }
  });

  const getVisibleItemIndex = () => {
    const containerRect = scrollContainer.getBoundingClientRect();
    let closestItemIndex = 0;
    let minDistance = Infinity;

    items.forEach((item, index) => {
      const itemRect = item.getBoundingClientRect();
      const itemCenter = itemRect.left + itemRect.width / 2;
      const containerCenter = containerRect.left + containerRect.width / 2;
      const distance = Math.abs(containerCenter - itemCenter);

      if (distance < minDistance) {
        closestItemIndex = index;
        minDistance = distance;
      }
    });

    return closestItemIndex;
  };

  
  const updateTracker = () => {
    const currentIndex = getVisibleItemIndex();
    itemTracker.textContent = `${currentIndex + 1}/${totalItems}`;
  };


  scrollContainer.addEventListener('scroll', () => {
    updateTracker();
  });

/**************/
/* Dropdown 2 */
/**************/

const toggleButtons = document.querySelectorAll('#detail section:nth-child(2) h2');
const sections = document.querySelectorAll('#detail section:nth-child(2) ul');

// Loop through each header and attach event listeners
toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
        const parentLi = button.closest('li');  // Find the closest li element
        const content = parentLi.querySelector('ul');  // Get the <ul> inside that <li>
        const buttonSvg = button.querySelector('svg');  // Get the <svg> inside the button

        // Toggle the 'open' attribute on the parent <li> to show/hide content
        parentLi.toggleAttribute('open');
        
        // Toggle the rotation of the button's SVG
        if (parentLi.hasAttribute('open')) {
            buttonSvg.style.transform = 'rotate(180deg)';
        } else {
            buttonSvg.style.transform = 'rotate(0deg)';
        }
    });
});


// Select all buttons and associated SVGs
const followButtons = document.querySelectorAll('#detail section:nth-child(2) ul button:last-child');

followButtons.forEach(button => {
  button.addEventListener('click', () => {
      if (button.classList.contains('following')) {
          // Toggle back to default state
          button.innerHTML = `
              Follow
              <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" class="zds-icon RC794g X9n9TI DlJ4rT _5Yd-hZ iXbgaG nXkCf3 DlJ4rT _9l1hln _65i7kZ QfLC_c Ik4W2Q" focusable="false" aria-hidden="true"><path d="M20.25 11.2h-7.5V3.7a.75.75 0 0 0-1.5 0v7.5h-7.5a.75.75 0 0 0 0 1.5h7.5v7.5a.75.75 0 0 0 1.5 0v-7.5h7.5a.75.75 0 0 0 0-1.5"
              </svg>`;
          button.classList.remove('following');
      } else {
          // Toggle to "Following" state
          button.innerHTML = `
              Following
              <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" class="zds-icon" focusable="false" aria-hidden="true">
                  <path d="M19.993 6.185a.75.75 0 0 1 .072 1.058L10.96 17.668a3.09 3.09 0 0 1-4.81-.194l-3-3.972a.75.75 0 1 1 1.198-.904l3.005 3.982a1.59 1.59 0 0 0 2.476.102l9.105-10.425a.75.75 0 0 1 1.058-.072"></path>
              </svg>`;
          button.classList.add('following');
      }
  });
});

/*****************/
/*   Dark Mode   */
/*****************/

const themes = {
  light: {
    "--color-text": "#1A1A1A",
    "--color-background": "white",
    "--color-deal": "#D9000C",
    "--color-bb": "rgb(239,239,240)",
    "--color-dark-mode": "rgb(0, 0, 0)",
    "--color-border": "#D9DADC",
    "--color-zalando": "#FF4C00",
    "--color-accent": "#D3F9E9",
    "--color-links": "#6328E0",
  },
  dark: {
    "--color-text": "#E0E0E0",
    "--color-background": "#121212",
    "--color-deal": "#FF6F61",  // Fixed the extra '#' symbol
    "--color-bb": "#2C2C2C",
    "--color-dark-mode": "#000000",
    "--color-border": "#444444",
    "--color-zalando": "#FF4C00",
    "--color-accent": "#005F4B",
    "--color-links": "#BB86FC",
  },
};

const systemTheme = () =>
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";  // Corrected the logic to match system theme properly

const getTheme = () => localStorage.getItem("theme") || systemTheme();

const setTheme = (t) => {
  localStorage.setItem("theme", t);
  for (const k in themes[t]) {
    document.documentElement.style.setProperty(k, themes[t][k]);
  }
};

// Set default theme on startup
setTheme(getTheme());

// Add event listener to toggle theme
const toggleThemeButton = document.getElementById("dark-mode-toggle");
toggleThemeButton.addEventListener("click", toggleTheme);

// Optional: Listen for system theme changes
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
  if (!localStorage.getItem("theme")) {
    setTheme(systemTheme());  // Automatically adjust if the system theme changes
  }
});

// Toggle between themes
const toggleTheme = () => {
  const newTheme = getTheme() === "dark" ? "light" : "dark";
  setTheme(newTheme);
};


//https://chatgpt.com/share/6755a40e-31b0-800c-99b8-c73cf63fb4c9 & https://www.reddit.com/r/webdev/comments/kfwydp/how_to_add_dark_mode_to_your_website_in_5_minutes/
