// Proje kartları için tıklama işlevselliği
document.addEventListener('DOMContentLoaded', function() {
  const projectCards = document.querySelectorAll('.project-card');
  const overlay = document.createElement('div');
  overlay.className = 'project-overlay';
  document.body.appendChild(overlay);

  projectCards.forEach(card => {
    card.addEventListener('click', function(e) {
      if (window.matchMedia('(hover: none)').matches) {
        e.preventDefault();
        
        // Diğer açık kartları kapat
        projectCards.forEach(otherCard => {
          if (otherCard !== card) {
            otherCard.classList.remove('active');
          }
        });

        // Tıklanan kartı aç/kapat
        card.classList.toggle('active');
        
        // Overlay'i göster/gizle
        if (card.classList.contains('active')) {
          overlay.classList.add('show');
        } else {
          overlay.classList.remove('show');
        }
      }
    });
  });

  // Proje bilgisi modalına tıklandığında kapat
  document.querySelectorAll('.project-info').forEach(info => {
    info.addEventListener('click', function(e) {
      if (window.matchMedia('(hover: none)').matches) {
        e.stopPropagation();
        const card = this.closest('.project-card');
        if (card) {
          card.classList.remove('active');
          overlay.classList.remove('show');
        }
      }
    });
  });

  // Overlay'e tıklandığında aktif kartı kapat
  overlay.addEventListener('click', function() {
    const activeCard = document.querySelector('.project-card.active');
    if (activeCard) {
      activeCard.classList.remove('active');
      this.classList.remove('show');
    }
  });
}); 