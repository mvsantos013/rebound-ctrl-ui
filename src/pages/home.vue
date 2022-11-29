<template>
  <section class="container bg-white rounded-md pt-5 px-3">
    <Simulations
      :items="simulations"
      :fetching="loading"
      :refreshing="checkingSimulationsStatus"
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
          <pre>{{ dialog.logs }}</pre>
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
      checkingSimulationsStatus: false,
      logsRefreshTimeout: null,
      checkSimulationsTimeout: null,
    }
  },
  watch: {
    dialog: {
      handler() {
        if (!this.dialog.open && this.dialog.type === 'logs') {
          clearTimeout(this.logsRefreshTimeout)
        }
      },
      deep: true,
    },
  },
  async mounted() {
    this.fetchSimulations()
  },
  beforeDestroy() {
    clearTimeout(this.logsRefreshTimeout)
    clearTimeout(this.checkSimulationsTimeout)
  },
  methods: {
    async fetchSimulations() {
      this.loading = true
      const response = await api.get('/simulations')
      if (response.ok) {
        this.simulations = response.data
        this.checkSimulationsStatus()
      }
      this.loading = false
    },
    async checkSimulationsStatus() {
      const runningSimulations = this.simulations.filter(
        (simulation) => simulation.status === 'running',
      )
      if (!runningSimulations.length) {
        clearTimeout(this.checkSimulationsTimeout)
        return
      }
      this.checkingSimulationsStatus = true
      const response = await api.post(
        '/simulations/check-status',
        runningSimulations,
      )
      if (response.ok) {
        this.simulations = this.simulations.map((simulation) => {
          const updatedSimulation = response.data.find(
            (updatedSimulation) => updatedSimulation.id === simulation.id,
          )
          if (updatedSimulation && updatedSimulation.error)
            this.$toast.error(updatedSimulation.error)
          return updatedSimulation || simulation
        })

        this.checkSimulationsTimeout = setTimeout(
          () => this.checkSimulationsStatus(),
          10000,
        )
      }
      this.checkingSimulationsStatus = false
    },
    async createSimulation(item) {
      this.loading = true
      try {
        item.cores = parseInt(item.cores)
        item.years = parseFloat(item.years)
        item.num_logs = parseInt(item.num_logs)
        item.ejection_max_distance = parseFloat(item.ejection_max_distance)
        if (item.simulation_type === 'grid') {
          Object.keys(item.grid.particle).forEach((key) => {
            const value = item.grid.particle[key]
            if (typeof value === 'string' && value.includes('['))
              item.grid.particle[key] = JSON.parse(value)
            else item.grid.particle[key] = parseFloat(value)
          })
        }
      } catch (e) {
        this.$toast.error(
          'Error while validating inputs. Check if the syntax is correct.',
        )
        this.loading = false
        return
      }

      const response = await api.post('/simulations', item)
      if (response.ok) {
        this.$toast.success('Simulation started successfully')
        this.fetchSimulations()
      }
      this.loading = false
    },
    async onViewLogs(item) {
      this.loading = true
      const response = await api.get(
        `/simulations/${item.id}/logs?host=${item.host}`,
      )
      if (response.ok) {
        this.dialog.simulation = item
        this.dialog.type = 'logs'
        this.dialog.logs = response.data
        this.dialog.open = true
        if (item.status === 'running')
          this.logsRefreshTimeout = setTimeout(
            () => this.onViewLogs(item),
            10000,
          )
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
