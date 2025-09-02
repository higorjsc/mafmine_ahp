
<template>
    <vueMenuAhp/>

    <!-- SEÇÃO DOS INPUTS -->
    <section
        class="section-esquerda"
    >
        <!-- Titulo matriz em edição -->
        <h3>
            {{ matrizAtual }}
        </h3>

        <div
            v-for="(itemParent, indexParent) in criteriosPrimeira"
            :key="indexParent"
        >
            <div
                v-if="itemParent === matrizAtual"
                class="container-esquerda"
            >
                <vueButtonSlider
                    v-for="(itemChildren, indexChildren) in sliderStore[0]"
                    :key="indexChildren"
                    :id="`${indexChildren}`"
                    :classe="`${indexParent}`"
                    :name="`slider-${indexParent+1}-${indexChildren+2}`"
                    :texto="itemChildren.texto"
                    :valor="sliderStore[indexParent][indexChildren].valor"
                    @slider-value="handleInputValue"
                />
            </div>

        </div>
    </section>

    <!-- SEÇÃO DAS MATRIZES -->
    <section
        class="section-direita section-direita-primeira"
    >
        <div
            class="container-direita"
            v-for="(itemCriterio, indexMatriz) in criteriosPrimeira"
            :key="indexMatriz"
        >
            <h3>
                {{ itemCriterio }}
            </h3>

            <div
                class="container-matriz-vetor"
                id="matriz"
            >
                <vueMatriz
                    :idMatriz="itemCriterio"
                    :optionMatriz="optionsPrimeira"
                    :valueMatriz="matrizValores[indexMatriz]"
                    @click="trocaMatrizInputAtual(itemCriterio)"
                />
                <div
                    class="container-vetor-cons"
                >
                    <vueVetor
                        tituloVetor="Peso"
                        :idVetor="itemCriterio"
                        :valueVetor="vetorPeso(indexMatriz)"
                        @click="trocaMatrizInputAtual(itemCriterio)"
                    />
                    <vueConsistencia
                        :RI="consistencia(indexMatriz, 'ri')"
                        :CI="consistencia(indexMatriz, 'ci')"
                        :CR="consistencia(indexMatriz, 'cr')"
                        :lambda="consistencia(indexMatriz, 'lambda')"
                    />
                </div>
            </div>
        </div>

    </section>

</template>
<script>
import vueButtonSlider from "@/components/buttonSlider.vue"
import vueMatriz from "@/components/layoutMatriz.vue"
import vueVetor from "@/components/layoutVetor.vue"
import vueConsistencia from "@/components/layoutConsistencia.vue"
import functionsAhpMixin from "@/components/mixins/functionsAhp.vue"
import _ from "lodash"
import { RI } from "@/assets/javascript/globalConstants.js"
import vueMenuAhp from "@/components/helpButton.vue"
import saveProjectMixin from "./mixins/saveProject.vue"

