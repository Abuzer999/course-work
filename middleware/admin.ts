export default defineNuxtRouteMiddleware(async (to, from) => {
  const { session } = useUserSession();

  if (session.value?.user?.role !== "admin") {
    return navigateTo("/");
  }
});
