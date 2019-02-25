<template>
  <div>
    <button class="button is-primary is-outlined m-t-sm">Update Info</button>
    <div :class="['modal']">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">User Profile</p>
          <button class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <form>
            <div class="field">
              <label class="title">Name</label>
              <input class="input">
            </div>
            <div class="field">
              <label class="title">Username</label>
              <input class="input">
            </div>
            <div class="field">
              <label class="title">Avatar</label>
              <input class="input">
            </div>
            <div class="field">
              <label class="title">Info</label>
              <input class="input">
            </div>
          </form>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success">Save changes</button>
          <button class="button">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>
