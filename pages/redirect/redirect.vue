<template>
    <div>
      <p>Redirecting...</p>
    </div>
  </template>
  
  <script>
  export default {
    async created() {
      try {
        const response = await fetch('https://anecdotage.com/api/redirect', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          if (data.link) {
            window.location.href = data.link; // Perform the redirection in JavaScript
          }
        } else {
          const data = await response.json();
          alert(data.message); // Show error if no link exists
        }
      } catch (error) {
        console.error('Redirection failed:', error);
      }
    }
  };
  </script>
  