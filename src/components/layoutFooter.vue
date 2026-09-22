
<template>


    <footer
        class="footer-container"
    >

        <img
            id="ufrgs" src="@/assets/Imagens/ufrgs_branca_png.svg"
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
            id="laprom" src="@/assets/Imagens/laprom_svg.svg"
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
        padding: 8px 16px;
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
        height: 56px;
        max-height: 65px;
        width: auto;
        object-fit: contain;
    }
    #laprom{
        height: 50px;
        max-height: 60px;
        width: auto;
        object-fit: contain;
    }
    ul{
        list-style: none;
    }

@media (min-width: 1920px) {
    #ufrgs{
        height: 70px;
        max-height: 80px;
    }
    #laprom{
        height: 62px;
        max-height: 72px;
    }
}

@media (min-width: 2560px) {
    #ufrgs{
        height: 84px;
        max-height: 95px;
    }
    #laprom{
        height: 76px;
        max-height: 88px;
    }
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
