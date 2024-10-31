// include header
fetch('header.html')
    .then(response => response.text())
    .then(data => document.getElementById('header').innerHTML = data)
    .catch(error => console.error('Error loading header:', error));

// include footer
fetch('footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer').innerHTML = data;
        // Now set the current year
        const year = new Date().getFullYear();
        document.getElementById('currentYear').textContent = year;
    })
    .catch(error => console.error('Error loading footer:', error));

// call this event when contact form is submitted
document.getElementById('contactForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(this);
    
    // Send the form data to the serverless function
    const response = await fetch('/api/send-email', {
        method: 'POST',
        body: formData,
    });

    const responseData = await response.json();
    
    // Display response message
    const responseMessage = document.getElementById('responseMessage');
    if (response.ok) {
        responseMessage.textContent = 'Email sent successfully!';
        responseMessage.className = 'text-success';
    } else {
        responseMessage.textContent = 'Failed to send email: ' + responseData.message;
        responseMessage.className = 'text-danger';
    }

    // Reset the form
    this.reset();
});