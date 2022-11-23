<template>
  <div>
    <q-header class="bg-primary border-b shadow-md" dark>
      <q-toolbar>
        <q-toolbar-title class="flex items-center cursor-default ml-5">
          <q-img
            :src="require('@/assets/imgs/logo-rebound.png')"
            class="h-6 w-6 m-2"
          ></q-img>
          <div class="text-white text-lg font-bold ml-6">REBOUND CTRL</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    logo: {
      type: String,
      default: 'App',
    },
    drawerItems: {
      type: Array,
      default: () => [],
    },
    username: {
      type: String,
      default: '',
    },
    userRole: {
      type: String,
      default: '',
    },
    drawerFooter: {
      type: String,
      default: '',
    },
    stage: {
      type: String,
      default: 'dev',
    },
    hideSettings: {
      type: Boolean,
      default: false,
    },
    userMenuItems: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      drawerOpen: false,
    }
  },
}
</script>

<style lang="postcss">
.hide-arrow {
  border-radius: 100% !important;
  width: 2.5rem !important;
  height: 2.5rem !important;

  .q-btn-dropdown__arrow {
    @apply hidden;
  }
}
</style>
