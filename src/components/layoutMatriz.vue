<template>

    <div>
        <table
            class="matriz"
            :name="idMatriz"
            :ref="idMatriz"
        >
            <!-- Linha de título -->
            <tr
                class="linha-titulo"
            >
                <th></th>
                <th
                    class="th-titulo-linha"
                    v-for="(item, optionIndex) in optionMatriz"
                    :key="optionIndex"
                >
                    {{ item }}
                </th>

            </tr>
            <!-- Demais linhas -->
            <tr
                v-for="(item, optionIndex) in optionMatriz"
                :key="optionIndex"
                class="linha-valores"
            >
                <th
                    class="th-titulo-coluna"
                >
                    {{ item }}
                </th>
                <td
                    v-for="(item, valueIndex) in valueMatriz[optionIndex]"
                    :key="valueIndex"
                    class="celulas-valores"
                    :ref="`${optionIndex+1}${valueIndex+1}`"
                    :id="`td-${optionIndex+1}${valueIndex+1}`"
                >
                    {{valueMatriz[optionIndex][valueIndex]>=1 ? valueMatriz[optionIndex][valueIndex].toFixed(0) : `1/${(1/valueMatriz[optionIndex][valueIndex]).toFixed(0)}`}}
                </td>

            </tr>

        </table>
    </div>
</template>
<script>
export default {
    name: "vue-matriz",
    props: {
        idMatriz: {
            type: String,
            default: ""
        },
        optionMatriz: {
            type: Array, // Define o tipo esperado como um array
            default: () => [] // Define um valor padrão como um array vazio
        },
        valueMatriz: {
            type: Array, // Define o tipo esperado como um array
            default: () => [
                [1, 1, 1, 1],
                [1, 1, 1, 1],
                [1, 1, 1, 1],
                [1, 1, 1, 1]
            ] // Define um valor padrão como um array vazio
        }
    }
}

</script>
<style scoped>

    .matriz{
        width: 100%;
        height: 100%;
        border-collapse: separate;
        border-spacing: 2px;
    }

    .matriz tr{
        justify-content: space-evenly;
    }
    .linha-valores{
        height: 44px;
    }
    .matriz td{
        min-width: 76px;
        width: 76px;
        height: 44px;
        box-sizing: border-box;
        text-align: center;
        border: var(--borda-simples);
        background-color: var(--cor-tema-alt);
        color: var(--cor-texto-tema);
        font-size: 1.05rem;
        transition: transform 0.15s ease, box-shadow 0.15s ease;
    }
    .th-titulo-coluna{
        min-width: 48px;
        width: 48px;
        font-size: 1.05rem;
        font-weight: bold;
        text-align: center;
        height: 44px;
        box-sizing: border-box;
    }
    .th-titulo-linha{
        font-size: 1.1rem;
        font-weight: bold;
        height: 48px;
        box-sizing: border-box;
        text-align: center;
    }

    @media (min-width: 1920px) {
        .linha-valores, .matriz td{
            height: 50px;
            min-width: 92px;
            width: 92px;
            font-size: 1.2rem;
        }
        .th-titulo-coluna{
            height: 50px;
            min-width: 56px;
            width: 56px;
            font-size: 1.2rem;
        }
        .th-titulo-linha{
            height: 52px;
            font-size: 1.25rem;
        }
    }

    @media (min-width: 2560px) {
        .linha-valores, .matriz td{
            height: 58px;
            min-width: 110px;
            width: 110px;
            font-size: 1.35rem;
        }
        .th-titulo-coluna{
            height: 58px;
            min-width: 68px;
            width: 68px;
            font-size: 1.35rem;
        }
        .th-titulo-linha{
            height: 60px;
            font-size: 1.4rem;
        }
    }
</style>