
<template>


    <footer
        class="footer-container"
    >

        <img
            id="ufrgs" src="@\assets\Imagens\ufrgs.png"
            alt="logo_ufrgs_img"
        >

        <div class="div-esquerda">
            <ul
                class="ul-esquerda"
            >
                <li
                    v-for="(item, index) in dadosFooter"
                    :id="item.id"
                    :key="index"
                >
                    {{ $t(item.texto) }}
                </li>

            </ul>
        </div>

        <div class="div-direita">
            <ul
                class="ul-direita"
            >
                <li
                    v-for="(item, index) in linksFooter"
                    :id="item.id"
                    :key="index"
                    @click="abrirPopUp(item.id)"
                >
                    {{ $t(item.texto) }}
                </li>
            </ul>

        </div>

        <img
            id="laprom" src="@\assets\Imagens\laprom.png"
            alt="logo_laprom_png"
        >

    </footer>
</template>

<script>
export default {
    name: "vue-footer",
    data() {
        return{
            linksFooter:[
                {
                    id: "creditos-footer",
                    texto: "creditosFooter"
                },
                {
                    id: "referencias-footer",
                    texto: "referenciasFooter"
                },
                {
                    id: "reportarErro-footer",
                    texto: "reportarErroFooter"
                }
            ],
            dadosFooter:[
                {
                    id: "universidade-footer",
                    texto: "universidadeFooter"
                },
                {
                    id: "laboratorio-footer",
                    texto: "laboratorioFooter"
                },
                {
                    id: "localizacao-1-footer",
                    texto: "localizacaoUmFooter"
                },
                {
                    id: "localizacao-2-footer",
                    texto: "localizacaoDoisFooter"
                }
            ]
        }
    },
    methods: {
        abrirPopUp(frame) {
            this.$store.dispatch("changePopUp", frame.split("-")[0])
        }
    }
}

</script>

<style scoped>
    footer{
        display: flex;
        background-color: var(--cor-tema);
        border-radius: 30px;
        width: 98%;
        margin: 8px auto 0;
        justify-content: space-around;
        align-items: center;
        color: var(--cor-texto-tema);
        border: var(--borda-simples);
        box-sizing: border-box;
    }
    div{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .div-esquerda{
        min-width: 50%;
    }
    .div-direita{
        min-width: 10%;
    }
    .div-direita ul li:hover{
        cursor: pointer;
        text-decoration: underline;
    }
    #ufrgs{
        transform: scale(0.7);
    }
    #laprom{
        transform: scale(0.9);
    }
    ul{
        list-style: none;
    }

@media (max-width:800px) {
    #ufrgs{
        display: none;
    }
    #laprom{
        display: none;
    }
}

</style>
