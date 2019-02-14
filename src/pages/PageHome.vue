<template>
  <div>
    <AppHero />
    <div class="container">
      <section class="section">
      <div class="m-b-lg">
        <h1 class="title is-inline">Featured Meetups in "Location"</h1>
        <AppDropdown />
        <button class="button is-primary is-pulled-right m-r-sm">Create Meetups</button>
        <button class="button is-primary is-pulled-right m-r-sm">All</button>
      </div>
      <div class="row columns">
        <div class="column is-one-third">
          <div class="card large">
            <div class="card-image">
              <figure class="image is-4by3">
                  <img src="https://images.unsplash.com/photo-1475778057357-d35f37fa89dd?dpr=1&auto=compress,format&fit=crop&w=1920&h=&q=80&cs=tinysrgb&crop=" alt="Image">
              </figure>
            </div>
            <div class="card-content">
              <div class="level m-b-md">
                <div class="media-left">
                  <div class="level-item has-text-centered">
                    <div>
                      <p class="title">JAN</p>
                      <p class="title">16</p>
                    </div>
                  </div>
                </div>
                <div class="media-content">
                    <p class="title is-4 no-padding is-marginless">Beer and Burger in Hamburg</p>
                    <!-- <p><span class="title is-6"><a href="http://twitter.com/#">@twitterid</a></span></p> -->
                    <span class="tag is-success">Music</span>
                    <p class="subtitle is-7">Tomorrow · Times Square · 05201 </p>
                </div>
              </div>
              <div class="content">
                  The Beast stumbled in the dark for it could no longer see the path...
                  <div class="background-icon"><span class="icon-twitter"></span></div>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-one-third">
          <div class="card large">
            <div class="card-image">
              <figure class="image is-4by3">
                  <img src="https://source.unsplash.com/uzDLtlPY8kQ" alt="Image">
              </figure>
            </div>
            <div class="card-content">
              <div class="level m-b-md">
                <div class="media-left">
                  <div class="level-item has-text-centered">
                    <div>
                      <p class="title">JAN</p>
                      <p class="title">16</p>
                    </div>
                  </div>
                </div>
                <div class="media-content">
                    <p class="title is-4 no-padding is-marginless">Beer and Burger in Hamburg</p>
                    <!-- <p><span class="title is-6"><a href="http://twitter.com/#">@twitterid</a></span></p> -->
                    <span class="tag is-success">Music</span>
                    <p class="subtitle is-7">Tomorrow · Times Square · 05201 </p>
                </div>
              </div>
              <div class="content">
                  The Beast stumbled in the dark for it could no longer see the path...
                  <div class="background-icon"><span class="icon-facebook"></span></div>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-one-third">
          <div class="card large">
            <div class="card-image">
              <figure class="image is-4by3">
                  <img src="https://source.unsplash.com/pe_R74hldW4" alt="Image">
              </figure>
            </div>
            <div class="card-content">
              <div class="level m-b-md">
                <div class="media-left">
                  <div class="level-item has-text-centered">
                    <div>
                      <p class="title">JAN</p>
                      <p class="title">16</p>
                    </div>
                  </div>
                </div>
                <div class="media-content">
                    <p class="title is-4 no-padding is-marginless">Beer and Burger in Hamburg</p>
                    <!-- <p><span class="title is-6"><a href="http://twitter.com/#">@twitterid</a></span></p> -->
                    <span class="tag is-success">Music</span>
                    <p class="subtitle is-7">Tomorrow · Times Square · 05201 </p>
                </div>
              </div>
              <div class="content">
                  The Beast stumbled in the dark for it could no longer see the path...
                  <div class="background-icon"><span class="icon-barcode"></span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
  </div>
</template>

<script>
  import axios from 'axios'
  import CategoryItem from '@/components/CategoryItem'
  export default {
    components: {
      CategoryItem
    },
    data () {
      return {
        categories: []
      }
    },
    created () {
      axios.get('/api/v1/categories')
        .then(res => {
          debugger
          this.categories = res.data
        })
    }
  }
</script>

<style scoped>
</style>
