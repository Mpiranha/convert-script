<template>
    <div class="outline_section_box">
        <div class="title">{{ outlineTitle }}</div>

        <div class="subsection_list">
            <div class="outline_item outline_section_item" v-for="(section, index) in subSection" :key="index"
                @click="onParentFocusInput(index)">
                <img class="outline_icon" src="@/assets/icons/outline.png" alt="outline icon">

                <input @blur="onBlur(index)" :ref="'textInput' + index" @input="updateModel($event, index)"
                    :disabled="isEdit[index]" :value="section" class="form-control text">

                <div class="outline_actions">
                    <button v-if="isEdit[index]" @click="toggleEdit(index)" class="btn no-shadow btn_outline_edit">
                        <img src="@/assets/icons/edit.svg" alt="edit icon">
                    </button>

                    <button class="btn no-shadow btn_outline_edit" @click="deleteEvent(index)">
                        <img src="@/assets/icons/delete.svg" alt="delete icon">
                    </button>
                </div>
            </div>
        </div>

        <div class="subsection_actions">
            <button class="btn btn_subsection" @click="addEvent">
                Add Point
            </button>

            <button class="btn btn_subsection" @click="generateEvent">
                Generate Points
            </button>

            <button class="btn btn_subsection" @click="refreshEvent">
                Refresh
            </button>
        </div>

    </div>
</template>

<script>

export default {
    data() {
        return {
            isEdit: [],
        };
    },
    props: ["outlineTitle", "subSection"],
    methods: {
        updateModel(event, index) {
            this.$emit('input', {text: event.target.value, index: index});
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
        toggleEdit(index) {
            let textField = this.$refs['textInput' + index];
            this.isEdit.splice(index, 1, false);
            if (textField) { textField[0].focus(); }
            this.SelectText(textField[0]);
        },
        deleteEvent(index) {
            this.$emit("delete-clicked", index);
        },
        onBlur(index) {
            this.isEdit.splice(index, 1, 'disabled');
            document.getSelection().removeAllRanges();
        },
        onParentFocusInput(index) {
            let textField = this.$refs['textInput' + index];
            console.log(textField);
            if (textField[0]) textField[0].focus()
        },
        addEvent() {
            this.$emit('add-point');
        },
        generateEvent() {
            this.$emit('gen-point');
        },
        refreshEvent() {
            this.$emit('refresh-point');
        }
    },
    mounted() {
        for (var i = 0; i < this.subSection.length; i++) {
            this.isEdit.push('disabled');
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