/// page initialization check for redirect


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


////
////


document.addEventListener('DOMContentLoaded', function() {
    const zipCode = localStorage.getItem('zipCode');
    const zipCodeElement = document.getElementById('loading-zip-value');
    const loader3 = document.querySelector('.loader3');
    const validURL = '/customize/pests'; // URL if the ZIP code is valid
    const invalidURL = '/customize/error'; // URL if the ZIP code is invalid

    // Show the ZIP code in the element regardless of validity
    zipCodeElement.innerText = zipCode || 'No ZIP code found.';

    if (zipCode) {
        // Fetch the data from the Zippopotam.us API
        fetch(`https://api.zippopotam.us/us/${zipCode}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Invalid ZIP code');
                }
            })
            .then(data => {
                const placeData = data.places[0];
                const locationData = {
                    city: placeData['place name'],
                    stateAbbreviation: placeData['state abbreviation'],
                    stateFullName: placeData['state']
                };
                localStorage.setItem('locationData', JSON.stringify(locationData));
                console.log('Location data stored:', locationData);

                // If the ZIP code is valid, proceed with the redirection logic
                startLoaderObserver(validURL);
            })
            .catch(error => {
                const errorMessage = 'The ZIP code is not valid.';
                localStorage.setItem('locationData', JSON.stringify({ error: errorMessage }));
                console.error(errorMessage);

                // If the ZIP code is invalid, redirect to the invalid URL
                startLoaderObserver(invalidURL);
            });
    } else {
        console.log('No ZIP code found in local storage.');
        zipCodeElement.innerText = 'No ZIP code found.';
        startLoaderObserver(invalidURL);
    }

    function startLoaderObserver(redirectURL) {
        // Function to check if the loader3 is visible
        function isLoaderVisible() {
            const style = window.getComputedStyle(loader3);
            return style.display !== 'none';
        }

        // Function to handle redirection after loader3 becomes visible
        function handleLoaderVisibilityChange() {
            if (isLoaderVisible()) {
                console.log('Loader3 is now visible. Redirecting after 1.3 seconds...');
                setTimeout(function() {
                    window.location.href = redirectURL;
                }, 1300); // Wait 1.3 seconds before redirecting
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
    }
});
