<template>
  <section class="container bg-white rounded-md pt-5 px-3">
    <Simulations
      :items="simulations"
      :fetching="loading"
      @onCreate="createSimulation"
      @onViewLogs="onViewLogs"
    />

    <q-dialog v-model="dialog.open" class="bg-white" full-width full-height>
      <q-card v-if="dialog.simulation">
        <q-bar class="bg-primary-400 text-white px-5 py-4">
          Simulation {{ dialog.type }} ({{
            dialog.simulation.id.slice(0, 8)
          }}...)
          <q-space />
          <q-btn dense flat icon="mdi-close" v-close-popup>
            <q-tooltip>Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section v-if="dialog.type === 'logs'" class="flex items-center">
          {{ dialog.logs }}
        </q-card-section>
      </q-card>
    </q-dialog>
  </section>
</template>

<script>
import api from '@/utils/api'
import Simulations from '@/components/home/simulations.vue'

export default {
  components: {
    Simulations,
  },
  data() {
    return {
      simulations: [],
      dialog: {
        open: false,
        type: null,
      },
      loading: false,
    }
  },
  async mounted() {
    this.fetchSimulations()
  },
  methods: {
    async fetchSimulations() {
      this.loading = true
      const response = await api.get('/simulations')
      if (response.ok) this.simulations = response.data
      this.loading = false
    },
    async createSimulation(item) {
      this.loading = true
      item.cores = parseInt(item.cores)
      item.years = parseFloat(item.years)
      item.num_logs = parseInt(item.num_logs)
      item.ejection_max_distance = parseFloat(item.ejection_max_distance)
      item.particles = JSON.parse(item.particles)
      item.grid = JSON.parse(item.grid)
      const response = await api.post('/simulations', item)
      if (response.ok) {
        this.$toast.success('Simulation created successfully')
        this.fetchSimulations()
      }
      this.loading = false
    },
    async onViewLogs(item) {
      this.dialog.simulation = item
      this.dialog.type = 'logs'
      this.loading = true
      const response = await api.get(
        `/simulations/${item.id}/logs?host=${item.host}`,
      )
      if (response.ok) {
        this.dialog.logs = response.data
        this.dialog.open = true
      }
      this.loading = false
    },
    async deleteSimulation(item) {
      this.loading = true
      await api.delete('/simulations', { data: item })
      this.$toast.success('Simulation deleted successfully')
      this.fetchSimulations()
    },
  },
}
</script>
