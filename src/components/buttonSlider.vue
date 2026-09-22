<template>

    <div class="slider-container">
        <div
            class="text-container"
        >
            <h3>
                {{ $t(`${texto}`)  }}
            </h3>
        </div>

        <input
            type="range"
            min="0"
            max="100"
            step="6.25"
            v-model='valorInput'
            :id="id"
            :class="classe"
            ref="slider"
            :name="name"
        >
        <div class="span-container">
            <div class="left-span-container">
                <span class="slider-span" id="slider-span-19" draggable="false">1/9</span>
                <span class="slider-span" id="slider-span-18" draggable="false">1/8</span>
                <span class="slider-span" id="slider-span-17" draggable="false">1/7</span>
                <span class="slider-span" id="slider-span-16" draggable="false">1/6</span>
                <span class="slider-span" id="slider-span-15" draggable="false">1/5</span>
                <span class="slider-span" id="slider-span-14" draggable="false">1/4</span>
                <span class="slider-span" id="slider-span-13" draggable="false">1/3</span>
                <span class="slider-span" id="slider-span-12" draggable="false">1/2</span>
            </div>
            <div class="right-span-container">
                <span class="slider-span" id="slider-span-1" draggable="false">1</span>
                <span class="slider-span" id="slider-span-2" draggable="false">2</span>
                <span class="slider-span" id="slider-span-3" draggable="false">3</span>
                <span class="slider-span" id="slider-span-4" draggable="false">4</span>
                <span class="slider-span" id="slider-span-5" draggable="false">5</span>
                <span class="slider-span" id="slider-span-6" draggable="false">6</span>
                <span class="slider-span" id="slider-span-7" draggable="false">7</span>
                <span class="slider-span" id="slider-span-8" draggable="false">8</span>
                <span class="slider-span" id="slider-span-9" draggable="false">9</span>
            </div>
        </div>

    </div>

</template>
<script>
export default {
    name: "vue-range-button",
    props: {
        texto: {
            type: String,
            default: "undefined"
        },
        name:{
            type: String,
            default: "undefined"
        },
        id: {
            type: String,
            default: "undefined"
        },
        classe: {
            type: String,
            default: "undefined"
        },
        valor: {
            type: Number,
            default: 50
        }
    },
    emits: ["slider-value"],
    data() {
        return {
            valorInput: 50
        }
    },
    watch: {
        valorInput() {
            this.enviarValor()
            this.sliderColor()
        }
    },
    mounted() {
        // O valor inicial do sliderButton é igual ao recebido pela prop
        this.valorInput = this.valor
    },
    methods: {
        enviarValor() {
            this.$emit("slider-value", [this.classe, this.id, this.valorInput, this.name])
        },

        sliderColor() {
            let meioEnd
            let meioStart
            let left
            let right
            const valor = this.valorInput
            if (valor >= 50) {
                right = 100 - valor
                meioEnd = valor
                meioStart = 50
                left = 50
            } else if (valor < 50) {
                right = 50
                meioEnd = 50
                meioStart = valor
                left = valor
            }
            this.$refs.slider.style.background = "linear-gradient(90deg,"
            + `var(--cor-tema) 0%, white ${left}%,`
            + `var(--cor-tema) ${meioStart}%, var(--cor-tema) ${meioEnd}%,`
            + `white ${right}%, var(--cor-tema) 100%)`

            // linear-gradient(90deg, var(--cor-tema) 0%, white ${left}%, var(--cor-tema) ${meioStart}%, var(--cor-tema) ${meioEnd}%, white ${right}%, var(--cor-tema) 100%)`
            // this.$refs.slider.style.background = "linear-gradient(90deg," + "red 0%," + "red " + left + "%, " + "var(--cor-hover)" + meioStart + "%," + "var(--cor-hover)" + meioEnd + "%, " + "blue " + right + "%," + "blue " + "100" + "%  )"
        }
    }
}
</script>
<style scoped>

@media (max-width:930px) {
    #slider-span-18, #slider-span-17, #slider-span-16, #slider-span-14, #slider-span-15, #slider-span-13, #slider-span-12, #slider-span-2, #slider-span-3, #slider-span-4, #slider-span-5, #slider-span-6, #slider-span-7, #slider-span-8 {
        display: none;
    }
    #slider-span-1{
        transform: translateX(-6.5px)
    }
}
.slider-container{
    position: relative;
    margin: auto;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    overflow: hidden;
}

h3 {
    display: flex;
    text-align: left;
    font-size: 11pt;
}
.text-container{
    text-align: center;
    max-width: 100%;
}
.span-container {
    width: 100%;
    max-width: 100%;
    display: flex;
    font-size: 8pt;
    box-sizing: border-box;
    gap: 10px;
}
.left-span-container{
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    box-sizing: border-box;
}

.right-span-container  {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    box-sizing: border-box;
}
.slider-span{
    user-select: none;
    -webkit-user-drag: none;
}
input {
  width: 100%;
  height: 6px;
  border-radius: 50px;
  opacity: 0.7;
  background: linear-gradient(90deg, var(--cor-tema) 0%, white 50%, var(--cor-tema) 50%, var(--cor-tema) 50%, white 35%, var(--cor-tema) 100%);
  border: 1pt solid black;
  appearance: none;
  outline: none;
  transition: .2s;
  transition: opacity .2s;
  position: relative;
  z-index: 5;
}
input:hover{
    background-color: red;
    transform: scale(1.01);
    box-shadow: 0 0 5px var(--cor-tema);
    cursor: pointer;
}

/* THUMB do CHROME */
input::-webkit-slider-thumb {
  appearance: none;
  width: 15px;
  height:15px;
  border-radius: 50%;
  background: var(--cor-tema);
  border: var(--borda-simples) ;
  cursor: pointer;
  z-index: 6;
}

/* THUMB do MOZILA */
input::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
}

@media (min-width: 1920px) {
    h3 {
        font-size: 1rem;
    }
    .span-container {
        font-size: 9pt;
    }
}

@media (min-width: 2560px) {
    h3 {
        font-size: 1.15rem;
    }
    .span-container {
        font-size: 10pt;
    }
    input {
        height: 8px;
    }
    input::-webkit-slider-thumb {
        width: 18px;
        height: 18px;
    }
}

</style>