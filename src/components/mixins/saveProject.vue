<script>
import _ from "lodash"
import { armazenarLocal } from "../../assets/javascript/globalFunctions"

export default {

    name: "vue-save-project-mixin",
    computed:{
        saveSlideresPrimeira() {
            return this.$store.getters.currentSlideresPrimeira
        },
        saveSlideresSegunda() {
            return this.$store.getters.currentSlideresSegunda
        },
        saveCriteriosLabelPrimeira() {
            return this.$store.getters.currentCriteriosLabelPrimeira
        },
        saveCriteriosLabelSegunda() {
            return this.$store.getters.currentCriteriosLabelSegunda
        },
        saveOptionsLabelPrimeira() {
            return this.$store.getters.currentOptionsLabelPrimeira
        },
        saveOptionsLabelSegunda() {
            return this.$store.getters.currentOptionsLabelSegunda
        },
        saveCriteriosSimboloPrimeira() {
            return this.$store.getters.currentCriteriosSimboloPrimeira
        },
        saveCriteriosSimboloSegunda() {
            return this.$store.getters.currentCriteriosSimboloSegunda
        },
        saveOptionsSimboloPrimeira() {
            return this.$store.getters.currentOptionsSimboloPrimeira
        },
        saveOptionsSimboloSegunda() {
            return this.$store.getters.currentOptionsSimboloSegunda
        }
    },
    created() {
        this.debouncedSave = _.debounce(this.debouncedSaveProject, 500)
    },
    methods:{
        saveProject() {
            // Quando o projeto salvar, não poderá ser retomado de local store
            this.$store.dispatch("changeContinueFlag", true)
            // Salva uma vez a cada debounced ms
            this.debouncedSave()
        },
        debouncedSaveProject() {
            console.log("Saving Project on debounced update")
            const project = {
                "slideresPrimeira": this.saveSlideresPrimeira,
                "slideresSegunda": this.saveSlideresSegunda,
                "criteriosLabelPrimeira": this.saveCriteriosLabelPrimeira,
                "criteriosLabelSegunda": this.saveCriteriosLabelSegunda,
                "optionsLabelPrimeira": this.saveOptionsLabelPrimeira,
                "optionsLabelSegunda": this.saveOptionsLabelSegunda,
                "criteriosSimboloPrimeira": this.saveCriteriosSimboloPrimeira,
                "criteriosSimboloSegunda": this.saveCriteriosSimboloSegunda,
                "optionsSimboloPrimeira": this.saveOptionsSimboloPrimeira,
                "optionsSimboloSegunda": this.saveOptionsSimboloSegunda
            }
            armazenarLocal("last_project", JSON.stringify(project))
        }
    }
}
</script>