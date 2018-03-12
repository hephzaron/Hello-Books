import $ from 'jquery';

/**
 * Handles dropdown toggle
 * @function toggleDropdown
 * @param { string } dropdownToggleClass- Class or id of dropdown initiator
 * @param { string } dropdownMenuClass- Class or id of dropdownMenu
 * @return { null }
 */

export const toggleDropdown = (dropdownToggleClass, dropdownMenuClass) => {
    $(dropdownToggleClass).click(() => {
        $(dropdownMenuClass).toggle()
    });
    $(document).click((event) => {
        let target = $(event.target);
        if (!target.is(dropdownToggleClass) && !target.is(dropdownMenuClass)) {
            $(dropdownMenuClass).hide()
        }
    });
}

/**
 * Handles class toggle for single and double element
 * @function toggleClass
 * @param { object } options- class names and type of toggle required
 * @return { null }
 */
export const toggleElementClass = (options) => {

    const {
        toggleType,
        elementClass,
        previous,
        next,
        toggledClass
    } = options;

    switch (toggleType) {
        case 'single':
            $(elementClass).click(() => {
                if ($(elementClass).hasClass(toggledClass)) {
                    $(elementClass).removeClass(toggledClass)
                } else {
                    $(elementClass).addClass(toggledClass)
                }
            });
            break;
        case 'double':
            $(previous).click(() => {
                if ($(next).hasClass(toggledClass) && !$(previous).hasClass(toggledClass)) {
                    $(next).removeClass(toggledClass);
                    $(previous).addClass(toggledClass)
                }
            });

            $(next).click(() => {
                if ($(previous).hasClass(toggledClass) && !$(next).hasClass(toggledClass)) {
                    $(previous).removeClass(toggledClass);
                    $(next).addClass(toggledClass)
                }
            });
            break;
        default:
            null
    }


}