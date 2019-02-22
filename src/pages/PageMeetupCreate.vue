<template>
  <div class="meetup-create-page">
    <AppHero />
    <section class="section">
      <div class="container">
        <MeetupCreateWizard @meetupConfirmed="createMeetup"/>
      </div>
    </section>
  </div>
</template>

<script>
  import MeetupCreateWizard from '@/components/MeetupCreate/MeetupCreateWizard'
  export default {
    components: {
      MeetupCreateWizard
    },
    computed: {
      categories () {
        return this.$store.state.categories.items
      }
    },
    created () {
      if (this.categories.length === 0) {
        this.$store.dispatch('categories/fetchCategories')
      }
    },
    methods: {
      createMeetup (meetupToCreate) {
        this.$store.dispatch('meetups/createMeetup', meetupToCreate)
          .then(createdMeetup => {
            this.$router.push(`/meetups/${createdMeetup._id}`)
          })
          .catch(err => console.log(err))
      }
    }
  }
</script>

<style scoped lang="scss">
  .meetup-create-page {
    min-height: 100vh;
  }
</style>
