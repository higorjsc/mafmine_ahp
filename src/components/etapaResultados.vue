<template>
    <vueMenuAhp/>

    <section class="section-resultados">

        <div class="container-resultados-wrapper">
            <div
                class="container-centro"
            >
                <table
                    class="matriz-resultados"
                >
                    <tr class="tr-titulo-tabela">
                        <th
                            :colspan="criteriosSegunda.length + 1"
                            class="th-titulo-tabela"
                        >
                            <h3>{{ $t('matrizPrioridadesGlobais') }}</h3>
                        </th>
                    </tr>
                    <tr>
                        <th
                            class="th-titulo-coluna th-vazio"
                        > </th>
                        <th
                            class="th-titulo-linha"
                            v-for="(itemCriterio, indexCriterio) in criteriosSegunda"
                            :key="indexCriterio"
                        >
                            {{ itemCriterio }}
                        </th>
                    </tr>
                    <tr>
                        <th
                            class="th-titulo-coluna"
                        >
                            {{ $t('tituloPesoGlobal') }}
                        </th>
                        <td
                            v-for="(pesoGlobal, indexPesoGlobal) in matrizSegunda[matrizSegunda.length-1]['pesos']"
                            :key="indexPesoGlobal"
                        >
                            {{ pesoGlobal.toFixed(4) }}
                        </td>
                    </tr>

                    <tr
                        v-for="(itemOption,indexOption) in optionsSegunda"
                        :key="indexOption"
                    >
                        <th
                            class="th-titulo-coluna"
                        >
                            {{ itemOption }}
                        </th>
                        <td
                            v-for="(pesoCriterio,indexPesoCriterio) in matrizPrimeira"
                            :key="indexPesoCriterio"
                        >
                            {{ pesoCriterio[pesoCriterio.length-1]['pesos'][indexOption].toFixed(4) }}
                        </td>
                    </tr>

                </table>
            </div>
            <div
                class="container-vetor-resultado"
            >
                <table
                    class="vetor-resultado"
                >
                    <tr class="tr-titulo-tabela">
                        <th
                            :colspan="optionsSegunda.length"
                            class="th-titulo-tabela"
                        >
                            <h3>{{ $t('vetorPrioridadeGlobal') }}</h3>
                        </th>
                    </tr>
                    <tr>
                        <th
                            class="th-titulo-linha"
                            v-for="(itemOption, indexOption) in optionsSegunda"
                            :key="indexOption"
                        >
                            {{itemOption}}
                        </th>
                    </tr>
                    <tr>
                        <td
                            v-for="(itemOption, indexOption) in resultadoFinal()"
                            :key="indexOption"
                        >
                            {{itemOption.toFixed(4)}}
                        </td>
                    </tr>

                </table>
            </div>
        </div>

        <vueButtonProjectControl/>

    </section>
</template>
<script>
import vueMenuAhp from "@/components/helpButton.vue"
import vueButtonProjectControl from "@/components/buttonProjectControl.vue"
export default {
    name: "vue-resultados-etapa",
    components:{
        vueMenuAhp,
        vueButtonProjectControl
    },
    computed: {
        matrizPrimeira() {
            return this.$store.getters.currentMatrizPrimeira
        },
        matrizSegunda() {
            return this.$store.getters.currentMatrizSegunda
        },
        criteriosSegunda() {
            return this.$store.getters.currentCriteriosLabelSegunda
        },
        optionsSegunda() {
            return this.$store.getters.currentOptionsLabelSegunda
        }
    },
    methods: {
        resultadoFinal() {
            const primeira = this.matrizPrimeira
            const segunda = this.matrizSegunda
            if (!primeira || !primeira.length || !segunda || !segunda.length) {
                return []
            }
            const pesosCriterios = segunda[segunda.length - 1]["pesos"]
            const numOpcoes = this.optionsSegunda.length
            const numCriterios = primeira.length

            const resultado = []
            for (let k = 0; k < numOpcoes; k++) {
                let soma = 0
                for (let c = 0; c < numCriterios; c++) {
                    const pesoCriterio = pesosCriterios[c] || 0
                    const pesoOpcaoNoCriterio = (primeira[c] && primeira[c][primeira[c].length - 1]["pesos"][k]) || 0
                    soma += pesoCriterio * pesoOpcaoNoCriterio
                }
                resultado.push(soma)
            }
            return resultado
        }
    }
}

</script>
<style scoped>
.section-resultados{
    width: 100%;
    box-sizing: border-box;
    padding: 20px 20px 70px;
    min-height: 600px;
    max-height: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
}
.container-resultados-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    width: 100%;
    max-width: 100%;
    overflow-x: auto;
}
.container-centro, .container-vetor-resultado{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 0 24px 0;
    width: 100%;
}
.tr-titulo-tabela {
    border: none;
    background: transparent;
}
.th-vazio {
    border: none !important;
    background: transparent !important;
    box-shadow: none !important;
}
.th-titulo-tabela {
    border: none !important;
    background: transparent !important;
    text-align: center;
    padding: 10px 0 16px;
    box-shadow: none !important;
}
.th-titulo-tabela h3 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: bold;
    text-align: center;
}
.container-vetor-resultado{
    user-select: none;
}
.matriz-resultados, .vetor-resultado{
    width: auto;
    margin: 0 auto;
    border-collapse: collapse;
}
.matriz-resultados td, .vetor-resultado td{
    width: 105px;
    min-width: 105px;
    padding: 8px 12px;
    text-align: center;
    border: var(--borda-simples);
    background-color: var(--cor-tema-alt);
    color: var(--cor-texto-tema);
    font-size: 0.95rem;
    box-sizing: border-box;
}
.th-titulo-coluna{
    width: 180px;
    min-width: 180px;
    font-size: 1rem;
    font-weight: bold;
    text-align: left;
    padding: 6px 12px;
    box-sizing: border-box;
}
.th-titulo-linha{
    width: 105px;
    min-width: 105px;
    font-size: 1rem;
    font-weight: bold;
    height: 44px;
    text-align: center;
    padding: 6px 12px;
    box-sizing: border-box;
}

@media (min-width: 1920px) {
    .matriz-resultados td, .vetor-resultado td {
        width: 120px;
        min-width: 120px;
        padding: 10px 16px;
        font-size: 1.05rem;
    }
    .th-titulo-coluna {
        width: 210px;
        min-width: 210px;
        font-size: 1.1rem;
    }
    .th-titulo-linha {
        width: 120px;
        min-width: 120px;
        font-size: 1.1rem;
        height: 50px;
    }
}

@media (min-width: 1920px) and (min-height: 900px) {
    .section-resultados {
        min-height: 700px;
        max-height: 700px;
    }
}

@media (min-width: 2560px) {
    .matriz-resultados td, .vetor-resultado td {
        width: 140px;
        min-width: 140px;
        padding: 12px 20px;
        font-size: 1.2rem;
    }
    .th-titulo-coluna {
        width: 250px;
        min-width: 250px;
        font-size: 1.25rem;
    }
    .th-titulo-linha {
        width: 140px;
        min-width: 140px;
        font-size: 1.25rem;
        height: 56px;
    }
}

@media (min-width: 2560px) and (min-height: 1200px) {
    .section-resultados {
        min-height: 820px;
        max-height: 820px;
    }
}
</style>