export default function ({ store, next }: any) {
    if (!store.getters.auth.isLogin) {
        return next({
            name: "login"
        })
    }
    return next();
}