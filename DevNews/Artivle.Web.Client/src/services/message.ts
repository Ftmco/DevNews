import Vue from "vue";

export const showMessage = (vue:Vue,message: string) => {
    (vue.$root.$refs.snackbar as any).open(message);
    (vue.$root.$refs.loading as any).close();
}