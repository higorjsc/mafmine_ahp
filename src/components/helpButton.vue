<template>

    <div
        class="menu-container"
    >
        <label for="checkbox-show-menu" id="label-show-menu">?</label>
        <input type="checkbox" id="checkbox-show-menu" class="checkbox-with-label" v-model="menuState">
        <div
            class="menu-itens-container"
            v-if="menuState"
        >
            <!-- ESCALA SAAATY -->
            <label
                class="label-menu-ahp"
                for="checkbox-mostra-escala-saaty"
                v-if="tabView !== 'resultados'"
            >
                {{ $t('helpEscalaSaaty') }}
            </label>
            <input
                type="checkbox"
                class="checkbox-menu-ahp"
                id="checkbox-mostra-escala-saaty"
                v-model="mostrarEscala"
            >
            <vueEscalaSaaty
                class="escala"
                v-if="mostrarEscala"
            />
            <!-- PASSO A PASSO AHP -->
            <label
                class="label-menu-ahp"
                for="button-calculos-ahp"
            >
                {{ $t('helpCalculosAhp') }}
            </label>
            <button
                class="button-menu-ahp"
                id="button-calculos-ahp"
                @click="abrirPopUp('passosAhp')"
            >
            </button>
            <!-- MAIS SOBRE AHP-->
            <label
                class="label-menu-ahp"
                for="button-mais-sobre-ahp"
                v-if="menuState"
            >
                {{ $t('helpMaisSobreAhp') }}
            </label>
            <button
                class="button-menu-ahp"
                id="button-mais-sobre-ahp"
                @click="abrirPopUp('maisSobreAhp')"
            >
            </button>
        </div>
    </div>

</template>
<script>
import vueEscalaSaaty from  "@/components/helpEscalaSaaty.vue"

export default{
    name: "vue-escala-saaty",
    components:{
        vueEscalaSaaty
    },
    data() {
        return{
            mostrarEscala:false,
            menuState: false
        }
    },
    computed:{
        tabView() {
            return this.$store.getters.currentTabViewAtual
        }
    },
    watch:{
        menuState() {
            console.log(this.menuState)
            console.log(this.tabView)
        }
    },
    methods:{
        abrirPopUp(frame) {
            this.$store.dispatch("changePopUp", frame)
        }
    }

}
</script>
<style scoped>
    label{
        background-color: white;
    }
    .menu-container {
        position: absolute;
        right: 18px;
        top: 56px;
        z-index: 10;
        display: flex;
        flex-direction: column;
    }

    @media (min-width: 1920px) {
        .menu-container {
            top: 62px;
            right: 22px;
        }
    }

    @media (min-width: 2560px) {
        .menu-container {
            top: 70px;
            right: 26px;
        }
    }

    .menu-itens-container{
        transform: translateY(10px);
        display: flex;
        flex-direction: column;
    }
    .label-menu-ahp {
        border: var(--borda-simples);
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 140px;
        font-size: 10pt;
        font-weight: bold;
        position: relative;
        align-self: flex-end;
        /* color: var(--cor-texto-tema);
        background-color: var(--cor-tema); */
    }

    /* Correção aqui: */
    .label-menu-ahp:hover {
        cursor: pointer;
        box-shadow: 0 0 10px var(--cor-hover);
        transform: scale(1.1);
    }

    .checkbox-menu-ahp {
        display: none;
    }
    .button-menu-ahp{
        display: none;
    }
    #label-show-menu{
        width: 22px;
        height: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
        border-radius: 50%;
        border: var(--borda-simples);
        font-weight: bold;
        font-size: 11pt;
        text-align: center;
        justify-self: end;
        align-self: end;
        color: var(--cor-texto-tema);
        background-color: var(--cor-tema);
        user-select: none;
        cursor: pointer;
    }

    #label-show-menu:hover{
        transform: scale(1.15);
        cursor: pointer;
    }
    .checkbox-with-label{
        display: none;
    }
</style>
