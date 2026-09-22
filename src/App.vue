<template>
    <div id="body" ref="app">
        <metainfo>
            <template v-slot:title="{ content }">
                {{ content ? `${content} | AHP Tool` : 'AHP Decision Tool' }}
            </template>
        </metainfo>

        <vueHeader/>

        <main>
            <vueHeaderProject class="header-mcdm"/>
            <vueButtonSwitchLanguage/>
            <RouterView/>
        </main>

        <vueFooter/>
        <vuePopUp/>
    </div>
</template>

<script>
import vuePopUp from "@/components/popUp.vue"
import vueHeader from "@/components/layoutHeader.vue"
import vueHeaderProject from "@/components/layoutHeaderProject.vue"
import vueFooter from "@/components/layoutFooter.vue"
import vueButtonSwitchLanguage from "@/components/buttonSwitchLanguage.vue"
import { aplicarTema } from "@/assets/javascript/globalFunctions.js"
import { ref } from "vue"
import { useMeta } from "vue-meta"

export default {
    name: "App",
    components: {
        vueHeader,
        vueHeaderProject,
        vueFooter,
        vueButtonSwitchLanguage,
        vuePopUp
    },
    setup() {
        // Dados reativos com valores iniciais
        const pageTitle = ref("Analytical Hierarchy Process")
        const pageDescription = ref("Web-based AHP method implementation for multi-criteria decision analysis")
        const pageKeywords = ref("AHP, MCDM, Decision Making, Analytic Hierarchy Process, Vue.js")
        const pageImageUrl = ref("https://yourdomain.com/images/ahp-preview.jpg") // URL absoluto

        // Configuração reativa das meta tags
        useMeta({
            title: pageTitle.value,
            meta: [
                { name: "description", content: pageDescription.value },
                { name: "keywords", content: pageKeywords.value },
                { property: "og:title", content: pageTitle.value },
                { property: "og:description", content: pageDescription.value },
                { property: "og:image", content: pageImageUrl.value },
                { property: "og:type", content: "website" },
                { name: "twitter:card", content: "summary_large_image" },
                { name: "twitter:title", content: pageTitle.value },
                { name: "twitter:description", content: pageDescription.value },
                { name: "twitter:image", content: pageImageUrl.value }
            ],
            htmlAttrs: {
                lang: "en"
            }
        })

        return {
            // Apenas retorne se for usar no template
            pageTitle,
            pageDescription,
            pageImageUrl
        }
    },
    beforeCreate() {
        aplicarTema("temaVerde")
        this.$store.dispatch("changeTabViewAtual", "/inputs")
    }
}
</script>

<style scoped>
#body{
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    box-sizing: border-box;
    padding: 6px 0 16px;
    margin: 0;
}
</style>