<template>
  <q-calendar-day
    style="width: 100%"
    ref="calendar"
    v-model="store.currentDate"
    :animated="props.animated"
    :bordered="props.bordered"
    :day-height="0"
    :day-min-height="props.dayMinHeight"
    :focusable="props.focusable"
    :hoverable="props.hoverable"
    :locale="props.locale"
    :selected-dates="props.selectedDates"
    :view="props.view"
    :hour24-format="props.hour24Format"

    @change="({start, end}) => emit('change', start, end)"
    @moved="(ts) => emit('moved', ts)"

    @click-date="(date) => emit('click-date', date.scope.timestamp)"
    @contextmenu-date="(date) => emit('contextmenu-date', date.scope.timestamp)"
    @mousedown-date="(date) => emit('mousedown-date', date.scope.timestamp)"
    @mouseup-date="(date) => emit('mouseup-date', date.scope.timestamp)"
    @mouseenter-date="(date) => emit('mouseenter-date', date.scope.timestamp)"
    @mouseleave-date="(date) => emit('mouseleave-date', date.scope.timestamp)"
    @touchstart-date="(date) => emit('touchstart-date', date.scope.timestamp)"
    @touchmove-date="(date) => emit('touchmove-date', date.scope.timestamp)"
    @touchend-date="(date) => emit('touchend-date', date.scope.timestamp)"

    @click-time="(date) => emit('click-time', date.scope.timestamp)"
    @contextmenu-time="(date) => emit('contextmenu-time', date.scope.timestamp)"
    @mousedown-time="(date) => emit('mousedown-time', date.scope.timestamp)"
    @mouseup-time="(date) => emit('mouseup-time', date.scope.timestamp)"
    @mouseenter-time="(date) => emit('mouseenter-time', date.scope.timestamp)"
    @mouseleave-time="(date) => emit('mouseleave-time', date.scope.timestamp)"
    @touchstart-time="(date) => emit('touchstart-time', date.scope.timestamp)"
    @touchmove-time="(date) => emit('touchmove-time', date.scope.timestamp)"
    @touchend-time="(date) => emit('touchend-time', date.scope.timestamp)"

    @click-head-day="(weekday) => emit('click-head-day', weekday.scope.weekday)"
    @contextmenu-head-day="(weekday) => emit('contextmenu-head-day', weekday.scope.weekday)"
    @mousedown-head-day="(weekday) => emit('mousedown-head-day', weekday.scope.weekday)"
    @mouseup-head-day="(weekday) => emit('mouseup-head-day', weekday.scope.weekday)"
    @mouseenter-head-day="(weekday) => emit('mouseenter-head-day', weekday.scope.weekday)"
    @mouseleave-head-day="(weekday) => emit('mouseleave-head-day', weekday.scope.weekday)"
    @touchstart-head-day="(weekday) => emit('touchstart-head-day', weekday.scope.weekday)"
    @touchmove-head-day="(weekday) => emit('touchmove-head-day', weekday.scope.weekday)"
    @touchend-head-day="(weekday) => emit('touchend-head-day', weekday.scope.weekday)"
  >
    <template #head-day-event="{ scope: { timestamp } }">
      <div style="display: flex; justify-content: center; flex-wrap: wrap; padding: 2px;">
        <template
          v-for="event in alldayEvents[timestamp.date]"
          :key="event.id"
        >
          <div
            class="event-card"
            :class="setEventClass(event)"
            :style="setEventStyle(event)"
            @click="emit('click-event', event)"
          >
            <div class="event-title q-calendar__ellipsis">
              {{ event.title }}
              <q-tooltip>{{ event.details || "" }}</q-tooltip>
            </div>
          </div>
        </template>
      </div>
    </template>


    <template #day-body="{ scope: { timestamp, timeStartPos, timeDurationHeight } }">
      <template
        v-for="event in timedEvents[timestamp.date]"
        :key="event.id"
      >
        <div
          class="event-card"
          :class="setEventClass(event)"
          :style="setEventStyle(event, timeStartPos, timeDurationHeight)"
          @click="emit('click-event', event)"
        >
          <div class="event-title q-calendar__ellipsis">
            {{ event.title }}
            <q-tooltip>{{ event.time }}</q-tooltip>
          </div>
        </div>
      </template>
    </template>
  </q-calendar-day>
</template>

