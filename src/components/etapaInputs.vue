<template>

    <section
        class="section-inputs"
    >
        <div
            class="container-criterios"
        >
            <h2>
                {{ $t('mcdmTituloCriterios') }}
            </h2>

            <div
                class="label-container"
            >
                <label
                    class="label-simbolo"
                >
                    {{ $t('inputSimboloLabel') }}
                </label>
                <label
                    class="label-nome"
                >
                    {{ $t('inputNomeLabelCriterios') }}
                </label>
            </div>

            <div
                v-for="(item, index) in criteriosLabelPrimeira"
                :key="index"
                class="label-criterios"
            >
                <label
                    class="criterio-option-index"
                >
                    {{ index+1 }} - &ensp;
                </label>
                <input
                    class="simbolo-criterios input-simbolo"
                    v-model="criteriosSimboloPrimeira[index]"
                    maxlength="5"
                    @blur="checkBlankText('criteriosSimboloPrimeira', index, 'C')"
                >
                <input
                    class="input-criterios input-label"
                    v-model="criteriosLabelPrimeira[index]"
                    maxlength="20"
                    @blur="checkBlankText('criteriosLabelPrimeira', index, 'Criterion-')"
                >
                <button
                    @click="removeCriterio(index)"
                    class="remove-button"
                    tabindex="-1"
                > - </button>
                <button
                    @click="addCriterio()"
                    class="add-button"
                    tabindex="-1"
                    v-if="index == criteriosLabelPrimeira.length - 1"
                > + </button>
            </div>
        </div>

        <!-- OPÇÕES E BOTÕES DE ADICIONAR OPÇÕES -->
        <div
            class="container-options"
        >
            <h2>
                {{ $t('mcdmTituloOptions') }}
            </h2>
            <div
                class="label-container"
            >
                <label
                    class="label-simbolo"
                >
                    {{ $t('inputSimboloLabel') }}
                </label>
                <label
                    class="label-nome"
                >
                    {{ $t('inputNomeLabelOptions') }}
                </label>
            </div>
            <div
                v-for="(item, index) in optionsLabelPrimeira"
                :key="index"
            >
                <label>
                    {{ index+1 }} - &ensp;
                </label>
                <input
                    class="simbolo-criterios input-simbolo"
                    v-model="optionsSimboloPrimeira[index]"
                    maxlength="5"
                    @blur="checkBlankText('optionsSimboloPrimeira', index, 'O')"
                >
                <input
                    class="input-options input-label"
                    v-model="optionsLabelPrimeira[index]"
                    maxlength="20"
                    @blur="checkBlankText('optionsLabelPrimeira', index, 'Option-')"
                >
                <button
                    @click="removeOption(index)"
                    class="remove-button"
                    tabindex="-1"
                > - </button>
                <button
                    @click="addOption()"
                    class="add-button"
                    tabindex="-1"
                    v-if="index == optionsLabelPrimeira.length - 1"
                >+</button>
            </div>
        </div>
        <vueButtonProjectControl
            @update-view="importHandler()"
        />
    </section>
</template>
<script>

import vueButtonProjectControl from "./buttonProjectControl.vue"
import criaSlideresMixin from "@/components/mixins/criaSlideres.vue"
import saveProjectMixin from "./mixins/saveProject.vue"

