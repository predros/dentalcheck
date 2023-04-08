<template>
  <q-card class="q-pa-md" style="min-width:500px; max-width: 650px;">
    <q-card-section class="text-h5">
      Apagar compromisso
    </q-card-section>
    <q-card-section v-if="appointment.hasPatient">
      Tem certeza que deseja apagar a consulta de <b>{{ patientName }}</b>, marcada
      para {{ appointment.date ? store.dateISOToLocale(appointment.date) : '' }} às {{ appointment.time || '' }}?
      Esta ação não pode ser desfeita.
    </q-card-section>
    <q-card-section v-else>
      Tem certeza que deseja apagar a reserva <b>{{ appointment.title }}</b>, marcado
      para {{ appointment.date ? store.dateISOToLocale(appointment.date) : '' }} às {{ appointment.time || '' }}?
      Esta ação não pode ser desfeita.
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat color="primary" label="Apagar" @click="emit('submit')" />
      <q-btn flat color="primary" label="Cancelar" @click="emit('close')" />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { ref, onMounted, defineProps, defineEmits } from "vue";
import useGlobalStore from "src/stores/global";

const store = useGlobalStore();

const props = defineProps({ appointmentId: { type: Number, default: null } });
const emit = defineEmits(["submit", "close", "failed"]);

const appointment = ref({});
const patientName = ref(null);

onMounted(() => {
  const response = store.getAppointments({ id: props.appointmentId });
  if (response.status == "200") {
    appointment.value = response.response;

    if (appointment.value.hasPatient && appointment.value.patientId !== null) {
      const patientResponse = store.getPatients({ id: appointment.value.patientId });
      if (patientResponse.status == "200") patientName.value = patientResponse.response.name;
      else emit("failed");
    } else {
      patientName.value = "(cadastro não encontrado)";
    }
  } else {
    emit("failed");
  }
})
</script>
