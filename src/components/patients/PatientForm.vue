<template>
  <q-card class="q-pa-md" style="min-width: 600px">
    <q-card-section class="text-h5">
      {{ props.patientId ? 'editar cadastro' : 'novo cadastro' }}
    </q-card-section>
    <q-card-section>
      <q-form ref="form" lazy-validation>
        <div class="row q-pb-m">
          <q-input
            class="full-width"
            v-model="patient.name"
            label="nome do paciente"
            :rules="[
              (value) => Boolean(value.trim()) || 'informe um nome válido.'
            ]"
            maxlen="255"
            hint="(obrigatório)"
          >
            <template v-slot:prepend>
              <q-icon name="mdi-calendar-account-outline" />
            </template>
          </q-input>
        </div>

        <div class="row q-pb-m q-gutter-md">
          <div class="col">
            <q-input
              v-model="patient.phone"
              label="telefone"
              mask="(##) #####-####"
              :rules="[
                (value) => /\([0-9]{2}\) [0-9]{5}-[0-9]{4}/.test(value)
                || 'informe um número de telefone válido.'
              ]"
              hint="(obrigatório)"
            >
              <template v-slot:prepend>
                <q-icon name="phone" />
              </template>
            </q-input>
          </div>
          <div class="col">
            <q-input
              v-model="patient.regId"
              label="CPF"
              :rules="[isValidRegId]"
              mask="###.###.###-##"
            >
              <template v-slot:prepend>
                <q-icon name="phone" />
              </template>
            </q-input>
          </div>
        </div>

        <div class="row q-pb-m q-gutter-md">
          <div class="col">
            <q-input
              v-model="patient.birthDate"
              label="data de nascimento"
              mask="##/##/####"
              :rules="[isValidDate]"
              hint="(obrigatório)"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="patient.birthDate" mask="DD/MM/YYYY">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Fechar" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>

          <div class="col">
            <q-select
              v-model="patient.gender"
              option-value="value"
              option-label="label"
              label="gênero"
              hint="(obrigatório)"
              :rules="[
                (value) => value !== null || 'selecione uma opção.'
              ]"
              :options="options.genders"
            />
          </div>
        </div>

        <div class="row q-pb-m q-gutter-md">
          <div class="col">
            <q-select
              v-model="patient.insType"
              label="tipo de convênio"
              :rules="[
                (value) => value !== null || 'selecione uma opção.'
              ]"
              :options="options.insTypes"
              hint="(obrigatório)"
            />
          </div>
          <div class="col">
            <q-input
              v-model="patient.insNumber"
              label="número do convênio"
              maxlen="20"
              :rules="[
                (value) =>
                  (patient.insNumber == options.insTypes[0] ||
                  patient.insNumber != options.insTypes[0] && !Number.isNaN(value.replaceAll('.', '').replaceAll('-', '').trim()))
                  || 'informe um número de convênio válido.'
              ]"
              :disable="patient.insType == options.insTypes[0]"
              :hint="patient.insType == options.insTypes[0] ? '' : '(obrigatório)'"
            />
          </div>
        </div>

        <div class="row q-pb-m q-gutter-md">
          <div class="col">
            <q-input
              v-model="patient.parentName"
              label="nome do responsável"
              :hint="isMinor ? '(obrigatório)' : ''"
              :disable="!isMinor"
              :rules="[
                (value) =>
                  (!isMinor || (isMinor && Boolean(value.trim())))
                  || 'informe um nome válido para o responsável.'
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="phone" />
              </template>
            </q-input>
          </div>
          <div class="col">
            <q-input
              v-model="patient.parentPhone"
              label="tel. do responsável"
              mask="(##) #####-####"
              :hint="isMinor ? '(obrigatório)' : ''"
              :disable="!isMinor"
              :rules="[
                (value) =>
                  (!isMinor || (isMinor && /\([0-9]{2}\) [0-9]{5}-[0-9]{4}/.test(value)))
                  || 'informe um telefone válido para o responsável.'
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="phone" />
              </template>
            </q-input>
          </div>
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
import { ref, computed, defineProps, defineEmits, onMounted } from "vue";
import useGlobalStore from "src/stores/global";
import { DateTime } from "luxon";

const props = defineProps({ patientId: { type: Number, default: null } });
const emit = defineEmits(["submit", "close", "failed"]);

const store = useGlobalStore();

const options = ref({
  genders: [
    { label: "masculino", value: 0 },
    { label: "feminino", value: 1 },
    { label: "outro/não especificado", value: 2 },
  ],
  insTypes: [
    { label: "particular", value: 0 },
    { label: "plano de saúde", value: 1 },
    { label: "SUS", value: 2 },
  ]
});

const form = ref(null);
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
});

const isMinor = computed(() => {
  const dt = DateTime.fromFormat(patient.value.birthDate, "dd/LL/yyyy");
  if (!dt.isValid) return false;
  const today = DateTime.now();
  return today.diff(dt, "years").years < 18;
});

onMounted(() => {
  if (props.patientId !== null) {
    const response = store.getPatients({ id: props.patientId });
    if (response.status == "200") {
      patient.value = response.response;
      patient.value.birthDate = store.dateISOToLocale(response.response.birthDate);

      patient.value.gender = options.value.genders[response.response.gender];
      patient.value.insType = options.value.insTypes[response.response.insType];

      patient.value.parentName = response.response.parentName || "";
      patient.value.parentPhone = response.response.parentPhone || "";
      patient.value.insNumber = response.response.insNumber || "";
    } else emit("failed");
  }
});

function onClear() {
  patient.value = {
    name: "",
    phone: "",
    regId: "",
    birthDate: "",
    gender: null,
    insType: null,
    insNumber: "",
    parentName: "",
    parentPhone: "",
  };
}

function onClose() {
  emit("close");
}

function onSubmit() {
  form.value.validate().then((success) => {
    if (success) {
      const result = JSON.parse(JSON.stringify(patient.value));
      result.name = result.name.trim();
      result.phone = result.phone.replaceAll("(", "").replaceAll(")", "").replaceAll("-", "").replaceAll(" ", "");
      result.birthDate = store.dateLocaleToISO(patient.value.birthDate);

      result.parentName = isMinor.value ? result.parentName.trim() : null;
      result.parentPhone = isMinor.value
        ? result.parentPhone.replaceAll("(", "").replaceAll(")", "").replaceAll("-", "").replaceAll(" ", "")
        : null;

      result.insType = result.insType.value;
      result.insNumber = result.insType != 0 ? result.insNumber.trim() : null;

      emit("submit", result);
    }
  })
}

function isValidRegId(value) {
  if (!/[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}/.test(value)) return 'informe um CPF válido.';
  const numbersOnly = value.replaceAll(".", "").replaceAll("-", "");

  let firstTest = 0;
  for (let i = 0; i < 9; i++)
    firstTest += numbersOnly[i] * (10 - i);
  firstTest %= 11;
  firstTest = firstTest < 2 ? 0 : 11 - firstTest;
  if (firstTest != numbersOnly[9]) return 'informe um CPF válido.';

  let secondTest = 0;
  for (let i = 0; i < 10; i++)
    secondTest += parseInt(numbersOnly[i]) * (11 - i);
  secondTest = secondTest % 11;
  secondTest = secondTest < 2 ? 0 : 11 - secondTest;
  if (secondTest != numbersOnly[10]) return 'informe um CPF válido.';

  return true;
}

function isValidDate(date) {
  const iso = store.dateLocaleToISO(date);
  return store.isValidDate(iso) || 'informe uma data válida.'
}
</script>
