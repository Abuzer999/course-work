export default defineNuxtRouteMiddleware((to, from) => {
    const user = ref(false);
    if (!user.value) {
        return navigateTo("/auth");
    }
});
