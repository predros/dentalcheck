<template>
  <q-page class="flex vertical-top appointments-page">
      <div class="gt-sm appointments-sidebar">
        <div class="row" style="align-items: flex-end;">
          <q-select
            v-model="searchSelected"
            :options="searchResults"
            style="flex: 1"
            label="pesquisar compromissos..."
            dropdown-icon="search"
            use-input
            option-value="id"
            option-label="title"
            @input-value="onSearchFilter"
            @update:v-model="onSearchSelect"
          >
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section>
                  <q-item-label>
                    {{ scope.opt.title }}
                  </q-item-label>
                  <q-item-label caption>
                    {{ scope.opt.date }} {{ scope.opt.time ? ` - ${scope.opt.time}` : '' }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>

          <q-btn
            flat
            unelevated
            color="primary"
            icon="mdi-calendar-plus"
          >
            <q-tooltip>Adicionar compromisso</q-tooltip>
          </q-btn>
        </div>


        <div>
          <div
            style="
              display:flex;
              flex-flow:row;
              justify-content: space-between;
              align-items: flex-end;
              padding-bottom: 0.5rem;
            "
          >
            <q-btn-group
              unelevated
              rounded
              flat
            >
              <q-btn
                flat
                dense
                color="primary"
                icon="chevron_left"
                @click="onMiniPrev"
              >
                <q-tooltip>anterior</q-tooltip>
              </q-btn>
              <q-btn
                flat
                dense
                color="primary"
                icon="today"
                @click="onMiniToday"
              >
                <q-tooltip>hoje</q-tooltip>
              </q-btn>
            </q-btn-group>


            <span class="text-h6">{{ miniCalendarTitle }}</span>

            <q-btn-group
              unelevated
              rounded
              flat
              dense
            >
              <q-btn-dropdown
                flat
                dense
                color="primary"
                icon="mdi-calendar-search"
              >
                  <q-form ref="dateSearchForm" class="q-pa-xs">
                    <div class="row">
                      <q-input
                        dense
                        v-model="dateSearch"
                        label="pesquisar data..."
                        mask="##/##/####"
                        :rules="[isValidDate]"
                      />
                      <q-btn
                        flat
                        dense
                        color="primary"
                        icon="search"
                        @click="onDateSearch"
                      >
                        <q-tooltip>pesquisar</q-tooltip>
                      </q-btn>
                    </div>
                  </q-form>

              </q-btn-dropdown>
              <q-btn
                flat
                dense
                color="primary"
                icon="chevron_right"
                @click="onMiniNext"
              >
                <q-tooltip>próximo</q-tooltip>
              </q-btn>
            </q-btn-group>
          </div>

          <q-calendar-month
            ref="miniCalendar"
            animated
            bordered
            mini-mode
            locale="pt-BR"
            date-type="round"
            v-model="store.currentDate"
          />
        </div>

      </div>
      <div class="appointments-list">
        <AppointmentsList
          ref="calendar"
          @click-time="onTimeClick"
          @click-event="onEventClick"
        />
      </div>

      <q-dialog v-model="dialogForm" persistent>
        <AppointmentForm
          :appointment-id="currentAppointment"
          :date-string="selectedDate.date"
          :time-string="selectedDate.time"
          @close="onDialogClose"
          @submit="onFormSubmit"
          @failed="onRequestFailed"
        />
      </q-dialog>

      <q-dialog v-model="dialogRead" persistent>
        <AppointmentRead
          :appointment-id="currentAppointment"
          @close="onDialogClose"
          @delete="onDialogDelete"
          @update="onDialogUpdate"
          @failed="onRequestFailed"
        />
      </q-dialog>

      <q-dialog v-model="dialogDelete" persistent>
        <AppointmentDelete
          :appointment-id="currentAppointment"
          @close="onDialogClose"
          @submit="onDelete"
          @failed="onRequestFailed"
        />
      </q-dialog>
  </q-page>
</template>

<script setup>
import AppointmentsList from 'src/components/appointments/AppointmentsList.vue';
import { QCalendarMonth, getMonthNames } from '@quasar/quasar-ui-qcalendar/src/index.js';
import { ref, computed, watch } from "vue";
import useGlobalStore from "src/stores/global";

import '@quasar/quasar-ui-qcalendar/src/QCalendarVariables.sass';
import '@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.sass';
import '@quasar/quasar-ui-qcalendar/src/QCalendarMonth.sass';
import AppointmentForm from 'src/components/appointments/AppointmentForm.vue';
import AppointmentRead from 'src/components/appointments/AppointmentRead.vue';
import AppointmentDelete from 'src/components/appointments/AppointmentDelete.vue';

const store = useGlobalStore();

const calendar = ref(null);
const miniCalendar = ref(null);

const currentAppointment = ref(null);
const selectedDate = ref({ date: null, time: null });

const dialogForm = ref(false);
const dialogRead = ref(false);
const dialogDelete = ref(false);

const dateSearch = ref("");
const dateSearchForm = ref(null);

const searchResults = ref([]);
const searchSelected = ref(null);

const miniCalendarTitle = computed(() => {
  const months = getMonthNames("short", "pt-BR");
  const m = parseInt(store.currentDate.substring(5, 7));
  const y = store.currentDate.substring(0, 4);
  return `${months[m-1]} ${y}`;
});

function onRequestFailed() {
  store.showNotification("negative", "Ops, algo deu errado.");
  onDialogClose();
}

function onSearchFilter(value) {
  const response = store.getAppointments({ query: value });

  if (response.status != 200) {
    store.showNotification("Ops, algo deu errado.", "negative");
    searchResults.value = [];
  } else {
    searchResults.value = response.response;
  }
}

function onSearchSelect(value) {
  currentAppointment.value = value.id;
  dialogRead.value = true;
}

function onMiniNext() {
  miniCalendar.value.next();
}

function onMiniPrev() {
  miniCalendar.value.prev();
}

function onMiniToday() {
  miniCalendar.value.moveToToday();
}

function onTimeClick(time) {
  selectedDate.value = { date: time.date, time: time.time };
  dialogForm.value = true;
}

function onEventClick(event) {
  currentAppointment.value = event.id;
  dialogRead.value = true;
}

function onDialogClose() {
  selectedDate.value = { date: null, time: null };
  currentAppointment.value = null;
  dialogForm.value = false;
  dialogDelete.value = false;
  dialogRead.value = false;
}

function onDialogUpdate() {
  dialogRead.value = false;
  dialogDelete.value = false;
  dialogForm.value = true;
}

function onDialogDelete() {
  dialogRead.value = false;
  dialogDelete.value = true;
  dialogForm.value = false;
}

function onFormSubmit(result) {
  if (currentAppointment.value === null) {
    const response = store.postAppointment(result);
    if (response.status == "200") store.showNotification("Compromisso adicionado com sucesso.", "positive");
    else store.showNotification("Ops, algo deu errado.", "negative");
  }
  else {
    const response = store.putAppointment(currentAppointment.value, result);
    if (response.status == "200") store.showNotification("Compromisso alterado com sucesso.", "positive");
    else store.showNotification("Ops, algo deu errado.", "negative");
  }
  calendar.value.fetchAppointments();
  onDialogClose();
}

function onDelete() {
  const response = store.deleteAppointment(currentAppointment.value);

  if (response.status == "200") store.showNotification("Compromisso apagado com sucesso.", "positive");
  else store.showNotification("Ops, algo deu errado.", "negative");

  calendar.value.fetchAppointments();
  onDialogClose();
}

function isValidDate(date) {
  const iso = store.dateLocaleToISO(date);
  return store.isValidDate(iso) || "informe uma data válida.";
}

function onDateSearch() {
  dateSearchForm.value.validate().then((success) => {
    if (success) {
      const iso = store.dateLocaleToISO(dateSearch.value);
      store.currentDate = iso;
    }
  })
}

const currentUser = computed(( ) => {
  const response = store.getCurrentUser();
  return response.response;
})

watch(currentUser, () => calendar.value.fetchAppointments());
</script>


<style scoped>
.appointments-page {
  padding-top: 0.5rem;
  flex-flow: row;
  gap: 1.5rem;
  margin: 0 auto;
  width: 100%;
  padding: 0.5rem 5rem;
  height: 75vh;
}

.appointments-sidebar {
  display: flex;
  flex-flow: column;
  padding-top:3rem;
  height: 100%;
  width: 17.5%;
  justify-content: flex-start;
  gap: 3rem;
}

.appointments-list {
  justify-content: flex-start;
  height: 100%;
  flex: 1;
}
</style>
