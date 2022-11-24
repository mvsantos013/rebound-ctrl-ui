<template>
  <div>
    <section
      v-if="model && Object.keys(model).length > 0"
      class="grid grid-cols-3 gap-3 mb-3"
    >
      <div v-if="isFieldVisible('id')">
        <q-input
          v-model="model.id"
          :label="getFieldConfig('id').form.label"
          :disable="!isFieldEditable('id')"
          :rules="getFieldRules('id')"
        />
      </div>

      <div v-if="isFieldVisible('name')">
        <q-input
          v-model="model.name"
          :label="getFieldConfig('name').form.label"
          :disable="!isFieldEditable('name')"
          :rules="getFieldRules('name')"
        />
      </div>

      <div v-if="isFieldVisible('description')" class="col-span-2">
        <q-input
          v-model="model.description"
          :label="getFieldConfig('description').form.label"
          :disable="!isFieldEditable('description')"
          :rules="getFieldRules('description')"
        />
      </div>

      <div v-if="isFieldVisible('host')">
        <q-select
          v-model="model.host"
          ref="host"
          :options="getFieldConfig('host').form.selectOptions"
          :label="getFieldConfig('host').form.label"
          :disable="!isFieldEditable('host')"
          :rules="getFieldRules('host')"
          :clearable="false"
          @input="
            () => {
              $refs.host.hidePopup
                ? $refs.host.hidePopup()
                : $refs.host[0].hidePopup()
            }
          "
        />
      </div>

      <div v-if="isFieldVisible('simulation_type')">
        <q-select
          v-model="model.simulation_type"
          ref="simulation_type"
          :options="getFieldConfig('simulation_type').form.selectOptions"
          :label="getFieldConfig('simulation_type').form.label"
          :disable="!isFieldEditable('simulation_type')"
          :rules="getFieldRules('simulation_type')"
          :clearable="false"
          @input="
            () => {
              $refs.simulation_type.hidePopup
                ? $refs.simulation_type.hidePopup()
                : $refs.simulation_type[0].hidePopup()
            }
          "
        />
      </div>

      <div v-if="isFieldVisible('num_logs')">
        <q-input
          v-model.number="model.num_logs"
          :label="getFieldConfig('num_logs').form.label"
          :disable="!isFieldEditable('num_logs')"
          :rules="getFieldRules('num_logs')"
        />
      </div>

      <div v-if="isFieldVisible('status')">
        <q-input
          v-model="model.status"
          :label="getFieldConfig('status').form.label"
          :disable="!isFieldEditable('status')"
          :rules="getFieldRules('status')"
        />
      </div>

      <div v-if="isFieldVisible('process_id')">
        <q-input
          v-model="model.process_id"
          :label="getFieldConfig('process_id').form.label"
          :disable="!isFieldEditable('process_id')"
          :rules="getFieldRules('process_id')"
        />
      </div>

      <div v-if="isFieldVisible('created_at')">
        <q-input
          v-model="model.created_at"
          :label="getFieldConfig('created_at').form.label"
          :disable="!isFieldEditable('created_at')"
          :rules="getFieldRules('created_at')"
        />
      </div>

      <div v-if="isFieldVisible('years')">
        <q-input
          v-model.number="model.years"
          :label="getFieldConfig('years').form.label"
          :disable="!isFieldEditable('years')"
          :rules="getFieldRules('years')"
        />
      </div>

      <div v-if="isFieldVisible('integrator')">
        <q-input
          v-model="model.integrator"
          :label="getFieldConfig('integrator').form.label"
          :disable="!isFieldEditable('integrator')"
          :rules="getFieldRules('integrator')"
        />
      </div>
    </section>

    <section v-if="model && Object.keys(model).length > 0">
      <!-- <div class="bg-primary-400 text-white px-2 mb-2">Particles</div> -->
      <q-markup-table
        flat
        dense
        style="display: table; width: 100%"
        class="mb-1"
      >
        <thead>
          <tr class="bg-primary-400 text-white text-left">
            <th style="width: 65px">Particle</th>
            <th>m</th>
            <th>a</th>
            <th>e</th>
            <th>i</th>
            <th>Ω</th>
            <th>ω</th>
            <th>ν</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(particle, index) in model.particles"
            :key="index"
            class="text-left"
          >
            <td style="border: none">{{ index + 1 }}°</td>
            <th>
              <q-input
                v-model.number="particle.m"
                dense
                borderless
                type="number"
                step="any"
                :disable="!isFieldEditable('particles')"
              />
            </th>
            <th>
              <q-input
                v-model.number="particle.a"
                dense
                borderless
                type="number"
                step="any"
                :disable="!isFieldEditable('particles') || index === 0"
              />
            </th>
            <th>
              <q-input
                v-model.number="particle.e"
                dense
                borderless
                type="number"
                step="any"
                :disable="!isFieldEditable('particles') || index === 0"
              />
            </th>
            <th>
              <q-input
                v-model.number="particle.inc"
                dense
                borderless
                type="number"
                step="any"
                :disable="!isFieldEditable('particles') || index === 0"
              />
            </th>
            <th>
              <q-input
                v-model.number="particle.Omega"
                dense
                borderless
                type="number"
                step="any"
                :disable="!isFieldEditable('particles') || index === 0"
              />
            </th>
            <th>
              <q-input
                v-model.number="particle.omega"
                dense
                borderless
                type="number"
                step="any"
                :disable="!isFieldEditable('particles') || index === 0"
              />
            </th>
            <th>
              <q-input
                v-model.number="particle.M"
                dense
                borderless
                type="number"
                step="any"
                :disable="!isFieldEditable('particles') || index === 0"
              />
            </th>
          </tr>
        </tbody>
      </q-markup-table>
      <div v-if="isFieldEditable('particles')" class="flex items-center">
        <q-btn size="sm" @click="removeParticle">Remove particle</q-btn>
        <q-btn size="sm" class="ml-3" @click="addParticle">Add particle</q-btn>
      </div>
    </section>
  </div>
</template>

<script>
import { getRules, getPropValue } from '@/utils/utils'

export default {
  props: {
    state: {
      type: String,
      default: null,
    },
    model: {
      type: Object,
      default: () => {},
    },
    selected: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
    validateForm: {
      type: Function,
      default: (v) => v,
    },
    submited: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      fundsIds: [],
      conterParties: [],
      particles: [],
    }
  },
  mounted() {
    this.model.particles = JSON.parse(this.model.particles)
    this.model.grid = {}
  },
  methods: {
    getFieldConfig(field) {
      return this.columns.find((x) => x.name === field)
    },
    isFieldVisible(field) {
      return this.getFieldConfig(field).form.visible.includes(this.state)
    },
    isFieldEditable(field) {
      return this.getFieldConfig(field).form.editable.includes(this.state)
    },
    getFieldRules(field) {
      return this.getRules(this.getFieldConfig(field).form.validations)
    },
    getRules(rulesName) {
      return getRules(rulesName)
    },
    getPropValue(val, propToMatch, propToReturn, array) {
      return getPropValue(val, propToMatch, propToReturn, array)
    },
    removeParticle() {
      if (this.model.particles.length > 1) this.model.particles.pop()
    },
    addParticle() {
      this.model.particles.push({
        m: 0,
        a: 0,
        e: 0,
        inc: 0,
        Omega: 0,
        omega: 0,
        M: 0,
      })
    },
  },
}
</script>
