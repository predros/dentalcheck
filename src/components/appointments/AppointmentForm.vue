<template>
  <q-card class="q-pa-md" style="min-width: 500px">
    <q-card-section class="text-h5">
      {{ props.appointmentId ? 'editar compromisso' : 'novo compromisso' }}
    </q-card-section>
    <q-card-section>
      <q-form ref="form" lazy-validation>
        <div class="row full-width q-pb-md">
          <q-btn-toggle
            v-model="appointment.hasPatient"
            toggle-color="primary"
            no-caps
            spread
            rounded
            :options="[{ label: 'consulta', value: true }, { label: 'reserva', value: false }]"
          />
        </div>
        <div class="row q-pt-sm q-pb-md">
          <q-input
            v-if="!appointment.hasPatient"
            v-model="appointment.title"
            :rules="[isValidTitle]"
            class="full-width"
            label="nome da reserva"
            maxlen="255"
            hint="(obrigatório)"
          >
            <template v-slot:prepend>
              <q-icon name="mdi-calendar-edit" />
            </template>
          </q-input>

          <div class="row full-width" v-else>
            <q-select
              v-model="appointment.patient"
              :rules="[isValidPatient]"
              :options="patients"
              dropdown-icon="search"
              option-value="id"
              option-label="name"
              style="flex: 1"
              label="paciente"
              use-input
              hint="(obrigatório)"
              @input-value="onPatientFilter"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-calendar-account-outline" />
              </template>

              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section>
                    <q-item-label>{{ scope.opt.name }}</q-item-label>
                    <q-item-label caption>
                      {{ store.formatPhone(scope.opt.phone) }} | {{ store.formatRegId(scope.opt.regId) }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>

            <q-btn flat dense color="primary" icon="add" />
          </div>

        </div>

        <div class="row q-py-sm">
          <div class="col q-pr-sm">
            <q-input
              v-model="appointment.date"
              label="data"
              mask="##/##/####"
              :rules="[isValidDate]"
              hint="(obrigatório)"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="appointment.date" mask="DD/MM/YYYY">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Fechar" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>

          <div class="col q-pl-sm">
            <q-input
              label="hora"
              v-model="appointment.time"
              mask="time"
              :rules="['time']"
              hint="(obrigatório)"
            >
              <template v-slot:append>
                <q-icon name="mdi-clock-outline" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-time v-model="appointment.time">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Fechar" color="primary" flat />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>

        <div class="row q-py-sm">
          <div class="col q-pr-sm">
            <q-input
              v-model="appointment.durationMinutes"
              label="duração (minutos)"
              :rules="[
                (value) => ((!value || !Number.isNaN(parseInt(value))) || 'informe um tempo de duração válido.'),
                (value) => ((!value || value >= 0) || 'o tempo de duração deve ser não-negativo.'),
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-clock-outline" />
              </template>
            </q-input>
          </div>

          <div class="col q-pl-sm">
            <q-input
              v-model="appointment.returnInDays"
              label="retorno (dias)"
              :rules="[
                (value) => ((!value || !Number.isNaN(parseInt(value))) || 'informe um período de retorno válido.'),
                (value) => ((!value || value >= 0) || 'o período de retorno deve ser não-negativo.'),
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-calendar-refresh" />
              </template>
            </q-input>
          </div>
        </div>

        <div class="row q-py-sm">
          <q-input class="full-width" v-model="appointment.comments" type="textarea" label="observações">
            <template v-slot:prepend>
                <q-icon name="mdi-text-box-edit" />
              </template>
          </q-input>
        </div>
      </q-form>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat color="primary" label="Salvar" @click="onSubmit" />
      <q-btn flat color="primary" label="Limpar" @click="onClear" />
      <q-btn flat color="primary" label="Cancelar" @click="onClose" />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { ref, defineProps, onMounted, defineEmits } from "vue";
import { today } from "@quasar/quasar-ui-qcalendar/src";
import useGlobalStore from "src/stores/global";


const emit = defineEmits(["close", "submit", "failed"]);
const store = useGlobalStore();

const props = defineProps({
  appointmentId: {
    type: Number,
    default: null,
  },
  dateString: {
    type: String,
    default: "",
  },
  timeString: {
    type: String,
    default: "",
  },
});

const form = ref(null);
const patients = ref([]);

const appointment = ref({
  hasPatient: true,
  patient: null,
  title: "",
  date: "",
  time: "",
  durationMinutes: "",
  returnInDays: "",
  comments: "",
});

function onPatientFilter(value) {
  const response = store.getPatients({ query: value });
  if (response.status == "200") patients.value = response.response;
  else store.showNotification("Ops, algo deu errado.", "negative");
}

function isValidDate(date) {
  if (!/[0-9]{2}\/[0-9]{2}\/[0-9]{4}/.test(date)) return "informe uma data válida.";
  const dateISO = store.dateLocaleToISO(date);
  return store.isValidDate(dateISO) || 'informe uma data válida.';
}

function isValidTitle(title) {
  return (appointment.value.hasPatient ||
    (!appointment.value.hasPatient && Boolean(title))) ||
    "informe um nome para a reserva.";
}

function isValidPatient(patient) {
  if (appointment.value.hasPatient === false) return true;
  if (appointment.value.patient === null) return "selecione um paciente válido.";
  const response = store.getPatients({ id: patient.id });
  return (response.status == "200") || "selecione um paciente válido.";
}

function onClear() {
  appointment.value = {
    hasPatient: true,
    patient: null,
    title: "",
    date: "",
    time: "",
    durationMinutes: "",
    returnInDays: "",
    comments: "",
  }
  form.value.resetValidation();
}

function onClose() {
  emit("close");
}

function onSubmit() {
  form.value.validate().then((success) => {
    if (success) {
      const result = {
        hasPatient: appointment.value.hasPatient,
        patientId: appointment.value.hasPatient ? appointment.value.patient.id : null,
        title: appointment.value.hasPatient ? appointment.value.title : null,
        date: store.dateLocaleToISO(appointment.value.date),
        time: appointment.value.time,
        durationMinutes: appointment.value.durationMinutes,
        returnInDays: appointment.value.returnInDays,
        comments: appointment.value.comments,
        color: appointment.value.color || getRandomColor(),
      };
      emit("submit", result);
    }
  });
}

onMounted(() => {
  if (props.appointmentId === null) {
    appointment.value.date = store.dateISOToLocale(props.dateString || today());
    appointment.value.time = props.timeString.substring(0, 3) + '00' || "";
  } else {
    const response = store.getAppointments({ id: props.appointmentId });
    if (response.status == "200") {
      const result = {
        hasPatient: response.response.hasPatient,
        patient: null,
        title: response.response.title,
        date: store.dateISOToLocale(response.response.date),
        time: response.response.time,
        durationMinutes: response.response.durationMinutes,
        returnInDays: response.response.returnInDays,
        comments: response.response.comments,
        color: response.response.color || null,
      }

      if (response.response.patientId !== null) {
        const patientResponse = store.getPatients({ id: response.response.patientId });
        if (patientResponse.status == "200") {
          patients.value = [patientResponse.response];
          result.patient = patients.value[0];
        }
      }
      appointment.value = result;
    }
    else emit("failed");
  }
});


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
