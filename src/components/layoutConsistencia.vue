<template>

    <table
        class="consistencia"
    >
        <tr>
            <td id="td-oculto">
                -
            </td>
        </tr>
        <tr>
            <td>

                &lambda; = {{ lambda.toFixed(2) }}
            </td>
        </tr>
        <tr>
            <td>
                CI = {{ CI.toFixed(2) }}
            </td>
        </tr>
        <tr>
            <td>
                RI = {{ RI.toFixed(2) }}
            </td>
        </tr>
        <tr>
            <td ref="td-cr" id="td-cr">
                CR = {{ CR.toFixed(2) }} <div id="icon"></div>
            </td>
        </tr>
    </table>


</template>
<script>
export default {
    name: "vue-consistencia",
    props: {
        lambda: {
            type: Number,
            default: 99
        },
        RI: {
            type: Number,
            default: 99
        },
        CI: {
            type: Number,
            default: 99
        },
        CR: {
            type: Number,
            default: 99
        }
    },
    computed: {
        resultado() {
            return this.CR < 0.1
        }
    },
    watch: {
        CR() {
            this.crColor()
        }
    },
    mounted() {
        this.crColor()
    },
    methods: {
        crColor() {
            this.resultado ? this.$refs["td-cr"].style.color = "green" : this.$refs["td-cr"].style.color = "red"
        }
    }
}

</script>
<style scoped>

    .consistencia{
        border-collapse: separate;
        border-spacing: 2px;
    }
    .consistencia tr{
        justify-content: space-evenly;
    }
    .consistencia tr:not(:first-child){
        height: 44px;
    }
    .consistencia td{
        min-width: 88px;
        height: 44px;
        box-sizing: border-box;
        text-align: left;
        padding-left: 8px;
        font-size: 1rem;
        font-family: monospace, system-ui, sans-serif;
    }
    #td-oculto{
        height: 48px;
        box-sizing: border-box;
        color: transparent;
        user-select: none;
    }
    .consistencia th{
        text-align: center;
        font-size: 11pt;
    }
    #td-cr{
        font-weight: bold;
    }

    @media (min-width: 1920px) {
        .consistencia tr:not(:first-child){
            height: 50px;
        }
        .consistencia td{
            height: 50px;
            min-width: 105px;
            font-size: 1.15rem;
            padding-left: 10px;
        }
        #td-oculto{
            height: 52px;
        }
    }

    @media (min-width: 2560px) {
        .consistencia tr:not(:first-child){
            height: 58px;
        }
        .consistencia td{
            height: 58px;
            min-width: 125px;
            font-size: 1.3rem;
            padding-left: 12px;
        }
        #td-oculto{
            height: 60px;
        }
    }
</style>
