/// auto redirect if previouss steps arent completed

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

document.addEventListener('DOMContentLoaded', function () {
    function renderSummaryList() {
        const selectedPests = JSON.parse(localStorage.getItem('selectedPests')) || [];
        console.log('Loaded selectedPests for summary:', selectedPests);

        // Select the summary list containers
        const summaryListContainers = document.querySelectorAll('.collapsible-list');
        console.log('Summary list containers found:', summaryListContainers.length);

        if (!summaryListContainers.length) {
            console.error('Summary list containers (.collapsible-list) not found');
            return;
        }

        summaryListContainers.forEach(function (summaryListContainer, containerIndex) {
            summaryListContainer.innerHTML = ''; // Clear any existing items

            selectedPests.forEach(function (pest, index) {
                console.log(`Rendering pest #${index + 1}:`, pest);

                const listItem = document.createElement('li');
                listItem.className = 'summary_pest-list_item';

                const itemContainer = document.createElement('div');
                itemContainer.className = 'summary_pest-list_item-container';

                const img = document.createElement('img');
                img.src = pest.image;
                img.alt = pest.name;
                img.className = 'summary_pes-list_image';

                const textContainer = document.createElement('div');

                const nameDiv = document.createElement('div');
                nameDiv.className = 'summary_pest-list_name';
                nameDiv.textContent = pest.name;

                const frequencyDiv = document.createElement('div');
                frequencyDiv.className = 'summary_pest-list_frequency';
                frequencyDiv.textContent = pest.frequency;

                textContainer.appendChild(nameDiv);
                textContainer.appendChild(frequencyDiv);

                const checkIconContainer = document.createElement('div');
                checkIconContainer.className = 'summary_pest-list_check w-embed';
                checkIconContainer.innerHTML = `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 10" width="13" height="10"><path d="M12.354 1.7 10.827.3a.286.286 0 0 0-.191-.071.286.286 0 0 0-.191.071L4.008 6.2a.286.286 0 0 1-.19.071.286.286 0 0 1-.191-.071L2.099 4.8a.286.286 0 0 0-.19-.071.286.286 0 0 0-.191.071L.19 6.2a.24.24 0 0 0-.078.175.24.24 0 0 0 .078.175L3.627 9.7c.05.046.12.071.19.071.072 0 .14-.025.191-.071l8.346-7.65a.24.24 0 0 0 .078-.175.24.24 0 0 0-.078-.175Z"></path></svg>`;

                itemContainer.appendChild(img);
                itemContainer.appendChild(textContainer);
                itemContainer.appendChild(checkIconContainer);

                listItem.appendChild(itemContainer);
                summaryListContainer.appendChild(listItem);
            });

            // Collapse the list and set initial height if more than 3 items
            if (selectedPests.length > 3) {
                summaryListContainer.style.height = '192px'; // Set height for 3 items
                summaryListContainer.style.overflow = 'hidden';
                summaryListContainer.classList.add('collapsed');
                console.log(`Container ${containerIndex}: Initially collapsed with 192px height.`);

                // Adjust the toggle button association
                const toggleButtonId = containerIndex === 0 ? 'toggleButton2' : 'toggleButton';
                const toggleButton = document.getElementById(toggleButtonId);
                
                if (toggleButton) {
                    console.log(`Toggle button #${toggleButtonId} found and set up.`);

                    toggleButton.style.display = 'block'; // Show the toggle button
                    toggleButton.querySelector('span').textContent = `Show all (${selectedPests.length})`;

                    toggleButton.addEventListener('click', function () {
                        console.log(`Toggle button #${toggleButtonId} clicked.`);
                        if (summaryListContainer.classList.contains('collapsed')) {
                            console.log('Expanding the list...');
                            summaryListContainer.style.height = `${summaryListContainer.scrollHeight}px`; // Expand to show all items
                            summaryListContainer.classList.remove('collapsed');
                            summaryListContainer.classList.add('expanded');
                            toggleButton.querySelector('span').textContent = 'Show less';
                        } else {
                            console.log('Collapsing the list...');
                            summaryListContainer.style.height = '192px'; // Collapse to show only 3 items
                            summaryListContainer.classList.remove('expanded');
                            summaryListContainer.classList.add('collapsed');
                            toggleButton.querySelector('span').textContent = `Show all (${selectedPests.length})`;
                        }
                    });
                } else {
                    console.error(`Toggle button (#${toggleButtonId}) not found`);
                }
            } else {
                console.log('Less than or equal to 3 items, no toggle needed.');
                summaryListContainer.style.height = 'auto';
                summaryListContainer.style.overflow = 'visible';
            }
        });
    }

    // Call the function to render the summary list on page load
    renderSummaryList();
    
    // Function to update the location summary element
    function updateLocationSummary() {
        // Retrieve the locationData from localStorage
        const locationData = JSON.parse(localStorage.getItem('locationData'));

        // Check if locationData is available and contains the necessary properties
        if (locationData && locationData.city && locationData.stateAbbreviation) {
            // Construct the location string
            const locationString = `${locationData.city}, ${locationData.stateAbbreviation}`;

            // Get the element with ID location_summary
            const locationSummaryElement = document.getElementById('location_summary');

            // Check if the element exists in the DOM
            if (locationSummaryElement) {
                // Update the content of the locationSummary element
                locationSummaryElement.textContent = locationString;
                console.log(`Updated location summary to: ${locationString}`);
            } else {
                console.error('Element with ID "location_summary" not found.');
            }
        } else {
            console.error('locationData not found or missing required properties.');
        }
    }

    // Call the function to update the location summary on page load
    updateLocationSummary();
});
