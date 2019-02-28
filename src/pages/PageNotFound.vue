<template>
  <div class="container">
    <ErrorView :title="'Ooooops, page you are trying to access doesn\'t exist'"
               :status="'404'"
               :navigateToPage="'PageHome'"
               :navigateToText="'Navigate back Home'" />
  </div>
</template>

<script>
  import ErrorView from '@/components/ErrorView'
  export default {
    components: {
      ErrorView
    }
  }
</script>

<style scoped>
</style>
