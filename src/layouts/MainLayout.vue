<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="bg-blue-grey-1 text-dark">
        <div class="text-h5">
          dentalcheck
        </div>
        <q-space/>

        <div>
          <q-btn
            no-caps
            flat
            dense

            label="agenda"
            icon="mdi-calendar-blank"
            :to="{ name: 'appointments' }"
            :class="{ active: $route.name === 'appointments' }"
          />
          &nbsp;
          <q-btn
            flat
            no-caps
            dense

            label="pacientes"
            icon="mdi-clipboard-plus"
            :to="{ name: 'patients' }"
            :class="{ active: $route.name === 'patients' }"
          />
        </div>
        <q-space/>

        <q-btn-dropdown
          flat
          no-caps
          dense
          :label="currentUser.name"
          icon="mdi-account"
        >
          <q-item
            v-for="user in usersList"
            :key="user.id"
            clickable
            v-close-popup
            @click="onUserClick(user.id)"
          >
            <q-item-section>
              <q-item-label>{{ user.name }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-page-container class="page-layout">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { computed } from "vue";
import useGlobalStore from "src/stores/global";

const store = useGlobalStore();

const currentUser = computed(() => {
  const response = store.getCurrentUser();

  if (response.status != "200") {
    store.showNotification("Ops, algo deu errado.", "negative");
    return undefined;
  }
  return response.response;
});

const usersList = computed(() => {
  const response = store.getUsers();
  if (response.status != "200") {
    store.showNotification("Ops, algo deu errado.", "negative");
    return [];
  }
  return response.response;
})

function onUserClick(id) {
  const response = store.setCurrentUser(id);
  if (response.status != "200") store.showNotification("Ops, algo deu errado.", "negative");
}
</script>

<style>
.page-layout {
  font-family: "Red Hat Display", sans-serif;
  padding-top: 5rem;
  display: flex;
  justify-content: center;
}

.active {
  color: #bdbdbd;
}
</style>

