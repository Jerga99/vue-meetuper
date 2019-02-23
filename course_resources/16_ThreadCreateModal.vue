<div>
    <!-- TODO: Toggle Modal, set isOpen to oposite value of is Open -->
    <button class="button is-success">Open Modal</button>
    <!-- TODO: create "isOpen" variable in data and set it to false -->
    <!-- TODO: Set is-active class when isOpen is true -->
    <div :class="['modal']">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Create</p>
          <!-- TODO: Close Modal set isOpen to false -->
          <button class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <form>
            <div class="field">
              <label class="title">What would you like to ask?</label>
              <!-- TODO: Create "form" object in data containing "title" and bind it to textarea -->
              <textarea v-model="form.title"
                        class="textarea"
                        placeholder="Just write something that interest you (:"
                        rows="10"></textarea>
            </div>
          </form>
        </section>
        <footer class="modal-card-foot">
          <!-- TODO: Emit thread Create -->
          <button class="button is-success">Save changes</button>
          <!-- TODO: Close Modal set isOpen to false -->
          <button class="button">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
