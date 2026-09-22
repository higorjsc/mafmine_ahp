<template>

    <div
        class="vetor-container"
    >
        <table
            class="vetor matriz"
            :name="idVetor"
        >
            <tr>
                <th
                    class="th-titulo-vetor"
                >{{ tituloVetor }}</th>
            </tr>
            <tr
                v-for="(item, index) in valueVetor"
                :key="index"
                class="linha-valores"
            >
                <td
                    class="celulas-valores"
                >
                    {{ item.toFixed(4) }}
                </td>

            </tr>

        </table>
    </div>
</template>
<script>
export default {
    name: "vue-vetor",
    props: {
        tituloVetor: {
            type: String,
            default: ""
        },
        idVetor: {
            type: String,
            default: ""
        },
        valueVetor: {
            type: Array, // Define o tipo esperado como um array
            default: () => [1, 1, 1, 1] // Define um valor padrão como um array vazio
        }
    },
    data() {
        return {

        }
    }
}

</script>
<style scoped>

    .vetor-container{
        display: flex;
        flex-direction: row;
    }

    .vetor{
        border-collapse: separate;
        border-spacing: 2px;
    }
    .vetor:hover{
        cursor: pointer;
    }
    .vetor tr{
        justify-content: space-evenly;
    }
    .linha-valores{
        height: 44px;
    }
    .vetor td{
        min-width: 76px;
        width: 76px;
        height: 44px;
        box-sizing: border-box;
        text-align: center;
        background-color: var(--cor-tema-alt);
        color: var(--cor-texto-tema);
        border: var(--borda-simples);
        font-size: 1.05rem;
        transition: transform 0.15s ease, box-shadow 0.15s ease;
    }
    .th-titulo-vetor{
        font-size: 1.1rem;
        font-weight: bold;
        height: 48px;
        box-sizing: border-box;
        text-align: center;
    }

    @media (min-width: 1920px) {
        .linha-valores, .vetor td{
            height: 50px;
            min-width: 92px;
            width: 92px;
            font-size: 1.2rem;
        }
        .th-titulo-vetor{
            height: 52px;
            font-size: 1.25rem;
        }
    }

    @media (min-width: 2560px) {
        .linha-valores, .vetor td{
            height: 58px;
            min-width: 110px;
            width: 110px;
            font-size: 1.35rem;
        }
        .th-titulo-vetor{
            height: 60px;
            font-size: 1.4rem;
        }
    }

</style>