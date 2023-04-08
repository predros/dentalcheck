<template>
  <q-card class="q-pa-md" style="min-width:600px; max-width: 750px;">
    <q-card-section>
      <div class="text-h5">
        detalhes do cadastro
      </div>
    </q-card-section>

    <q-card-section>
      <div class="text-h6 q-pb-md">
        {{ patient.name }}
      </div>

      <div class="row q-pb-sm">
        <div class="col-4 text-left text-weight-bold">
          telefone
        </div>
        <div class="col text-right">
          {{ store.formatPhone(patient.phone) }}
        </div>
      </div>
      <div class="row q-pb-md">
        <div class="col-4 text-left text-weight-bold">
          CPF
        </div>
        <div class="col text-right">
          {{ store.formatRegId(patient.regId) }}
        </div>
      </div>

      <div class="row" :class="patient.insType == 0 ? 'q-pb-md' : 'q-pb-sm'" >
        <div class="col-4 text-left text-weight-bold">
          tipo de convênio
        </div>
        <div class="col text-right">
          {{ patient.insType == 0 ? 'particular' : (patient.insType == 1 ? 'plano de saúde' : 'SUS') }}
        </div>
      </div>
      <div class="row q-pb-md" v-if="patient.insType != 0">
        <div class="col-4 text-left text-weight-bold">
          número do convênio
        </div>
        <div class="col text-right">
          {{ patient.insNumber }}
        </div>
      </div>

      <div class="row q-pb-sm">
        <div class="col-4 text-left text-weight-bold">
          data de nascimento
        </div>
        <div class="col text-right">
          {{ patient.birthDate ? store.dateISOToLocale(patient.birthDate) : '' }}
        </div>
      </div>
      <div class="row q-pb-md">
        <div class="col-4 text-left text-weight-bold">
          gênero
        </div>
        <div class="col text-right">
          {{ patient.gender == 0 ? 'masculino' : (patient.gender == 1 ? 'feminino' : 'outro/não especificado')  }}
        </div>
      </div>

      <div class="row q-pb-sm" v-if="patient.parentName && patient.parentPhone">
        <div class="col-4 text-left text-weight-bold">
          nome do responsável
        </div>
        <div class="col text-right">
          {{ patient.parentName }}
        </div>
      </div>
      <div class="row q-pb-md" v-if="patient.parentName && patient.parentPhone">
        <div class="col-4 text-left text-weight-bold">
          tel. do responsável
        </div>
        <div class="col text-right">
          {{ store.formatPhone(patient.parentPhone)  }}
        </div>
      </div>

      <div class="row q-pb-md">
        <div class="col">
          <div class="text-h6 q-pu-md q-pb-sm">histórico de consultas</div>
          <q-table
            :rows="patient.appointments"
            bordered
            flat
            hide-bottom
            style="height:300px; overflow-y: auto;"
            :columns="[
              { name: 'date', label: 'data', align: 'left' },
              { name: 'time', label: 'hora', align: 'left' },
              { name: 'comments', label: 'observações', align: 'left' }
            ]"
          >
          <template v-slot:body="props">
            <q-tr :props="props" @click="emit('appointment', props.row.id)">
              <q-td key="date" :props="props">
                {{ props.row.date ? store.dateISOToLocale(props.row.date) : '' }}
              </q-td>
              <q-td key="time" :props="props">
                {{ props.row.time }}
              </q-td>
              <q-td key="comments" :props="props">
                {{ props.row.comments }}
              </q-td>
            </q-tr>
          </template>
        </q-table>
        </div>
      </div>

    </q-card-section>

    <q-card-actions align="right">
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
const props = defineProps({ patientId: { type: Number, default: null } });
const emit = defineEmits(["close", "update", "delete", "failed", "appointment"]);

const patient = ref({
  name: "",
  phone: "",
  regId: "",
  birthDate: "",
  gender: null,
  insType: null,
  insNumber: "",
  parentName: "",
  parentPhone: "",
  appointments: [],
})

onMounted(() => {
  const response = store.getPatients({ id: props.patientId, appointments: true });
  if (response.status == "200") patient.value = response.response;
  else emit("failed");
})
</script>
