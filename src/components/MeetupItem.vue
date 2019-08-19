<template>
  <div class="column is-one-third">
    <!-- <router-link :to="'/meetups/' + meetup._id" class="card large"> -->
    <div class="card is-hoverable large">
      <router-link :to="{name: 'PageMeetupDetail', params: {id: meetup._id}}" class="card-meetup-link" >
        <div class="card-image">
          <figure class="image is-4by3">
              <!-- get here meetup image -->
              <img :src="meetup.image" alt="Image">
          </figure>
        </div>
        <div class="card-content">
          <div class="level m-b-md">
            <div class="media-left">
              <div class="level-item has-text-centered">
                <div>
                  <!-- get here startDate, don't worry about formatting -->
                  <p class="title">{{meetup.startDate | formatDate('MMM')}}</p>
                  <p class="title">{{meetup.startDate | formatDate('D')}}</p>
                </div>
              </div>
            </div>
            <div class="media-content">
              <!-- get here meetup title -->
                <p class="title is-4 no-padding is-marginless">{{meetup.title}}</p>
                <!-- get here meetup category -->
                <span class="tag is-success">{{meetup.category.name | capitalize}}</span>
                <!-- get here meetup location -->
                <p class="subtitle is-7">{{meetup.location}}</p>
            </div>
          </div>
          <div class="content">
              <!-- get here meetup description -->
              {{shorten(meetup.description)}}
              <div class="background-icon"><span class="icon-barcode"></span></div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      meetup: {
        required: true,
        type: Object
      }
    },
    methods: {
      shorten(text) {
        return text.substr(0, 144) + ' ...'
      }
    }
  }
</script>

<style scoped lang="scss">
  .card-meetup-link {
    color: black;
  }

  .is-hoverable {
    transition: 0.3s;

    &:hover {
      -webkit-box-shadow: 2px 4px 15px -2px rgba(189,189,189,1);
      -moz-box-shadow: 2px 4px 15px -2px rgba(189,189,189,1);
      box-shadow: 2px 4px 15px -2px rgba(189,189,189,1);
    }
  }
</style>
