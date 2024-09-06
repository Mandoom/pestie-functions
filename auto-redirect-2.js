      // Function to check if a specific item exists in localStorage and is not empty
      function checkItemInLocalStorage(itemKey, redirectUrl) {
        const itemValue = localStorage.getItem(itemKey);
        if (!itemValue || itemValue.trim() === '') {
            console.log(`Item "${itemKey}" not found or is empty in localStorage. Redirecting to ${redirectUrl}`);
            document.write(''); // Prevent the rest of the page from rendering
            window.location.href = redirectUrl;
        } else {
            console.log(`Item "${itemKey}" found and is not empty in localStorage.`);
        }
    }

    // Consecutive calls to perform multiple checks
    checkItemInLocalStorage('selectedVariantOptions', '/');
    checkItemInLocalStorage('reasonsToBuy', '/customize/reason-to-buy');
    checkItemInLocalStorage('locationData', '/customize/location');
    checkItemInLocalStorage('locationData', '/customize/pests');


    ///////
    //////

    document.addEventListener('DOMContentLoaded', function() {
        const loader3 = document.querySelector('.loader3');
        const customURL = '/customize/review'; // Replace with your custom URL
    
        // Function to check if the loader3 is visible
        function isLoaderVisible() {
            const style = window.getComputedStyle(loader3);
            return style.display !== 'none';
        }
    
        // Function to handle redirection after loader3 becomes visible
        function handleLoaderVisibilityChange() {
            if (isLoaderVisible()) {
                console.log('Loader3 is now visible. Redirecting after 1 second...');
                setTimeout(function() {
                    window.location.href = customURL;
                }, 1300); // Wait 1 second before redirecting
            }
        }
    
        // Create a MutationObserver to watch for changes in the loader3's style attribute
        const observer = new MutationObserver(function(mutationsList) {
            for (let mutation of mutationsList) {
                if (mutation.attributeName === 'style') {
                    handleLoaderVisibilityChange();
                }
            }
        });
    
        // Start observing the loader3 element for changes in its attributes
        observer.observe(loader3, { attributes: true });
    
        // Initial check in case the loader is already visible when the page loads
        handleLoaderVisibilityChange();
    });