<template>

</template>

<script>
export default {
  async beforeMount() {
    const token = localStorage.getItem("token")
    const hash = this.$route.params.hash
    const endpoint = this.$config.public.API_BASE_URL + "get-bonus/" + hash
    await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Token " + token
      },
    })
    this.$emit('auth')
    this.$router.push(
        {
          name: "index"
        }
    )
  }
}
</script>

<style scoped>

</style>