document.addEventListener('DOMContentLoaded', function () {
    const selectedPests = JSON.parse(localStorage.getItem('selectedPests')) || [];
    console.log('Loaded selectedPests from localStorage:', selectedPests);

    // Function to save selectedPests to localStorage
    function saveToLocalStorage() {
        localStorage.setItem('selectedPests', JSON.stringify(selectedPests));
        console.log('Saved selectedPests to localStorage:', selectedPests);
    }

    // Function to select the state checkbox on load
    function selectStateCheckbox() {
        const locationData = JSON.parse(localStorage.getItem('locationData'));
        let selectedCheckbox = null; // To keep track of the initially selected checkbox

        if (locationData && locationData.stateFullName) {
            const stateFullName = locationData.stateFullName;
            const stateLabel = document.getElementById(stateFullName);

            if (stateLabel) {
                const checkbox = stateLabel.querySelector('input[type="checkbox"]');
                if (checkbox && !checkbox.checked) {
                    checkbox.click(); // Simulate a click to trigger the filtering
                    selectedCheckbox = checkbox; // Store the reference to the selected checkbox
                }
            } else {
                console.log(`No checkbox found for state: ${stateFullName}`);
            }
        } else {
            console.log('No valid state information found in localStorage.');
        }
    }

    // Function to deselect the state checkbox
    function deselectStateCheckbox() {
        const locationData = JSON.parse(localStorage.getItem('locationData'));
        let selectedCheckbox = null;

        if (locationData && locationData.stateFullName) {
            const stateFullName = locationData.stateFullName;
            const stateLabel = document.getElementById(stateFullName);

            if (stateLabel) {
                const checkbox = stateLabel.querySelector('input[type="checkbox"]');
                if (checkbox && checkbox.checked) {
                    checkbox.click(); // Deselect the checkbox
                }
            }
        }
    }

    // Function to handle search input changes
    function handleSearchInput(event) {
        const searchValue = event.target.value.trim();

        if (searchValue === '') {
            // If the search bar is cleared, reselect the state checkbox
            selectStateCheckbox();
        } else {
            // Deselect the state checkbox when typing in the search bar
            deselectStateCheckbox();
        }
    }

    // Call selectStateCheckbox initially to apply state filtering on page load
    selectStateCheckbox();

    // Add event listener to the search bar
    const searchInput = document.getElementById('pest-search');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearchInput);
    } else {
        console.log('Search input field not found.');
    }

    // Select all the list items
    const listItems = document.querySelectorAll('.select_pest-library_list-item');

    listItems.forEach(function (item) {
        const itemId = item.getAttribute('id'); // Get the ID of the current list item
        const pestName = item.querySelector('.quiz-pest-library_list-item_text').innerText;

        // Update the data-name attribute of each radio button within .detail-selection
        const radioButtons = item.querySelectorAll('.detail-selection input[type="radio"]');
        radioButtons.forEach(function (radio) {
            const newDataName = `pest-frecuency-${itemId}`;
            radio.setAttribute('name', newDataName); // Update the name attribute
            radio.setAttribute('data-name', newDataName); // Update the data-name attribute
        });

        // Update the ID of the .frecuency-description element
        const description = item.querySelector('.frecuency-description');
        if (description) {
            const newDescriptionId = `pest-description-${itemId}`;
            description.setAttribute('id', newDescriptionId);
        }

        // Check if the current pest is in the selectedPests array
        const savedPest = selectedPests.find(pest => pest.name === pestName);

        if (savedPest) {
            // If the pest is in selectedPests, select the corresponding checkbox and radio button
            const checkboxInput = item.querySelector('.pest-checkbox input[type="checkbox"]');
            if (checkboxInput && !checkboxInput.checked) {
                checkboxInput.click(); // Simulate a click to select the checkbox
                item.classList.add('selected');
            }

            // Set the frequency to the saved frequency
            const savedFrequency = savedPest.frequency;
            const savedRadio = item.querySelector(`.detail-selection input[type="radio"][value="${savedFrequency}"]`);
            if (savedRadio && !savedRadio.checked) {
                savedRadio.checked = true; // Select the saved frequency
                const label = savedRadio.closest('label.radio');
                if (label) {
                    label.classList.add('active'); // Add active class to the label of the selected radio button
                    label.click(); // Simulate a click to move the indicator
                }
            }

            // Update the .frecuency-description based on the saved frequency
            if (description) {
                if (savedFrequency === 'mild') {
                    description.innerHTML = "<strong class='frecuency-disclaimer'>I've seen a few</strong>";
                } else if (savedFrequency === 'moderate') {
                    description.innerHTML = "<strong class='frecuency-disclaimer'>I've seen a few too many</strong>";
                } else if (savedFrequency === 'severe') {
                    description.innerHTML = "<strong class='frecuency-disclaimer'>Houston, we have a problem</strong>";
                }
            }
        } else {
            // If the pest is not in selectedPests, select the radio button with value "moderate" by default
            const frequentlyRadio = item.querySelector('.detail-selection input[type="radio"][value="moderate"]');
            if (frequentlyRadio && !frequentlyRadio.checked) {
                frequentlyRadio.checked = true; // Select the default frequency
                const label = frequentlyRadio.closest('label.radio');
                if (label) {
                    label.classList.add('active'); // Add active class to the label of the default radio button
                    label.click(); // Simulate a click to move the indicator
                }
            }

            // Update the .frecuency-description for the default state
            if (description) {
                description.innerHTML = "<strong class='frecuency-disclaimer'>I've seen a few too many</strong>";
            }
        }
    });

    // Add event listener to each pest selection element
    const pestSelections = document.querySelectorAll('.pest-library_list-item_selection');
    pestSelections.forEach(function (pestSelection, index) {
        console.log(`Adding click event listener to pest-selection #${index + 1}`);

        pestSelection.addEventListener('click', function (event) {
            console.log(`Clicked on pest-selection #${index + 1}`);

            // Delay the execution to ensure other events triggered by this class run first
            setTimeout(function () {
                console.log('Executing delayed code...');

                // Find the checkbox input inside the label.pest-checkbox within the clicked element
                const checkboxLabel = pestSelection.querySelector('label.pest-checkbox');
                if (checkboxLabel) {
                    console.log('Checkbox label found.');

                    const checkboxInput = checkboxLabel.querySelector('input[type="checkbox"]');
                    if (checkboxInput) {
                        console.log('Checkbox input found. Current checked state:', checkboxInput.checked);

                        // Simulate a click on the checkbox input
                        checkboxInput.click();
                        console.log('Simulated click on checkbox. New checked state:', checkboxInput.checked);

                        // Add 'selected' class to the parent .select_pest-library_list-item
                        const parentItem = pestSelection.closest('.select_pest-library_list-item');
                        if (parentItem) {
                            parentItem.classList.toggle('selected', checkboxInput.checked);
                            console.log('Toggled selected class on parent item:', parentItem.id);
                        }

                        // If the checkbox is checked, add the pest details to selectedPests
                        if (checkboxInput.checked) {
                            // Get the pest name
                            const pestName = pestSelection.querySelector('.quiz-pest-library_list-item_text').innerText;
                            console.log('Pest name:', pestName);

                            // Get the pest image source URL
                            const pestImage = pestSelection.querySelector('.quiz-pest-library_list-item_image').getAttribute('src');
                            console.log('Pest image source URL:', pestImage);

                            // Get the selected frequency
                            const selectedFrequency = parentItem.querySelector('.pest-detail input[type="radio"]:checked').value;
                            console.log('Selected frequency:', selectedFrequency);

                            // Create a new object with the pest details
                            const pestDetails = {
                                name: pestName,
                                image: pestImage,
                                frequency: selectedFrequency
                            };

                            // Add the new object to the selectedPests array
                            selectedPests.push(pestDetails);
                            console.log('Added to selectedPests:', pestDetails);
                            console.log('Current selectedPests array:', selectedPests);
                        } else {
                            // If unchecked, remove the pest from selectedPests
                            const pestName = pestSelection.querySelector('.quiz-pest-library_list-item_text').innerText;
                            const index = selectedPests.findIndex(pest => pest.name === pestName);
                            if (index !== -1) {
                                console.log('Removing from selectedPests:', selectedPests[index]);
                                selectedPests.splice(index, 1);
                                console.log('Current selectedPests array after removal:', selectedPests);
                            }
                        }

                        // Save the updated selectedPests array to localStorage
                        saveToLocalStorage();
                        updateCart(); // Update the cart whenever a selection changes
                    } else {
                        console.log('Checkbox input not found.');
                    }
                } else {
                    console.log('Checkbox label not found.');
                }
            }, 0);
        });
    });

    // Add event listener to the radio buttons inside .pest-detail .detail-selection
    const radioButtons = document.querySelectorAll('.pest-detail .detail-selection input[type="radio"]');
    console.log('Found radio buttons:', radioButtons.length);

    radioButtons.forEach(function (radio) {
        radio.addEventListener('change', function () {
            console.log('Radio button changed:', radio.value);

            // Find the parent .select_pest-library_list-item
            const parentItem = radio.closest('.select_pest-library_list-item');
            if (parentItem) {
                // Remove 'active' class from all labels in this group
                const groupRadioButtons = parentItem.querySelectorAll('.detail-selection label.radio');
                groupRadioButtons.forEach(function (label) {
                    label.classList.remove('active');
                });

                // Add 'active' class to the label of the selected radio button
                const selectedLabel = radio.closest('label.radio');
                if (selectedLabel) {
                    selectedLabel.classList.add('active');
                }

                const pestName = parentItem.querySelector('.quiz-pest-library_list-item_text').innerText;

                // Update the .frecuency-description based on the selected radio button
                const descriptionElement = parentItem.querySelector('.frecuency-description');
                if (descriptionElement) {
                    if (radio.value === 'mild') {
                        descriptionElement.innerHTML = "<strong class='frecuency-disclaimer'>I've seen a few</strong>";
                    } else if (radio.value === 'moderate') {
                        descriptionElement.innerHTML = "<strong class='frecuency-disclaimer'>I've seen a few too many</strong>";
                    } else if (radio.value === 'severe') {
                        descriptionElement.innerHTML = "<strong class='frecuency-disclaimer'>Houston, we have a problem</strong>";
                    }
                }

                // Find the corresponding pest in selectedPests array
                const pest = selectedPests.find(p => p.name === pestName);
                if (pest) {
                    pest.frequency = radio.value; // Update the frequency value
                    console.log('Updated frequency for:', pest);
                    console.log('Current selectedPests array:', selectedPests);

                    // Save the updated selectedPests array to localStorage
                    saveToLocalStorage();
                    updateCart(); // Update the cart whenever the frequency changes
                } else {
                    console.log('Pest not found in selectedPests array:', pestName);
                }
            }
        });
    });

    // Prevent checkbox clicks from propagating back up to the parent element
    const checkboxes = document.querySelectorAll('.pest-checkbox input[type="checkbox"]');
    console.log('Found pest-checkbox inputs:', checkboxes.length);

    checkboxes.forEach(function (checkbox, index) {
        console.log(`Adding event listener to prevent propagation on checkbox #${index + 1}`);

        checkbox.addEventListener('click', function (event) {
            console.log('Checkbox click event detected. Stopping propagation.');
            event.stopPropagation(); // Stop the click event from bubbling up
        });
    });

    // Cart functionality to display selected pests
    function updateCart() {
        const cartContainer = document.querySelector('.slected-pests-lists');
        cartContainer.innerHTML = ''; // Clear the existing cart

        selectedPests.forEach(function (pest) {
            const cartItem = document.createElement('div');
            cartItem.className = 'pest-library_list-item_selected';

            const img = document.createElement('img');
            img.src = pest.image;
            img.alt = pest.name;
            img.className = 'quiz-pest-library_list-item_image';

            const divBlock = document.createElement('div');
            divBlock.className = 'selected-item_info';

            const name = document.createElement('div');
            name.className = 'quiz-pest-library_list-item_text';
            name.textContent = pest.name;

            const frequency = document.createElement('div');
            frequency.className = 'quiz-pest-library_list-item_text_freq-label';
            frequency.textContent = pest.frequency;

            divBlock.appendChild(name);
            divBlock.appendChild(frequency);

            const checkIconContainer = document.createElement('div');
            checkIconContainer.className = 'icon-check-container';

            const checkIcon = document.createElement('div');
            checkIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 13" class="h-3"><g clip-path="url(#a)"><path fill="currentColor" d="m13.082 3.245-1.527-1.4a.286.286 0 0 0-.191-.071.286.286 0 0 0-.191.071l-6.437 5.9a.286.286 0 0 1-.19.072.286.286 0 0 1-.191-.072l-1.528-1.4a.286.286 0 0 0-.19-.071.286.286 0 0 0-.192.071l-1.527 1.4a.24.24 0 0 0-.078.175.24.24 0 0 0 .078.175l3.437 3.15c.05.046.12.072.19.072.072 0 .14-.026.191-.072l8.346-7.65a.24.24 0 0 0 .078-.175.24.24 0 0 0-.078-.175Z"></path></g><defs><clipPath id="a"><path fill="#fff" d="M.455.545h13.09v12H.456z"></path></clipPath></defs></svg>`;
            checkIconContainer.appendChild(checkIcon);

            cartItem.appendChild(img);
            cartItem.appendChild(divBlock);
            cartItem.appendChild(checkIconContainer);

            cartItem.addEventListener('click', function () {
                // Remove the pest from the selectedPests array
                const index = selectedPests.findIndex(p => p.name.toLowerCase() === pest.name.toLowerCase());
                if (index !== -1) {
                    selectedPests.splice(index, 1);
                    console.log('Removed from selectedPests via cart click:', pest);
                    saveToLocalStorage(); // Save the updated array to localStorage
                    updateCart(); // Update the cart

                    // Simulate a click on the corresponding selection item in the main list
                    const correspondingSelection = document.getElementById(pest.name.toLowerCase());
                    if (correspondingSelection) {
                        const event = new MouseEvent('click', {
                            bubbles: true,
                            cancelable: true,
                            view: window
                        });
                        correspondingSelection.querySelector('.pest-library_list-item_selection').dispatchEvent(event);
                        console.log(`Simulated click on selection item: ${pest.name}`);
                    }
                }
            });
            cartContainer.appendChild(cartItem);
        });

        // Update the cart counter
        const cartCounter = document.getElementById('pest-selected-number');
        cartCounter.textContent = selectedPests.length;
    }

    // Call updateCart initially to populate the cart on page load
    updateCart();
});


/////////
///////// Dom manipulation

//document.addEventListener('DOMContentLoaded', function () {
    // Function to update the #city-state element based on location data
    function updateCityState() {
        const locationData = JSON.parse(localStorage.getItem('locationData'));

        if (locationData && locationData.city && locationData.stateFullName) {
            const cityStateElement = document.getElementById('city-state');
            if (cityStateElement) {
                cityStateElement.textContent = `${locationData.city}, ${locationData.stateFullName}`;
                console.log(`Updated #city-state to: ${locationData.city}, ${locationData.stateFullName}`);
            } else {
                console.log('#city-state element not found.');
            }
        } else {
            console.log('No valid location data found in localStorage.');
        }
    }

    // Call the function to update the #city-state on page load
    updateCityState();
//});



