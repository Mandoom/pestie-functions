//check for reason to buy in local storage
// place on top of head to "prevent" page load


 // Function to check if a specific item exists in localStorage
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


//  zip format validation and vsual cues

document.addEventListener('DOMContentLoaded', function() {
    const primaryBtn = document.getElementById('primary-btn');
    const zipCodeInput = document.getElementById('zip-code-field');
    const formGroup = document.querySelector('.zip-code');
    const errorMessage = document.getElementById('error-message-location');
    const errorClass = 'zip-error-active';

    // Function to validate ZIP code
    function isValidZipCode(zip) {
        return /^\d{5}$/.test(zip);
    }

    // Function to handle ZIP code validation
    function handleZipValidation() {
        const zipCode = zipCodeInput.value.trim();
        
        if (!isValidZipCode(zipCode)) {
            // Add error class if the ZIP code is not valid
            formGroup.classList.add(errorClass);
            errorMessage.style.display = 'block';
            return false;
        } else {
            // Remove error class and store the ZIP code in localStorage
            formGroup.classList.remove(errorClass);
            errorMessage.style.display = 'none';
            localStorage.setItem('zipCode', zipCode);
            return true;
        }
    }

    // Load the ZIP code from localStorage if available
    const storedZipCode = localStorage.getItem('zipCode');
    if (storedZipCode) {
        zipCodeInput.value = storedZipCode;
    }

    // Event listener for primary button click
    primaryBtn.addEventListener('click', function(event) {
        if (!handleZipValidation()) {
            // Prevent navigation and stop any Webflow interactions if ZIP code is not valid
            event.preventDefault();
            event.stopImmediatePropagation(); // Stops other click events, including Webflow interactions
        }
    });

    // Add an event listener to the input field to detect Enter key press
    zipCodeInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent the default behavior (form submission)
            if (handleZipValidation()) {
                primaryBtn.click(); // Simulate click on primaryBtn if validation passes
            }
        }
    });

    // Existing logic for setting the href of primaryBtn based on localStorage
    const reasonsToBuy = JSON.parse(localStorage.getItem('reasonsToBuy')) || [];
    const hasActiveProblem = reasonsToBuy.includes('active-problem');
    primaryBtn.href = hasActiveProblem ? '/customize/loading-1' : '/checkout';
});



