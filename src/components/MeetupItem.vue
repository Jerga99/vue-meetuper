<template>
  <div class="column is-one-third">
    <div class="card large">
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
              <span class="tag is-success">{{meetup.category.name}}</span>
              <!-- get here meetup location -->
              <p class="subtitle is-7">{{meetup.location}}</p>
          </div>
        </div>
        <div class="content">
            <!-- get here meetup description -->
            {{meetup.description}}
            <div class="background-icon"><span class="icon-barcode"></span></div>
        </div>
      </div>
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
    }
  }
</script>

<style>

</style>
