<template>
  <div class="relative">
    <section
      class="flex items-center justify-end absolute w-full -m-16 mx-auto"
    >
      <q-input
        v-model="templateName"
        dense
        label="Template name"
        class="w-28"
      />
      <q-btn
        outline
        flat
        color="primary"
        icon="mdi-content-save"
        :disable="!templateName.trim()"
        @click="saveTemplate"
      ></q-btn>
      <q-select
        :options="templates"
        :value="selectedTemplate"
        dense
        label="Load template"
        class="ml-10 w-36"
        @input="setTemplate"
      >
        <template v-slot:append>
          <span>
            <q-btn
              v-if="selectedTemplate"
              round
              dense
              flat
              size="sm"
              icon="mdi-delete"
              @click.stop="deleteTemplate"
            />
            <q-tooltip>Delete template</q-tooltip>
          </span>
        </template>
      </q-select>
    </section>

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
          type="Number"
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
          type="number"
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

      <div v-if="isFieldVisible('timestep')">
        <q-input
          v-model.number="model.timestep"
          :label="getFieldConfig('timestep').form.label"
          :disable="!isFieldEditable('timestep')"
          :rules="getFieldRules('timestep')"
        />
      </div>
    </section>

    <section v-if="model && Object.keys(model).length > 0" class="mb-6">
      <div class="bg-primary-400 text-white px-2 mb-2">Particles</div>
      <q-markup-table
        flat
        dense
        style="display: table; width: 100%"
        class="mb-3"
      >
        <tbody>
          <tr
            v-for="(particle, index) in model.particles"
            :key="index"
            class="text-left"
          >
            <td style="border: none; width: 80px">{{ index + 1 }}°</td>
            <td class="no-border">
              <q-input
                v-model.number="particle.m"
                dense
                label="M☉"
                type="number"
                step="any"
                :disable="!isFieldEditable('particles')"
              />
            </td>
            <td class="no-border">
              <q-input
                v-model.number="particle.a"
                dense
                label="a"
                type="number"
                step="any"
                :disable="!isFieldEditable('particles') || index === 0"
              />
            </td>
            <td class="no-border">
              <q-input
                v-model.number="particle.e"
                dense
                label="e"
                type="number"
                step="any"
                :disable="!isFieldEditable('particles') || index === 0"
              />
            </td>
            <td class="no-border">
              <q-input
                v-model.number="particle.inc"
                dense
                label="i"
                type="number"
                step="any"
                :disable="!isFieldEditable('particles') || index === 0"
              />
            </td>
            <td class="no-border">
              <q-input
                v-model.number="particle.Omega"
                dense
                label="Ω"
                type="number"
                step="any"
                :disable="!isFieldEditable('particles') || index === 0"
              />
            </td>
            <td class="no-border">
              <q-input
                v-model.number="particle.omega"
                dense
                label="ω"
                type="number"
                step="any"
                :disable="!isFieldEditable('particles') || index === 0"
              />
            </td>
            <td class="no-border">
              <q-input
                v-model.number="particle.M"
                dense
                label="ν"
                type="number"
                step="any"
                :disable="!isFieldEditable('particles') || index === 0"
              />
            </td>
          </tr>
        </tbody>
      </q-markup-table>
      <div v-if="isFieldEditable('particles')" class="flex items-center">
        <q-btn
          size="sm"
          color="primary"
          outline
          :disable="model.particles.length < 2"
          @click="removeParticle"
        >
          Remove particle
        </q-btn>
        <q-btn
          size="sm"
          outline
          class="ml-3"
          color="primary"
          @click="addParticle"
        >
          Add particle
        </q-btn>
      </div>
    </section>

    <section
      v-if="
        model &&
        Object.keys(model).length > 0 &&
        model.simulation_type == 'grid'
      "
    >
      <div class="bg-primary-400 text-white px-2 mb-2">Grid Options</div>
      <div class="grid grid-cols-3 gap-3 mb-3">
        <q-input
          v-model.number="model.grid.N"
          label="N (NxN simulations)"
          type="number"
          dense
          :disable="!isFieldEditable('grid')"
        />
        <q-input
          v-model.number="model.cores"
          label="Threads"
          type="number"
          dense
          :disable="!isFieldEditable('cores')"
        />
      </div>

      <div>
        <div class="mini-title">Dynamic Particle</div>

        <div v-if="model.grid.particle" class="grid grid-cols-8 gap-3">
          <div class="pl-4" style="line-height: 45px; font-size: 0.8rem">
            {{ model.particles.length + 1 }}°
          </div>
          <q-input
            v-model="model.grid.particle.m"
            dense
            label="M☉"
            :rules="getRules('required')"
            :disable="!isFieldEditable('grid')"
            @input="(v) => inputHandler(model.grid.particle, 'm', v)"
          />
          <q-input
            v-model="model.grid.particle.a"
            dense
            label="a"
            :rules="getRules('required')"
            :disable="!isFieldEditable('grid')"
          />
          <q-input
            v-model="model.grid.particle.e"
            dense
            label="e"
            :rules="getRules('required')"
            :disable="!isFieldEditable('grid')"
          />
          <q-input
            v-model="model.grid.particle.inc"
            dense
            label="i"
            :rules="getRules('required')"
            :disable="!isFieldEditable('grid')"
          />
          <q-input
            v-model="model.grid.particle.Omega"
            dense
            label="Ω"
            :rules="getRules('required')"
            :disable="!isFieldEditable('grid')"
          />
          <q-input
            v-model="model.grid.particle.omega"
            dense
            label="ω"
            :rules="getRules('required')"
            :disable="!isFieldEditable('grid')"
          />
          <q-input
            v-model="model.grid.particle.M"
            dense
            label="ν"
            :rules="getRules('required')"
            :disable="!isFieldEditable('grid')"
          />
        </div>
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
    updateModel: {
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
      templateName: '',
      selectedTemplate: '',
      templates: [],
    }
  },
  mounted() {
    this.loadTemplates()
    this.model.particles = JSON.parse(this.model.particles)
    this.model.grid = JSON.parse(this.model.grid)
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
    inputHandler(obj, prop, value) {
      value = value.replace(',', '')
      const dotCount = (value.match(/\./g) || []).length
      if (dotCount > 1) {
        value = value.replace(/\./g, '')
      }
      obj[prop] = value
    },
    loadTemplates() {
      this.templates = localStorage.getItem('templates')
        ? JSON.parse(localStorage.getItem('templates'))
        : []
    },
    saveTemplate() {
      const data = JSON.stringify(this.model)
      localStorage.setItem(this.templateName, data)
      if (!this.templates.includes(this.templateName))
        this.templates.push(this.templateName)
      localStorage.setItem('templates', JSON.stringify(this.templates))
      this.$toast.success('Template saved successfully')
    },
    setTemplate(templateName) {
      const data = JSON.parse(localStorage.getItem(templateName))
      this.updateModel(data)
      this.selectedTemplate = templateName
      this.templateName = templateName
      this.$toast.success('Template loaded successfully')
    },
    deleteTemplate() {
      localStorage.removeItem(this.selectedTemplate)
      this.templates = this.templates.filter((x) => x !== this.selectedTemplate)
      localStorage.setItem('templates', JSON.stringify(this.templates))
      this.selectedTemplate = ''
      this.templateName = ''
      this.$toast.success('Template deleted successfully')
    },
  },
}
</script>

<style lang="postcss" scoped>
.mini-title {
  font-size: 0.7rem;
  color: #909090;
}

.no-border {
  border: none;
}
</style>
