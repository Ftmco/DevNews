export default function (className: string) {
    const slider: any = document.querySelector(className);
    let isDown = false;
    let startx: number;
    let scrollLeft: number;

    slider.addEventListener('mousedown', (e: any) => {
        isDown = true;
        slider.classList.add('active');
        startx = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('mousemove', (e: any) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startx) * 3;
        slider.scrollLeft = scrollLeft - walk;
    });
}