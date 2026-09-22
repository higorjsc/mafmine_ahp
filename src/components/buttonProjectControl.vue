<template>

    <div class="buttons-container">
        <button
            class="project-button"
            v-if="!continueFlag && !importFlag && tabView == '/inputs'"
            @click="importProject('local')"
        >
            {{ $t("continueProject") }}
        </button>
        <button
            v-if="tabView == '/inputs'"
            class="project-button"
            @click="importProject('json')"
        >
            {{$t("importProject")}}
        </button>
        <button
            v-if="tabView == '/inputs'"
            class="project-button"
            @click="resetProject()"
        >
            {{$t("resetProject")}}
        </button>
        <button
            v-if="tabView == '/resultados'"
            @click="exportObjectAsJSON()"
            class="project-button"
        >
            {{$t("exportProject")}}
        </button>
    </div>


</template>

<script>
import { verificarLocal } from "../assets/javascript/globalFunctions"
import saveProjectMixin from "./mixins/saveProject.vue"

export default {
    name: "vue-project-buttons",
    mixins:[
        saveProjectMixin
    ],
    emits: ["update-view"],
    data() {
        return {
            project: {}
        }
    },
    computed:{
        importFlag() {
            return this.$store.getters.currentImportFlag
        },
        continueFlag() {
            return this.$store.getters.currentContinueFlag
        },
        tabView() {
            return this.$store.getters.currentTabViewAtual
        }
    },
    methods:{
        async importJSONAsObject() {
            try {
                const [fileHandle] = await window.showOpenFilePicker({
                    types: [{
                        description: "Arquivos JSON",
                        accept: { "application/json": [".json"] }
                    }],
                    multiple: false,
                    excludeAcceptAllOption: true // Força seleção apenas de JSON
                })

                const file = await fileHandle.getFile()

                // Verificação básica de tamanho (exemplo: 5MB)
                if (file.size > 5 * 1024 * 1024) {
                    throw new Error("Arquivo muito grande (máximo 5MB)")
                }

                const fileContent = await file.text()

                // Validação da estrutura básica
                const parsed = JSON.parse(fileContent)
                if (!parsed || typeof parsed !== "object") {
                    throw new Error("Formato JSON inválido")
                }

                // Verificação de propriedades essenciais (personalize conforme seu projeto)
                const requiredProps = ["slideresPrimeira", "criteriosLabelPrimeira"]
                requiredProps.forEach(prop => {
                    if (!(prop in parsed)) {
                        throw new Error(`Propriedade obrigatória ausente: ${prop}`)
                    }
                })

                console.log("Importação bem-sucedida:", parsed)
                return parsed

            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("Importação cancelada pelo usuário")
                } else {
                    console.error("Falha na importação:", error)
                    alert(`Erro: ${error.message}`)
                }
                return null
            }
        },
        async exportObjectAsJSON() {
            try {
                await this.saveProject() // Garante que os dados estão atualizados
                const projectData = JSON.parse(verificarLocal("last_project"))

                // Verifica se os dados existem
                if (!projectData) {
                    throw new Error("Nenhum projeto encontrado para exportação")
                }

                // Cria o nome do arquivo com timestamp
                const fileName = `project-${Date.now()}.json`

                // Configuração do diálogo de salvamento
                const fileHandle = await window.showSaveFilePicker({
                    suggestedName: fileName,
                    types: [{
                        description: "Arquivos JSON",
                        accept: { "application/json": [".json"] }
                    }]
                })

                // Escreve no arquivo com formatação
                const writable = await fileHandle.createWritable()
                await writable.write(JSON.stringify(projectData, (key, value) => {
                    // Filtro personalizado para serialização (opcional)
                    return value
                }, 2)) // Indentação de 2 espaços

                await writable.close()

                console.log("Arquivo exportado com sucesso:", fileName)
            } catch (error) {
                if (error.name !== "AbortError") {
                    console.error("Erro na exportação:", error)
                    alert(`Erro ao exportar projeto: ${error.message}`)
                }
            }
        },
        async importProject(store) {

            if(store == "json") {
                console.log("Importing from json file...")
                this.project = await this.importJSONAsObject()
            }

            if(store == "local") {
                console.log("Importing from local store")
                this.project = JSON.parse(verificarLocal("last_project"))
            }

            try {
                this.$store.dispatch("changeImportFlag", true)
                Object.keys(this.project).forEach(key => {
                    this.$store.dispatch(`change${key.charAt(0).toUpperCase() + key.slice(1)}`, this.project[key])

                })
                this.$emit("update-view")
            } catch {
                console.log("Projeto importado está vazio ou contém erros")
            }

        },
        resetProject() {
            try {
                Object.keys(this.project).forEach(key => {
                    this.$store.dispatch(`change${key.charAt(0).toUpperCase() + key.slice(1)}`, [])

                })
                window.location.reload()
            } catch {
                console.log("O projeto já foi resetado")
            }
        }
    }

}
</script>
<style>
.buttons-container{
    position: absolute;
    bottom: 16px;
    right: 20px;
    display: flex;
    gap: 6px;
    z-index: 10;
}

.project-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: var(--borda-simples);
    border-radius: 20px;
    font-size: 0.95rem;
    line-height: 1;
    padding: 8px 16px;
    box-sizing: border-box;
    background-color: var(--cor-tema-alt);
    color: var(--cor-texto-tema);
    cursor: pointer;
    transition: all 0.2s ease;
}
.project-button:hover {
    cursor: pointer;
    box-shadow: 0 0 10px var(--cor-tema);
}

@media (min-width: 1920px) {
    .buttons-container {
        bottom: 20px;
        right: 24px;
    }
    .project-button {
        font-size: 1rem;
        padding: 8px 18px;
    }
}

@media (min-width: 2560px) {
    .buttons-container {
        bottom: 24px;
        right: 32px;
    }
    .project-button {
        font-size: 1.15rem;
        padding: 10px 22px;
    }
}
.button-export {
    position: absolute;
    bottom: 2%;
    right: 1%;
    display: flex;
    align-items: center;
    align-content: center;
    flex-wrap: wrap-reverse;
    border: var(--borda-simples);
    border-radius: 20px;
    font-size: 10pt;
    background-color: var(--cor-tema-alt);
    color: var(--cor-texto-tema);
}
.button-export:hover {
    cursor: pointer;
    box-shadow: 0 0 10px var(--cor-tema);
}
</style>