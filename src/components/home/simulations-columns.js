export default function SimulationsColumns(params, filters) {
  return [
    {
      name: 'id',
      label: 'ID',
      align: 'left',
      field: (row) => row.id,
      format: (val) => val,
      sortable: true,
      visible: true,
      type: 'string',
      form: {
        visible: 'update|delete',
        editable: '',
        default: '',
        placeholder: null,
        label: 'ID',
        validations: '',
        input: 'text',
      },
      headerFilter: {
        show: true,
        defaultFilters: true,
        customFilters: [],
      },
    },
    {
      name: 'name',
      label: 'Name',
      align: 'left',
      field: (row) => row.name,
      format: (val) => val,
      sortable: true,
      visible: true,
      type: 'string',
      form: {
        visible: 'create|update|delete',
        editable: 'create|update',
        default: '',
        placeholder: null,
        label: 'Name',
        validations: '',
        input: 'text',
      },
      headerFilter: {
        show: true,
        defaultFilters: true,
        customFilters: [],
      },
    },
    {
      name: 'description',
      label: 'Description',
      align: 'left',
      field: (row) => row.description,
      format: (val) => val,
      sortable: true,
      visible: false,
      type: 'string',
      form: {
        visible: 'create|update|delete',
        editable: 'create|update',
        default: '',
        placeholder: null,
        label: 'Description',
        validations: '',
        input: 'text',
      },
      headerFilter: {
        show: true,
        defaultFilters: true,
        customFilters: [],
      },
    },
    {
      name: 'host',
      label: 'Host',
      align: 'left',
      field: (row) => row.host,
      format: (val) => val,
      sortable: true,
      visible: true,
      type: 'string',
      form: {
        visible: 'create|update|delete',
        editable: 'create',
        default: params.defaultHost,
        placeholder: null,
        label: 'Host',
        validations: '',
        input: 'select',
        selectOptions: params.hosts,
      },
      headerFilter: {
        show: true,
        defaultFilters: true,
        customFilters: [],
      },
    },
    {
      name: 'process_id',
      label: 'Process ID',
      align: 'left',
      field: (row) => row.process_id,
      format: (val) => val,
      sortable: true,
      visible: true,
      type: 'number',
      form: {
        visible: 'update|delete',
        editable: '',
        default: '',
        placeholder: null,
        label: 'Process ID',
        validations: '',
        input: 'text',
      },
      headerFilter: {
        show: true,
        defaultFilters: true,
        customFilters: [],
      },
    },
    {
      name: 'status',
      label: 'Status',
      align: 'left',
      field: (row) => row.status,
      format: (val) => val,
      sortable: true,
      visible: true,
      type: 'string',
      form: {
        visible: 'update|delete',
        editable: '',
        default: '',
        placeholder: null,
        label: 'Status',
        validations: '',
        input: 'text',
      },
      headerFilter: {
        show: true,
        defaultFilters: true,
        customFilters: [],
      },
    },
    {
      name: 'simulation_type',
      label: 'Simulation Type',
      align: 'left',
      field: (row) => row.simulation_type,
      format: (val) => val,
      sortable: true,
      visible: false,
      type: 'string',
      form: {
        visible: 'create|update|delete',
        editable: 'create|update',
        default: params.defaultSimulationType,
        placeholder: null,
        label: 'Simulation Type',
        validations: '',
        input: 'select',
        selectOptions: params.simulationTypes,
      },
      headerFilter: {
        show: true,
        defaultFilters: true,
        customFilters: [],
      },
    },
    {
      name: 'cores',
      label: 'Cores',
      align: 'left',
      field: (row) => row.cores,
      format: (val) => val,
      sortable: true,
      visible: false,
      type: 'number',
      form: {
        visible: 'create|update|delete',
        editable: 'create',
        default: 16,
        placeholder: null,
        label: 'Cores',
        validations: '',
        input: 'text',
      },
      headerFilter: {
        show: true,
        defaultFilters: true,
        customFilters: [],
      },
    },
    {
      name: 'integrator',
      label: 'Integrator',
      align: 'left',
      field: (row) => row.integrator,
      format: (val) => val,
      sortable: true,
      visible: false,
      type: 'string',
      form: {
        visible: 'create|update|delete',
        editable: 'create',
        default: 'whfast',
        placeholder: null,
        label: 'Integrator',
        validations: '',
        input: 'text',
      },
      headerFilter: {
        show: true,
        defaultFilters: true,
        customFilters: [],
      },
    },
    {
      name: 'years',
      label: 'Years',
      align: 'left',
      field: (row) => row.years,
      format: (val) => val,
      sortable: true,
      visible: true,
      type: 'number',
      form: {
        visible: 'create|update|delete',
        editable: 'create',
        default: 1000,
        placeholder: null,
        label: 'Years',
        validations: '',
        input: 'text',
      },
      headerFilter: {
        show: true,
        defaultFilters: true,
        customFilters: [],
      },
    },
    {
      name: 'num_logs',
      label: 'Num Logs',
      align: 'left',
      field: (row) => row.num_logs,
      format: (val) => val,
      sortable: true,
      visible: false,
      type: 'number',
      form: {
        visible: 'create|update|delete',
        editable: 'create',
        default: 50,
        placeholder: null,
        label: 'Num Logs',
        validations: '',
        input: 'text',
      },
      headerFilter: {
        show: true,
        defaultFilters: true,
        customFilters: [],
      },
    },
    {
      name: 'ejection_max_distance',
      label: 'Ejection Max Distance',
      align: 'left',
      field: (row) => row.ejection_max_distance,
      format: (val) => val,
      sortable: true,
      visible: false,
      type: 'number',
      form: {
        visible: 'create|update|delete',
        editable: 'create',
        default: 20,
        placeholder: null,
        label: 'Ejection Max Distance',
        validations: '',
        input: 'text',
      },
      headerFilter: {
        show: true,
        defaultFilters: true,
        customFilters: [],
      },
    },
    {
      name: 'particles',
      label: 'Particles',
      align: 'left',
      field: (row) => row.particles,
      format: (val) => val,
      sortable: true,
      visible: false,
      type: 'array',
      form: {
        visible: 'create|update|delete',
        editable: 'create',
        default: '[]',
        placeholder: null,
        label: 'Particles',
        validations: '',
        input: 'text',
      },
      headerFilter: {
        show: true,
        defaultFilters: true,
        customFilters: [],
      },
    },
    {
      name: 'grid',
      label: 'Grid Options',
      align: 'left',
      field: (row) => row.grid,
      format: (val) => val,
      sortable: true,
      visible: false,
      type: 'object',
      form: {
        visible: 'create|update|delete',
        editable: 'create',
        default: '{}',
        placeholder: null,
        label: 'Grid Options',
        validations: '',
        input: 'text',
      },
      headerFilter: {
        show: true,
        defaultFilters: true,
        customFilters: [],
      },
    },
    {
      name: 'created_at',
      label: 'Created At',
      align: 'left',
      field: (row) => row.created_at,
      format: (v) => filters.date(v, 'YYYY-MM-DD HH:mm:ss'),
      sortable: true,
      visible: true,
      type: 'string',
      form: {
        visible: 'update|delete',
        editable: '',
        default: '',
        placeholder: null,
        label: 'Created At',
        validations: '',
        input: 'text',
      },
      headerFilter: {
        show: true,
        defaultFilters: true,
        customFilters: [],
      },
    },
  ]
}
