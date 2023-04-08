<template>
  <q-table
    flat
    style="min-height:90%"
    :rows="patients"
    row-key="id"
    :columns="columns"
    v-model:pagination="pagination"
    :loading="loading"
    :filter="search"
    @request="fetchPatients"
  >
    <template v-slot:body="props">
      <q-tr :props="props" @click="emit('read', props.row.id)">
        <q-td key="name" :props="props">
          <div class="row text-left text-h6">
            {{ props.row.name }}
          </div>
          <div class="row text-left text-dark">
            {{ props.row.insType == 0 ? 'particular' : (props.row.insType == 1 ? 'convênio' : 'SUS') }} &nbsp;|
            &nbsp;data de nasc.: {{ store.dateISOToLocale(props.row.birthDate) }}<br/>
            última consulta: {{ props.row.lastAppoint ? store.dateISOToLocale(props.row.lastAppoint) : 'nunca' }}
          </div>
        </q-td>

        <q-td key="phone" :props="props">
          {{ store.formatPhone(props.row.phone) }}
        </q-td>
        <q-td key="regId" :props="props">
          {{ store.formatRegId(props.row.regId) }}
        </q-td>
        <q-td key="insNumber" :props="props">
          {{ props.row.insNumber || 'N/A' }}
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted, defineExpose, computed } from "vue";
import useGlobalStore from "src/stores/global";

const store = useGlobalStore();

const props = defineProps({ search: { type: String, default: "" } });
const emit = defineEmits(["read", "update", "delete"]);

defineExpose({ fetchPatients });

const patients = ref([]);

const columns = [
  {
    name: "name",
    label: "paciente",
    align: "left",
    sortable: true,
  },
  {
    name: "phone",
    label: "telefone",
    align: "center",
  },
  {
    name: "regId",
    label: "CPF",
    align: "center",
  },
  {
    name: "insNumber",
    label: "núm. convênio",
    align: "center",
  }
];

onMounted(() => fetchPatients());

const loading = ref(false);
const pagination = ref({
  sortBy: "name",
  descending: false,
  page: 1,
  rowsPerPage: 7,
  rowsNumber: 0,
});

const search = computed(() => props.search);

function fetchPatients(args) {
  loading.value = true;
  const queryArgs = args ?
  {
    query: props.search,
    page: args.pagination.page,
    rowsPerPage: args.pagination.rowsPerPage,
    sortBy: args.pagination.sortBy,
    descending: args.pagination.descending,
  } :
  {
    query: props.search,
    ...pagination.value,
  }

  const response = store.getPatients(queryArgs);

  if (response.status == "200") {
    patients.value = response.response;
    pagination.value.rowsNumber = response.rowCount;
  } else {
    patients.value = [];
    pagination.value.rowsNumber = 0;
    store.showNotification("Ops, algo deu errado.", "negative");
  }
  loading.value = false;


  if (args) {
    pagination.value.page = args.pagination.page;
    pagination.value.rowsPerPage = args.pagination.rowsPerPage;
    pagination.value.sortBy = args.pagination.sortBy;
    pagination.value.descending = args.pagination.descending;
  }
}

</script>
