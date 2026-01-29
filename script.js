// Навигация
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });
    
    document.getElementById(sectionId).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Если открываем секцию таймера, обновляем его
    if (sectionId === 'countdown') {
        updateCountdown();
    }
}

// Точный таймер до 1 февраля 2026
function updateCountdown() {
    const now = new Date();
    let birthday = new Date(2026, 1, 1, 0, 0, 0); // Февраль = месяц 1 (0-январь, 1-февраль)
    
    // Если день рождения в этом году уже прошел, берем следующий год
    if (now > birthday) {
        birthday = new Date(now.getFullYear() + 1, 1, 1, 0, 0, 0);
    }
    
    const diff = birthday - now;
    
    if (diff <= 0) {
        // День рождения наступил!
        document.getElementById('days').textContent = '0';
        document.getElementById('hours').textContent = '0';
        document.getElementById('minutes').textContent = '0';
        document.getElementById('seconds').textContent = '0';
        
        document.getElementById('big-days').textContent = '0';
        document.getElementById('big-hours').textContent = '0';
        document.getElementById('big-minutes').textContent = '0';
        document.getElementById('big-seconds').textContent = '0';
        
        document.getElementById('countdown-text').textContent = 'С Днём Рождения, Кися! 🎂💖';
        return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    // Обновляем маленький таймер
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    
    // Обновляем большой таймер
    document.getElementById('big-days').textContent = days;
    document.getElementById('big-hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('big-minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('big-seconds').textContent = seconds.toString().padStart(2, '0');
    
    // Обновляем сообщение
    if (days === 0) {
        document.getElementById('countdown-text').textContent = 'Сегодня твой день рождения! 🎉🎂';
    } else if (days === 1) {
        document.getElementById('countdown-text').textContent = 'Завтра твой день рождения! Ура! 🎈';
    } else if (days <= 3) {
        document.getElementById('countdown-text').textContent = `Осталось всего ${days} дня до твоего дня рождения! 💗`;
    } else {
        document.getElementById('countdown-text').textContent = `Скоро начнётся самый волшебный день в году! 💖`;
    }
}

// Запускаем таймер каждую секунду
setInterval(updateCountdown, 1000);
updateCountdown();

// Открытие подарка
function openGift() {
    const giftBox = document.getElementById('gift-box');
    const giftLid = giftBox.querySelector('.gift-lid');
    const giftMessage = document.getElementById('gift-message');
    const surpriseText = document.getElementById('surprise-text');
    
    // Если подарок уже открыт
    if (giftLid.style.transform === 'rotateX(-180deg)') {
        return;
    }
    
    // Анимация открытия крышки
    giftLid.style.transform = 'rotateX(-180deg)';
    giftLid.style.transformOrigin = 'bottom';
    
    // Изменение сообщения
    giftMessage.innerHTML = '🎁 Подарок открыт! 🎁';
    giftMessage.style.color = '#ff1493';
    giftMessage.style.fontSize = '1.8rem';
    giftMessage.style.fontWeight = 'bold';
    
    // Показываем текст сюрприза через паузу
    setTimeout(() => {
        surpriseText.style.display = 'block';
        surpriseText.style.animation = 'fadeIn 1s ease-out';
    }, 800);
    
    // Создаем конфетти
    createConfetti();
}

// Создание конфетти
function createConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    const colors = ['#ff69b4', '#ffb6c1', '#ff1493', '#c71585', '#ffffff', '#ff4500'];
    
    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        
        // Случайные параметры
        const size = Math.random() * 10 + 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 1;
        const rotate = Math.random() * 360;
        
        // Стили
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.backgroundColor = color;
        confetti.style.left = `${left}%`;
        confetti.style.top = '-20px';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.transform = `rotate(${rotate}deg)`;
        confetti.style.opacity = Math.random() * 0.8 + 0.2;
        confetti.style.animation = `fall ${duration}s ease-in ${delay}s forwards`;
        
        // Добавляем в контейнер
        confettiContainer.appendChild(confetti);
        
        // Удаляем после анимации
        setTimeout(() => {
            confetti.remove();
        }, (duration + delay) * 1000);
    }
    
    // Добавляем анимацию падения в стили
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fall {
            0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Празднование дня рождения
function celebrateBirthday() {
    createConfetti();
    
    // Показываем сообщение
    setTimeout(() => {
        alert('🎉🎂 С Днём Рождения, моя Кися! 🎂🎉\n\nТы — самое прекрасное создание на свете!\n16 лет — это только начало твоей волшебной жизни!\nЯ люблю тебя бесконечно! 💗💖💕');
    }, 500);
    
    // Музыка (опционально - закомментировано, чтобы не раздражать)
    /*
    const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
    audio.volume = 0.3;
    audio.play().catch(e => console.log('Audio play failed:', e));
    */
}

// Модальное окно для воспоминаний
function addMemory() {
    document.getElementById('memoryModal').style.display = 'flex';
}

function closeMemoryModal() {
    document.getElementById('memoryModal').style.display = 'none';
}

function saveMemory() {
    const text = document.getElementById('memoryText').value.trim();
    if (text) {
        alert('💖 Воспоминание сохранено! 💖\n\n' + text);
        document.getElementById('memoryText').value = '';
        closeMemoryModal();
    } else {
        alert('Пожалуйста, напиши что-нибудь красивое о нас 😊');
    }
}

// Эффект появления при скролле (улучшенный)
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Скрыть навигацию при скролле вниз, показать при скролле вверх
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        document.querySelector('.navbar').style.transform = 'translateY(-100%)';
    } else {
        document.querySelector('.navbar').style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Автоматическое празднование в день рождения (1 февраля)
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date();
    if (today.getDate() === 1 && today.getMonth() === 1) { // Февраль = 1
        setTimeout(() => {
            celebrateBirthday();
            showSection('countdown');
        }, 2000);
    }
});

// Пасхалка: нажми на логотип 5 раз для конфетти
let clickCount = 0;
document.querySelector('.logo').addEventListener('click', function() {
    clickCount++;
    if (clickCount >= 5) {
        createConfetti();
        clickCount = 0;
        this.textContent = '💗 СПАСИБО! 💗';
        setTimeout(() => {
            this.textContent = '💗 01.02 💗';
        }, 2000);
    }
});