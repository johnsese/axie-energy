/**
 * Show notification
 * 
 * @param string message
 * @param string type
 * @param string position
 * @param boolean autoHide
 * @param int autoHideDelay
 */
function notification(message, type, position, autoHide, autoHideDelay) {
    position = position || 'bottom right';
    autoHide = autoHide || true;
    autoHideDelay = autoHideDelay || 2000;
    $.notify(message, {
        autoHide: autoHide,
        autoHideDelay: autoHideDelay,
        className: type,
        position: position
    });
}

/**
 * Show confirmation message
 * 
 * @param string title 
 * @param string text 
 * @param string iconHTML 
 * @param object customClass 
 * @param boolean showCancelButton 
 * @param string confirmButtonText 
 * @param string cancelButtonText 
 * 
 * @returns object
 */
function confirmation(title, text, iconHTML, customClass, confirmButtonText, showCancelButton, cancelButtonText) {
    title = title || 'Are you sure?';
    text = text || 'You won\'t be able to revert this!';
    iconHTML = iconHTML || undefined;
    customClass = customClass || undefined;
    confirmButtonText = confirmButtonText || 'Yes';
    showCancelButton = showCancelButton || true;
    cancelButtonText = cancelButtonText || 'No';

    return Swal.fire({
        title: title,
        text: text,
        iconHtml: iconHTML,
        customClass: customClass,
        showCancelButton: showCancelButton,
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#c82333',
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText
    });
}