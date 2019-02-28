<template>
  <div class="meetup-detail-page">
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h2 class="subtitle">
            {{meetup.startDate | formatDate}}
          </h2>
          <div class="field">
            <!-- TODO: Bind meetup title -->
            <input v-model="meetup.title"
                   class="title input w-50"
                   type="text">
          </div>
          <article class="media v-center">
            <figure class="media-left">
              <p class="image is-64x64">
                <!-- TODO: Display meetup creator avatar -->
                <img class="is-rounded" :src="meetupCreator.avatar">
              </p>
            </figure>
            <div class="media-content">
              <div class="content">
                <p>
                  <!-- TODO: Display meetup creator name -->
                  Created by <strong>{{meetupCreator.name}}</strong>
                </p>
              </div>
            </div>
          </article>
        </div>
        <div class="is-pulled-right">
          <!-- Update Button -->
          <button @click="updateMeetupHandler"
                  class="button is-success is-large">Update</button>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-3">
            <aside class="is-medium menu">
              <div class="meetup-side-box">
                <div class="meetup-side-box-date m-b-sm">
                  <!-- TIMES START -->
                  <p><b>Time</b></p>
                  <!-- TODO - OPTIONAL - Make dates and times working -->
                  <!-- Implementation almost the same as in create meetup -->

                  <!-- 1. Disable Dates -->
                  <!-- 2. Set Date on @input event-->
                  <!-- 3. Display actual meetup startDate in :value -->
                  <datepicker
                    @input="setDate"
                    :value="meetup.startDate"
                    :disabledDates="disabledDates"
                    :input-class="'input'"></datepicker>
                    <div class="field m-t-md">
                      <!-- TODO: Implement @change Event -->
                      <!-- TODO: Bind timeFrom value with v-model -->
                    <vue-timepicker v-model="meetup.timeFrom"
                                    @change="changeTime($event, 'timeFrom')"
                                    :minute-interval="10"></vue-timepicker>
                  </div>
                  <div class="field">
                    <!-- TODO: Implement @change Event -->
                    <!-- TODO: Bind timeTo value with v-model -->
                    <vue-timepicker v-model="meetup.timeTo"
                                    @change="changeTime($event, 'timeTo')"
                                    :minute-interval="10"></vue-timepicker>
                  </div>
                  <!-- TIMES END -->
                </div>
                <div class="meetup-side-box-place m-b-sm">
                  <p><b>Choose Category</b></p>
                  <div class="field">
                    <div class="select">
                      <!-- TODO: Get Here Categories -->
                      <select v-model="meetup.category">
                        <option v-for="category of categories"
                                :value="category"
                                :key="category.id">{{category.name}}</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="meetup-side-box-place m-b-sm">
                  <p><b>How to find us</b></p>
                  <div class="field">
                    <!-- TODO: Bind meetup location -->
                    <input v-model="meetup.location"
                           class="input"
                           type="text">
                  </div>
                </div>
                <div class="meetup-side-box-more-info">
                  <p><b>Additional Info</b></p>
                  <div class="field">
                    <!-- TODO: Bind meetup short info -->
                    <textarea v-model="meetup.shortInfo"
                              class="textarea"
                              rows="5"></textarea>
                  </div>
                </div>
              </div>
              <div class="meetup-side-box-map">
                <img src="https://cnet2.cbsistatic.com/img/H_zPLL8-QTZOLxJvgHQ1Jkz0EgY=/830x467/2013/07/10/f0bcef02-67c2-11e3-a665-14feb5ca9861/maps_routemap.png" class="venueMap-mapImg span--100" alt="Location image of meetup venue">
              </div>
            </aside>
          </div>
          <div class="column is-7 is-offset-1">
            <div class="content is-medium">
              <h3 class="title is-3">About the Meetup</h3>
              <!-- TODO: Bind meetup description -->
              <textarea v-model="meetup.description"
                        class="textarea"
                        rows="5"></textarea>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import Datepicker from 'vuejs-datepicker'
  import VueTimepicker from 'vue2-timepicker'
  import {mapActions} from 'vuex'
  import moment from 'moment'
  export default {
    components: {
      Datepicker,
      VueTimepicker
    },
    props: {
      meetupId: {
        required: true,
        type: String
      }
    },
    data () {
      return {
        disabledDates: {
          customPredictor: function (date) {
            const today = new Date()
            const yesterday = today.setDate(today.getDate() - 1)
            return date < yesterday
          }
        }
      }
    },
    computed: {
      meetup () {
        const meetup = this.$store.state.meetups.item
        if (this.hasValue(meetup)) {
          const timeTo = this.parseTime(meetup.timeTo)
          const timeFrom = this.parseTime(meetup.timeFrom)

          return {...meetup, timeFrom, timeTo}
        }

        return {}
      },
      categories () {
        return this.$store.state.categories.items
      },
      meetupCreator () {
        return this.meetup.meetupCreator || {}
      },
      authUser () {
        return this.$store.state.auth.user
      }
    },
    created () {
      this.fetchMeetupByIdHandler()
      this.fetchCategories()
    },
    methods: {
      ...mapActions('meetups', ['fetchMeetupById', 'updateMeetup']),
      ...mapActions('categories', ['fetchCategories']),
      fetchMeetupByIdHandler () {
        this.fetchMeetupById(this.meetupId)
          .then(meetup => {
            if (meetup.meetupCreator._id !== this.authUser._id) {
              this.$router.push({path: '/not-authorized'})
            }
          })
          .catch(err => console.log(err))
      },
      updateMeetupHandler () {
        this.updateMeetup(this.meetup)
          .then(() => {
            this.$toasted.success('Meetup Succesfuly Updated!', {duration: 3000})
          })
          .catch(err => console.log(err))
      },
      parseTime (time) {
        const [HH, mm] = time.split(':')
        return {HH, mm}
      },
      setDate (date) {
        this.meetup.startDate = moment(date).format()
      },
      changeTime ({data}, field) {
        const minutes = data.mm || '00'
        const hours = data.HH || '00'
        this.meetup[field] = hours + ':' + minutes
      },
      hasValue (meetup) {
        const meetupLength = Object.keys(meetup).length
        return meetupLength && meetupLength > 0
      }
    }
  }
