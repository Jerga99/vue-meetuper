<template>
  <section class="hero is-success is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-grey">Login</h3>
          <p class="subtitle has-text-grey">Please login to proceed.</p>
          <div class="box">
            <figure class="avatar">
                <img src="https://placehold.it/128x128">
            </figure>
            <form>
              <div class="field">
                <div class="control">
                  <input v-model="form.email"
                         @blur="$v.form.email.$touch()"
                         class="input is-large"
                         type="email"
                         placeholder="Your Email"
                         autofocus=""
                         autocomplete="email">
                  <div v-if="$v.form.email.$error" class="form-error">
                    <span v-if="!$v.form.email.required" class="help is-danger">Email is required</span>
                    <span v-if="!$v.form.email.email" class="help is-danger">Email address is not valid</span>
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input v-model="form.password"
                         @blur="$v.form.password.$touch()"
                         class="input is-large"
                         type="password"
                         placeholder="Your Password"
                         autocomplete="current-password">
                  <div v-if="$v.form.password.$error" class="form-error">
                    <span v-if="!$v.form.password.required" class="help is-danger">Password is required</span>
                  </div>
                </div>
              </div>
              <button @click.prevent="login"
                      :disabled="isFormInvalid"
                      class="button is-block is-info is-large is-fullwidth">Login</button>
            </form>
          </div>
          <p class="has-text-grey">
            <a>Sign In With Google</a> &nbsp;·&nbsp;
            <router-link :to="{name: 'PageRegister'}">Sign Up</router-link> &nbsp;·&nbsp;
            <a href="../">Need Help?</a>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import { required, email } from 'vuelidate/lib/validators'
  import { REDIRECT_MESSAGES } from '@/helpers/redirectMessages'
  export default {
    data () {
      return {
        form: {
          email: null,
          password: null
        }
      }
    },
    validations: {
      form: {
        email: {
          required,
          email
        },
        password: {
          required
        }
      }
    },
    computed: {
      isFormInvalid () {
        return this.$v.form.$invalid
      }
    },
    created() {
      const { messageType } = this.$route.query
      if (!messageType) return

      const { message } = REDIRECT_MESSAGES[messageType]
      this.$toasted.success(message, {duration: 3000})
      this.$router.push({query: ''})
    },
    methods: {
      login () {
        this.$v.form.$touch()
        this.$store.dispatch('auth/loginWithEmailAndPassword', this.form)
          .then(() => this.$router.push('/'))
          .catch((errorMessage) => {
            this.$toasted.error(errorMessage, {duration: 5000})
          })
      }
    }
  }
</script>

<style scoped>
  .hero.is-success {
    background: #F2F6FA;
  }
  .hero .nav, .hero.is-success .nav {
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  .box {
    margin-top: 5rem;
  }
  .avatar {
    margin-top: -70px;
    padding-bottom: 20px;
  }
  .avatar img {
    padding: 5px;
    background: #fff;
    border-radius: 50%;
    -webkit-box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
    box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
  }
  input {
    font-weight: 300;
  }
  p {
    font-weight: 700;
  }
  p.subtitle {
    padding-top: 1rem;
  }
</style>
