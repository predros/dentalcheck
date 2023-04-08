<template>
  <q-card class="q-pa-md" style="min-width:500px; max-width: 650px;">
    <q-card-section>
      <div class="text-h5">
        detalhes do compromisso
      </div>
      <div class="text-subtitle2">
        status: {{ statusString(appointment.status) }}
      </div>
    </q-card-section>

    <q-card-section>
      <div class="row q-pb-md">
        <div class="col-3 text-left text-weight-bold">
          tipo
        </div>
        <div class="col text-right">
          {{ appointment.hasPatient? 'consulta' : 'reserva' }}
        </div>
      </div>

      <div class="row q-pb-sm">
        <div class="col-3 text-left text-weight-bold">
          {{ appointment.hasPatient? 'paciente' : 'título' }}
        </div>
        <div class="col text-right">
          {{ appointment.hasPatient? patientName : appointment.title }}
        </div>
      </div>
      <div class="row q-pb-md">
        <div class="col-3 text-left text-weight-bold">
          data e hora
        </div>
        <div class="col text-right">
          {{ appointment.date ? store.dateISOToLocale(appointment.date) : '' }} - {{ appointment.time }}
        </div>
      </div>

      <div class="row q-pb-sm">
        <div class="col-3 text-left text-weight-bold">
          duração
        </div>
        <div class="col text-right">
          {{ appointment.durationMinutes ? `${appointment.durationMinutes} minutos` : 'não especificada'  }}
        </div>
      </div>
      <div class="row q-pb-md">
        <div class="col-3 text-left text-weight-bold">
          retorno
        </div>
        <div class="col text-right">
          {{ appointment.returnInDays ? `${appointment.returnInDays} dias` : 'não especificado'  }}
        </div>
      </div>

      <div class="row q-pb-md">
        <div class="col-3 text-left text-weight-bold">
          observações
        </div>
        <div class="col text-right text-wrap" style="overflow-wrap: break-word;">
          {{ appointment.comments }}
        </div>
      </div>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn-dropdown flat color="primary" label="mudar status">
        <q-list>
          <q-item clickable v-close-popup @click="() => changeStatus(0)">
            <q-item-section>
              <q-item-label>pendente</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="() => changeStatus(1)">
            <q-item-section>
              <q-item-label>confirmado</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="() => changeStatus(2)">
            <q-item-section>
              <q-item-label>cancelado</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="() => changeStatus(3)">
            <q-item-section>
              <q-item-label>concluído</q-item-label>
            </q-item-section>
          </q-item>

        </q-list>
      </q-btn-dropdown>
      <q-btn flat color="primary" label="Editar" @click="emit('update')" />
      <q-btn flat color="primary" label="Apagar" @click="emit('delete')" />
      <q-btn flat color="primary" label="Fechar" @click="emit('close')" />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { ref, defineProps, onMounted, defineEmits } from "vue";
import useGlobalStore from "src/stores/global";

const store = useGlobalStore();
const props = defineProps({ appointmentId: { type: String, default: null } });
const emit = defineEmits(["close", "update", "delete", "failed"]);

const appointment = ref({});
const patientName = ref("(cadastro não encontrado)");

onMounted(() => {
  const response = store.getAppointments({ id: props.appointmentId });
  if (response.status == "200") {
    appointment.value = response.response;
    if (appointment.value.hasPatient && appointment.value.patientId !== null) {
      const patientResponse = store.getPatients({ id: appointment.value.patientId });
      if (patientResponse.status == "200") patientName.value = patientResponse.response.name;
    } else {
      patientName.value = "(cadastro não encontrado)"
    }
  } else emit("failed");
})

function changeStatus(status) {
  const oldStatus = appointment.value.status;
  appointment.value.status = status;
  const response = store.putAppointment(props.appointmentId, appointment.value);
  if (response.status != "200") {
    store.showNotification("Ops, algo deu errado.", "negative");
    appointment.value.status = oldStatus;
  }
}

function statusString(status) {
  switch (status) {
    default:
      return "N/A";
    case 0:
      return "pendente";
    case 1:
      return "confirmado";
    case 2:
      return "cancelado";
    case 3:
      return "concluído";
  }
}
</script>
