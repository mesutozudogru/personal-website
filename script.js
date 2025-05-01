// This fetches data from your Spring Boot backend
fetch('http://localhost:8080/hello')
  .then(response => response.text())
  .then(data => {
    document.getElementById('greeting').innerText = data;
  })
  .catch(error => {
    document.getElementById('greeting').innerText = 'Failed to load message.';
    console.error('Error:', error);
  });


  document.getElementById('messageForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent page reload
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
  
    fetch('http://localhost:8080/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, message })
    })
      .then(response => {
        if (response.ok) {
          document.getElementById('formResponse').innerText = "✅ Message sent!";
          document.getElementById('messageForm').reset();
        } else {
          throw new Error("Failed to send message");
        }
      })
      .catch(error => {
        console.error('Error:', error);
        document.getElementById('formResponse').innerText = "❌ Error sending message.";
      });
  });

  document.addEventListener('DOMContentLoaded', () => {
    // Fetch car data from the backend
    fetch('http://localhost:8080/cars')
      .then(response => response.json())  // Convert response to JSON
      .then(cars => {
        const carList = document.getElementById('carList');
        
        // Loop through the cars and create a table row for each one
        cars.forEach(car => {
          const row = document.createElement('tr');
          
          // Create a table cell for each car attribute (brand, model, year, color)
          const brandCell = document.createElement('td');
          brandCell.textContent = car.brand;
          
          const modelCell = document.createElement('td');
          modelCell.textContent = car.model;
          
          const yearCell = document.createElement('td');
          yearCell.textContent = car.year;
          
          const colorCell = document.createElement('td');
          colorCell.textContent = car.color;
          
          // Append the cells to the row
          row.appendChild(brandCell);
          row.appendChild(modelCell);
          row.appendChild(yearCell);
          row.appendChild(colorCell);
          
          // Append the row to the table body
          carList.appendChild(row);
        });
      })
      .catch(error => {
        console.error('Error fetching cars:', error);
      });
  });

  