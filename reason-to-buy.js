function initializeReasonsToBuy() {
    // Get the stored array from localStorage
    let storedReasons = localStorage.getItem('reasonsToBuy');
    console.log('Stored reasons in localStorage:', storedReasons);

    // Initialize the reasonsToBuy array
    let reasonsToBuy = storedReasons ? JSON.parse(storedReasons) : ['active-problem'];
    console.log('Initialized reasonsToBuy array:', reasonsToBuy);

    // Set the checkboxes' state based on the reasonsToBuy array
    reasonsToBuy.forEach(reason => {
        const checkbox = document.getElementById(reason);
        if (checkbox) {
            checkbox.checked = true;  // Programmatically check the checkbox
            const checkboxDiv = checkbox.closest('label').querySelector('.w-checkbox-input');
            const optionParent = checkbox.closest('.option');  // Find the parent .option element
            checkboxDiv.classList.add('w--redirected-checked');  // Add visual checked state
            optionParent.classList.add('selected');  // Add the selected class to the parent
            console.log(`Checkbox with ID ${reason} set to checked and parent option marked as selected.`);
        } else {
            console.log(`Checkbox with ID ${reason} not found.`);
        }
    });

    // Ensure the initial reasonsToBuy array is stored in localStorage
    updateLocalStorage(reasonsToBuy);

    return reasonsToBuy;
}

// Function to update the localStorage with the current reasonsToBuy array
function updateLocalStorage(reasonsToBuy) {
    localStorage.setItem('reasonsToBuy', JSON.stringify(reasonsToBuy));
    console.log('Updated localStorage with reasonsToBuy array:', reasonsToBuy);
}

// Initialize the reasonsToBuy array and store it in localStorage
let reasonsToBuy = initializeReasonsToBuy();

// Function to handle label clicks
function handleLabelClick(event) {
    event.preventDefault();  // Prevent default behavior to control everything manually

    const label = event.currentTarget;
    const checkbox = label.querySelector('input[type="checkbox"]');
    const checkboxDiv = label.querySelector('.w-checkbox-input');
    const optionParent = checkbox.closest('.option');  // Find the parent .option element
    
    // Toggle the checkbox state manually
    const isChecked = !checkbox.checked;  // Determine new state
    checkbox.checked = isChecked;  // Manually set checkbox state

    // Immediately update the visual state
    if (isChecked) {
        checkboxDiv.classList.add('w--redirected-checked');  // Add visual checked state
        optionParent.classList.add('selected');  // Add the selected class to the parent
        if (!reasonsToBuy.includes(checkbox.id)) {
            reasonsToBuy.push(checkbox.id);  // Add to array if not present
        }
    } else {
        checkboxDiv.classList.remove('w--redirected-checked');  // Remove visual checked state
        optionParent.classList.remove('selected');  // Remove the selected class from the parent
        reasonsToBuy = reasonsToBuy.filter(reason => reason !== checkbox.id);  // Remove from array
    }

    console.log(`Checkbox with ID ${checkbox.id} is now ${isChecked ? 'checked' : 'unchecked'} and parent option ${isChecked ? 'selected' : 'deselected'}.`);
    
    // Update the localStorage with the new reasonsToBuy array
    updateLocalStorage(reasonsToBuy);
}

// Add event listeners to the label clicks for both checkboxes
document.querySelectorAll('.w-checkbox').forEach(label => {
    label.addEventListener('click', handleLabelClick);
});

console.log('Event listeners added to labels.');