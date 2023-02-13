<template>

    <v-navigation-drawer permanent theme="dark"  :rail="$vuetify.display.mdAndDown" app>
      <v-list nav>
        <v-list-item style="border: none !important">
          <div>
           <v-img v-if="!$vuetify.display.mdAndDown" src="@/assets/simply-logo-dark.svg" ></v-img>
           <v-img v-else src="@/assets/simply-icon-square.svg" ></v-img>
          </div>
        </v-list-item>
        <v-list-item
          prepend-icon="mdi-plus"
          title="Add New"
          router
          to="/create"
        >
        </v-list-item>
        <v-list-item
        router
          prepend-icon="mdi-format-list-checkbox"
          title="To-Do List"
          to="/"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>


</template>

<script>
</script>

<style lang="scss" scoped>
</style>
