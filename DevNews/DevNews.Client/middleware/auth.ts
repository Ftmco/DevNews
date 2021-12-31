export default function ({ store, redirect }: any) {
    if(window != undefined){
        if (!localStorage.getItem("Token")) {
            return redirect("/account/login")
        }
    }
}