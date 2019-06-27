<template>
  <div>
    <AppHero />
    <div v-if="pageLoader_isDataLoaded" class="container">
      <section class="section">
      <div class="m-b-lg">
        <h1 class="title is-inline">Featured Meetups
          <span v-if="ipLocation"> in {{ipLocation}}</span>
        </h1>
        <AppDropdown />
        <router-link v-if="user" :to="{name: 'PageMeetupCreate'}" class="button is-primary is-pulled-right m-r-sm">Create Meetups</router-link>
        <router-link :to="{name: 'PageMeetupFind'}"
                     class="button is-primary is-pulled-right m-r-sm">
                   All
        </router-link>
      </div>
      <div class="row columns is-multiline">
        <!-- Iterate your meetups here! -->
        <MeetupItem v-for="meetup in meetups"
                    :key="meetup._id"
                    :meetup="meetup" />
      </div>
      <paginate
        v-model="pagination.pageNum"
        :page-count="pagination.pageCount"
        :click-handler="fetchPaginatedMeetups"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'paginationContainer'">
      </paginate>
      </section>
      <section class="section">
        <div>
          <h1 class="title">Categories</h1>
          <div class="columns cover is-multiline is-mobile">
            <CategoryItem v-for="category in categories"
                          :key="category._id"
                          :category="category" />
          </div>
        </div>
      </section>
    </div>
    <div v-else class="container">
      <AppSpinner />
    </div>
  </div>
</template>

<script>
  import CategoryItem from '@/components/CategoryItem'
  import MeetupItem from '@/components/MeetupItem'
  import { mapActions, mapState, mapGetters } from 'vuex'
  import pageLoader from '@/mixins/pageLoader'
  import { processLocation } from '@/helpers'

  export default {
    components: {
      CategoryItem,
      MeetupItem
    },
    mixins: [pageLoader],
    computed: {
      ...mapGetters({
        'user': 'auth/authUser',
        'ipLocation': 'meta/location'
      }),
      ...mapState({
        meetups: state => state.meetups.items,
        categories: state => state.categories.items,
        pagination: state => state.meetups.pagination
      })
    },
    created () {
      const {pageSize, pageNum} = this.$route.query

      if (pageSize && pageNum) {
        this.initializePagesFromQuery({pageSize, pageNum})
      }

      Promise.all([this.handleFetchMeetups({}), this.fetchCategories()])
        .then(() => this.pageLoader_resolveData())
        .catch((err) => {
          console.error(err)
          this.pageLoader_resolveData()
        })
    },
    methods: {
      ...mapActions('meetups', ['fetchMeetups', 'initializePagesFromQuery']),
      ...mapActions('categories', ['fetchCategories']),
      handleFetchMeetups ({reset}) {
        const filter = {}
        filter['pageSize'] = this.pagination.pageSize
        filter['pageNum'] = this.pagination.pageNum

        return this.fetchMeetups({filter, reset}).then(_ => this.setQueryPaginationParams())
      },
      fetchPaginatedMeetups (page) {
        this.setPage(page)
        this.handleFetchMeetups({reset: false})
      },
      setPage (page) {
        this.$store.commit('meetups/setPage', page)
      },
      setQueryPaginationParams() {
        const { pageSize, pageNum } = this.pagination
        this.$router.push({query: {pageNum, pageSize}})
      }
    }
  }
</script>

<style lang="scss">
.paginationContainer {
  display: inline-block;
  padding-left: 0;
  margin: 20px 0;
  border-radius: 4px;

  > li {
    display: inline;
    font-size: 18px;

    > a {
      position: relative;
      float: left;
      padding: 6px 12px;
      margin-left: -1px;
      line-height: 1.42857143;
      color: #00d1b2;
      text-decoration: none;
      background-color: #fff;
      border: 1px solid #ddd;
    }

    &.active {
      > a {
        z-index: 2;
        color: #fff;
        cursor: default;
        background-color: #00d1b2;
        border-color: #00d1b2;
      }
    }

    &.disabled {
      > a {
        color: #777;
        cursor: not-allowed;
        background-color: #fff;
        border-color: #ddd;
      }
    }
  }
 }
</style>
