import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap';
import './assets/style.css'; 
import CanvasJSChart from '@canvasjs/vue-charts';

const app = createApp(App)

app.use(router)

app.mount('#app')
app.use(CanvasJSChart);