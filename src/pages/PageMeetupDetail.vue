<template>
  <div class="meetup-detail-page">
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h2 class="subtitle">
            {{meetup.startDate | formatDate}}
          </h2>
          <h1 class="title">
            {{meetup.title}}
          </h1>
          <article class="media v-center">
            <figure class="media-left">
              <p class="image is-64x64">
                <img class="is-rounded" :src="meetupCreator.avatar">
              </p>
            </figure>
            <div class="media-content">
              <div class="content">
                <p>
                  Created by <strong>{{meetupCreator.name}}</strong>
                </p>
              </div>
            </div>
          </article>
        </div>
        <div class="is-pulled-right">
          <!-- We will handle this later (: -->
          <button v-if="isMember"
                  @click="leaveMeetup"
                  class="button is-danger">Leave Meetup</button>
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
                  <p><b>Date</b></p>
                  <p>{{meetup.startDate | formatDate}}</p>
                </div>
                <div class="meetup-side-box-date m-b-sm">
                  <p><b>Time</b></p>
                  <span>{{meetup.timeFrom}}</span> - <span>{{meetup.timeTo}}</span>
                </div>
                <div class="meetup-side-box-place m-b-sm">
                  <p><b>How to find us</b></p>
                  <p>{{meetup.location}}</p>
                </div>
                <div class="meetup-side-box-more-info">
                  <p><b>Additional Info</b></p>
                  <p>{{meetup.shortInfo}}</p>
                </div>
              </div>
              <div class="meetup-side-box-map">
                <img src="https://cnet2.cbsistatic.com/img/H_zPLL8-QTZOLxJvgHQ1Jkz0EgY=/830x467/2013/07/10/f0bcef02-67c2-11e3-a665-14feb5ca9861/maps_routemap.png" class="venueMap-mapImg span--100" alt="Location image of meetup venue">
              </div>
              <!-- Threads Start -->
              <p class="menu-label">
                Threads
              </p>
              <ul>
                <li v-for="thread in orderedThreads" :key="thread._id">{{thread.title}}</li>
              </ul>
              <p class="menu-label">
                Who is Going
              </p>
              <div class="columns is-multiline is-mobile">
                <!-- Joined People Images Here -->
                <div v-for="person in meetup.joinedPeople" :key="person._id" class="column is-3">
                  <figure class="image is-64x64">
                    <img class="is-rounded" :src="person.avatar" alt="Image">
                  </figure>
                </div>
              </div>
              <!-- Threads Ends -->
            </aside>
          </div>
          <div class="column is-7 is-offset-1">
            <div class="content is-medium">
              <h3 class="title is-3">About the Meetup</h3>
              <p>{{meetup.description}}</p>
              <button v-if="canJoin"
                      @click="joinMeetup"
                      class="button is-primary">Join In</button>
              <button v-if="!isAuthenticated"
                      :disabled="true"
                      class="button is-warning">You need authenticate in order to join</button>
              <ThreadCreateModal v-if="isMember || isMeetupOwner"
                                 @threadSubmitted="createThread"
                                 :btnTitle="`Welcome ${authUser.username}, Start a new thread`"
                                 :title="'Create Thread'" />
            </div>
            <ThreadList :threads="orderedThreads"
                        :canMakePost="canMakePost" />
            <button v-if="!isAllThreadsLoaded"
                    @click="fetchThreadsHandler"
                    class="button is-primary">Load More Threads</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import ThreadCreateModal from '@/components/ThreadCreateModal'
  import ThreadList from '@/components/ThreadList'
  export default {
    components: {
      ThreadCreateModal,
      ThreadList
    },
    data () {
      return {
        threadPageNum: 1,
        threadPageSize: 5
      }
    },
    computed: {
      ...mapState({
        meetup: state => state.meetups.item,
        threads: state => state.threads.items,
        authUser: state => state.auth.user,
        isAllThreadsLoaded: state => state.threads.isAllThreadsLoaded
      }),
      meetupCreator () {
        return this.meetup.meetupCreator || {}
      },
      isAuthenticated () {
        return this.$store.getters['auth/isAuthenticated']
      },
      isMeetupOwner () {
        return this.$store.getters['auth/isMeetupOwner'](this.meetupCreator._id)
      },
      isMember () {
        return this.$store.getters['auth/isMember'](this.meetup._id)
      },
      canJoin () {
        return !this.isMeetupOwner &&
                this.isAuthenticated &&
               !this.isMember
      },
      canMakePost () {
        return this.isAuthenticated && (this.isMember || this.isMeetupOwner)
      },
      orderedThreads () {
        const copyOfThreads = [...this.threads]
        return copyOfThreads.sort((thread, nextThread) => {
          return new Date(nextThread.createdAt) - new Date(thread.createdAt)
        })
      }
    },
    created () {
      const meetupId = this.$route.params.id
      this.fetchMeetupById(meetupId)
      this.fetchThreadsHandler({meetupId, init: true})

      if (this.isAuthenticated) {
        this.$socket.emit('meetup/subscribe', meetupId)
        this.$socket.on('meetup/postPublished', this.addPostToThreadHandler)
      }
    },
    destroyed () {
      this.$socket.removeListener('meetup/postPublished', this.addPostToThreadHandler)
      this.$socket.emit('meetup/unsubscribe', this.meetup._id)
    },
    methods: {
      ...mapActions('meetups', ['fetchMeetupById']),
      ...mapActions('threads', ['fetchThreads', 'postThread', 'addPostToThread']),
      fetchThreadsHandler ({meetupId, init}) {
        const filter = {
          pageNum: this.threadPageNum,
          pageSize: this.threadPageSize
        }

        this.fetchThreads({meetupId: meetupId || this.meetup._id, filter, init})
          .then(() => {
            this.threadPageNum++
          })
      },
      addPostToThreadHandler (post) {
        this.addPostToThread({post, threadId: post.thread})
      },
      joinMeetup () {
        this.$store.dispatch('meetups/joinMeetup', this.meetup._id)
      },
      leaveMeetup () {
        this.$store.dispatch('meetups/leaveMeetup', this.meetup._id)
      },
      createThread ({title, done}) {
        this.postThread({title, meetupId: this.meetup._id})
          .then(() => {
            this.$toasted.success('Thread Succesfuly Created!', {duration: 3000})
            done()
        })
      }
    }
  }
</script>

<style scoped lang="scss">
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

