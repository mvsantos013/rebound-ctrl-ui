<template>
  <section>
    <CrudTable
      title="Simulations"
      entity="Simulation"
      createLabel="Run"
      cache-key="table-simulations"
      dense
      selection="none"
      form-size="lg"
      :model.sync="model"
      :rows="items"
      :columns="columns"
      :loading="fetching"
      :allowCreate="true"
      :allowDelete="true"
      :showCreateButton="true"
      :showUpdateButton="false"
      :pagination="{
        sortBy: 'created_at',
        descending: true,
        page: 1,
        rowsPerPage: 20,
      }"
      @onCreate="(item) => $emit('onCreate', item)"
      @onDelete="(item) => $emit('onDelete', item)"
    >
      <q-spinner v-if="refreshing" size="sm" color="primary" class="ml-3" />

      <!-- Override id column  -->
      <q-td
        slot="body-cell-id"
        slot-scope="props"
        :props="props"
        style="border-top: none"
      >
        {{ props.row.id.slice(0, 8) }}...
      </q-td>

      <!-- Override status column -->
      <q-td
        slot="body-cell-status"
        slot-scope="props"
        :props="props"
        style="border-top: none"
      >
        <span
          class="inline-block text-center px-3 text-white rounded-md text-xs w-20"
          :class="{
            'bg-indigo-400': props.row.status === 'running',
            'bg-red-400': props.row.status === 'failed',
            'bg-green-400': props.row.status === 'finished',
          }"
        >
          {{ props.row.status }}
        </span>
      </q-td>

      <!-- Add custom action buttons -->
      <template #actions="{ row }">
        <span class="mr-1">
          <q-btn
            icon="mdi-text-search-variant"
            flat
            dense
            round
            :disable="fetching"
            class="text-gray-500"
            @click="() => $emit('onViewLogs', row)"
          />
          <q-tooltip>Logs</q-tooltip>
        </span>

        <span class="mr-1">
          <q-btn
            icon="mdi-download-outline"
            flat
            dense
            round
            :disable="fetching"
            class="text-gray-500"
            :class="{ invisible: row.status !== 'finished' }"
            @click="() => $emit('onDownloadResults', row)"
          />
          <q-tooltip v-if="row.status === 'finished'">
            Download simulation results
          </q-tooltip>
        </span>
      </template>

      <!-- Override default CRUD form -->
      <template #form="{ state, model, validateForm, submited, updateModel }">
        <SimulationForm
          :state="state"
          :model="model"
          :columns="columns"
          :validateForm="validateForm"
          :updateModel="updateModel"
          :submited="submited"
        />
      </template>
    </CrudTable>
  </section>
</template>

<script>
import CrudTable from '@/components/common/table/crud-table/crud-table.vue'
import SimulationsColumns from '@/components/home/simulations-columns.js'
import SimulationForm from '@/components/home/simulation-form.vue'

export default {
  components: {
    CrudTable,
    SimulationForm,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    fetching: {
      type: Boolean,
      default: false,
    },
    refreshing: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      model: {},
      columns: SimulationsColumns(
        {
          hosts: [
            'cassini.rc.unesp.br',
            'nelson1.rc.unesp.br',
            'ganimedes.rc.unesp.br',
            'hubble.rc.unesp.br',
          ],
          simulationTypes: ['default', 'grid'],
          defaultHost: 'ganimedes.rc.unesp.br',
          defaultSimulationType: 'default',
        },
        this.$options.filters,
      ),
    }
  },
}
</script>
