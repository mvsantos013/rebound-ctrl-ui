<template>
  <div id="app">
    <q-layout style="min-height: 100vh">
      <Navbar
        logo="Rebound CTRL"
        :username="null"
        :userRole="null"
        :drawer-items="[]"
        :user-menu-items="[]"
        drawer-footer=""
        :stage="stage"
        :hide-settigns="true"
        @onSectionSelected="onNavSectionSelected"
        @onOpenConnectionSettings="onOpenConnectionSettings"
      />
      <q-page-container>
        <router-view />
      </q-page-container>

      <ConnectionSettings :open.sync="connectionSettingsOpen" />
    </q-layout>
  </div>
</template>

<script>
import Navbar from '@/components/common/layout/navbar.vue'
import ConnectionSettings from '@/components/connection-settings.vue'

export default {
  components: {
    Navbar,
    ConnectionSettings,
  },
  data() {
    return {
      connectionSettingsOpen: false,
    }
  },
  computed: {
    stage: () => process.env.VUE_APP_STAGE || 'dev',
    headersCache() {
      return JSON.parse(localStorage.getItem('navbarHeaders') || '{}')
    },
  },
  methods: {
    isHeaderOpen(header) {
      // Cache data to see if a section is open
      return (
        this.headersCache.hasOwnProperty(header) && this.headersCache[header]
      )
    },
    onNavSectionSelected(e) {
      // Update Navbar Headers cache
      const headersCache = JSON.parse(
        localStorage.getItem('navbarHeaders') || '{}',
      )

      if (headersCache.hasOwnProperty(e.header))
        headersCache[e.header] = !headersCache[e.header]
      else headersCache[e.header] = true

      localStorage.setItem('navbarHeaders', JSON.stringify(headersCache))
    },
    onOpenConnectionSettings() {
      this.connectionSettingsOpen = true
    },
  },
}
</script>
