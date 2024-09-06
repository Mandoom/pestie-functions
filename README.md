# pestie-functions
pestie-replica-component functions

this repository is for storing several scripts 

These scripts are intended for an extended customized checkout program that across several steps collects user specific information to give a tailored product for user needs (pest control)

FUNCTIONALITIES

Plan Selection
Checkboxes and radio butons that store in localStorage data relevant to the size of the product and the tipe of purchase (one time payment subscription, four payments subscriptionm,  and single product)


Location Selection
Allows user to input a zipcode (US) that is validated for 5 digits input


Auto redirect
Dom manipulation, reflecting the user zip code input and auto redirect after a especif element comes into view.  while page interacts, check for ZIP code with zippopotam.us API, retreives user location. if valid location store city and sate to local storage in an object. retreive this zipcode for future page loads

Product customization option (pest) selection
Manage and remember user selection of problem and problem options. toggling of classes for visual cues, shopping cart functionalities, add and remove products. automatically filterthe list of pests/products corresponding to the user set location. search filter disables loaction filters selection and when empty location filter is restored

Order summary
Display a cart/ Summary that reflects data from the multiple steps



