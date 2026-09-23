<template>

    <div class="etapas-container">
        <span class="buttons-etapas" ref="span-inputs">
            <a class="link" @click.prevent="handleLink(0,'/inputs')">INPUTS</a>
        </span>

        <span class="buttons-etapas" ref="span-primeira">
            <a class="link" @click.prevent="handleLink(1,'/primeira')">{{ $t("step") }} 1</a>
        </span>

        <span class="buttons-etapas" ref="span-segunda">
            <a class="link" @click.prevent="handleLink(2,'/segunda')">{{$t("step")}} 2</a>
        </span>

        <span class="buttons-etapas" ref="span-resultados">
            <a class="link" @click.prevent="handleLink(3,'/resultados')">{{$t("resultados")}}</a>
        </span>
    </div>

</template>
<script>
export default {
    name: "vue-mcdm-header",
    computed:{
        viewProgress() {
            return this.$store.getters.currentViewProgress
        }
    },
    watch: {
        viewProgress() {
            this.changeTabOpacity()
            const atual = this.$store.getters.currentTabViewAtual || "/inputs"
            this.changeAtualTab(atual)
        }
    },
    mounted() {
        this.changeTabOpacity()
        this.changeAtualTab("/inputs")
        this.$router.replace({ path: "/inputs" })
    },
    created() {
        this.$store.dispatch("changeViewProgress", 1)
    },
    methods: {
        handleTemplate() {
            this.changeTabOpacity()
            this.changeAtualTab("/inputs")
        },
        changeTabOpacity() {
            document.querySelectorAll(".buttons-etapas").forEach((element) => {
                element.style.opacity = 0.6
            })
            const span = document.querySelector(".etapas-container").querySelectorAll("span")
            for(let i = 0; (i <= this.viewProgress && i < 4); i++) {
                span[i].style.opacity = 0.85
            }
        },
        changeAtualTab(atual) {
            this.$store.dispatch("changeTabViewAtual", atual)
            atual = "span-" + atual.split("/")[1]
            this.$refs[atual].style.opacity = 1
        },
        handleLink(index, route) {
            if(this.viewProgress > index) {
                this.changeTabOpacity()
                this.changeAtualTab(route)
                this.$router.replace({ path: `${route}` })
            }else if(this.viewProgress === index) {
                this.$store.dispatch("changeViewProgress", this.viewProgress + 1)
                this.changeTabOpacity()
                this.changeAtualTab(route)
                this.$router.replace({ path: `${route}` })
            }
            // console.log(this.viewProgress)
            // console.log(route)

        }
    }
}

</script>

<style scoped>
    .etapas-container{
        display: flex;
        align-items: stretch;
        position: relative;
        width: 100%;
        height: 48px;
        min-height: 48px;
        border-bottom: var(--borda-simples);
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        box-sizing: border-box;
        overflow: hidden !important;
        user-select: none;
    }

    .buttons-etapas{
        user-select: none;
        height: 100%;
        flex: 1;
        background-color: var(--cor-tema);
        opacity: 0.9;
        z-index: 2;
        overflow: hidden !important;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: opacity 0.2s ease;
    }
    .buttons-etapas:not(:last-child){
        border-right: 1px solid rgba(255, 255, 255, 0.4);
    }
    .buttons-etapas:hover{
        opacity: 1;
        overflow: hidden !important;
    }

    .link{
        color: var(--cor-texto-tema);
        z-index: 1;
        text-decoration: none;
        user-select: none;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: clamp(0.85rem, 1vw, 1.1rem);
        letter-spacing: 0.5px;
        overflow: hidden !important;
    }
    .link:hover{
        cursor: pointer;
    }

    @media (min-width: 1920px) {
        .etapas-container {
            height: 54px;
            min-height: 54px;
        }
        .link {
            font-size: 1.15rem;
        }
    }

    @media (min-width: 2560px) {
        .etapas-container {
            height: 60px;
            min-height: 60px;
        }
        .link {
            font-size: 1.25rem;
        }
    }

</style>
