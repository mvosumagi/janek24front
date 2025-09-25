<template>
  <div class="container py-4">
    <h1 class="mb-4">Email</h1>
    <form>
      <div class="mb-3">
        <label class="form-label" for="from">From</label>
        <input id="from" type="email" class="form-control" v-model.trim="form.from" />
      </div>
      <div class="mb-3">
        <label class="form-label" for="to">To</label>
        <input id="to" type="text" class="form-control" v-model.trim="form.to" />
      </div>
      <div class="mb-3">
        <label class="form-label" for="cc">CC</label>
        <input id="cc" type="text" class="form-control" v-model.trim="form.cc" />
      </div>
      <div class="mb-3">
        <label class="form-label" for="subject">Subject</label>
        <input id="subject" type="text" class="form-control" v-model.trim="form.subject" />
      </div>
      <div class="mb-3">
        <label class="form-label" for="body">Body</label>
        <textarea id="body" rows="8" class="form-control" v-model="form.body"></textarea>
      </div>
      <div class="d-flex flex-wrap gap-2 mt-3">
        <button type="button" class="btn btn-outline-primary" @click="reply">Reply</button>
        <button type="button" class="btn btn-outline-primary" @click="replyAll">Reply All</button>
        <button type="button" class="btn btn-outline-primary" @click="forward">Forward</button>
        <button type="button" class="btn btn-outline-secondary" @click="goBack">Back</button>
        <button type="button" class="btn btn-outline-secondary" @click="goHome">Home</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'EmailView',
  data() {
    return {
      form: {
        from: 'you@example.com',
        to: '',
        cc: '',
        subject: '',
        body: ''
      }
    }
  },
  methods: {
    reply() {
      console.log("Reply clicked")
    },
    replyAll() {
      console.log("Reply All clicked")
    },
    forward() {
      console.log("Forward clicked")
    },
    goBack() {
      this.$router.back()
    },
    goHome() {
      this.$router.push('/home')
    }
  }
}
</script>
