


document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded and parsed');

    // Define constants for the text values based on home size selection
    const REGULAR_TEXTS = {
        prepayTitle: "Smart Pest Plan - Prepay and save",
        autorenewTitle: "Smart Pest Plan - Prepay and save",
        oneTimeTitle: "One time purchase",
        prepaySalePrice: "X",
        autorenewSalePrice: "X",
        oneTimePrice: "X",
        houseSizeQuestion: "bigger"
    };

    const XL_TEXTS = {
        prepayTitle: "Smart Pest Plan XL - Prepay and save",
        autorenewTitle: "Smart Pest Plan XL",
        oneTimeTitle: "One time purchase XL",
        prepaySalePrice: "Y",
        autorenewSalePrice: "Y",
        oneTimePrice: "Y",
        houseSizeQuestion: "smaller"
    };

    // Initialize the selectedVariantOptions array with default values
    let selectedVariantOptions = [
        { size: "regular", plan: "yearly" }
    ];

    // Check if the array exists in localStorage
    const storedOptions = localStorage.getItem('selectedVariantOptions');
    if (storedOptions) {
        selectedVariantOptions = JSON.parse(storedOptions);
        console.log('Loaded selectedVariantOptions from localStorage:', selectedVariantOptions);
    } else {
        // Save the default values to localStorage
        localStorage.setItem('selectedVariantOptions', JSON.stringify(selectedVariantOptions));
        console.log('Initialized selectedVariantOptions with default values:', selectedVariantOptions);
    }

    // Function to update the selected plan in the selectedVariantOptions array
    function updatePlanSelection(newPlan) {
        selectedVariantOptions[0].plan = newPlan;
        localStorage.setItem('selectedVariantOptions', JSON.stringify(selectedVariantOptions));
        console.log('Updated selectedVariantOptions:', selectedVariantOptions);
    }

    // Function to update the selected size in the selectedVariantOptions array
    function updateSizeSelection(newSize) {
        selectedVariantOptions[0].size = newSize;
        localStorage.setItem('selectedVariantOptions', JSON.stringify(selectedVariantOptions));
        console.log('Updated selectedVariantOptions:', selectedVariantOptions);

        // Update the text content of elements based on the selected home size
        const textsToUse = newSize === 'XL' ? XL_TEXTS : REGULAR_TEXTS;

        document.getElementById('prepay-title').innerText = textsToUse.prepayTitle;
        document.getElementById('autorenew-title').innerText = textsToUse.autorenewTitle;
        document.getElementById('one-time-title').innerText = textsToUse.oneTimeTitle;
        document.getElementById('prepay-sale-price').innerText = textsToUse.prepaySalePrice;
        document.getElementById('autorenew-sale-price').innerText = textsToUse.autorenewSalePrice;
        document.getElementById('one-time-price').innerText = textsToUse.oneTimePrice;
        document.getElementById('house-size-question').innerText = textsToUse.houseSizeQuestion;

        console.log(`Updated text elements for size: ${newSize}`);
    }

    // Function to check the plan radio button based on the stored value
    function checkRadioButtonBasedOnStoredValue() {
        const selectedPlan = selectedVariantOptions[0].plan;
        const radioToCheck = document.querySelector(`input[name="plan-selection"][value="${selectedPlan}"]`);
        if (radioToCheck) {
            radioToCheck.checked = true;
            radioToCheck.closest('.plan_selection').classList.add('active');
            console.log(`Checked radio button with value: ${selectedPlan}`);
        } else {
            console.log('No matching radio button found for the stored value.');
        }
    }

    // Function to check the size radio button based on the stored value
    function checkSizeRadioButtonBasedOnStoredValue() {
        const selectedSize = selectedVariantOptions[0].size;
        const radioToCheck = document.querySelector(`input[name="size"][value="${selectedSize}"]`);
        if (radioToCheck) {
            radioToCheck.checked = true;
            radioToCheck.closest('.plan-size-option').classList.add('active');
            console.log(`Checked size radio button with value: ${selectedSize}`);

            // Update the text content of elements based on the stored home size
            updateSizeSelection(selectedSize);
        } else {
            console.log('No matching size radio button found for the stored value.');
        }
    }

    // Initially check the correct radio buttons based on localStorage value
    checkRadioButtonBasedOnStoredValue();
    checkSizeRadioButtonBasedOnStoredValue();

    // Attach click event listeners to the .plan_selection elements
    document.querySelectorAll('.plan_selection').forEach(function (selection) {
        selection.addEventListener('click', function () {
            console.log('plan_selection clicked:', selection);

            // Find the radio button inside the label within .plan_selection
            const radioButton = selection.querySelector('input[type="radio"]');
            if (radioButton) {
                radioButton.checked = true;
                radioButton.dispatchEvent(new Event('change'));
                console.log('Checked radio button:', radioButton.value);

                // Update the selectedVariantOptions array with the new plan value
                updatePlanSelection(radioButton.value);

                // Add an active class for styling purposes, if needed
                document.querySelectorAll('.plan_selection').forEach(item => {
                    item.classList.remove('active');
                });
                selection.classList.add('active');
            } else {
                console.log('Radio button not found within .plan_selection');
            }
        });
    });

    // Attach click event listeners to the .plan-size-option elements
    document.querySelectorAll('.plan-size-option').forEach(function (option) {
        option.addEventListener('click', function () {
            console.log('plan-size-option clicked:', option);

            // Find the radio button inside the label within .plan-size-option
            const radioButton = option.querySelector('input[type="radio"]');
            if (radioButton) {
                radioButton.checked = true;
                radioButton.dispatchEvent(new Event('change'));
                console.log('Checked size radio button:', radioButton.value);

                // Update the selectedVariantOptions array with the new size value
                updateSizeSelection(radioButton.value);

                // Add an active class for styling purposes, if needed
                document.querySelectorAll('.plan-size-option').forEach(item => {
                    item.classList.remove('active');
                });
                option.classList.add('active');
            } else {
                console.log('Size radio button not found within .plan-size-option');
            }
        });
    });

    // On page load, check if there's a matching radio button in localStorage and select it
    const selectedPlanFromStorage = selectedVariantOptions[0].plan;
    const radioToCheck = document.querySelector(`input[name="plan-selection"][value="${selectedPlanFromStorage}"]`);
    if (radioToCheck) {
        radioToCheck.checked = true;
        console.log('Radio button checked from localStorage:', selectedPlanFromStorage);
        radioToCheck.closest('.plan_selection').classList.add('active');
    } else {
        console.log('No radio button found for the stored plan value.');
    }

    const selectedSizeFromStorage = selectedVariantOptions[0].size;
    const sizeRadioToCheck = document.querySelector(`input[name="size"][value="${selectedSizeFromStorage}"]`);
    if (sizeRadioToCheck) {
        sizeRadioToCheck.checked = true;
        console.log('Size radio button checked from localStorage:', selectedSizeFromStorage);
        sizeRadioToCheck.closest('.plan-size-option').classList.add('active');
    } else {
        console.log('No size radio button found for the stored size value.');
    }
});