<template>
  <div class="container py-4">
    <h1 class="mb-4">Inbox</h1>
    <form @submit.prevent="onSend" novalidate>
      <fieldset :disabled="sending || loading">
        <div class="mb-3">
          <label class="form-label" for="from">From (username)</label>
          <input id="from" type="text" class="form-control" v-model.trim="form.from" autocomplete="off"/>
        </div>
        <div class="mb-3">
          <label class="form-label" for="to">To (comma/space separated usernames)</label>
          <input id="to" type="text" class="form-control" v-model.trim="form.to" autocomplete="off"/>
        </div>
        <div class="mb-3">
          <label class="form-label" for="cc">CC (optional)</label>
          <input id="cc" type="text" class="form-control" v-model.trim="form.cc" autocomplete="off"/>
        </div>
        <div class="mb-3">
          <label class="form-label" for="subject">Subject</label>
          <input id="subject" type="text" class="form-control" v-model.trim="form.subject"/>
        </div>
        <div class="mb-3">
          <label class="form-label" for="body">Body</label>
          <textarea id="body" rows="8" class="form-control" v-model="form.body"></textarea>
        </div>
        <div class="d-flex flex-wrap gap-2 mt-3">
          <button type="submit" class="btn btn-outline-primary" :disabled="!isValid || sending">
            {{ sending ? 'Sending…' : 'Send' }}
          </button>
          <button type="button" class="btn btn-outline-secondary" @click="resetForm" :disabled="sending">Reset</button>
          <button type="button" class="btn btn-outline-dark" @click="loadInbox" :disabled="loading">
            {{ loading ? 'Loading…' : 'Load Inbox' }}
          </button>
          <button type="button" class="btn btn-outline-secondary" @click="goBack">Back</button>
          <button type="button" class="btn btn-outline-secondary" @click="goHome">Home</button>
        </div>
      </fieldset>
    </form>
    <hr class="my-4"/>
    <div class="d-flex justify-content-between align-items-center mb-2">
      <h2 class="h5 m-0">My Inbox</h2>
      <div class="d-flex gap-2">
        <button class="btn btn-sm btn-outline-secondary" @click="loadInbox" :disabled="loading">Refresh</button>
        <span v-if="loading" class="text-muted small align-self-center">Updating…</span>
      </div>
    </div>
    <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>
    <div v-if="!loading && inbox.length === 0" class="text-muted">No messages.</div>
    <div v-else class="list-group" role="list">
      <button
          v-for="m in inbox"
          :key="m.id"
          type="button"
          class="list-group-item list-group-item-action d-flex justify-content-between align-items-start"
          @click="openMessage(m)"
          role="listitem"
          :aria-pressed="selected && selected.id === m.id"
      >
        <div class="me-auto">
          <div class="fw-bold">
            <span class="text-truncate d-inline-block" style="max-width: 60ch">{{ m.title }}</span>
            <span class="text-muted"> #{{ m.id }}</span>
          </div>
          <div class="small text-muted">From: {{ m.senderUsername }} • {{ formatDate(m.createdAt) }}</div>
        </div>
        <span :class="['badge','rounded-pill', statusClass(m.status)]">{{ statusText(m.status) }}</span>
      </button>
    </div>
    <div v-if="selected" class="card mt-3">
      <div class="card-header d-flex justify-content-between align-items-center">
        <div>
          <div class="fw-bold">{{ selected.title }}</div>
          <div class="small text-muted">From: {{ selected.senderUsername }}</div>
        </div>
        <div class="d-flex gap-2">
          <button class="btn btn-sm btn-outline-primary" @click="reply">Reply</button>
          <button class="btn btn-sm btn-outline-primary" @click="replyAll">Reply All</button>
          <button class="btn btn-sm btn-outline-primary" @click="forward">Forward</button>
          <button class="btn btn-sm btn-outline-secondary" @click="markRead"
                  :disabled="!selected || selected.status === 'R'">Mark read
          </button>
        </div>
      </div>
      <div class="card-body">
        <pre class="mb-0" style="white-space: pre-wrap;" v-text="selected.message"/>
      </div>
    </div>
  </div>
</template>
<script setup>
import {computed, nextTick, onMounted, reactive, ref} from 'vue'
import {useRouter} from 'vue-router'
import InboxService from '@/services/InboxService'

