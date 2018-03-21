let step = 200;
let scrolling = false;


export function moveLeft(leftClickElement, content) {

    $(leftClickElement).on("mousedown", () => {
        $(content).animate({
            scrollLeft: `-=${step}px`
        });
    }).on("mouseover", () => {
        scrolling = true;
        scrollContent("left", content)
    }).on("mouseout", () => {
        scrolling = false
    });
}

export function moveRight(rightClickElement, content) {

    $(rightClickElement).on("mousedown", () => {
        $(content).animate({
            scrollLeft: `+=${step}px`
        });
    }).on("mouseover", () => {
        scrolling = true;
        scrollContent("right", content)
    }).on("mouseout", () => {
        scrolling = false
    });
}


function scrollContent(direction, content) {
    let offset = (direction === "left" ? "-=5px" : "+=5px");
    $(content).animate({
        scrollLeft: offset
    }, 1, () => {
        if (scrolling) {
            scrollContent(direction);
        }
    });
}