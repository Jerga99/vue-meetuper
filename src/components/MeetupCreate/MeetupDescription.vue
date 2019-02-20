<template>
  <form class="m-b-md">
    <div class="field">
      <label class="title">Image</label>
      <input v-model="form.image"
             class="input"
             type="text"
             placeholder="Image URL">
      <div v-if="$v.form.image.$error">
        <span v-if="!$v.form.image.required" class="help is-danger">Username is required</span>
      </div>
    </div>
    <div class="field">
      <label class="title">Additional Info</label>
      <textarea v-model="form.shortInfo"
                class="textarea"
                placeholder="Write Short Info"
                rows="3"></textarea>
      <div v-if="$v.form.shortInfo.$error">
        <span v-if="!$v.form.shortInfo.required" class="help is-danger">Additional info is required</span>
      </div>
    </div>
    <div class="field">
      <label class="title">Long Description</label>
      <textarea v-model="form.description"
                class="textarea"
                placeholder="Write description"
                rows="10"></textarea>
        <div v-if="$v.form.description.$error">
          <span v-if="!$v.form.description.required" class="help is-danger">Description is required</span>
      </div>
    </div>
  </form>
</template>

<script>
  import { required } from 'vuelidate/lib/validators'
  export default {
    data () {
      return {
        form: {
          image: null,
          shortInfo: null,
          description: null
        }
      }
    },
    validations: {
      form: {
        image: {
          required
        },
        shortInfo: {
          required
        },
        description: {
          required
        }
      }
    }
  }
</script>

<style scoped>
</style>
