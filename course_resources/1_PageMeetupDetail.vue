<template>
  <div class="meetup-detail-page">
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h2 class="subtitle">
            <!-- TODO: meetup startDate -->
            14th January 2019
          </h2>
          <h1 class="title">
            <!-- TODO: title -->
            Burger Lovers Meetup
          </h1>
          <article class="media v-center">
            <figure class="media-left">
              <p class="image is-64x64">
                <!-- OPTIONAL: meetupCreator avatar -->
                <img class="is-rounded" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuqyc3j2s3bL4DIkC8uC9h0rcAdsDXcwJPNh8XHWbLQfHbOpVU">
              </p>
            </figure>
            <div class="media-content">
              <div class="content">
                <p>
                  <!-- OPTIONAL: meetupCreator name -->
                  Created by <strong>John Doe</strong>
                </p>
              </div>
            </div>
          </article>
        </div>
        <div class="is-pulled-right">
          <!-- We will handle this later (: -->
          <button class="button is-danger">Leave Group</button>
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
                  <!-- TODO: meetup startDate -->
                  <p>14th January 2018</p>
                </div>
                <div class="meetup-side-box-date m-b-sm">
                  <p><b>Time</b></p>
                  <!-- TODO: meetup timeFrom - timeTo -->
                  <span>14:00</span> - <span>18:00</span>
                </div>
                <div class="meetup-side-box-place m-b-sm">
                  <p><b>How to find us</b></p>
                  <!-- TODO: meetup location -->
                  <p>Bratislava, SK</p>
                </div>
                <div class="meetup-side-box-more-info">
                  <p><b>Additional Info</b></p>
                  <!-- TODO: meetup shortInfo -->
                  <p>Just some short info</p>
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
                <li>Should I follow some dresscode ?</li>
              </ul>
              <p class="menu-label">
                Who is Going
              </p>
              <div class="columns is-multiline is-mobile">
                <!-- Joined People Images Here -->
                <div class="column is-3">
                  <figure class="image is-64x64">
                    <img class="is-rounded" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuqyc3j2s3bL4DIkC8uC9h0rcAdsDXcwJPNh8XHWbLQfHbOpVU" alt="Image">
                  </figure>
                </div>
              </div>
              <!-- Threads Ends -->
            </aside>
          </div>
          <div class="column is-7 is-offset-1">
            <div class="content is-medium">
              <h3 class="title is-3">About the Meetup</h3>
              <!-- TODO: meetup description -->
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, obcaecati veniam mollitia quisquam asperiores voluptatum corporis est, quaerat quae eaque similique officiis impedit, necessitatibus pariatur. Perspiciatis laudantium ipsum eum, neque.</p>
              <!-- Join Meetup, We will handle it later (: -->
              <button class="button is-primary">Join In</button>
              <!-- Not logged In Case, handle it later (: -->
              <!-- <button :disabled="true"
                      class="button is-warning">You need authenticate in order to join</button> -->
            </div>
            <!-- Thread List START -->
            <div class="content is-medium">
              <h3 class="title is-3">Threads</h3>
              <div class="box">
                <!-- Thread title -->
                <h4 id="const" class="title is-3">Should I follow some dresscode ?</h4>
                <!-- Create new post, handle later -->
                <form class="post-create">
                  <div class="field">
                    <textarea class="textarea textarea-post"
                              placeholder="Write a post"
                              rows="1"></textarea>
                    <button :disabled="true" class="button is-primary m-t-sm">Send</button>
                  </div>
                </form>
                <!-- Create new post END, handle later -->
                <!-- Posts START -->
                <article class="media post-item">
                  <figure class="media-left is-rounded user-image">
                    <p class="image is-32x32">
                      <img class="is-rounded" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuqyc3j2s3bL4DIkC8uC9h0rcAdsDXcwJPNh8XHWbLQfHbOpVU">
                    </p>
                  </figure>
                  <div class="media-content">
                    <div class="content is-medium">
                      <div class="post-content">
                        <!-- Post User Name -->
                        <strong class="author">Filip Jerga</strong>
                        {{' '}}
                        <!-- Post Updated at -->
                        <small class="post-time">13th Jan</small>
                        <br>
                        <p class="post-content-message">It's up to you (:</p>
                      </div>
                    </div>
                  </div>
                </article>
                <!-- Posts END -->
              </div>
            </div>
            <!-- Thread List END -->
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {

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

  // Post Create Input START
  .textarea-post {
    padding-bottom: 30px;
  }

  .post-create {
    margin-bottom: 15px;
  }
  // Post Create END

  // Thread List START
  .content {
    figure {
      margin-bottom: 0;
    }
  }

  .media-content-threads {
    background-color: #f1f1f1;
    padding: 3px 20px;
    border-radius: 10px;
    margin-right: 40px;
    width: 100px;
  }

  .media-left.user-image {
    margin: 0;
    margin-right: 15px;
  }

  .post-item {

  }

  .media + .media {
    border: none;
    margin-top: 0;
  }

  .post-content {
    margin: 0;
    &-message {
      font-size: 16px;
    }

    .author {
      font-size: 18px;
    }

    .post-time {
      font-size: 16px;
    }
  }
  // Thread List END
</style>
