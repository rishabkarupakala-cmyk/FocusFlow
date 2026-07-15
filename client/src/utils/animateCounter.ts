export function animateCounter(

    element: HTMLElement,

    target: number,

    suffix = ""

): void {

    const duration = 1000;

    const start = 0;

    const increment = target / (duration / 16);

    let current = start;

    const timer = setInterval(() => {

        current += increment;

        if (current >= target) {

            current = target;

            clearInterval(timer);

        }

        element.textContent =
            `${Math.round(current)}${suffix}`;

    }, 16);

}