import router from "@/router";

export default {

    navigateToUserView() {
        router.push({name: 'userRoute'})
    },

    navigateToHomeView() {
        router.push({name: 'homeRoute'})
    },



    navigateToErrorView() {
      //  todo: kommenteeri productionis sisse
      //    router.push({name: 'errorRoute'})
    }
}

