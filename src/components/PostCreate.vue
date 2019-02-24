<template>
  <!-- <div v-with-warning:red.prevent="'What a nice day (:'"> </div> -->
  <form class="post-create">
    <div class="field">
      <textarea v-auto-expand
                v-model="text"
                class="textarea textarea-post"
                placeholder="Write a post"
                rows="1"></textarea>
      <button :disabled="!text"
              @click.prevent="sendPost"
              class="button is-primary m-t-sm">Send</button>
    </div>
  </form>
</template>

<script>
  import autoExpand from '@/directives/autoExpand'
  export default {
    directives: {autoExpand},
    props: {
      threadId: {
        required: true,
        type: String
      }
    },
    data () {
      return {
        text: null
      }
    },
    computed: {
      meetup () {
        return this.$store.state.meetups.item
      }
    },
    methods: {
      sendPost () {
        this.$store.dispatch('threads/sendPost', {text: this.text, threadId: this.threadId})
        .then((createdPost) => {
          this.$socket.emit('meetup/postSaved',
           {...createdPost, meetup: this.meetup._id }
          )

          this.text = ''
        })
      }
    }
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
