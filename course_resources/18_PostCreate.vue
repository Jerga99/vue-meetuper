<template>
  <form class="post-create">
    <div class="field">
      <textarea class="textarea textarea-post"
                placeholder="Write a post"
                rows="1"></textarea>
      <button :disabled="!text" class="button is-primary m-t-sm">Send</button>
    </div>
  </form>
</template>


<style>
 .textarea-post {
    padding-bottom: 30px;
  }
  .post-create {
    margin-bottom: 15px;
  }
</style>