export default {
    name: "vue-primeira-etapa",
    components: {
        vueButtonSlider,
        vueMatriz,
        vueVetor,
        vueConsistencia,
        vueMenuAhp
    },
    mixins:[
        functionsAhpMixin,
        saveProjectMixin
    ],
    data() {
        return {
            sliderStore: [] // Matriz: Armazena um arranjo simples das opções para cada critério
        }
    },
    computed: {
        matrizAtual() {
            return this.$store.getters.currentMatrizInputAtual
        },
        matrizValores() {
            return this.$store.getters.currentMatrizPrimeira
        },
        slideres() {
            return this.$store.getters.currentSlideresPrimeira
        },
        criteriosPrimeira() {
            return this.$store.getters.currentCriteriosLabelPrimeira
        },
        optionsPrimeira() {
            return this.$store.getters.currentOptionsSimboloPrimeira
        }
    },
    created() {
        // Obtém os slideres armazenados para a primeira etapa
        this.sliderStore = this.$store.getters.currentSlideresPrimeira
        this.changeMatrix()
        // Define a matriz em edição no loading
        this.$store.dispatch("changeMatrizInputAtual", this.criteriosPrimeira[0])
        this.debouncedChangeMatrix = _.debounce(this.changeMatrix, 100)
    },
    mounted() {
        this.changeMatrixColor()
        setTimeout(() => {
            this.hoverSlider("primeira")
        }, 200)
    },
    beforeUnmount() {
        this.$store.dispatch("changeSlideresPrimeira", this.sliderStore)
        this.changeMatrix()
    },
    updated() {
        this.saveProject()
    },
    methods: {
        trocaMatrizInputAtual(matrizName) {
            this.$store.dispatch("changeMatrizInputAtual", matrizName)
            this.$store.dispatch("changeSlideresPrimeira", this.sliderStore)
            this.changeMatrixColor(matrizName)
            setTimeout(() => {
                this.hoverSlider("primeira")
            }, 200)
        },
        handleInputValue(value) {
            this.sliderStore[value[0]][value[1]].valor = Number(value[2])
            this.mouseDownSlider(value, "primeira")
            this.debouncedChangeMatrix()
        },
        matrizMaker(index) {
            // Converte a escala e apresenta um número decimal positivo
            const dirValue = (key) => {
                const valor = key[0] === key[1] ? 1.00 : this.conveterEscala(this.sliderStore[index].find(item => item.id === key).valor)
                return valor
            }
            // Converte a escala e apresenta o inverso de um número decimal positivo
            const invValue = (key) => {
                const valor = (1 / this.conveterEscala(this.sliderStore[index].find(item => item.id === key).valor))
                return valor > 1 ? Math.floor(valor) : valor
            }
            const matriz = []
            for (let i = 1; i <= this.optionsPrimeira.length; i++) {
                const linha = []
                for (let j = 1; j <= this.optionsPrimeira.length; j++) {
                    if (i <= j) {
                        linha.push(dirValue(`${i}${j}`))
                    } else {
                        linha.push(invValue(`${j}${i}`))
                    }
                }
                matriz.push(linha)
            }
            return matriz
        },
        changeMatrix() {
            let matrizPrimeira = []
            for (let i = 0; i < this.criteriosPrimeira.length; i++) {
                matrizPrimeira.push(this.matrizMaker(i))
            }
            matrizPrimeira = this.calcula(matrizPrimeira)
            this.$store.dispatch("changeMatrizPrimeira", matrizPrimeira)
        },
        calcula(matrizPrimeira) {

            // Normalização da matriz
            const somaColunaMatriz = (matriz, col, jmax) => {
                let soma = 0
                for (let lin = 0; lin < jmax; lin++) {
                    soma += Number(matriz[lin][col])
                }
                return soma
            }
            const normalizaMatriz = (index) => {
                const matriz = []
                for (let lin = 0; lin < matrizPrimeira[index].length; lin++) {
                    const linha = []
                    for (let col = 0; col < matrizPrimeira[index][lin].length; col++) {
                        const celula = Number(matrizPrimeira[index][lin][col]) / somaColunaMatriz(matrizPrimeira[index], col, matrizPrimeira[index].length)
                        linha.push(celula)
                    }
                    matriz.push(linha)
                }
                return matriz
            }
            const normalizada = []
            for (let i = 0; i < matrizPrimeira.length; i++) {
                normalizada.push(normalizaMatriz(i))
            }
            // Cálculo do vetor peso
            const calculaPeso = (index) => {
                const vetor = []
                for (let lin = 0; lin < normalizada[index].length; lin++) {
                    vetor.push(
                        (normalizada[index][lin].reduce((acc, valor) => acc + parseFloat(valor), 0) / normalizada[index][lin].length)
                    )
                }
                return vetor
            }
            const pesos = []
            for (let i = 0; i < normalizada.length; i++) {
                pesos.push(calculaPeso(i))
            }
            // Cálculo do vetor WS
            const calculaWs = (index) => {
                const vetor = []
                for (let lin = 0; lin < matrizPrimeira[index].length; lin++) {
                    const soma = []
                    for (let col = 0; col < matrizPrimeira[index].length; col++) {
                        soma.push(Number(pesos[index][col]) * Number(matrizPrimeira[index][lin][col]))
                    }
                    vetor.push(soma.reduce((acc, valor) => acc + valor, 0))
                }
                return vetor
            }
            const ws = []
            for (let i = 0; i < matrizPrimeira.length; i++) {
                ws.push(calculaWs(i))
            }
            // Cálculo do vetor consistencia
            const calculaConsistence = (index) => {
                const vetor = []
                for (let i = 0; i < pesos[index].length; i++) {
                    vetor.push(ws[index][i] / pesos[index][i])
                }
                return vetor
            }
            const consistence = []
            for (let i = 0; i < pesos.length; i++) {
                consistence.push(calculaConsistence(i))
            }
            // Cálculo do lambda
            const lambda = []
            for (let i = 0; i < consistence.length; i++) {
                lambda.push(
                    consistence[i].reduce((acc, valor) => acc + valor, 0) / consistence[i].length
                )
            }
            // Cálculo do CI
            const consistenceIndex = []
            const n = (matrizPrimeira[0].length)
            for (let i = 0; i < consistence.length; i++) {
                consistenceIndex.push(
                    (lambda[i] - n) / (n - 1)
                )
            }
            // Cálculo do CR (RI importado de globalConstants.js)
            const consistenceRatio = []
            for (let i = 0; i < consistence.length; i++) {
                consistenceRatio.push(
                    consistenceIndex[i] / (RI[n])
                )
            }
            // Armazenamento de valores calculados na matrizPrimeira
            const armazenaCalculos = (index) => {
                const objeto = {
                    normalizada: normalizada[index],
                    pesos: pesos[index],
                    ws: ws[index],
                    cons: consistence[index],
                    lambda: lambda[index],
                    ci: consistenceIndex[index],
                    cr: consistenceRatio[index],
                    ri: RI[n],
                    n: n
                }
                return objeto
            }
            for (let index = 0; index < matrizPrimeira.length; index++) {
                matrizPrimeira[index].push(armazenaCalculos(index))
            }
            console.log("matrizPrimeira", matrizPrimeira)
            return matrizPrimeira
        },
        vetorPeso(index) {
            return (this.matrizValores[index][this.matrizValores[index].length - 1]["pesos"])
        },
        consistencia(index, item) {
            return (this.matrizValores[index][this.matrizValores[index].length - 1][item])
        }
    }
}
</script>
<style scoped>
.section-direita-primeira{
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
}

</style>