export function initEntryAnimations() {
    const observer = new IntersectionObserver(enteredElems => {
        enteredElems.forEach(enteredElem => {
            if (enteredElem.isIntersecting) {
                enteredElem.target.classList.add('is-visible');
                observer.unobserve(enteredElem.target);
            }
        });
    }, {
        threshold: 0.15
    });
    document.querySelectorAll('.reveal').forEach(elem => observer.observe(elem));
}