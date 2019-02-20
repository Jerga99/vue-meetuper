<template>
  <div>
    <h1 class="title m-b-sm">Please confirm entered data</h1>

    <div class="content">
      <div >
        <span class="result-title">
        Location
        </span>
        <p>Some Location</p>
      </div>
      <div>
        <span class="result-title">
        Title
        </span>
        <p>Some Title</p>
      </div>
      <div>
        <span class="result-title">
        Start Date
        </span>
        <p>Some Start Date</p>
      </div>
      <div>
        <span class="result-title">
        From
        </span>
        <p>Some Time From</p>
      </div>
      <div>
        <span class="result-title">
        To
        </span>
        <p>Some Time To</p>
      </div>
      <div>
        <span class="result-title">
        Category
        </span>
        <p>Some Category</p>
      </div>
      <div>
        <span class="result-title">
        Image
        </span>
        <p>Some Event</p>
      </div>
      <div>
        <span class="result-title">
        Short Info
        </span>
        <p>Some Info</p>
      </div>
      <div>
        <span class="result-title">
        Description
        </span>
        <p>Some Description</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
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
