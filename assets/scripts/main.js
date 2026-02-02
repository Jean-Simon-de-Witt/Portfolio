import {initThemeToggle} from './theme.js';
import {initEntryAnimations} from './animations.js';
let lastFocusedElement = null;
document.addEventListener('DOMContentLoaded', () => {
    // Modal Variables
    const modalBackdrop = document.getElementById('modalBackdrop');
    const modal = modalBackdrop.querySelector('.modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const modalDate = document.getElementById('modalDate');
    const modalLink = document.getElementById('modalLink');
    const modalImage = document.getElementById('modalImage');
    const modalGrade= document.getElementById('modalGrade');
    const closeBtn = document.querySelector('.modal-close');
    // Modal Focus Trap
    document.addEventListener('keydown', e => {
        if (modalBackdrop.hidden) return;
        if (e.key !== 'Tab') return;

        const focusableElements = modal.querySelectorAll('button, a[href], input, textarea, select, [tabindex]:not([tabindex="-1"])');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        }
        else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    });

    // Modal Data and Logic
    let modalData = {};
    fetch('assets/data/content.json').then(response => response.json()).then(data => modalData = data).catch(err => console.error('Error loading modal data:', err));

    document.querySelectorAll('.item').forEach(item => {
        item.addEventListener('click', () => {
            const key = item.dataset.key;
            const data = modalData[key];
            if (!data) return;
            lastFocusedElement = document.activeElement;
            resetModal();
            modalTitle.textContent = data.title;
            modalDate.textContent = data.date || '';
            modalContent.textContent = data.content || '';

            if (data.type === 'certificate') {
                modalImage.src = data.image;
                modalImage.alt = "Certificate for " + data.title;
                modalImage.hidden = false;

                modalLink.href = data.link;
                modalLink.hidden = false;
            }
            else {
                modalImage.hidden = true;
                modalLink.hidden = true;
            }

            if (data.type === 'education') {
                modalGrade.textContent = data.grade;
                modalGrade.hidden = false;
            }
            else {
                modalGrade.hidden = true;
            }

            modalBackdrop.hidden = false;
            modal.classList.remove('is-closing');
            modal.classList.add('is-opening');
            document.body.style.overflow = 'hidden';

            modal.addEventListener('animationend', () => {
                modal.classList.remove('is-opening');
                modal.classList.add('is-open');
            }, {
                once: true
            });

            const focusableElements = modal.querySelectorAll('button, a[href], input, textarea, select, [tabindex]:not([tabindex="-1"])');

            if (focusableElements.length) {
                focusableElements[0].focus();
            }
        })
    });

    function closeModal() {
        modal.classList.remove('is-opening');
        modal.classList.add('is-closing');

        modal.addEventListener('animationend', () => {
            modal.classList.remove('is-closing', 'is-open');
            modalBackdrop.hidden = true;
            document.body.style.overflow = '';
            lastFocusedElement?.focus();
        }, {
            once: true
        });
    }

    closeBtn.addEventListener('click', closeModal);

    modalBackdrop.addEventListener('click', e => {
        if (e.target === modalBackdrop) {
            closeModal();
        }
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && !modalBackdrop.hidden) {
            closeModal();
        }
    });

    function resetModal() {
        modalImage.hidden = true;
        modalLink.hidden = true;
        modalGrade.hidden = true;
    }

    // Theme Toggle Logic
    const themeToggle = document.getElementById('themeToggle');
    initThemeToggle(themeToggle);
    
    // Entry Animation Logic
    initEntryAnimations();
});