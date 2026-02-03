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
    const modalGrade = document.getElementById('modalGrade');
    const modalTechStack = document.getElementById('modalTechStack');
    const closeBtn = document.querySelector('.modal-close');
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

        // Focus Trap Helper Function
    function getFocusableElements(container) {
        return Array.from(container.querySelectorAll('button, a[href], input, textarea, select, [tabindex]:not([tabindex="-1"])')).filter(el => !el.hidden && !el.disabled);
    }

    // Modal Focus Trap
    document.addEventListener('keydown', e => {
        if (modalBackdrop.hidden) return;
        if (e.key !== 'Tab') return;

        const focusableElements = getFocusableElements(modal);

        if (focusableElements.length === 0) {
            return;
        }
        if (focusableElements.length === 1) {
            e.preventDefault();
            focusableElements[0]?.focus();
            return;
        }
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
                modalLink.textContent = 'View Certificate';
                modalLink.hidden = false;
            }
            else {
                modalImage.hidden = true;
                modalLink.hidden = true;
            }

            if (data.type === 'education') {
                modalGrade.textContent = data.grade;
                modalGrade.hidden = false;

                if (data.link) {
                    modalLink.href = data.link;
                    modalLink.textContent = 'View Transcript';
                    modalLink.hidden = false;
                }
                else {
                    modalLink.hidden = true;
                }
            }
            else {
                modalGrade.hidden = true;
            }

            if (data.type === 'project') {
                modalLink.href = data.link;
                modalLink.textContent = 'View Project';
                modalLink.hidden = false;
                modalTechStack.innerHTML = '';

                if (Array.isArray(data.techStack)) {
                    data.techStack.forEach(tech => {
                        const li = document.createElement('li');
                        li.textContent = tech;
                        modalTechStack.appendChild(li);
                    });
                    modalTechStack.hidden = false;
                }
                else {
                    modalTechStack.hidden = true;
                }
            }

            modalBackdrop.hidden = false;
            modal.classList.remove('is-closing');
            modal.classList.add('is-opening');
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = '${scrollbarWidth}px';

            modal.addEventListener('animationend', () => {
                modal.classList.remove('is-opening');
                modal.classList.add('is-open');
            }, {
                once: true
            });

            const focusableElements = getFocusableElements(modal);

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
            document.body.style.paddingRight = '0';
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
        modalImage.src = '';
        modalLink.hidden = true;
        modalGrade.hidden = true;
        modalTechStack.hidden = true;
        modalTechStack.innerHTML = '';
    }

    // Theme Toggle Logic
    const themeToggle = document.getElementById('themeToggle');
    initThemeToggle(themeToggle);
    
    // Entry Animation Logic
    initEntryAnimations();
});