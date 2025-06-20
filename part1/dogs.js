const { createApp } = Vue;
    createApp({
      data: {
          dogImage: null
      },
      methods: {
        getDog() {
            const res = fetch('https://dog.ceo/api/breeds/image/random');
            const data = await res.json();
            this.dogImage = data.message;
        }
      }
    }).mount('#app');