const router = useRouter()
const loading = ref(false)
const sending = ref(false)
const error = ref('')
const form = reactive({from: '', to: '', cc: '', subject: '', body: ''})
const inbox = ref([])
const selected = ref(null)
const myUserId = ref(null)
const myUsername = ref('')
const isValid = computed(() => !!(form.from && form.to && form.subject && form.body))

function formatDate(iso) {
  try {
    const d = new Date(iso)
    return new Intl.DateTimeFormat(undefined, {
      year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit'
    }).format(d)
  } catch {
    return iso
  }
}

function statusClass(s) {
  switch (s) {
    case 'N':
      return 'bg-primary'
    case 'R':
      return 'bg-secondary'
    default:
      return 'bg-dark'
  }
}

function statusText(s) {
  switch (s) {
    case 'N':
      return 'New'
    case 'R':
      return 'Read'
    default:
      return 'Arch'
  }
}

function prefix(p, s) {
  if (!s) return `${p}: `
  const low = s.toLowerCase()
  return low.startsWith(`${p.toLowerCase()}:`) ? s : `${p}: ${s}`
}

function normalizeRecipients(text) {
  const parts = (text || '')
      .split(/[\s,]+/)
      .map(x => x.trim())
      .filter(Boolean)
  const seen = new Set()
  return parts.filter(x => (seen.has(x) ? false : seen.add(x)))
}

async function loadInbox() {
  if (!myUserId.value) return
  loading.value = true
  error.value = ''
  try {
    inbox.value = await InboxService.list(myUserId.value, 0, 50)
  } catch (e) {
    error.value = 'Failed to load inbox.'
  } finally {
    loading.value = false
  }
}

async function onSend() {
  if (!isValid.value) return
  sending.value = true
  error.value = ''
  try {
    await InboxService.composeUsernames({
      from: form.from,
      to: normalizeRecipients(form.to).join(', '),
      cc: normalizeRecipients(form.cc).join(', '),
      subject: form.subject,
      body: form.body
    })
    await loadInbox()
    resetBody()
  } catch (e) {
    error.value = 'Failed to send message.'
  } finally {
    sending.value = false
  }
}

function resetForm() {
  form.from = myUsername.value || ''
  form.to = ''
  form.cc = ''
  form.subject = ''
  form.body = ''
  selected.value = null
}

function resetBody() {
  form.subject = ''
  form.body = ''
}

async function openMessage(m) {
  selected.value = m
  if (m.status !== 'R' && myUserId.value) {
    try {
      await InboxService.updateStatus(m.id, myUserId.value, 'R')
      m.status = 'R'
    } catch (e) {
    }
  }
}

function reply() {
  if (!selected.value) return
  form.to = selected.value.senderUsername || ''
  form.cc = ''
  form.subject = prefix('Re', selected.value.title)
  form.body = `\n\n--- Original message from ${selected.value.senderUsername} ---\n${selected.value.message}`
  nextTick(() => window.scrollTo({top: 0, behavior: 'smooth'}))
}

function replyAll() {
  if (!selected.value) return
  const others = new Set()
  if (selected.value.senderUsername && selected.value.senderUsername !== myUsername.value) {
    others.add(selected.value.senderUsername)
  }
  form.to = Array.from(others).join(', ')
  form.cc = ''
  form.subject = prefix('Re', selected.value.title)
  form.body = `\n\n--- Original message ---\n${selected.value.message}`
  nextTick(() => window.scrollTo({top: 0, behavior: 'smooth'}))
}

function forward() {
  if (!selected.value) return
  form.to = ''
  form.cc = ''
  form.subject = prefix('Fwd', selected.value.title)
  form.body = `\n\n--- Forwarded message from ${selected.value.senderUsername} ---\n${selected.value.message}`
  nextTick(() => window.scrollTo({top: 0, behavior: 'smooth'}))
}

async function markRead() {
  if (!selected.value || selected.value.status === 'R' || !myUserId.value) return
  try {
    await InboxService.updateStatus(selected.value.id, myUserId.value, 'R')
    selected.value.status = 'R'
  } catch (e) {
    error.value = 'Failed to mark as read.'
  }
}

function goBack() {
  router.back()
}

function goHome() {
  router.push('/home')
}

onMounted(async () => {
  try {
    const uid = Number(sessionStorage.getItem('userId'))
    const uname = sessionStorage.getItem('username') || ''
    myUserId.value = uid || null
    myUsername.value = uname || ''
    if (!form.from) form.from = myUsername.value || ''
    await loadInbox()
  } catch {
  }
})
</script>
<style scoped>
pre {
  font-family: inherit;
}
</style>