export default {
    name: "vue-inputs-etapa",
    components:{
        vueButtonProjectControl
    },
    mixins: [
        criaSlideresMixin,
        saveProjectMixin
    ],
    data() {
        return {
            optionsLabelPrimeira: [
                "Option-1",
                "Option-2",
                "Option-3",
                "Option-4"
            ],
            optionsSimboloPrimeira: [
                "O1",
                "O2",
                "O3",
                "O4"
            ],
            criteriosLabelPrimeira: [
                "Criterion-1",
                "Criterion-2",
                "Criterion-3",
                "Criterion-4"
            ],
            criteriosSimboloPrimeira: [
                "C1",
                "C2",
                "C3",
                "C4"
            ]
        }
    },
    computed:{
        currentOptionsLabelPrimeira() {
            return this.$store.getters.currentOptionsLabelPrimeira
        },
        currentOptionsSimboloPrimeira() {
            return this.$store.getters.currentOptionsSimboloPrimeira
        },
        currentCriteriosLabelPrimeira() {
            return this.$store.getters.currentCriteriosLabelPrimeira
        },
        currentCriteriosSimboloPrimeira() {
            return this.$store.getters.currentCriteriosSimboloPrimeira
        }
    },
    updated() {
        this.saveProject()
    },
    mounted() {
        this.updateFromStore()
        this.criaSlideres()
    },
    beforeUnmount() {
        this.updateFromStore()
        this.criaSlideres()
        this.saveProject()
    },
    methods: {
        importHandler() {
            this.$store.dispatch("changeImportFlag", true)
            this.updateFromStore()
        },
        updateFromStore() {
            if (this.currentOptionsLabelPrimeira.length > 0) {
                this.optionsLabelPrimeira = this.currentOptionsLabelPrimeira
            }
            if (this.currentCriteriosLabelPrimeira.length > 0) {
                this.criteriosLabelPrimeira = this.currentCriteriosLabelPrimeira
            }
            if (this.currentOptionsSimboloPrimeira.length > 0) {
                this.optionsSimboloPrimeira = this.currentOptionsSimboloPrimeira
            }
            if (this.currentCriteriosSimboloPrimeira.length > 0) {
                this.criteriosSimboloPrimeira = this.currentCriteriosSimboloPrimeira
            }
            try {
                // Labels
                this.$store.dispatch("changeCriteriosLabelPrimeira", this.criteriosLabelPrimeira)
                this.$store.dispatch("changeCriteriosLabelSegunda", this.criteriosLabelPrimeira)
                this.$store.dispatch("changeOptionsLabelPrimeira", this.optionsLabelPrimeira)
                this.$store.dispatch("changeOptionsLabelSegunda", this.optionsLabelPrimeira)
                // Simbolos
                this.$store.dispatch("changeCriteriosSimboloPrimeira", this.criteriosSimboloPrimeira)
                this.$store.dispatch("changeCriteriosSimboloSegunda", this.criteriosSimboloPrimeira)
                this.$store.dispatch("changeOptionsSimboloPrimeira", this.optionsSimboloPrimeira)
                this.$store.dispatch("changeOptionsSimboloSegunda", this.optionsSimboloPrimeira)
            } catch (error) {
                console.log("falha no armazenamento", error)
            }
        },
        // IMPEDE QUE O TEXTO DO LABEL DAS OPÇÕES OU CRITÉRIOS SEJAM BRANCOS
        checkBlankText(arrayName, index, prefix) {
            if (this[arrayName][index].trim() === "") {
                this[arrayName][index] = prefix + (index + 1)
            }
        },
        addCriterio() {
            if (this.criteriosLabelPrimeira.length < 9) {
                this.criteriosLabelPrimeira.push(`Criterion-${this.criteriosLabelPrimeira.length + 1}`)
                this.criteriosSimboloPrimeira.push(`C${this.criteriosSimboloPrimeira.length + 1}`)
            } else {
                window.alert("Você atingiu o limite de inputs para o método!")
            }
        },
        removeCriterio(index) {
            if (this.criteriosLabelPrimeira.length > 3) {
                this.criteriosLabelPrimeira.splice(index, 1)
                this.criteriosSimboloPrimeira.splice(index, 1)
            } else {
                window.alert("Você deve análisar no mínimo 3 critérios!")
            }
        },
        addOption() {
            if (this.optionsLabelPrimeira.length < 5) {
                this.optionsLabelPrimeira.push(`Option-${this.optionsLabelPrimeira.length + 1}`)
                this.optionsSimboloPrimeira.push(`O${this.optionsSimboloPrimeira.length + 1}`)
            } else {
                window.alert("Você atingiu o limite de opções para o método!")
            }
        },
        removeOption(index) {
            if (this.optionsLabelPrimeira.length > 3) {
                this.optionsLabelPrimeira.splice(index, 1)
                this.optionsSimboloPrimeira.splice(index, 1)
            } else {
                window.alert("Você deve análisar no mínimo 3 opções!")
            }
        }
    }
}
</script>
<style scoped>

    .section-inputs{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        min-height: 600px;
        max-height: 600px;
    }
    .container-options, .container-criterios{
        width: 50%;
        display: flex;
        flex-direction: column;
        margin-bottom: 40px;
    }
    .container-criterios div, .container-options div{
        display: flex;
        max-height: 25px;
    }

    .criterio-option-index{
        width: 3%;
    }
    .input-simbolo{
        border-radius: 20px;
        text-align: center;
        width: 20%;
    }
    .input-label{
        border-radius: 20px;
        text-align: center;
        width: 60%;
    }

    .label-simbolo{
        width: 26%;
    }
    .label-nome{
        width:57%;
    }

    .label-nome, .label-simbolo{
        font-weight: bold;
        text-align: center;
    }
    .remove-button, .add-button{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        height: 18px;
        width: 18px;
        border: var(--borda-simples);
        border-radius: 50%;
        transform: translateY(1px);
        font-size: 12pt;
        background-color: var(--cor-tema-alt);
        color: var(--cor-texto-tema);
    }
    .add-button:hover, .remove-button:hover {
        cursor: pointer;
        box-shadow: 0 0 10px var(--cor-tema);
    }

</style>