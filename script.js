document.addEventListener('DOMContentLoaded', () => {
    const userContainer = document.getElementById('user-container');
    const reloadButton = document.getElementById('reload-btn');

    const fetchUsers = async () => {
        userContainer.innerHTML = '<p class="loading-message">Loading user data...</p>';

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            
            if (!response.ok) {
                throw new Error(`Network response was not ok. Status: ${response.status}`);
            }
            
            const users = await response.json();
            displayUsers(users);

        } catch (error) {
            displayError(error);
        }
    };

    const displayUsers = (users) => {
        userContainer.innerHTML = '';
        users.forEach(user => {
            const card = document.createElement('div');
            card.className = 'user-card';

            const address = `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`;

            card.innerHTML = `
                <h2>${user.name}</h2>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Address:</strong> ${address}</p>
            `;
            
            userContainer.appendChild(card);
        });
    };

    const displayError = (error) => {
        userContainer.innerHTML = `<div class="error-message">Failed to fetch data: ${error.message}. Please check your connection and try again.</div>`;
    };

    reloadButton.addEventListener('click', fetchUsers);
    
    fetchUsers();
});