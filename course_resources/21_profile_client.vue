<!-- Template -->
<template>
  <div class="columns">
    <div class="container profile">
      <div class="section profile-heading">
        <div class="columns is-mobile is-multiline">
          <div class="column is-2">
            <figure class="image  header-icon user-profile-image">
              <!-- TODO: Get user avatar here -->
              <img class="is-rounded" src=""/>
            </figure>
          </div>
          <div class="column is-4-tablet is-10-mobile name">
            <p>
              <!-- TODO: Display user name here -->
              <span class="title is-bold">John Example</span>
              <br/>
              <!-- Here will be user update functionality -->
              <button class="button is-primary is-outlined m-t-sm">Update Info</button>
              <br/>
            </p>
            <!-- TODO: User Info Here if any -->
            <p class="tagline">
              I am very productive and good programmer
            </p>
          </div>
          <!-- TODO: Set Active Tab to 'meetups' and class to 'isActive' -->
          <div class="stats-tab column is-2-tablet is-4-mobile has-text-centered">
            <p class="stat-val">2</p>
            <p class="stat-key">Meetups</p>
          </div>
          <!-- TODO: Set Active Tab to 'threads' and class to 'isActive' -->
          <div class="stats-tab column is-2-tablet is-4-mobile has-text-centered">
            <p class="stat-val">4</p>
            <p class="stat-key">Threads</p>
          </div>
          <!-- TODO: Set Active Tab to 'posts' and class to 'isActive' -->
          <div class="stats-tab column is-2-tablet is-4-mobile has-text-centered">
            <p class="stat-val">3</p>
            <p class="stat-key">Posts</p>
          </div>
        </div>
      </div>
      <!-- TODO: Display this div when activeTab === 'meetups' -->
      <div class="columns is-mobile is-multiline">
        <!-- TODO: Iterate over meetups -->
        <div class="column is-3-tablet is-6-mobile">
          <!-- THREADS -->
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <!-- TODO: Display Meetup Image -->
                <img src=""/>
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <!-- TODO: Display Meetup title -->
                  <p class="title is-4">Nice Meetup</p>
                  <!-- TODO: Display Category name -->
                  <p class="subtitle is-6"><span class="tag is-dark subtitle">Sport</span></p>
                </div>
              </div>
              <div class="content">
                <!-- TODO: Display Meetup shortInfo -->
                <p>
                  Some short info
                </p>
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item">Share</a>
              <a class="card-footer-item">Delete</a>
            </footer>
          </div>
          <br/>
        </div>
      </div>
      <!-- TODO: Display this div when activeTab === 'threads' -->
      <div class="columns is-mobile is-multiline">
        <!-- TODO: Iterate over threads -->
        <div class="column is-3-tablet is-6-mobile">
          <!-- THREADS -->
          <div class="card">
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <!-- TODO: Display thread thread title -->
                  <p class="title is-4">Some title</p>
                </div>
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item">Share</a>
              <a class="card-footer-item">Delete</a>
            </footer>
          </div>
          <br/>
        </div>
      </div>
      <!-- TODO: Display this div when activeTab === 'posts' -->
      <div class="columns is-mobile is-multiline">
        <!-- TODO: Iterate over posts -->
        <div class="column is-3-tablet is-6-mobile">
          <!-- THREADS -->
          <div class="card">
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <!-- TODO: Display post text -->
                  <p class="title is-4">Some Text</p>
                </div>
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item">Share</a>
              <a class="card-footer-item">Delete</a>
            </footer>
          </div>
          <br/>
        </div>
      </div>
    </div>
  </div>
</template>


<!-- Styles -->
<style scoped>
  body {
    background: #F5F7FA
  }

  .stats-tab {
    border-bottom: 2px solid transparent;
    transition: 0.5s;
  }

  .stats-tab:hover {
    cursor: pointer;
    border-bottom: 2px solid black;
  }

  .stats-tab.isActive {
    border-bottom: 2px solid black;
  }

  .stat-val {
    font-size: 3em;
    padding-top: 20px;
    font-weight: bold;
  }

  .stat-key {
    font-size: 1.4em;
    font-weight: 200
  }

  .section.profile-heading .column.is-2-tablet.has-text-centered + .has-text-centered {
    border-left: 1px dotted rgba(0, 0, 0, .2);
  }

  .container.profile {
    margin-top: 1%;
  }

  .control.is-pulled-left span.select {
    margin-right: 5px;
    border-radius: 2px;
  }

  .modal-card .content h1 {
    padding: 40px 10px 10px;
    border-bottom: 1px solid #dadada
  }

  .container.profile .profile-options .tabs ul li.link a {
    margin-bottom: 20px;
    padding: 20px;
    background-color: #F1F1F1;
  }
</style>
