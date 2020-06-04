<template>
    <div>
        <div class="p-3 mb-2 bg-danger text-white" role="alert" v-if="validationMessages.length">
            <p class="font-weight-bold">Please check the validation messages before continuing:</p>
            <ul id="validationList">
                <li v-for="(message,index) in validationMessages" :key="index">
                    {{ message.message }}
                </li>
            </ul>
        </div>
        <div class="alert alert-warning" role="alert" v-if="warningMessages.length">
            <ul class="list-unstyled">
                <li v-for="(message,index) in warningMessages" :key="index">
                    {{ message.message }}
                </li>
            </ul>
        </div>
        <div class="alert alert-success" role="alert" v-if="successMessages.length">
            <ul class="list-unstyled">
                <li v-for="(message,index) in successMessages" :key="index">
                    {{ message.message }}
                </li>
            </ul>
        </div>
        <div class="alert alert-danger" role="alert" v-if="errorMessages.length">
            <ul class="list-unstyled">
                <li v-for="(message,index) in errorMessages" :key="index">
                    {{ message.message }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    
    computed: {
        warningMessages() {
            return this.$store.getters.messages.filter((m) => m.category === 'warningMessage')
        },
        validationMessages() {
            return this.$store.getters.messages.filter((m) => m.category === 'validationMessage')
        },
        successMessages() {
            return this.$store.getters.messages.filter((m) => m.category === 'successMessage')
        },
        errorMessages() {
            return this.$store.getters.messages.filter((m) => m.category === 'errorMessage')
        }
    }
}
</script>

<style scoped>
ul {
    list-style-type: square;
    padding-left: 20px;
}
</style>