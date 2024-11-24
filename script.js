// Initialize the map
const map = L.map('map').setView([50.1109, 8.6821], 5); // Centered on Europe

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Load song data from JSON
fetch('data/songs.json')
  .then(response => response.json())
  .then(data => {
    data.songs.forEach(song => {
      // Create a marker for each song
      const marker = L.marker([song.latitude, song.longitude]).addTo(map);

      // Add a popup with song details and YouTube embed
      marker.bindPopup(`
        <h3>${song.title}</h3>
        <p><strong>Album:</strong> ${song.album}</p>
        <p><strong>Event:</strong> ${song.event}</p>
        <iframe 
          src="${song.youtube}" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen 
          width="300" 
          height="200">
        </iframe>
      `);
    });
  })
  .catch(error => console.error('Error loading song data:', error));
