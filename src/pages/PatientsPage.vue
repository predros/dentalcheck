<template>
  <q-page class="flex vertical-top patients-page">
    <div class="patients-list">
      <div class="patients-header">
        <q-input v-model="search" label="pesquisar pacientes..." style="flex:1">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-btn
          flat
          color="primary"
          icon="add"
          label="cadastrar paciente"
          @click="onNewPatient"
        />
      </div>
      <PatientsList
        ref="table"
        :search="search"
        @read="onPatientRead"
        @update="onPatientUpdate"
        @delete="onPatientDelete"
      />
    </div>

    <q-dialog v-model="dialogForm" persistent>
      <PatientForm
        :patient-id="currentPatient"
        @close="onDialogClose"
        @submit="onFormSubmit"
      />
    </q-dialog>

    <q-dialog v-model="dialogRead" persistent>
      <PatientRead
        :patient-id="currentPatient"
        @close="onDialogClose"
        @delete="onDialogDelete"
        @update="onDialogUpdate"
      />
    </q-dialog>

    <q-dialog v-model="dialogDelete" persistent>
      <PatientDelete
        :patient-id="currentPatient"
        @close="onDialogClose"
        @submit="onDelete"
      />
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import useGlobalStore from "src/stores/global";
import PatientsList from 'src/components/patients/PatientsList.vue';
import PatientForm from "src/components/patients/PatientForm.vue";
import PatientRead from "src/components/patients/PatientRead.vue";
import PatientDelete from "src/components/patients/PatientDelete.vue";

const store = useGlobalStore();

const search = ref("");
const table = ref(null);
const currentPatient = ref(null);

const dialogForm = ref(false);
const dialogRead = ref(false);
const dialogDelete = ref(false);

function onNewPatient() {
  currentPatient.value = null;
  dialogForm.value = true;
  dialogRead.value = false;
  dialogDelete.value = false;
}
function onDialogClose() {
  dialogForm.value = false;
  dialogRead.value = false;
  dialogDelete.value = false;
}

function onPatientRead(id) {
  currentPatient.value = id;
  dialogRead.value = true;
  dialogForm.value = dialogDelete.value = false;
}

function onPatientUpdate(id) {
  currentPatient.value = id;
  onDialogUpdate();
}

function onPatientDelete(id) {
  currentPatient.value = id;
  onDialogDelete();
}

function onDialogDelete() {
  dialogDelete.value = true;
  dialogForm.value = dialogRead.value = false;
}

function onDialogUpdate() {
  dialogForm.value = true;
  dialogRead.value = dialogDelete.value = false;
}

function onFormSubmit(result) {
  if (currentPatient.value === null) {
    const response = store.postPatient(result);
    if (response.status == "200") store.showNotification("Paciente cadastrado com sucesso.", "positive");
    else store.showNotification("Ops, algo deu errado.", "negative");
  }
  else {
    const response = store.putPatient(currentPatient.value, result);
    if (response.status == "200") store.showNotification("Cadastro alterado com sucesso.", "positive");
    else store.showNotification("Ops, algo deu errado.", "negative");
  }
  table.value.fetchPatients();
  onDialogClose();
}

function onDelete() {
  store.deletePatient(currentPatient.value);
  table.value.fetchPatients();
  onDialogClose();
}

const currentUser = computed(( ) => {
  const response = store.getCurrentUser();
  return response.response;
})

watch(currentUser, () => table.value.fetchPatients());

</script>

<style scoped>
.patients-page {
  padding-top: 0.5rem;
  flex-flow: row;
  gap: 1.5rem;
  margin: 0 auto;
  width: 80%;
  padding: 0.5rem 7rem;
  height: 70vh;
}

.patients-list {
  justify-content: flex-start;
  flex-flow: column;
  flex: 1;
}

.patients-header {
  display: flex;
  flex-flow: row;
}
</style>
