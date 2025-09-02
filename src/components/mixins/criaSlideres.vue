<script>
export default {
    computed: {
        criteriosPrimeira() {
            return this.$store.getters.currentCriteriosLabelPrimeira
        },
        optionsPrimeira() {
            return this.$store.getters.currentOptionsLabelPrimeira
        },
        criteriosSegunda() {
            return this.$store.getters.currentCriteriosLabelSegunda
        },
        optionsSegunda() {
            return this.$store.getters.currentOptionsLabelSegunda
        },
        currentImportFlag() {
            return this.$store.getters.currentImportFlag
        },
        currentViewProgress() {
            return this.$store.getters.currentViewProgress
        }
    },
    methods: {
        // Cria um arranjo simples a partir do vetor de critérios
        arranjoCriterios() {
            const arranjoCriterios = []
            for (let i = 0; i < this.criteriosSegunda.length; i++) {
                for (let j = 0; j < this.criteriosSegunda.length; j++) {
                    if (i < j) {
                        arranjoCriterios.push(
                            {
                                id: `${i + 1}${j + 1}`,
                                texto: `${this.criteriosSegunda[i]} vs ${this.criteriosSegunda[j]}`,
                                valor: 50
                            }
                        )
                    }
                }
            }
            return arranjoCriterios
        },
        // Cria um arranjo simples a partir do vetor de opções
        arranjoOptions() {
            const arranjoOptions = []
            for (let i = 0; i < this.optionsPrimeira.length; i++) {
                for (let j = 0; j < this.optionsPrimeira.length; j++) {
                    if (i < j) {
                        arranjoOptions.push(
                            {
                                id: `${i + 1}${j + 1}`,
                                texto: `${this.optionsPrimeira[i]} vs ${this.optionsPrimeira[j]}`,
                                valor: 50
                            }
                        )
                    }
                }
            }
            return arranjoOptions
        },
        // Cria os slideres da primeira etapa a partir do arranjo de opções
        criaSlideresPrimeira() {
            const slideres = []
            for (let i = 0; i < this.criteriosPrimeira.length; i++) {
                slideres.push(
                    this.arranjoOptions()
                )
            }
            console.log("Slideres da primeira etapa: ", slideres)
            return slideres
        },
        // Cria os slideres da segunda etapa a partir do arranjo de critérios
        criaSlideresSegunda() {
            const slideres = this.arranjoCriterios()
            console.log("Slideres da segunda etapa: ", slideres)
            return slideres
        },
        mergeSlideresMatrix(oldSlideres, newSlideres) {
            // Clona estrutura do novo slider para não alterar o original
            const mergedSlideres = JSON.parse(JSON.stringify(newSlideres))

            for (let i = 0; i < newSlideres.length; i++) {
                for (let j = 0; j < newSlideres[i].length; j++) {

                    // Verifica se o elemento existe na matriz antiga
                    if (oldSlideres[i] && oldSlideres[i][j]) {
                        // Atualiza apenas se existir no antigo
                        mergedSlideres[i][j].texto = oldSlideres[i][j].texto
                        mergedSlideres[i][j].valor = oldSlideres[i][j].valor
                    }
                }
            }


            return mergedSlideres
        },
        mergeSlideresVetor(oldSlideres, newSlideres) {
            // Clona estrutura do novo slider para não alterar o original
            const mergedSlideres = JSON.parse(JSON.stringify(newSlideres))

            for (let i = 0; i < newSlideres.length; i++) {

                // Verifica se o elemento existe no vetor antigo
                if (oldSlideres[i] && oldSlideres[i]) {
                    // Atualiza apenas se existir no antigo
                    mergedSlideres[i].texto = oldSlideres[i].texto
                    mergedSlideres[i].valor = oldSlideres[i].valor
                }
            }

            return mergedSlideres
        },
        criaSlideres() {
            const newSlideresPrimeira = this.criaSlideresPrimeira()
            const newSlideresSegunda = this.criaSlideresSegunda()
            // Cria novos slideres
            if (!this.currentImportFlag) {
                console.log("Criando Slideres")
                this.$store.dispatch("changeSlideresPrimeira", newSlideresPrimeira)
                this.$store.dispatch("changeSlideresSegunda", newSlideresSegunda)
            }

            // Adiciona novos slideres aos antigos sem resetar valores
            if(this.currentImportFlag) {
                console.log("Mesclando novos Slideres")
                const oldSlideresPrimeira = this.$store.getters.currentSlideresPrimeira
                const oldSlideresSegunda = this.$store.getters.currentSlideresSegunda
                const mergedSlideresPrimeira = this.mergeSlideresMatrix(oldSlideresPrimeira, newSlideresPrimeira)
                const mergedSlideresSegunda = this.mergeSlideresVetor(oldSlideresSegunda, newSlideresSegunda)
                this.$store.dispatch("changeSlideresPrimeira", mergedSlideresPrimeira)
                this.$store.dispatch("changeSlideresSegunda", mergedSlideresSegunda)
            }
        }
    }
}
</script>