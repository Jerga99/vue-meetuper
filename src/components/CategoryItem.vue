<template>
  <div class="column is-one-quarter" :style="{'min-height': '160px'}">
    <router-link :to="{name: 'PageMeetupFindCategory',
     params: {category: category.name}}">
      <span class="is-primary is-top is-medium tooltip">
        <figure class="image is-4by3 imageFade">
          <img class="is-rounded" :src="category.image">
        </figure>
        <div class="subtitle m-t-xs bold">{{category.name | capitalize}}</div>
      </span>
    </router-link>
  </div>
</template>

<script>
  export default {
    props: {
      category: {
        required: true,
        type: Object
      }
    }
  }
</script>

<style scoped>
  .is-rounded {
    border-radius: 10px !important;
  }
</style>
