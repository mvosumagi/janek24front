import router from "@/router";

export default {

    navigateToUserView() {
        router.push({name: 'userRoute'})
    },


    navigateToErrorView() {
      //  todo: kommenteeri productionis sisse
      //    router.push({name: 'errorRoute'})
    }
}

