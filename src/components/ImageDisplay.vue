<template>
    <div class="col-6">
        <div class="image-display_wrap" :style="`background-image: url(${imageUrl})`" @click="updateParent()">

            <div class="button_wrap">
                <button class="btn-img-actions" @click="downloadClicked()">
                    <img src="@/assets/icons/image-vector.svg" alt="download icon">
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    props: ['imageUrl'],
    methods: {
        updateParent() {
            this.$emit("image-clicked");
        },
        downloadClicked() {
            this.$emit("download-clicked");
        }
    }
}

</script>

<style>
.image-display_wrap {
    height: 400px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border: 1px solid #000;
    border-radius: 1rem;
    transition: all 0.2s linear;
    position: relative;
    margin-bottom: 2rem;
    cursor: pointer;
}

.image-display_wrap:hover {

    transform: scale(1.1)
}

.image-display_wrap .button_wrap {
    position: absolute;
    right: 20px;
    bottom: 20px;
}

.image-display_wrap button img {
    width: 1.3rem;
}

.btn-img-actions {
    align-items: center;
    display: inline-flex;
    flex: 0 0 auto;
    font-weight: 500;
    letter-spacing: .0892857143em;
    justify-content: center;
    outline: 0;
    position: relative;
    text-decoration: none;
    text-indent: .0892857143em;
    text-transform: uppercase;
    transition-duration: .28s;
    transition-property: box-shadow, transform, opacity;
    transition-timing-function: cubic-bezier(.4, 0, .2, 1);
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    vertical-align: middle;
    white-space: nowrap;
    color: rgba(0, 0, 0, .54);
    height: 40px;
    width: 40px;
    font-size: .75rem;
    box-shadow: 0 3px 3px -2px rgba(0, 0, 0, .2), 0 3px 4px 0 rgba(0, 0, 0, .14), 0 1px 8px 0 rgba(0, 0, 0, .12) !important;
    border-radius: 50%;
    -webkit-appearance: button;
    min-height: 0;
    min-width: 0;
    padding: 0;
    border: none;
}

.btn-img-actions[disabled] {
    background: #c3c3c3;
}

.btn-img-actions:before {
    background-color: currentColor;
    border-radius: inherit;
    bottom: 0;
    color: inherit;
    content: "";
    left: 0;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    transition: opacity .2s cubic-bezier(.4, 0, .6, 1);
}




.btn-img-actions:hover:before {
    opacity: .08;
}

.btn-img-actions:focus:before {
    opacity: .24;
}
</style>