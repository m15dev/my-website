//Funtion that updates my left pannel buttons
function openTab(pageId, button) {

    // hides all pages fisrt
    const pages = document.querySelectorAll('.tab-content');
    pages.forEach(page => page.classList.remove('active')); 

    // Un-Activates the buttons  
    const buttons = document.querySelectorAll('.menu-pannel-button');
    buttons.forEach(btn => btn.classList.remove('selected'));

    // Changes to the selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // updates the button color
    if (button) {
        button.classList.add('selected');
    }
}