$('.check-box').on('click', function(event) {
  const taskItem = $(this).parent().parent(); // Get the parent <li> element
  const taskChecked = taskItem.text().trim();
  let checked;
    if ($(this).is(':checked')) {
      // If checkbox is checked, move the task to the bottom
      checked = true;
      //$('.list').append(taskItem);
    } else {
      // If checkbox is unchecked, move the task to the top
      //$('.list').prepend(taskItem);
      checked = false;
    }
    const data = {
      task: taskChecked,
      type: checked,
    }

    const formData = new URLSearchParams(data).toString();
    // Make an AJAX POST request to the server
fetch('/checked', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded', // Set the content type to URL-encoded
  },
  body: formData, // Use the URL-encoded data as the request body
})
  .then((response) => {
    if (response.ok) {
      // Handle success
      window.location.href = '/';
    } else {
      // Handle error
      console.log("Failed to check task in the server.");
    }
  })
  .catch((error) => {
    // Handle error
    console.log("Error:", error);
  });
    

  
}); 

$('.remove').on('click', function(event) {
  const value = $(event.currentTarget).closest('li').text();
  const task = value.trim();
  console.log(task);
  fetch(`/remove-task/${task}`, {
      method: "DELETE", // Use the appropriate HTTP method (e.g., DELETE)
  })
  .then((response) => {
      if (response.ok) {
          // Task successfully removed from server, update the UI as needed
          window.location.href = '/'; // Redirect to the home page
      } else {
          console.log("Failed to remove task from server.");
      }
  })
  .catch((error) => {
      console.log("Error:", error);
  });
});


 
document.addEventListener("DOMContentLoaded", function () {
          // Function to update the displayed quote

          const quoteElement = document.getElementById("quote");
          if(quoteElement){
            updateQuote();
          }
          function updateQuote() {
              // Fetch the quote element by its ID
              const quoteElement = document.getElementById("quote");
                // Array of quotes (same as on the server-side)
              const quotesArray = [
                "let's make an impact",
                "This is your private space",
                "Run your day or your day will run you",
                "You can make magic happen",
                "Time to make your own luck",
                "Remove doubts with action",
                "What will accomplish today?",
                "You are what you do",
                "Be so good no one can ignore you",
                "The only way to do great work is to love what you do",
                "Seize the day; you've got this!",
                "Stay positive and keep going",
                "Embrace the journey, cherish each moment",
                "Dream big, work hard, achieve greatness",
                "Smile, shine, and make it yours!"
                // Add more quotes here...
            ];

                // Get a random index to select a quote
                const randomIndex = Math.floor(Math.random() * quotesArray.length);

                // Update the quote element with the new quote
                quoteElement.textContent = quotesArray[randomIndex];
                
              }

      
              
});
 
  
