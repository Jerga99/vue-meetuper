<template>
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
  export default {

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
