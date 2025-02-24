<template>
  <div>
    <span class="loader"></span>
  </div>
</template>

<style scoped>
.loader {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin: 15px auto;
  position: relative;
  background: #fff;
  box-shadow:
    -24px 0 #fff,
    24px 0 #fff;
  box-sizing: border-box;
  animation: shadowPulse 2s linear infinite;
}

@keyframes shadowPulse {
  33% {
    background: #fff;
    box-shadow:
      -24px 0 #d90e32,
      24px 0 #fff;
  }
  66% {
    background: #d90e32;
    box-shadow:
      -24px 0 #fff,
      24px 0 #fff;
  }
  100% {
    background: #fff;
    box-shadow:
      -24px 0 #fff,
      24px 0 #d90e32;
  }
}
</style>
