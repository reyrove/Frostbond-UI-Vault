document.addEventListener('DOMContentLoaded', () => {

    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    
    const toggleMenu = () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        navLinks.classList.toggle('show');
    
        document.body.style.overflow = isExpanded ? '' : 'hidden';
    };
    
    menuToggle.addEventListener('click', toggleMenu);
    
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('show') && 
            !e.target.closest('#nav-links') && 
            e.target !== menuToggle) {
            toggleMenu();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('show')) {
            toggleMenu();
            menuToggle.focus();
        }
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {

                if (navLinks.classList.contains('show')) {
                    toggleMenu();
                }
                
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                history.pushState(null, null, targetId);
            }
        });
    });
    
    if ('loading' in HTMLImageElement.prototype) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
     
        const lazyLoad = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    lazyLoad.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            lazyLoad.observe(img);
        });
    }
    
    document.addEventListener('keyup', (e) => {
        if (e.key === 'Tab') {
            document.documentElement.classList.add('keyboard-focus');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.documentElement.classList.remove('keyboard-focus');
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const backToTopButton = document.getElementById('backToTop');
  
    window.onscroll = function () {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopButton.style.display = "block";
      } else {
        backToTopButton.style.display = "none";
      }
    };
  
    backToTopButton.onclick = function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  });
  
