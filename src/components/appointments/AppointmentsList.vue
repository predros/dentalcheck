<template>
    <div class="appointments-header">
      <div class="text-h5">
        {{ title }}
      </div>
      <div>
        <q-btn-group
          unelevated
          rounded
        >
          <q-btn
            flat
            color="primary"
            icon="chevron_left"
            @click="onPrevious"
          >
            <q-tooltip>Anterior</q-tooltip>
          </q-btn>
          <q-btn
            flat
            color="primary"
            icon="today"
            @click="onToday"
          >
            <q-tooltip>Hoje</q-tooltip>
          </q-btn>
          <q-btn
            flat
            color="primary"
            icon="chevron_right"
            @click="onNext"
          >
            <q-tooltip>Próximo</q-tooltip>
          </q-btn>
        </q-btn-group>
      </div>

  </div>
  <div class="appointments-body">
      <CalendarTimeGrid
        ref="timeGrid"
        :events="events"
        :cell-height="100"
        locale="pt-BR"
        animated
        focusable
        hoverable
        hour24-format
        @change="onDateChange"
        @click-time="(time) => emit('click-time', time)"
        @click-event="(event) => emit('click-event', event)"
      />
  </div>
</template>

<script setup>
import {
  getMonthNames,
  getEndOfWeek,
  getStartOfWeek,
  parseTimestamp,
  today,

} from "@quasar/quasar-ui-qcalendar/src/index";

import CalendarTimeGrid from "src/components/appointments/calendar/CalendarTimeGrid.vue";
import useGlobalStore from "src/stores/global";
import { ref, computed, defineEmits, defineExpose } from "vue";

defineExpose({ fetchAppointments });

const emit = defineEmits("click-time", "click-event");
const store = useGlobalStore();

const timeGrid = ref(null);
const events = ref([]);

const startDate = ref(null);
const endDate = ref(null);

store.currentDate = today();

const title = computed(() => {
  const dateTS = parseTimestamp(store.currentDate);
  const monthShort = getMonthNames("short", "pt-BR");
  const weekStart = getStartOfWeek(dateTS, [0, 1, 2, 3, 4, 5, 6]);
  const weekEnd = getEndOfWeek(dateTS, [0, 1, 2, 3, 4, 5, 6]);

  return `${weekStart.day} ${monthShort[weekStart.month-1]} ${weekStart.year}` +
        ` — ${weekEnd.day} ${monthShort[weekEnd.month-1]} ${weekEnd.year}`;
});

function onNext() {
  timeGrid.value.next();
}

function onPrevious() {
  timeGrid.value.previous();
}

function onToday() {
  timeGrid.value.moveToToday();
}

function onDateChange(start, end) {
  startDate.value = start;
  endDate.value = end;
  fetchAppointments();
}

function fetchAppointments() {
  const response = store.getAppointments({ start: startDate.value, end: endDate.value });
  if (response && response.status == "200") events.value = response.response;
  else {
    store.showNotification("Ops, algo deu errado.", "negative");
    events.value = [];
  }
}

</script>

<style scoped>
.appointments-body {
  padding-top: 1rem;
  width: 100%;
  margin: 0 auto;
  height: 100%;
  overflow-y: auto;
}

.appointments-header {
  width: 100%;
  height: auto;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: flex-end;
}
</style>
