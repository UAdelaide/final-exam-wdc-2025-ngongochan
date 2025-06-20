const { createApp } = Vue;
    createApp({
      el: #app,
      data: {
          dogImage: null
      },
      methods: {
        getDog() {
            const result = fetch('https://dog.ceo/api/breeds/image/random');
            const data = res.json();
            this.dogImage = data.message;
        }
      }
    }).mount('#app');