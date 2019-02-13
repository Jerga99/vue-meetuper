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
            <div class="column is-one-quarter" :style="{'min-height': '160px'}">
              <a href="#">
                <span class="is-primary is-top is-medium tooltip">
                  <figure class="image is-4by3 imageFade">
                    <img class="is-rounded" src="https://images.unsplash.com/photo-1508355991726-ebd81e4802f7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1506&q=80" alt="">
                  </figure>
                  <div class="subtitle m-t-xs bold">Sport</div>
                </span>
              </a>
            </div>
            <div class="column is-one-quarter is-rounded" :style="{'min-height': '160px'}">
              <a href="#">
                <span class="is-primary is-top is-medium tooltip">
                  <figure class="image is-4by3 imageFade">
                    <img class="is-rounded" src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" alt="">
                  </figure>
                  <div class="subtitle m-t-xs bold">Movies</div>
                </span>
              </a>
            </div>
            <div class="column is-one-quarter is-rounded" :style="{'min-height': '160px'}">
              <a href="#">
                <span class="is-primary is-top is-medium tooltip">
                  <figure class="image is-4by3 imageFade">
                    <img class="is-rounded" src="https://images.unsplash.com/photo-1511735111819-9a3f7709049c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1334&q=80" alt="">
                  </figure>
                  <div class="subtitle m-t-xs bold">Music</div>
                </span>
              </a>
            </div>
            <div class="column is-one-quarter is-rounded" :style="{'min-height': '160px'}">
              <a href="#">
                <span class="is-primary is-top is-medium tooltip">
                  <figure class="image is-4by3 imageFade">
                    <img class="is-rounded" src="https://images.unsplash.com/photo-1509670811615-bb8b07cb3caf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1510&q=80" alt="">
                  </figure>
                  <div class="subtitle m-t-xs bold">Dance</div>
                </span>
              </a>
            </div>
            <div class="column is-one-quarter is-rounded" :style="{'min-height': '160px'}">
              <a href="#">
                <span class="is-primary is-top is-medium tooltip">
                  <figure class="image is-4by3 imageFade">
                    <img class="is-rounded" src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80" alt="">
                  </figure>
                  <div class="subtitle m-t-xs bold">Party</div>
                </span>
              </a>
            </div>
            <div class="column is-one-quarter is-rounded" :style="{'min-height': '160px'}">
              <a href="#">
                <span class="is-primary is-top is-medium tooltip">
                  <figure class="image is-4by3 imageFade">
                    <img class="is-rounded" src="https://images.unsplash.com/photo-1490633874781-1c63cc424610?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80" alt="">
                  </figure>
                  <div class="subtitle m-t-xs bold">Books</div>
                </span>
              </a>
            </div>
            <div class="column is-one-quarter is-rounded" :style="{'min-height': '160px'}">
              <a href="#">
                <span class="is-primary is-top is-medium tooltip">
                  <figure class="image is-4by3 imageFade">
                    <img class="is-rounded" src="https://images.unsplash.com/photo-1536510233921-8e5043fce771?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1542&q=80" alt="">
                  </figure>
                  <div class="subtitle m-t-xs bold">Food</div>
                </span>
              </a>
            </div>
            <div class="column is-one-quarter is-rounded" :style="{'min-height': '160px'}">
              <a href="#">
                <span class="is-primary is-top is-medium tooltip">
                  <figure class="image is-4by3 imageFade">
                    <img class="is-rounded" src="https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80" alt="">
                  </figure>
                  <div class="subtitle m-t-xs bold">Games</div>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  export default {
  }
</script>

<style scoped>
  .is-rounded {
    border-radius: 10px !important;
  }
</style>
