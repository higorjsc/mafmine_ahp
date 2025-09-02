import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import portuguese from "@/assets/javascript/portuguese.js"
import english from "@/assets/javascript/english.js"
import "@/assets/css/global.css"
import "@/assets/css/primeiraSegunda.css"
import store from "./store"


import { createMetaManager } from "vue-meta"

const app = createApp(App)
    .use(router)
    .use(store)
    .use(createMetaManager()) // add this line

// Configura a função que define o idioma como $t('variável')
app.config.globalProperties.$t = function (key) {
    if (this.$store.getters.currentLanguage === "pt") {
        return portuguese[key] ? portuguese[key] : key
    }
    if (this.$store.getters.currentLanguage === "en") {
        return english[key] ? english[key] : key
    }
}
router.isReady().then(() => {
    app.mount("#app")
})