export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie("auth_token").value;

  if (!token && to.path !== "/auth") {
    return navigateTo("/auth"); 
  }

  if (token && to.path === "/auth") {
    return navigateTo("/");
  }
});
