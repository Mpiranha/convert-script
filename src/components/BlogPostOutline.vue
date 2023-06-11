<template>
    <div class="outline_item" @click="onParentFocusInput">
        <img class="outline_icon" src="@/assets/icons/outline.png" alt="outline icon">

        <span @blur="onBlur" ref="textInput" @input="updateModel($event)" :contenteditable="isEdit" class="text">
            {{ text }}
        </span>

        <div class="outline_actions">
            <button v-if="!isEdit" @click="toggleEdit" class="btn no-shadow btn_outline_edit">
                <img src="@/assets/icons/edit_blog.png" alt="edit icon">
            </button>

            <button class="btn no-shadow btn_outline_edit" @click="deleteEvent">
                <img src="@/assets/icons/delete_speech.png" alt="delete icon">
            </button>
        </div>
    </div>
</template>

<style></style>

<script>
export default {
    data() {
        return {
            isEdit: false,
        }
    },
    props: ["text", "value"],
    methods: {
        updateModel(event) {
            this.$emit('input', event.target.innerText);
        },
        SelectText(element) {
            var doc = document
                , text = element
                , range, selection;
            if (doc.body.createTextRange) {
                range = document.body.createTextRange();
                range.moveToElementText(text);
                range.select();
            } else if (window.getSelection) {
                selection = window.getSelection();
                range = document.createRange();
                range.selectNodeContents(text);
                selection.removeAllRanges();
                selection.addRange(range);
            }
        },
        toggleEdit() {
            let textField = this.$refs.textInput;
            this.isEdit = true;
            if (textField) { textField.focus(); }
            this.SelectText(textField);
        },
        deleteEvent() {
            this.$emit("delete-clicked");
        },
        onBlur() {
            this.isEdit = false;
            document.getSelection().removeAllRanges();
        },
        onParentFocusInput() {
            if (this.$refs.textInput) this.$refs.textInput.focus()
        }
    }
}
</script>