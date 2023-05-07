<template>
  <div class="layout flex-container">
    <div class="full-width">
      <div class="full-width">
        <header class="">
          <slot name="header"></slot>
        </header>
      </div>
      <div class="row flex-container">
       
        <main class="container-fluid col-11 flex-item" :class="{ 'full-width': !showSidebar }">
          <slot></slot>
        </main>
      </div>
      <div class="row">
        <!-- <slot name="footer"></slot> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "layoutVue",
  props: {
    showSidebar: {
      type: Boolean,
      default: true,
    },
    hideSideBar: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    hideSideBar(newVal) {
      if (newVal) {
        const sidebarEl = this.$refs.sidebar;
        if (sidebarEl) {
          sidebarEl.remove();
        }
      }
    },
  },

   computed: {
    showNavbar() {
      return this.$route.meta.hideNavbar;
    },
  },
};
</script>

<style>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.main {
  flex: 1;
}

.full-width {
  width: 100%;
}

.flex-container {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  align-content: flex-start;
  align-items: stretch;
  justify-content: flex-start;
}

.flex-item {
  align-self: auto;
  flex-basis: auto;
  flex-grow: 0;
  flex-shrink: 1;
  flex: 1;
}

.show {
  width: 40%;
}

footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

</style>
