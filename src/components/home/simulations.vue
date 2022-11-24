<template>
  <section>
    <CrudTable
      title="Simulations"
      entity="Simulation"
      createLabel="Run"
      cache-key="table-simulations"
      dense
      selection="none"
      form-size="md"
      :rows="items"
      :columns="columns"
      :loading="fetching"
      :allowCreate="true"
      :showCreateButton="true"
      :showUpdateButton="false"
      :showDeleteButton="false"
      :pagination="{
        sortBy: 'created_at',
        descending: true,
        page: 1,
        rowsPerPage: 20,
      }"
      @onCreate="(item) => $emit('onCreate', item)"
    >
      <q-spinner v-if="refreshing" size="sm" color="primary" class="ml-3" />

      <!-- Override file column -->
      <q-td
        slot="body-cell-status"
        slot-scope="props"
        :props="props"
        style="border-top: none !important"
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
        <span class="mr-2">
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
        <span class="mr-2">
          <q-btn
            icon="mdi-eye"
            flat
            dense
            round
            size="sm"
            :disable="fetching"
            class="text-gray-500"
            @click="() => $emit('onViewResults', row)"
          />
          <q-tooltip>Details and results</q-tooltip>
        </span>
      </template>

      <!-- Override default CRUD form -->
      <template #form="{ state, model, validateForm, submited }">
        <SimulationForm
          :state="state"
          :model="model"
          :columns="columns"
          :validateForm="validateForm"
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
      columns: SimulationsColumns(
        {
          hosts: [
            'cassini.rc.unesp.br',
            'nelson1.rc.unesp.br',
            'ganimedes.rc.unesp.br',
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
