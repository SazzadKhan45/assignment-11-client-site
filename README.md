Order / Booking Button:
Enabled only for logged-in users who are not Admin or Manager
Clicking it redirects the user to the Booking Page / Order Form
Booking Form Fields:
Email (auto-filled for logged-in users, read-only)
Product Title (read-only)
Price / Payment Info (read-only)
First Name
Last Name
order quantity . cannot be larger than product quantity ,, can not be less then minimum quantity
order price ( read-only field , it will calculated automatically when quantity added
Contact Number
Delivery Address
Additional Notes / Instructions

Behavior:
The Product Title and Price / Payment Info are displayed based on the selected product (read-only).

Upon submission:

If payment is required (e.g., online payment via Stripe / PayFast), redirect to the payment page.
If no online payment is required (e.g., Cash on Delivery), skip the payment step.

Save the booking / registration details in the database.
Display the booking on Dashboard → My Orders page for the user.
