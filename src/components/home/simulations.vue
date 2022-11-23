<template>
  <section>
    <CrudTable
      title="Simulations"
      entity="Simulation"
      createLabel="Create"
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
        </span>
      </template>
    </CrudTable>
  </section>
</template>

<script>
import CrudTable from '@/components/common/table/crud-table/crud-table.vue'
import SimulationsColumns from '@/components/home/simulations-columns.js'

export default {
  components: {
    CrudTable,
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
          simulationTypes: ['single', 'grid'],
          defaultHost: 'ganimedes.rc.unesp.br',
          defaultSimulationType: 'grid',
        },
        this.$options.filters,
      ),
    }
  },
}
</script>
