<template>

    <div
        v-if="aberto!==null"
        class='pop-up-container'
        id="pop-up-container"
    >
        <!--  BARRA SUPERIOR DO POP-UP -->
        <div
            class='barra-pop-up'
            id="barra-pop-up"
        >
            <!-- Titulo do Pop Up -->
            <h4 class="titulo-pop-up">
                {{ $t(`${aberto}TituloPopUp`) }}
            </h4>
            <!-- Botão Fechar Pop Up -->
            <button
                class="close-pop-up"
                @click="closePopUp()"
            >
                &times;
            </button>

        </div>

        <div
            class="container-conteudo-pop-up"
        >
            <vueCreditos v-if="aberto === 'creditos'"/>
            <vueReferencias v-if="aberto === 'referencias'"/>
            <vueReportarErro v-if="aberto === 'reportarErro'"/>
            <vueMaisSobreAhp v-if="aberto === 'maisSobreAhp'"/>
            <vueHelpPassosAhp v-if="aberto === 'passosAhp'"/>
        </div>

    </div>

</template>

<script>
import vueCreditos from "@/components/popUpCreditos.vue"
import vueReportarErro from "@/components/popUpReportarErro.vue"
import vueReferencias from "@/components/popUpReferencias.vue"
import vueMaisSobreAhp from "@/components/popUpReferencias.vue"
import vueHelpPassosAhp from "@/components/helpPassosAhp.vue"
export default {
    components: {
        vueCreditos,
        vueReferencias,
        vueReportarErro,
        vueMaisSobreAhp,
        vueHelpPassosAhp
    },
    data() {
        return {
            popUpContainer: null,
            popUpBarra: null,
            limite: {
                right: 0,
                left: 0,
                top: 0,
                bottom: 0
            },
            position: {
                x: 0,
                y: 0
            }
        }
    },
    computed: {
        aberto() {
            return this.$store.getters.currentPopUp
        }
    },
    updated() {
        this.popUpContainer = document.querySelector("#pop-up-container")
        this.popUpBarra = document.querySelector("#barra-pop-up")
        this.prepararMovimento()
    },
    methods: {
        interromperMovimento() {
            // Interrompe o movimento do pop up
            document.removeEventListener("mousemove", this.moverPopUp)
        },
        moverPopUp(event) {
            // Define a coordenada do movimento
            let x = event.clientX - this.position.x
            let y = event.clientY - this.position.y
            // Conserva os limites de movimento estabelecidos caso ultrapassados
            x = x < this.limite.left ? this.limite.left : x
            x = x > this.limite.right ? this.limite.right : x
            y = y < this.limite.top ? this.limite.top : y
            y = y > this.limite.bottom ? this.limite.bottom : y
            // Move o pop up enquanto mousedown
            this.popUpContainer.style.left = `${x}px`
            this.popUpContainer.style.top = `${y}px`
        },
        prepararMovimento() {
            // Eventos que interromperão o movimento do pop up
            document.addEventListener("mouseup", this.interromperMovimento)
            document.addEventListener("scroll", this.interromperMovimento)
            document.addEventListener("keydown", this.interromperMovimento)
            document.addEventListener("click", this.interromperMovimento)
            // Adiciona o movimento à barra do pop up
            if (this.popUpBarra) {
                this.popUpBarra.addEventListener("mousedown", (event) => {
                    // Impede o usuário de selecionar textos enquanto arrasta o pop up
                    document.body.style.userSelect = "none"
                    // Calcula a largura e altura do body. Os valores variam com o scroll da página (manter cálculo dentro desse evento)
                    const bodyHeight = document.getElementById("body").clientHeight
                    const bodyWidth = document.getElementById("body").clientWidth
                    // Define a posição do mouse em relação ao pop up
                    this.position.x = event.clientX - this.popUpContainer.offsetLeft
                    this.position.y = event.clientY - this.popUpContainer.offsetTop
                    // Define os this.limites de movimento do pop up
                    this.limite.right = bodyWidth - this.popUpContainer.clientWidth
                    this.limite.bottom = bodyHeight - this.popUpContainer.clientHeight
                    // Chama a função para mover
                    document.addEventListener("mousemove", this.moverPopUp)
                })
            }
        },
        closePopUp() {
            // Restaurar a capacidade de seleção do usuário
            document.body.style.userSelect = "auto"
            // Limpar eventos adicionados durante a movimentação
            document.removeEventListener("scroll", this.interromperMovimento)
            document.removeEventListener("keydown", this.interromperMovimento)
            document.removeEventListener("click", this.interromperMovimento)
            // Fechar o pop-up
            this.$store.dispatch("changePopUp", null)
        }
    }
}

</script>

<style scoped>
    .pop-up-container {
        height: auto;
        width: min(92vw, 540px);
        position: absolute;
        top: 6%;
        left: 36%;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.25);
        background-color: white;
        border: 1px solid black;
        border-radius: 6px;
        overflow: hidden;
        z-index: 100;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        max-height: min(88vh, 560px);
    }
    .container-conteudo-pop-up{
        overflow-y: auto;
        overflow-x: hidden;
        width: 100%;
        padding: 8px;
        box-sizing: border-box;
    }
    .barra-pop-up {
        width: 100%;
        background-color: var(--cor-tema);
        height: 28px;
        display: flex;
        align-items: center;
        z-index: 100;
        position: relative;
    }
    .barra-pop-up:hover {
        cursor: move;
    }
    .titulo-pop-up {
        color: white;
        font-size: 11pt;
        margin: 0;
        margin-left: 10px;
    }
    .titulo-pop-up:hover {
        cursor: move;
    }
    .close-pop-up {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 28px;
        box-sizing: border-box;
        width: 28px;
        right: 0%;
        top: 0%;
        color: white;
        background-color: transparent;
        border: none;
        font-size: 16pt;
        cursor: pointer;
    }
    .close-pop-up:hover {
        color: #ff6b6b;
    }

    @media (min-width: 1920px) {
        .pop-up-container {
            width: 660px;
            max-height: min(88vh, 650px);
        }
        .barra-pop-up {
            height: 32px;
        }
        .titulo-pop-up {
            font-size: 13pt;
        }
        .close-pop-up {
            height: 32px;
            width: 32px;
            font-size: 18pt;
        }
    }

    @media (min-width: 2560px) {
        .pop-up-container {
            width: 780px;
            max-height: min(88vh, 760px);
        }
        .barra-pop-up {
            height: 36px;
        }
        .titulo-pop-up {
            font-size: 15pt;
        }
        .close-pop-up {
            height: 36px;
            width: 36px;
            font-size: 20pt;
        }
    }
</style>
