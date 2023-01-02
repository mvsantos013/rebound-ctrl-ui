<template>
  <q-dialog v-model="dialogOpen" class="bg-white">
    <q-card style="width: 600px">
      <q-card-section>
        <h3 class="app-title">Connection Settings</h3>

        <h3>Hosts</h3>
        <ul class="pl-3">
          <li v-for="host in hosts" :key="host" class="ml-2 font-mono mb-1">
            {{ host }}
            <span
              class="ml-2"
              :class="{
                'text-primary': !loadingHosts,
                'text-grey': loadingHosts,
                'cursor-pointer': !loadingHosts,
              }"
            >
              (remove)
            </span>
          </li>
        </ul>
      </q-card-section>

      <q-card-section>
        <h3>Add New Host</h3>
        <q-form>
          <div class="flex items-center justify-between flex-nowrap">
            <q-input
              v-model="host"
              label="New Host"
              dense
              class="q-mb-md"
              :class="{
                'bg-grey-2': loadingHosts,
                'cursor-not-allowed': loadingHosts,
              }"
              :disabled="loadingHosts"
            />
            <q-input
              v-model="username"
              label="Username"
              dense
              class="q-mb-md"
              :class="{
                'bg-grey-2': loadingHosts,
                'cursor-not-allowed': loadingHosts,
              }"
              :disabled="loadingHosts"
            />
            <q-input
              v-model="password"
              label="Password"
              dense
              type="password"
              class="q-mb-md"
              :class="{
                'bg-grey-2': loadingHosts,
                'cursor-not-allowed': loadingHosts,
              }"
              :disabled="loadingHosts"
            />
          </div>
          <div class="text-right">
            <q-btn
              label="Add Host"
              color="primary"
              :class="{
                'bg-grey-2': loadingHosts,
                'cursor-not-allowed': loadingHosts,
              }"
              :disabled="loadingHosts"
              @click="addHost"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { get, call } from 'vuex-pathify'
export default {
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      host: '',
      username: '',
      password: '',
    }
  },
  computed: {
    hosts: get('general/hosts'),
    loadingHosts: get('general/loadingHosts'),
    dialogOpen: {
      get() {
        return this.open
      },
      set(value) {
        this.$emit('update:open', value)
      },
    },
  },
  mounted() {
    this.fetchHosts()
  },
  methods: {
    fetchHosts: call('general/fetchHosts'),
  },
}
</script>
