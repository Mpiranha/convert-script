<template>
    <div ref="chatBox" v-if="author == 'assistant'" class="ai-msg">
        <p class="mb-0">
            <span v-html="formatPost(message)"></span>
        </p>
        <div class="message_actions">
            <button class="btn no-shadow btn_message_actions" @click="copyContent">
                <img src="@/assets/icons/convert-icon/copy.svg" alt="">
            </button>

            <button class="btn no-shadow btn_message_actions" @click="regenerateClicked">
                <img src="@/assets/icons/regenerate-response.svg" alt="">
            </button>

            <button class="btn no-shadow btn_message_actions">
                <img src="@/assets/icons/save-response.svg" alt="" @click="saveMessage">
            </button>
        </div>
    </div>
    <div ref="chatBox" v-else class="user-msg">

        <p class="mb-0">

            <span v-html="formatPost(message)"></span>

        </p>

    </div>
</template>

<script>
import alertMixin from "@/mixins/alertMixin";
export default {
    mixins: [alertMixin],
    props: ["message", "author", "userIcon", "type", "imageSource", "selectItems", "selectLabel", "selectValue", "buttonText", "skip"],
    data() {
        return {
            selected: null
        }
    },
    methods: {
        async copyContent() {
            try {
                await navigator.clipboard.writeText(this.message);
                this.makeToast("success", "Text copied");
                /* Resolved - text copied to clipboard successfully */
            } catch (err) {
                this.makeToast("danger", err);
                //console.error('Failed to copy: ', err);
                /* Rejected - text failed to copy to the clipboard */
            }
        },
        regenerateClicked() {
            this.$emit("regenerate-response");
        },
        formatPost(text) {
            return text.replace(/\n/g, "<br>");
        },
        saveMessage() {
            return this.$emit("save-clicked");
        },
    },
    mounted() {
        this.$refs.chatBox.parentNode.scrollTop = this.$refs.chatBox.parentNode.scrollHeight;
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
