<template>
    <div class="alert-wrap-fixed" :class="fullscreen ? 'fs-alert-fixed':''">
        <div class="alert-main">
            <h1>Your access to {{ title }} is restricted.</h1>
            <div class="desc">
                Upgrade your account to unlock this feature
            </div>
            <div class="d-flex justify-content-center mt-auto">
                <router-link class="btn btn-upgrade" to="/billing">
                    Upgrade
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "UpgradeAlert",
    props: {
        title: {
            type: String,
            required: true,
        },
        fullscreen: {
            type: Boolean
        }

    },
};
</script>

<style scoped>
.alert-wrap-fixed {
    position: fixed;
    width: calc(100% - 215px);
    height: 100%;
    left: 215px;
    top: 60px;
    background-color: #00000075;
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 0.5rem;
}

.fs-alert-fixed {
    left: 0 !important;
    width: 100%!important;
}

.alert-main {
    background-color: #fff;
    width: 100%;
    max-width: 550px;
    min-height: 260px;
    padding: 2rem 5rem 1rem 5rem;
    display: flex;
    flex-direction: column;
    text-align: center;
}

.alert-main h1 {
    font-size: 2.3rem;
    margin-bottom: 1rem;
}

.alert-main .desc {
    text-align: center;
    font-size: 1.1rem;
}

.alert-main .btn-upgrade {
    font-size: 1.2rem !important;
    padding: 0.35rem 1rem;
}

@media screen and (max-width: 1024px) {
    .alert-wrap-fixed {
        left: 0 !important;
        width: 100% !important;
    }
}
</style>
