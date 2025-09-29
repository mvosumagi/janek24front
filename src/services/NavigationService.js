import router from "@/router";

export default {

    navigateToUserView() {
        router.push({name: 'userRoute'})
    },

    navigateToHomeView() {
        router.push({name: 'homeRoute'})
    },

    navigateToLoginView() {
        router.push({name: 'loginRoute'})
    },



    navigateToErrorView() {
      //  todo: kommenteeri productionis sisse
      //    router.push({name: 'errorRoute'})
    }
}

