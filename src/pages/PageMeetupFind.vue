<template>
  <div>
    <div class="lookup-prebody">
      <AppHero />
      <div class="meetup-lookup-wrap">
        <div class="meetup-lookup centered">
          <div class="level">
            <div class="level-left">
              <div class="level-item">
                <input type="text" class="input" placeholder="New York">
              </div>
              <div class="level-item">
                <span>Meetups in New York, USA</span>
              </div>
            </div>
            <div class="level-right">
              <div class="level-item">
                <button class="button is-medium m-r-sm">Meetups</button>
                <button class="button is-medium">Calendar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <section class="section page-find">
        <div class="columns cover is-multiline">
          <div v-for="meetup of meetups" :key="meetup._id" class="column is-one-third" :style="{'min-height': '160px'}">
            <router-link :to="'/meetups/' + meetup._id" class="meetup-card-find"
               href="#"
               :style="{'background-image': `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${meetup.image})`}">
              <div class="meetup-card-find-content">
                <div class="meetup-card-find-content-date is-pulled-right">
                  <span class="month">{{meetup.startDate | formatDate('MMM')}}</span>
                  <span class="day">{{meetup.startDate | formatDate('D')}}</span>
                </div>
                <div class="meetup-card-find-content-info">
                  <p class="title is-4 no-padding is-marginless m-b-xs">{{meetup.title}}</p>
                  <span class="tag is-success m-b-xs">{{meetup.category.name | capitalize}}</span>
                  <p class="subtitle is-7">{{meetup.location}}</p>
                </div>
                <div class="meetup-card-find-interest">
                  <p class="subtitle is-7">{{meetup.joinedPeopleCount}}</p>
                </div>
              </div>
            </router-link>
          </div>
        </div>
        <div>
          <span class="tag is-warning is-large">No meetups found :( You might try to change search criteria (:</span>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        meetups: []
      }
    },
    created () {
      axios.get('/api/v1/meetups')
        .then(res => {
          this.meetups = res.data
        })
    }
  }
</script>

<style lang="scss" scoped>
  .page-find {
    margin-top: 50px;
  }
  .meetup-card-find {
    width: 100%;
    height: 180px;
    position: relative;
    display: block;
    border-radius: 3px;
    text-decoration: none;
    box-shadow: 0 0 1px rgba(0,0,0,.05);
    background-clip: content-box;
    background-size: cover;
    background-position: 50% 20%;
    border: 1px solid rgba(0,0,0,.12);
    -webkit-tap-highlight-color: transparent;

    &-interest {
      position: absolute;
      bottom: 12px;
      right: 12px;
      > p {
        font-weight: bold;
      }
    }

    .title {
      color: white;
    }

    .subtitle {
      color: white;
    }

    &-content {
      &-date {
        margin: 10px;

        width: 70px;
        text-align: center;
        border-radius: 50%;

        .day {
          display: block;
          font-size: 21px;
          color: white;
          font-weight: bold;
        }

        .month {
          display: block;
          color: #ff5050;
          font-weight: bold;
          font-size: 23px;
          margin-bottom: -5px;
        }
      }

      &-info {
        position: absolute;
        bottom: 0;
        left: 0;
        padding: 15px;
        width: 100%;
      }
    }
  }

  .text-overlay-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }

  .lookup-prebody {
    position: relative;
  }

  .meetup-lookup {
    width: 960px;
    margin: 0 auto;
    background-color: #1a2238;
    padding: 20px;
    color: white;
  }

  .meetup-lookup-wrap {
    width: 100%;
    z-index: 2;
    position: absolute;
    top: auto;
    bottom: -42px;
  }
</style>
