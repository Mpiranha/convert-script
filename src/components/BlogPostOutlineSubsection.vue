<template>
    <div class="outline_section_box">
        <div class="title">{{ outlineTitle }}</div>

        <div class="subsection_list">
            <div class="outline_item outline_section_item" v-for="(section, index) in subSection"
            :key="index" @click="onParentFocusInput">
                <img class="outline_icon" src="@/assets/icons/outline.png" alt="outline icon">

                <span @blur="onBlur" ref="textInput" @input="updateModel($event)"  :contenteditable="isEdit[index]" class="text">
                    {{ section }}
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
        </div>

        <div class="subsection_actions">
            <button class="btn btn_subsection">
                Add Point
            </button>

            <button class="btn btn_subsection">
                Generate Points
            </button>

            <button class="btn btn_subsection">
                Refresh
            </button>
        </div>

    </div>
</template>

<script>

export default {
    data() {
        return {
            isEdit: false,
        };
    },
    props: ["outlineTitle", "subSection"],
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

<style>
.outline_section_box {
    border-bottom: 2px solid #f6f6f6;
    padding: 1.4rem 3rem;
}

.outline_section_box .title {
    color: #000;
    font-size: 1.1rem;
    font-weight: bold;
    margin-bottom: 1rem;
}

.outline_section_item {
    border-bottom: none !important;
    padding: 0.4rem 0.6rem !important;
    margin-bottom: 1rem;
    border-radius: 0.5rem;
}

.outline_section_item:hover {
    border: 1px solid #393F46 !important;
}

.btn_subsection {
    border: 1px solid #393F46 !important;
    margin-right: 0.8rem;
    border-radius: 0.5rem !important;
    padding: 0.25rem 0.9rem !important;
}
</style>