<script setup>
import useGlobalStore from "src/stores/global";
import { parseTimestamp, QCalendarDay, validateTimestamp } from "@quasar/quasar-ui-qcalendar/src";
import { ref, defineProps, defineEmits, defineExpose, computed } from "vue";

import "@quasar/quasar-ui-qcalendar/src/QCalendarVariables.sass";
import "@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.sass";
import "@quasar/quasar-ui-qcalendar/src/QCalendarMonth.sass";
import "@quasar/quasar-ui-qcalendar/src/QCalendarDay.sass";

const store = useGlobalStore();

const props = defineProps({
  animated: { type: Boolean, default: false },
  bordered: { type: Boolean, default: false },
  dayMinHeight: { type: Number, default: 40 },
  events: { type: Array, default: () => [] },
  focusable: { type: Boolean, default: false },
  hour24Format: { type: Boolean, default: false },
  hoverable: { type: Boolean, default: false },
  locale: { type: String, default: "en-US" },
  selectedDates: { type: Array, default: () => [] },
  view: { type: String, default: "week" },
});

const emit = defineEmits([
  "change",
  "moved",

  "click-date",
  "contextmenu-date",
  "mousedown-date",
  "mouseup-date",
  "mouseenter-date",
  "mouseleave-date",
  "touchstart-date",
  "touchmove-date",
  "touchend-date",

  "click-time",
  "contextmenu-time",
  "mousedown-time",
  "mouseup-time",
  "mouseenter-time",
  "mouseleave-time",
  "touchstart-time",
  "touchmove-time",
  "touchend-time",

  "click-head-day",
  "contextmenu-head-day",
  "mousedown-head-day",
  "mouseup-head-day",
  "mouseenter-head-day",
  "mouseleave-head-day",
  "touchstart-head-day",
  "touchmove-head-day",
  "touchend-head-day",

  "click-event",
  "invalid-date",
  "created",
]);

defineExpose({ next, previous, moveToToday, setDate, getDate });

const calendar = ref(null);

emit("created");


const alldayEvents = computed(() => {
  const result = {};

  props.events.forEach((evt) => {
    result[evt.date] = result[evt.date] || [];
    if (!evt.time) {
      const copy = JSON.parse(JSON.stringify(evt));
      copy.color = colors.includes(copy.color) ? copy.color : getRandomColor();
      result[evt.date].push(copy);
    }
  });
  return result;
});

const timedEvents = computed(() => {
  const result = {};

  props.events.forEach((evt) => {
    result[evt.date] = result[evt.date] || [];
    if (evt.time) {
      const copy = JSON.parse(JSON.stringify(evt));
      copy.color = colors.includes(copy.color) ? copy.color : getRandomColor();
      copy.duration = evt.durationMinutes || 60;
      result[evt.date].push(copy);
    }
  });
  return result;
});

function next() {
  calendar.value.next();
}

function previous() {
  calendar.value.prev();
}

function moveToToday() {
  calendar.value.moveToToday();
}

function setDate(dateString) {
  if (dateString.length < 10) {
    emit("invalid-date");
    return;
  }

  const date = dateString.substring(0, 12);
  if (!validateTimestamp(date)) {
    emit("invalid-date");
    return;
  }

  store.currentDate = date;
}

function getDate() {
  return parseTimestamp(store.currentDate);
}

function setEventStyle(event, timeStartPos = undefined, timeDurationHeight = undefined) {
  const result = {};
  result["align-items"] = "start";

  if (timeStartPos && timeDurationHeight) {
    result["top"] = `${timeStartPos(event.time)}px`;
    result["height"] = `${timeStartPos(event.duration)}px`;
  }

  return result;
}

function setEventClass(event) {
  if (colors.includes(event.color)) return `bg-${event.color}-6`;
  else return `bg-${getRandomColor()}-6`;
}

function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}

const colors = [
    "red",
    "pink",
    "purple",
    "deep-purple",
    "indigo",
    "blue",
    "light-blue",
    "cyan",
    "teal",
    "green",
    "light-green",
    "yellow",
    "amber",
    "orange",
    "deep-orange",
    "grey",
    "blue-grey",
  ];
</script>

<style scoped>
.event-card {
  position: absolute;
  font-size: 12px;
  justify-content: center;
  margin: 0 1px;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: pointer;
  border-radius: 4px;
  width: 100%;
}

.event-title {
  color: white;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>

