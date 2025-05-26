// Proje kartları için tıklama işlevselliği
document.addEventListener('DOMContentLoaded', function() {
  const projectCards = document.querySelectorAll('.project-card');
  let activePopup = null;
  let popupTimer = null;
  
  // Overlay oluştur
  const overlay = document.createElement('div');
  overlay.className = 'project-overlay';
  document.body.appendChild(overlay);

  // Scroll progress göstergesi oluştur
  const scrollProgress = document.createElement('div');
  scrollProgress.className = 'scroll-progress';
  document.body.appendChild(scrollProgress);

  function closePopup(popup) {
    if (popup) {
      popup.classList.remove('show');
      overlay.classList.remove('show');
      setTimeout(() => {
        popup.style.display = 'none';
        overlay.style.display = 'none';
      }, 200);
    }
    activePopup = null;
    if (popupTimer) {
      clearTimeout(popupTimer);
      popupTimer = null;
    }
  }

  function showPopup(popup) {
    // Eğer aynı popup zaten açıksa, işlem yapma
    if (activePopup === popup) {
      return;
    }

    // Önce diğer açık popup'ları kapat
    if (activePopup) {
      closePopup(activePopup);
    }

    // Yeni popup'ı göster
    popup.style.display = 'block';
    overlay.style.display = 'block';
    
    // Kısa bir gecikme ile göster
    setTimeout(() => {
      popup.classList.add('show');
      overlay.classList.add('show');
    }, 10);

    activePopup = popup;

    // Önceki zamanlayıcıyı temizle
    if (popupTimer) {
      clearTimeout(popupTimer);
    }

    // 15 saniye sonra popup'ı kapatmak için zamanlayıcı ayarla
    popupTimer = setTimeout(() => {
      closePopup(popup);
    }, 15000);
  }

  projectCards.forEach(card => {
    const popup = card.querySelector('.project-info');
    
    // Kart tıklaması
    card.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      if (popup.classList.contains('show')) {
        closePopup(popup);
      } else {
        showPopup(popup);
      }
    });

    // Popup içindeki linkler için event listener
    const links = popup.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    });

    // Popup içine tıklandığında kapanmasını engelle ve zamanlayıcıyı sıfırla
    popup.addEventListener('click', function(e) {
      e.stopPropagation();
      if (popupTimer) {
        clearTimeout(popupTimer);
        popupTimer = setTimeout(() => {
          closePopup(popup);
        }, 15000);
      }
    });
  });

  // Overlay'e tıklandığında açık popup'ı kapat
  overlay.addEventListener('click', function() {
    if (activePopup) {
      closePopup(activePopup);
    }
  });

  // ESC tuşuna basıldığında açık popup'ı kapat
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && activePopup) {
      closePopup(activePopup);
    }
  });

  // Scroll progress göstergesi
  const appContent = document.querySelector('.app-content');
  appContent.addEventListener('scroll', () => {
    const scrollPercentage = (appContent.scrollTop / (appContent.scrollHeight - appContent.clientHeight)) * 100;
    scrollProgress.style.transform = `scaleX(${scrollPercentage / 100})`;
  });
}); 