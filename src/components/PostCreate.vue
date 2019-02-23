<template>
  <!-- <div v-with-warning:red.prevent="'What a nice day (:'"> </div> -->
  <form class="post-create">
    <div class="field">
      <textarea class="textarea textarea-post"
                placeholder="Write a post"
                rows="1"></textarea>
      <button :disabled="true" class="button is-primary m-t-sm">Send</button>
    </div>
  </form>
</template>

<script>
  import withWarning from '@/directives/withWarning'
  export default {
    directives: {withWarning}
  }
</script>

<style scoped lang="scss">
  .textarea-post {
    padding-bottom: 30px;
  }

  .post-create {
    margin-bottom: 15px;
  }
</style>
