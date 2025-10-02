import router from "@/router";

export default {
    navigateToErrorView() {
        //  todo: kommenteeri productionis sisse
        //    router.push({name: 'errorRoute'})
    },
    navigateToHomeView() {
        router.push({name: 'homeRoute'})
    },

    navigateToLoginView() {
        router.push({name: 'loginRoute'})
    },
}

