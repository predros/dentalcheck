<template>
    <q-card class="q-pa-md" style="min-width:500px; max-width: 650px;">
    <q-card-section class="text-h5">
      Apagar cadastro
    </q-card-section>
    <q-card-section>
      Tem certeza que deseja apagar o cadastro de <b>{{ patientName }}</b>?
      Esta ação não pode ser desfeita.
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat color="primary" label="Apagar" @click="emit('submit')" />
      <q-btn flat color="primary" label="Cancelar" @click="emit('close')" />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted } from "vue";
import useGlobalStore from "src/stores/global";

const props = defineProps({ patientId: { type: Number, default: null } });
const emit = defineEmits(["submit", "close", "failed"]);
const store = useGlobalStore();

const patientName = ref("");

onMounted(() => {
  if (props.patientId === null) {
    emit("failed");
    return;
  }
  const response = store.getPatients({ id: props.patientId });

  if (response.status == "200") patientName.value = response.response.name;
  else emit("failed");
});
</script>
