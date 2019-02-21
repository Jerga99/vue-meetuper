<template>
  <div>
    <h1 class="title m-b-sm">What's your new Meetup location?</h1>
    <div class="m-b-lg">
      <span class="subtitle">New York, US</span>
      <a>(change location)</a>
      <input @input="emitFormData"
             @blur="$v.form.location.$touch()"
             v-model="form.location"
             type="text"
             class="input">
      <div v-if="$v.form.location.$error">
        <span v-if="!$v.form.location.required" class="help is-danger">Location is required</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { required } from 'vuelidate/lib/validators'
  export default {
    data () {
      return {
         form: {
           location: null
        }
      }
    },
    validations: {
      form: {
        location: {required}
      }
    },
    methods: {
      emitFormData () {
        this.$emit('stepUpdated', {data: this.form, isValid: !this.$v.$invalid})
      }
    }
  }
</script>

<style scoped>
