<template>

    <div class="switch-container">
        <input type="checkbox" v-model="switchLanguage" class="switch" id="switch"/>
        <label for="switch" id="switch-language">
            <span
                v-if="!lang"
                class="pt"
            >
                {{ $t('ptSwitchLanguage') }}
            </span>
            <span
                v-if="lang"
                class="en"
            >
                {{ $t('enSwitchLanguage') }}
            </span>
        </label>
    </div>

</template>

<script>
import { verificarLocal, armazenarLocal } from "@/assets/javascript/globalFunctions.js"
export default {
    name: "vue-switch-language",
    data() {
        return {
            switchLanguage: false
        }
    },
    computed: {
        lang() {
            return this.$store.getters.currentLanguage === "pt"
        }
    },
    watch: {
        switchLanguage() {
            this.Language()
        }
    },
    mounted() {
        // Verifica a preferencia de idioma da localStorage
        this.switchLanguage = verificarLocal("switch-language")
        if(!this.switchLanguage) {
            this.switchLanguage = false
        }
    },
    updated() {
        armazenarLocal("switch-language", this.switchLanguage)
    },
    methods: {
        Language() {
            this.switchLanguage ? this.$store.dispatch("changeLanguage", "en") : this.$store.dispatch("changeLanguage", "pt")
        }
    }
}

</script>

<style scoped>

    .switch-container{
        position: absolute;
        right: 5%;
        top: 6.5%;
    }
    .switch {
        display: none;
    }

    span {
        color: var(--cor-texto-tema);
        display: flex;
        flex-wrap: wrap;
        align-content: center;
        box-sizing: border-box;
        padding: 10%;
        font-size: 8pt;
        z-index: 2;
        height: 80%;
        user-select: none;
    }
    .en{
        position: absolute;
        right: 8%;
    }
    .pt{
        position: absolute;
        left:6%;
    }

    label {
        display: flex;
        align-items: center;
        cursor: pointer;
        width: 50px;
        height: 20px;
        background-color: var(--cor-tema);
        border-radius: 15px;
        box-shadow: var(--shadow-tema)
    }
    label:hover {
        box-shadow: 0 0 20px var(--cor-tema);
        font: 12pt;
        font-weight: bold;
    }
    label::after {
        content: '';
        display: block;
        width: 19px;
        height: 17px;
        border-radius: 50%;
        background-color: white;
        position: absolute;
        top: 2px;
        transition: transform 0.2s ease-in-out;
    }

    label:hover::after {
        box-shadow: 0 0 20px var(--cor-tema);
        font: 12pt;
        font-weight: bold;
    }

    #switch:checked + label::after {
        transform: translateX(30px);
    }

</style>
