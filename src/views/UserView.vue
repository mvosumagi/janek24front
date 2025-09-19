<script setup>
import {computed, ref} from "vue"

const username   = ref("")
const firstname  = ref("")
const lastname   = ref("")
const phone      = ref("")
const isCompany  = ref(false)
const companyName= ref("")
const regNo      = ref("")
const city       = ref("")
const state      = ref("")
const address    = ref("")
const password   = ref("")
const password2  = ref("")

const canSave = computed(() =>
    username.value && firstname.value && lastname.value && phone.value &&
    (!companyOn.value || (companyName.value && regNo.value)) &&
    password.value && password2.value
)
</script>

<template>
  <div class="container text-center">
    <div class="row justify-content-center">
      <div class="col-8 col-md-6">
        <h2 class="mb-4">Kasutaja andmed</h2>

        <div class="row mb-3 align-items-center"><label class="col-4 text-start">Username</label>
          <div class="col-8"><input v-model="username" type="text" class="form-control" placeholder="Sisesta kasutajanimi"/>
          </div>
        </div>
        <div class="row mb-3 align-items-center"><label class="col-4 text-start">Firstname</label>
          <div class="col-8"><input v-model="firstname" type="text" class="form-control" placeholder="Sisesta eesnimi"/>
          </div>
        </div>
        <div class="row mb-3 align-items-center"><label class="col-4 text-start">Lastname</label>
          <div class="col-8"><input v-model="lastname" type="text" class="form-control" placeholder="Sisesta perekonnanimi"/>
          </div>
        </div>
        <div class="row mb-3 align-items-center"><label class="col-4 text-start">Emaile</label>
          <div class="col-8"><input v-model="email" type="text" class="form-control" placeholder="nipi.tiri@gmail.com"/>
          </div>
        </div>
        <div class="row mb-3 align-items-center"><label class="col-4 text-start">Phone</label>
          <div class="col-8"><input v-model="phone" type="tel" class="form-control" placeholder="+372 ..."/>
          </div>
        </div>
        <div class="row mb-3 align-items-center"><label class="col-4 text-start">Company</label>
          <div class="col-8 text-start"><input v-model="isCompany" type="checkbox" class="form-check-input"/>
          </div>
        </div>

        <div v-if="isCompany" class="row mb-3 align-items-center"><label class="col-4 text-start">Company details</label>
          <div class="col-8">
            <div class="row g-2">
              <div class="col-6"><input v-model="companyName" type="text" class="form-control" placeholder="Company name"/>
              </div>
              <div class="col-6"><input v-model="regNo" type="text" class="form-control" placeholder="Registration No"/>
              </div>
            </div>
          </div>
        </div>

        <div class="row mb-3 align-items-center"><label class="col-4 text-start">City</label>
          <div class="col-8"><input v-model="city" type="text" class="form-control" />
          </div>
        </div>
        <div class="row mb-3 align-items-center"><label class="col-4 text-start">State</label>
          <div class="col-8"><input v-model="state" type="text" class="form-control" />
          </div>
        </div>
        <div class="row mb-3 align-items-center"><label class="col-4 text-start">Address</label>
          <div class="col-8"><input v-model="address" type="text" class="form-control" placeholder="Kännu 5 Kuuse küla"/>
          </div>
        </div>
        <div class="row mb-3 align-items-center"><label class="col-4 text-start">Password</label>
          <div class="col-8"><input v-model="password" type="password" class="form-control" />
          </div>
        </div>
        <div class="row mb-4 align-items-center"><label class="col-4 text-start">Retype password</label>
          <div class="col-8"><input v-model="password2" type="password" class="form-control" />
          </div>
        </div>

        <button type="button" class="btn btn-outline-primary w-100" :disabled="!canSave">Salvesta</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
h2 { font-size: 20px; font-weight: 600; }
</style>
