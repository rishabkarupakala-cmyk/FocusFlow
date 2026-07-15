import { getDailyQuote } from "../utils/quotes";

function typeWriter(
    element: HTMLElement,
    text: string,
    speed = 35
) {

    element.textContent = "";

    let index = 0;

    const interval = setInterval(() => {

        element.textContent += text[index];

        index++;

        if (index >= text.length) {

            clearInterval(interval);

        }

    }, speed);

}

export function renderQuote(): void {

    const quote = getDailyQuote();

    const quoteText =
        document.getElementById("quote-text");

    const quoteAuthor =
        document.getElementById("quote-author");

    const card =
        document.querySelector(".quote-card");

    if (
        !(quoteText instanceof HTMLElement) ||
        !(quoteAuthor instanceof HTMLElement)
    ) return;

    typeWriter(
        quoteText,
        `"${quote.text}"`,
        28
    );

    quoteAuthor.textContent = "";

    setTimeout(() => {

        quoteAuthor.textContent =
            `— ${quote.author}`;

    }, quote.text.length * 28 + 250);

    card?.classList.add("quote-show");

}