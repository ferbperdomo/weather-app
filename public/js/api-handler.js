class ApiHandler {
    constructor() {
        this.axiosApp = axios.create({
            baseURL: `https://api.openweathermap.org/data/2.5/`
        })
    }

    getInfo(inputValue) {
        return this.axiosApp.get(`weather?q=${inputValue}&appid=9bd64e664d7d9b7b25e4a3a0eda152a9&units=metric`)
    }

    getForecast(inputValue) {
        return this.axiosApp.get(`forecast?q=${inputValue}&appid=9bd64e664d7d9b7b25e4a3a0eda152a9&cnt=40&units=metric`)
    }
    
}
