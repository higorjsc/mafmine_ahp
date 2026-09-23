<template>
    <div :class="['slider-container', widthClass]">
        <div class="text-container">
            <h3>
                {{ $t(`${texto}`) }}
            </h3>
        </div>

        <div class="slider-wrapper">
            <div class="slider-track-box">
                <input
                    type="range"
                    min="0"
                    max="100"
                    step="6.25"
                    v-model.number="valorInput"
                    :id="id"
                    :class="classe"
                    ref="slider"
                    :name="name"
                >
                <div class="span-container">
                    <span
                        v-for="step in steps"
                        :key="step.id"
                        :class="['slider-span', `level-${step.level}`]"
                        :id="`slider-span-${step.id}`"
                        :style="stepStyle(step.ratio)"
                        draggable="false"
                        @click="setValor(step.valor)"
                    >{{ step.label }}</span>
                </div>
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
        name: {
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
            valorInput: 50,
            containerWidth: 500,
            steps: [
                { id: "19", label: "1/9", valor: 0,     ratio: 0,      level: 1 },
                { id: "18", label: "1/8", valor: 6.25,  ratio: 0.0625, level: 4 },
                { id: "17", label: "1/7", valor: 12.5,  ratio: 0.125,  level: 3 },
                { id: "16", label: "1/6", valor: 18.75, ratio: 0.1875, level: 4 },
                { id: "15", label: "1/5", valor: 25,    ratio: 0.25,   level: 2 },
                { id: "14", label: "1/4", valor: 31.25, ratio: 0.3125, level: 4 },
                { id: "13", label: "1/3", valor: 37.5,  ratio: 0.375,  level: 3 },
                { id: "12", label: "1/2", valor: 43.75, ratio: 0.4375, level: 4 },
                { id: "1",  label: "1",   valor: 50,    ratio: 0.5,    level: 1 },
                { id: "2",  label: "2",   valor: 56.25, ratio: 0.5625, level: 4 },
                { id: "3",  label: "3",   valor: 62.5,  ratio: 0.625,  level: 3 },
                { id: "4",  label: "4",   valor: 68.75, ratio: 0.6875, level: 4 },
                { id: "5",  label: "5",   valor: 75,    ratio: 0.75,   level: 2 },
                { id: "6",  label: "6",   valor: 81.25, ratio: 0.8125, level: 4 },
                { id: "7",  label: "7",   valor: 87.5,  ratio: 0.875,  level: 3 },
                { id: "8",  label: "8",   valor: 93.75, ratio: 0.9375, level: 4 },
                { id: "9",  label: "9",   valor: 100,   ratio: 1,      level: 1 }
            ]
        }
    },
    computed: {
        widthClass() {
            if (this.containerWidth >= 460) return "slider-xl"
            if (this.containerWidth >= 350) return "slider-lg"
            if (this.containerWidth >= 250) return "slider-md"
            return "slider-sm"
        }
    },
    watch: {
        valor(newVal) {
            this.valorInput = newVal
        },
        valorInput() {
            this.enviarValor()
            this.sliderColor()
        }
    },
    mounted() {
        this.valorInput = this.valor
        this.sliderColor()

        if (typeof ResizeObserver !== "undefined" && this.$el) {
            this.resizeObserver = new ResizeObserver((entries) => {
                for (const entry of entries) {
                    this.containerWidth = entry.contentRect.width
                }
            })
            this.resizeObserver.observe(this.$el)
        }
    },
    beforeUnmount() {
        if (this.resizeObserver) {
            this.resizeObserver.disconnect()
        }
    },
    methods: {
        enviarValor() {
            this.$emit("slider-value", [this.classe, this.id, Number(this.valorInput), this.name])
        },
        setValor(val) {
            this.valorInput = val
        },
        stepStyle(ratio) {
            return {
                left: `calc(${ratio * 100}% + ${(1 - 2 * ratio)} * var(--thumb-radius))`
            }
        },
        sliderColor() {
            let meioEnd
            let meioStart
            let left
            let right
            const valor = Number(this.valorInput)
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
            if (this.$refs.slider) {
                this.$refs.slider.style.background = "linear-gradient(90deg,"
                + `var(--cor-tema) 0%, white ${left}%,`
                + `var(--cor-tema) ${meioStart}%, var(--cor-tema) ${meioEnd}%,`
                + `white ${right}%, var(--cor-tema) 100%)`
            }
        }
    }
}
</script>

