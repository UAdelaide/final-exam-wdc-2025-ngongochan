const { createApp } = Vue;
    createApp({
      data: {
          dogImage: null
      },
      methods: {
        fetchDog() {
          try {
            const res = await fetch('https://dog.ceo/api/breeds/image/random');
            const data = await res.json();
            this.dogImage = data.message;
          } catch (error) {
            console.error('Error fetching dog image:', error);
          }
        }
      }
    }).mount('#app');