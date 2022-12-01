const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {

    // add defferedPrompt to window and store the event in it
    window.deferredPrompt = event;

    // Show the install button
    butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {

    // Get the defferedPrompt set from the beforeinstallprompt event
    const promptEvent = window.deferredPrompt;

    // Check if there is an event stored
    if (!promptEvent) {
        return;
    }

    // Prompt now
    promptEvent.prompt();

    // Set the defferedPrmompt back to null now that we prompted
    window.deferredPrompt = null;

    // Hide the install button
    butInstall.classList.toggle('hidden', true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {

    // App is installed and we can set the deferredPrompt back to null
    window.deferredPrompt = null;
});