<style scoped>
.slider-container {
    --thumb-size: 16px;
    --thumb-radius: 8px;
    position: relative;
    margin: 0 auto 20px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    container-type: inline-size;
    container-name: slider;
}

.text-container {
    text-align: center;
    max-width: 100%;
    margin-bottom: 6px;
}

h3 {
    display: flex;
    text-align: center;
    justify-content: center;
    font-size: 11pt;
    margin: 0;
}

.slider-wrapper {
    position: relative;
    width: 100%;
    box-sizing: border-box;
    padding: 0 4px;
}

.slider-track-box {
    position: relative;
    width: 100%;
}

input[type="range"] {
    width: 100%;
    height: 6px;
    border-radius: 50px;
    opacity: 0.8;
    background: linear-gradient(90deg, var(--cor-tema) 0%, white 50%, var(--cor-tema) 50%, var(--cor-tema) 50%, white 50%, var(--cor-tema) 100%);
    border: var(--borda-simples);
    appearance: none;
    -webkit-appearance: none;
    outline: none;
    transition: opacity .2s, box-shadow .2s;
    position: relative;
    z-index: 5;
    display: block;
    margin: 8px 0;
    padding: 0;
    box-sizing: border-box;
}

input[type="range"]:hover {
    opacity: 1;
    box-shadow: 0 0 5px var(--cor-tema);
    cursor: pointer;
}

/* THUMB WebKit */
input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: var(--thumb-size);
    height: var(--thumb-size);
    border-radius: 50%;
    background: var(--cor-tema);
    border: var(--borda-simples);
    cursor: pointer;
    z-index: 6;
    box-sizing: border-box;
}

/* THUMB Mozilla */
input[type="range"]::-moz-range-thumb {
    width: var(--thumb-size);
    height: var(--thumb-size);
    border-radius: 50%;
    background: var(--cor-tema);
    border: var(--borda-simples);
    cursor: pointer;
    box-sizing: border-box;
}

.span-container {
    position: relative;
    width: 100%;
    height: 20px;
    box-sizing: border-box;
    padding: 0 1px;
    margin-top: 2px;
}

.slider-span {
    position: absolute;
    transform: translateX(-50%);
    user-select: none;
    -webkit-user-drag: none;
    font-size: 8pt;
    line-height: 1;
    cursor: pointer;
    color: #222;
    transition: color 0.15s ease, font-weight 0.15s ease;
    white-space: nowrap;
}

.slider-span:hover {
    color: var(--cor-tema, #000);
    font-weight: bold;
}

/* Level 1 labels (1/9, 1, 9) are always visible */
.slider-span.level-1 {
    display: inline-block;
}

/* By default (narrow), hide level 2, 3, 4 */
.slider-span.level-2,
.slider-span.level-3,
.slider-span.level-4 {
    display: none;
}

/* Container Queries for progressive label disclosure */
@container slider (min-width: 250px) {
    .slider-span.level-2 {
        display: inline-block;
    }
}

@container slider (min-width: 350px) {
    .slider-span.level-3 {
        display: inline-block;
    }
}

@container slider (min-width: 460px) {
    .slider-span.level-4 {
        display: inline-block;
    }
}

/* Fallback via ResizeObserver classes */
.slider-container.slider-md .slider-span.level-2,
.slider-container.slider-lg .slider-span.level-2,
.slider-container.slider-lg .slider-span.level-3,
.slider-container.slider-xl .slider-span.level-2,
.slider-container.slider-xl .slider-span.level-3,
.slider-container.slider-xl .slider-span.level-4 {
    display: inline-block;
}

@media (min-width: 1920px) {
    h3 {
        font-size: 1rem;
    }
    .slider-span {
        font-size: 9pt;
    }
}

@media (min-width: 2560px) {
    .slider-container {
        --thumb-size: 18px;
        --thumb-radius: 9px;
    }
    h3 {
        font-size: 1.15rem;
    }
    .slider-span {
        font-size: 10pt;
    }
    input[type="range"] {
        height: 8px;
    }
}
</style>