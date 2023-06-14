<template>
    <div ref="chatBox" v-if="author == 'assistant'" class="ai-msg">
        <p class="mb-0">
            {{ message }}
        </p>
        <div class="message_actions">
            <button class="btn no-shadow btn_message_actions">
                <img src="@/assets/icons/convert-icon/copy.svg" alt="">
            </button>

            <button class="btn no-shadow btn_message_actions">
                <img src="@/assets/icons/refresh.png" alt="">
            </button>

            <button class="btn no-shadow btn_message_actions">
                <img src="@/assets/icons/save-to.png" alt="">
            </button>
        </div>
    </div>
    <div ref="chatBox" v-else class="user-msg">

        <p class="mb-0"> {{ message }} </p>

    </div>
</template>

<script>
export default {
    props: ["message", "author", "userIcon", "type", "imageSource", "selectItems", "selectLabel", "selectValue", "buttonText", "skip"],
    data() {
        return {
            selected: null
        }
    },
    mounted() {
        this.$refs.chatBox.parentNode.parentNode.scrollTo(0, this.$refs.chatBox.parentNode.offsetHeight);

    }
}
</script>

<style>

.message_actions {
    display: flex;
    justify-content: flex-end;
}

.message_actions .btn_message_actions {
    padding: 0 !important;
}

.message_actions .btn_message_actions:not(:last-child) {
    margin-right: 1rem;
}

</style>