</script>


<style lang="scss">

.w-50 {
  width: 50%;
}

.tag.is-warning {
  opacity: 0.5;
}

.meetup-detail-page {
  background-color: #f5f5f5;

  .mapouter{text-align:right;height:500px;width:600px;}.gmap_canvas {overflow:hidden;background:none!important;height:500px;width:600px;}

  .hero-body {
    background-color: white;
    border: 1px solid rgba(46,62,72,.12);
    color: white;

      background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1531263060782-b024de9b9793?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80');
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;

      > p,h1,h2, strong {
        color: white;
      }
    }

  .meetup-side-box {
    background-color: white;
    border-radius: 10px;
    font-size: 16px;
    padding: 15px;
  }
}

pre,
.message {
  max-width: 960px;
}

.v-center {
  align-items: center;
}

li {margin: 10px}

.hero.is-primary {
background: linear-gradient(to top right, #524ad0 10%, #D099FA);
}

.box {
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
}

.box span.icon {
  float: right;
  font-size: 1.7em;
  padding: 2rem 2rem 0 0;
}

.is-large.fab {
  font-size: 7em;
}

.is-large.fas {
  font-size: 5em;
  margin-left: 0.2em;
}

.media-content {overflow: hidden;}

.menu-list li a:hover {
  background: #d9d9d9;
}

.token.number {
  display: inline;
  padding: inherit;
  font-size: inherit;
  line-height: inherit;
  text-align: inherit;
  vertical-align: inherit;
  border-radius: inherit;
  font-weight: inherit;
  white-space: inherit;
  background: inherit;
  margin: inherit;
}
.footer {background-color: white;}
</style>
