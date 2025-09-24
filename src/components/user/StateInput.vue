<template>
  <div class="container text-center">
    <div class="row justify-content-center">
      <div class="col col-4">
        <div class="mb-3">
          <label>State</label>
          <input :value="state" @change="onChange" type="text" placeholder="State"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default{ name:"StateInput", props:{ state:String }, methods:{ onChange(e){ this.$emit("event-state-updated", String(e.target.value)) } } }
</script>
