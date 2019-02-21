<template>
  <div>
    <h1 class="title m-b-sm">Please confirm entered data</h1>

    <div class="content">
      <div >
        <span class="result-title">
        Location
        </span>
        <p>{{meetupToCreate.location}}</p>
      </div>
      <div>
        <span class="result-title">
        Title
        </span>
        <p>{{meetupToCreate.title}}</p>
      </div>
      <div>
        <span class="result-title">
        Start Date
        </span>
        <p>{{meetupToCreate.startDate | formatDate}}</p>
      </div>
      <div>
        <span class="result-title">
        From
        </span>
        <p>{{meetupToCreate.timeFrom}}</p>
      </div>
      <div>
        <span class="result-title">
        To
        </span>
        <p>{{meetupToCreate.timeTo}}</p>
      </div>
      <div>
        <span class="result-title">
        Category
        </span>
        <p>{{meetupToCreate.category.name}}</p>
      </div>
      <div>
        <span class="result-title">
        Image
        </span>
        <p>{{meetupToCreate.image}}</p>
      </div>
      <div>
        <span class="result-title">
        Short Info
        </span>
        <p>{{meetupToCreate.shortInfo}}</p>
      </div>
      <div>
        <span class="result-title">
        Description
        </span>
        <p>{{meetupToCreate.description}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      meetupToCreate: {
        required: true,
        type: Object
      }
    },
    validations: {}
  }
</script>

<style scoped>
  .result-title {
    font-size: 29px;
    font-weight: bold;
  }

  .result-title + p {
    font-size: 20px;
  }
</style>
