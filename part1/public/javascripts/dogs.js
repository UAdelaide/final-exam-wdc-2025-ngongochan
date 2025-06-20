const { createApp } = Vue;

createApp({
data() {
    return {
    dogImage: null
    };
},
methods: {
    async getDog() {
        try {
            const res = await fetch('https://dog.ceo/api/breeds/image/random');
            const data = await res.json();
            this.dogImage = data.message;
        } catch (error) {
            console.error("Failed to fetch dog image:", error);
        }
    }
}
}).mount('#app');