import { defineStore } from "pinia";
import { ref } from "vue";
import { DateTime } from "luxon";
import { Notify } from "quasar";


export default defineStore("global", () => {
  const currentDate = ref("1970-01-01");
  const currentUserId = ref(0);

  const today = DateTime.now();

  const users = ref([
    {
      id: 0,
      name: "Dentista 1",
      phone: "1234567890",
      email: "dentista1@dentalcheck.com",
    },
    {
      id: 1,
      name: "Dentista 2",
      phone: "988765443224",
      email: "dentista2@dentalcheck.com",
    },
  ]);

  const appointments = ref([
    {
      id: 0,
      user: 0,
      status: 1,
      hasPatient: true,
      patientId: 0,
      title: "Luan Gustavo de Paula",
      date: today.toISODate(),
      time: "12:00",
      durationMinutes: 90,
      returnInDays: 30,
      comments: null,
      color: "teal",
    },
    {
      id: 1,
      user: 0,
      status: 0,
      hasPatient: true,
      patientId: 1,
      title: "Juan Marcos Vinicius Kaique Moreira",
      date: today.plus({ days: 1 }).toISODate(),
      time: "08:00",
      durationMinutes: null,
      returnInDays: null,
      comments: null,
      color: "green",
    },
    {
      id: 2,
      user: 0,
      status: 3,
      hasPatient: false,
      patientId: null,
      title: "Exemplo de reserva",
      date: today.minus({ days: 1 }).toISODate(),
      time: "14:00",
      durationMinutes: 120,
      returnInDays: null,
      comments: null,
      color: "amber",
    },
    {
      id: 3,
      user: 0,
      status: 0,
      hasPatient: true,
      patientId: 0,
      title: "Luan Gustavo de Paula",
      date: today.plus({ days: 10 }).toISODate(),
      time: "10:00",
      durationMinutes: 90,
      returnInDays: null,
      color: "red",
    },
    {
      id: 4,
      user: 0,
      status: 2,
      hasPatient: true,
      patientId: 1,
      title: "Juan Marcos Vinicius Kaique Moreira",
      date: today.minus({ days: 5 }).toISODate(),
      time: "13:30",
      durationMinutes: null,
      returnInDays: 20,
      color: "magenta",
    },
  ]);

  const patients = ref([
    {
      id: 0,
      user: 0,
      name: "Luan Gustavo de Paula",
      regId: "33356933531",
      birthDate: "1946-04-01",
      gender: 0,
      phone: "47997240406",
      insType: 1,
      insNumber: "4322567544212",
      parentName: null,
      parentPhone: null,
    },
    {
      id: 1,
      user: 0,
      name: "Juan Marcos Vinicius Kaique Moreira",
      regId: "43499814897",
      birthDate: "1977-01-09",
      gender: 0,
      phone: "68992410709",
      insType: 0,
      insNumber: null,
      parentName: null,
      parentPhone: null,
    },
    {
      id: 2,
      user: 1,
      name: "Murilo Sérgio da Costa",
      regId: "13711497470",
      birthDate: "1948-03-02",
      gender: 0,
      phone: "84998461549",
      insType: 2,
      insNumber: "11209482910",
      parentName: null,
      parentPhone: null,
    },
    {
      id: 3,
      user: 0,
      name: "Lúcia Carla Assunção",
      regId: "15818046362",
      birthDate: "1973-04-01",
      gender: 1,
      phone: "82999924955",
      insType: 2,
      insNumber: "77543223454",
      parentName: null,
      parentPhone: null,
    },
    {
      id: 4,
      user: 1,
      name: "Amanda Antonella Castro",
      regId: "42285059027",
      birthDate: "1991-01-14",
      gender: 1,
      phone: "11996851761",
      insType: 1,
      insNumber: "90245391023",
      parentName: null,
      parentPhone: null,
    },
    {
      id: 5,
      user: 0,
      name: "Joaquim Isaac Carlos Barbosa",
      regId: "61672411718",
      birthDate: "1995-04-01",
      gender: 0,
      phone: "28993248008",
      insType: 0,
      insNumber: null,
      parentName: null,
      parentPhone: null,
    },
    {
      id: 6,
      user: 0,
      name: "Isabella Peixoto",
      regId: "70558161065",
      birthDate: "1978-04-05",
      gender: 1,
      phone: "92995669785",
      insType: 0,
      insNumber: null,
      parentName: null,
      parentPhone: null,
    },
    {
      id: 7,
      user: 1,
      name: "Renato Silva",
      regId: "70032554214",
      birthDate: "1954-01-24",
      gender: 0,
      phone: "83991041636",
      insType: 0,
      insNumber: null,
      parentName: null,
      parentPhone: null,

    },
    {
      id: 8,
      user: 0,
      name: "Rayssa Gabrielly Letícia Santos",
      regId: "55905000280",
      birthDate: "1965-01-16",
      gender: 1,
      phone: "47995367285",
      insType: 1,
      insNumber: "98003593201",
      parentName: null,
      parentPhone: null,
    },
    {
      id: 9,
      user: 0,
      name: "José Renato Oliver Alves",
      regId: "57707658442",
      birthDate: "2010-04-02",
      gender: 0,
      phone: "61985917639",
      insType: 1,
      insNumber: "54329069705",
      parentName: "Maria Oliver Alves",
    },
    {
      id: 10,
      user: 0,
      name: "Isadora Jennifer Adriana Bernardes",
      regId: "61379022509",
      birthDate: "1946-03-10",
      phone: "67996546297",
      insType: 1,
      insNumber: "12305932892",
      parentName: null,
      parentPhone: null,
    },
    {
      id: 11,
      user: 1,
      name: "Heitor Daniel Fogaça",
      regId: "99748217620",
      birthDate: "1950-04-06",
      gender: 0,
      phone: "47999745405",
      insType: 2,
      insNumber: "94034911234",
      parentName: null,
      parentPhone: null,
    },
    {
      id: 12,
      user: 1,
      name: "Luan Nicolas Gael Freitas",
      regId: "36935542189",
      birthDate: "1997-01-05",
      gender: 0,
      phone: "51999466394",
      insType: 0,
      insNumber: null,
      parentName: null,
      parentPhone: null,
    },
    {
      id: 13,
      user: 0,
      name: "Carlos Eduardo Lima",
      regId: "30934435049",
      birthDate: "1965-01-04",
      gender: 0,
      phone: "68983648473",
      insType: 0,
      insNumber: null,
      parentName: null,
      parentPhone: null,
    },
    {
      id: 14,
      user: 1,
      name: "Francisco Bento Murilo",
      regId: "86355904220",
      birthDate: "1975-03-09",
      gender: 0,
      phone: "71992904448",
      insType: 1,
      insNumber: "44060790543",
      parentName: null,
      parentPhone: null,
    },
    {
      id: 15,
      user: 0,
      name: "Jennifer Luna Melo",
      regId: "37007260667",
      birthDate: "1949-03-21",
      gender: 1,
      phone: "67996226492",
      insType: 2,
      insNumber: "44930291842",
      parentName: null,
      parentPhone: null,
    },
    {
      id: 16,
      user: 1,
      name: "Pietra Giovanna Rezende",
      regId: "88251906385",
      birthDate: "1961-04-03",
      gender: 1,
      phone: "68986833762",
      insType: 2,
      insNumber: "44935049302",
      parentName: null,
      parentPhone: null,
    },
    {
      id: 17,
      user: 0,
      name: "Elisa Stefany da Silva",
      regId: "28432366900",
      birthDate: "1956-01-12",
      gender: 1,
      phone: "92986674291",
      insType: 0,
      insNumber: null,
      parentName: null,
      parentPhone: null,
    },
    {
      id: 18,
      user: 0,
      name: "Mariana Carla Malu Viana",
      regId: "87665256163",
      birthDate: "1972-04-04",
      gender: 1,
      phone: "63985574736",
      insType: 0,
      insNumber: null,
      parentName: null,
      parentPhone: null,
    },
    {
      id: 19,
      user: 1,
      name: "Caio Arthur Fernandes",
      regId: "69315820541",
      birthDate: "2009-04-05",
      gender: 0,
      phone: "67981187195",
      insType: 0,
      insNumber: null,
      parentName: null,

      parentName: "Caio Silva Fernandes",
    },
    {
      id: 20,
      user: 0,
      name: "Olivia Mariana Carolina das Neves",
      regId: "12877709329",
      birthDate: "1950-04-04",
      gender: 1,
      phone: "63995815193",
      insType: 2,
      insNumber: "90553221910",
      parentName: null,
      parentPhone: null,
    },
    {
      id: 21,
      user: 1,
      name: "Renan José Noah Almeida",
      regId: "97512605749",
      birthDate: "1989-01-11",
      gender: 0,
      phone: "41985830273",
      insType: 0,
      insNumber: null,
      parentName: null,
      parentPhone: null,
    },
    {
      id: 22,
      user: 0,
      name: "Leandro Guilherme Barros",
      regId: "79022158993",
      birthDate: "1988-04-01",
      gender: 0,
      phone: "84981237112",
      insType: 1,
      insNumber: "11235070954",
      parentName: null,
      parentPhone: null,
    },
    {
      id: 23,
      user: 0,
      name: "Malu Galvão",
      regId: "60285596527",
      birthDate: "1993-02-18",
      gender: 1,
      phone: "68999392195",
      insType: 1,
      insNumber: "11240695034",
      parentName: null,
      parentPhone: null,
    },
    {
      id: 24,
      user: 0,
      name: "Jennifer Bruna Oliveira",
      regId: "86113425770",
      birthDate: "1986-02-09",
      gender: 1,
      phone: "98994861155",
      insType: 0,
      insNumber: null,
      parentName: null,
      parentPhone: null,
    },
    {
      id: 25,
      user: 0,
      name: "Luan Henrique Gabriel Teixeira",
      regId: "92078288390",
      birthDate: "1998-04-01",
      gender: 0,
      phone: "63996890937",
      insType: 2,
      insNumber: "99857300921",
      parentName: null,
      parentPhone: null,
    },
    {
      id: 26,
      user: 0,
      name: "Igor Breno Anderson Nascimento",
      regId: "91109040857",
      birthDate: "1965-04-06",
      gender: 0,
      phone: "68995364144",
      insType: 0,
      insNumber: 2,
      parentName: "11234799654",
      parentPhone: null,
    },
    {
      id: 27,
      user: 0,
      name: "Elias Diogo Mendes",
      regId: "75284928504",
      birthDate: "1991-03-12",
      gender: 0,
      phone: "83996744207",
      insType: 1,
      insNumber: "09824956003",
      parentName: null,
      parentPhone: null,
    },
    {
      id: 28,
      user: 0,
      name: "Enzo Rodrigo Costa",
      regId: "19308562451",
      birthDate: "1989-03-09",
      gender: 0,
      phone: "48986587224",
      insType: 0,
      insNumber: null,
      parentName: null,
      parentPhone: null,
    },
    {
      id: 29,
      user: 0,
      name: "Victor Alexandre Nunes",
      regId: "20426347862",
      birthDate: "1993-04-06",
      gender: 0,
      phone: "69994516788",
      insType: 0,
      insNumber: null,
      parentName: null,
      parentPhone: null,
    },
    {
      id: 30,
      user: 0,
      name: "João da Silva",
      regId: "22355726000",
      birthDate: "1990-07-20",
      gender: 0,
      phone: "12343567543",
      insType: 0,
      insNumber: null,
      parentName: null,
      parentPhone: null,
    },
    {
      id: 31,
      user: 0,
      name: "Maria da Silva",
      regId: "34816499083",
      birthDate: "2022-03-26",
      gender: 1,
      phone: "11222223333",
      insType: 1,
      insNumber: "44444444444",
      parentName: "João da Silva",
      parentPhone: "12343567543",
    },
    {
      id: 32,
      user: 0,
      name: "Jorge Luiz",
      regId: "13959133073",
      birthDate: "2004-02-01",
      gender: 1,
      phone: "98045678392",
      insType: 2,
      insNumber: "79503958692",
      parentName: null,
      parentPhone: null,
    },
    {
      id: 33,
      user: 0,
      name: "Arthur Malarca",
      regId: "04045956000",
      birthDate: "2000-06-22",
      gender: 2,
      phone: "84932109562",
      insType: 0,
      insNumber: null,
      parentName: null,
      parentPhone: null,
    },
    {
      id: 34,
      user: 0,
      name: "José Gonçalves",
      regId: "67973155066",
      birthDate: "2018-04-03",
      gender: 1,
      phone: "45920194506",
      insType: 1,
      insNumber: "596032104321",
      parentName: "Joana Gonçalves",
      parentPhone: "45920194506",
    },
    {
      id: 35,
      user: 0,
      name: "Karla Maria",
      regId: "36162265030",
      birthDate: "1980-08-23",
      gender: 2,
      phone: "59864032123",
      insType: 0,
      insNumber: null,
      parentName: null,
      parentPhone: null,
    },
    {
      id: 36,
      user: 0,
      name: "Joaquim Ramos",
      regId: "30962275000",
      birthDate: "1976-04-30",
      gender: 1,
      phone: "90245645499",
      insType: 0,
      insNumber: null,
      parentName: null,
      parentPhone: null,
    },
    {
      id: 37,
      user: 0,
      name: "Consuelo Paula",
      regId: "02040463003",
      birthDate: "1999-04-13",
      gender: 2,
      phone: "54327886500",
      insType: 2,
      insNumber: "12589076544",
      parentName: null,
      parentPhone: null,
    },
    {
      id: 38,
      user: 0,
      name: "Felipe Rosa",
      regId: "96190912052",
      birthDate: "2002-10-30",
      gender: 1,
      phone: "778954321065",
      insType: 0,
      insNumber: null,
      parentName: null,
      parentPhone: null,
    },
    {
      id: 39,
      user: 0,
      name: "Carolina Gomes",
      regId: "64442230080",
      birthDate: "2002-10-30",
      gender: 1,
      phone: "11674407532",
      insType: 0,
      insNumber: null,
      parentName: null,
      parentPhone: null,
    },
    {
      id: 40,
      user: 0,
      name: "Kauê Elias da Luz",
      regId: "14515828037",
      birthDate: "1962-03-03",
      gender: 0,
      phone: "68991595953",
      insType: 0,
      insNumber: null,
      parentName: null,
      parentPhone: null,
    },
  ]);



  function idFinder(list) {
    const idList = list.map((x) => x.id);
    idList.sort((a, b) => a > b);

    let expected = 0;
    for (let i = 0; i < idList.length; i++) {
      if (expected !== idList[i]) return expected;
      else expected++;
    }
    return idList.length;
  }

  function formatPhone(phone) {
    if (phone.length === 11) {
      return `(${phone.substring(0, 2)}) ${phone.substring(2, 7)}-${phone.substring(7)}`;
    }
    if (phone.length === 10) {
      return `(${phone.substring(0, 2)}) 9${phone.substring(2, 7)}-${phone.substring(7)}`;
    }
    return phone;
  }

  function formatRegId(regId) {
    if (regId.length === 11)
      return `${regId.substring(0,3)}.${regId.substring(3,6)}.${regId.substring(6,9)}-${regId.substring(9)}`;
    return regId;
  }

  function showNotification(message, type, caption) {
    Notify.create({
      message,
      type,
      caption,
    });
  }

  //#region Date utilities
  function isValidDate(string) {
    const dt = DateTime.fromFormat(string, "yyyy-LL-dd");
    return dt.isValid;
  }

  function dateISOToLocale(date) {
    const dt = DateTime.fromFormat(date, "yyyy-LL-dd");
    return dt.isValid ? dt.toFormat("dd/LL/yyyy") : date;
  }

  function dateLocaleToISO(date) {
    const dt = DateTime.fromFormat(date, "dd/LL/yyyy");
    return dt.isValid ? dt.toISODate() : date;
  }
  //#endregion

  //#region Users mock-API
  function getCurrentUser() {
    const result = users.value.find(x => x.id == currentUserId.value);
    return result === undefined ? { status: "400" } : { status: "200", response: result };
  }

  function setCurrentUser(id) {
    const result = users.value.find(x => x.id == id);

    if (result === undefined) return { status: "400" };

    currentUserId.value = id;
    return { status: "200", response: result };
  }

  function getUsers(args) {
    if (args && args.id !== undefined) {
      const result = users.value.find(x => x.id == args.id);
      return result === undefined ? { status: "400" } : { status: "200", response: result };
    }

    return { status: "200", response: JSON.parse(JSON.stringify(users.value)) };
  }

  function postUser(user) {
    const id = idFinder(users.value);
    const userCopy = { ...user, id };

    users.value.push(userCopy);
    return { status: "200", response: JSON.parse(JSON.stringify(userCopy)) };
  }

  function putUser(id, user) {
    const userCopy = { ...user, id };
    const oldUser = users.value.find(x => x.id == id);

    if (oldUser === undefined) {
      users.value.push(userCopy);
      return { status: "200", response: JSON.parse(JSON.stringify(userCopy)) };
    }

    oldUser = Object.assign(oldUser, userCopy);
    return { status: "200", response: JSON.parse(JSON.stringify(userCopy)) };
  }

  function deleteUser(id) {
    const index = users.value.findIndex(x => x.id == id);

    if (index < 0) return { status: "400" };

    users.value.splice(index, 1);

    patients.value = patients.value.filter(x => x.user != id);
    appointments.value = appointments.value.filter(x => x.user != id);

    return { status: "200" };
  }

  //#endregion

  //#region Patients mock-API
  function getPatients(args) {
    if (args.id !== undefined) {
      const result = patients.value.find((x) => x.id == args.id);

      if (result.user != currentUserId.value) return { status: "403" };
      if (result === undefined) return { status: "404" };
      const resultCopy = JSON.parse(JSON.stringify(result));

      const resultAppointments = appointments.value.filter(x =>
        x.user == currentUserId.value && x.patientId == result.id);
      resultAppointments.sort((a, b) => {
        const dt1 = DateTime.fromFormat(a.date, "yyyy-LL-dd");
        const dt2 = DateTime.fromFormat(b.date, "yyyy-LL-dd");

        if (dt1 < dt2) return 1;
        else return -1;
      });

      if (args.appointments) {
        resultCopy.appointments = resultAppointments;
      }
      return { status: "200", response: resultCopy };
    }

    const result = args.query
      ? patients.value.filter(x =>
        x.user == currentUserId.value && x.name.toLowerCase().includes(args.query.toLowerCase()))
      : patients.value.filter(x => x.user == currentUserId.value);

    const count = result.length;

    const sortBy = args.sortBy || "name";
    const descending = args.descending === undefined ? false : args.descending;

    if (descending) result.sort((a, b) => a[sortBy].toLowerCase() < b[sortBy].toLowerCase());
    else result.sort((a, b) => a[sortBy].toLowerCase() > b[sortBy].toLowerCase());

    const today = DateTime.now();

    if (args.rowsPerPage > 0) {
      const page = args.page || 1;
      const pageResults = result.slice((page - 1) * args.rowsPerPage, Math.min(args.rowsPerPage * page), result.length);

      pageResults.forEach((patient) => {
        const pastAppointments  = appointments.value.filter(x => {
          if (x.user != currentUserId.value) return false;
          if (x.patientId != patient.id) return false;

          const dt = DateTime.fromFormat(`${x.date} ${x.time}`, "yyyy-LL-dd HH:mm");
          if (today.diff(dt, "hours").hours >= 0) return true;
          return false;
        });

        pastAppointments.sort((a, b) => {
          const dt1 = DateTime.fromFormat(a.date, "yyyy-LL-dd");
          const dt2 = DateTime.fromFormat(b.date, "yyyy-LL-dd");

          if (dt1 < dt2) return 1;
          else return -1;
        });

        patient.lastAppoint = pastAppointments.length > 0 ? pastAppointments[0].date : null;
      });

      return { status: "200", response: pageResults, rowCount: count };
    }

    result.forEach((patient) => {
      const pastAppointments  = appointments.value.filter(x => {
        if (x.user != currentUserId.value) return false;
        if (x.patientId != patient.id) return false;

        const dt = DateTime.fromFormat(`${x.date} ${x.time}`, "yyyy-LL-dd HH:mm");

        if (today.diff(dt, "hours").hours < 0) return false;
        return true;
      });

      pastAppointments.sort((a, b) => {
        const dt1 = DateTime.fromFormat(a.date, "yyyy-LL-dd");
        const dt2 = DateTime.fromFormat(b.date, "yyyy-LL-dd");

        if (dt1 < dt2) return 1;
        else return -1;
      });

      patient.lastAppoint = pastAppointments.length > 0 ? pastAppointments[0].date : null;
    });

    return { status: "200", response: result, rowCount: count };
  }

  function postPatient(patient) {
    const id = idFinder(patients.value);
    const patientCopy = { ...patient, id, user: currentUserId };

    patients.value.push(patientCopy);
    return { status: "200", response: JSON.parse(JSON.stringify(patientCopy)) };
  }

  function putPatient(id, patient) {
    const patientCopy = { ...patient, id };

    let oldPatient = patients.value.find((x) => x.id == id);
    if (oldPatient !== undefined && oldPatient.user != currentUserId.value) return { status: "403" };

    if (oldPatient === undefined) {
      patients.value.push(patientCopy);
      return { status: "200", response: JSON.parse(JSON.stringify(patientCopy)) };
    }

    oldPatient = Object.assign(oldPatient, patientCopy);

    appointments.value.forEach((app) => {
      if (app.user == currentUserId.value && app.patientId == id)
        app.title = patientCopy.name;
    });

    return { status: "200", response: JSON.parse(JSON.stringify(patientCopy)) };
  }

  function deletePatient(id) {
    const index = patients.value.findIndex((x) => x.id == id);

    if (patients.value[index].user != currentUserId.value) return { status: "403" };
    if (index < 0) return { status: "404" };

    patients.value.splice(index, 1);
    appointments.value.forEach((appointment) => {
      if (appointment.patientId == id) appointment.patientId = null;
    });

    return { status: "200" };
  }
  //#endregion

  //#region Appointments mock-API
  function getAppointments(args) {
    if (args.id != undefined) {
      const result = appointments.value.find((x) => x.id == args.id);
      if (result.user != currentUserId.value) return { status: "403" };
      return result === undefined ? { status: "404" } : { status: "200", response: result };
    }

    if (args.start != undefined && args.end != undefined) {
      const dtStart = DateTime.fromFormat(args.start, "yyyy-LL-dd");
      const dtEnd = DateTime.fromFormat(args.end, "yyyy-LL-dd");

      if (!dtStart.isValid || !dtEnd.isValid) return { status: "400" };

      const result = appointments.value.filter((appointment) => {
        if (appointment.user != currentUserId.value) return false;
        const dtAppointment = DateTime.fromFormat(appointment.date, "yyyy-LL-dd");

        return dtAppointment >= dtStart && dtAppointment <= dtEnd;
      });
      return { status: "200", response: result };
    }

    if (args.start != undefined && args.end === undefined) {
      if (!isValidDate(args.start)) return { status: "400" };
      const result = appointments.value.filter((appointment) =>
        appointment.user == currentUserId.value && appointment.date == args.start);
      return { status: "200", response: result };
    }

    else if (args.query) {
      const result = appointments.value.filter((appointment) =>
        appointment.user == currentUserId.value &&
        appointment.title.toLowerCase().includes(args.query.toLowerCase().trim()));
      return { status: "200", response: result };
    }

    else if (args.patient) {
      const result = appointments.value.filter((appointment) =>
        appointment.user == currentUserId.value && appointment.patientId == args.patient);
      return { status: "200", response: result };
    }

    return { status: "200", response: [] }
  }

  function postAppointment(appointment) {
    const id = idFinder(appointments.value);
    const appointmentCopy = { ...appointment, id, status: 0, user: currentUserId.value };

    if (appointment.hasPatient) {
      const patient = patients.value.find(x => x.user == currentUserId.value && x.id == appointment.patientId);
      appointmentCopy.title = patient ? patient.name : "(cadastro inválido)";
    }

    appointments.value.push(appointmentCopy);
    return { status: "200", response: JSON.parse(JSON.stringify(appointmentCopy)) };
  }

  function putAppointment(id, appointment) {
    const appointmentCopy = JSON.parse(JSON.stringify(appointment));
    appointmentCopy.id = id;
    appointmentCopy.status = appointmentCopy.status === undefined ? 0 : appointmentCopy.status;

    if (appointment.hasPatient) {
      const patient = patients.value.find(x => x.id = appointment.patientId);
      appointmentCopy.title = patient ? patient.name : "(cadastro inválido)";
    }

    const oldAppointment = appointments.value.findIndex((x) => x.id == id);
    if (appointments.value[oldAppointment].user != currentUserId.value) return { status: "403" };
    if (oldAppointment < 0) {
      appointments.value.push({ appointmentCopy });
      return { status: "200", response: JSON.parse(JSON.stringify(appointmentCopy)) };
    } else {
      appointments.value[oldAppointment] = appointmentCopy;
      return { status: "200", response: JSON.parse(JSON.stringify(appointmentCopy)) };
    }
  }

  function deleteAppointment(id) {
    const index = appointments.value.findIndex((x) => x.id == id);
    if (appointments.value[index].user != currentUserId.value) return { status: "403" };
    if (index < 0) return { status: "404" };
    else {
      appointments.value.splice(index, 1);
      return { status: "200" };
    }
  }
  //#endregion

  return {
    currentUserId,
    currentDate,

    isValidDate,
    dateISOToLocale,
    dateLocaleToISO,

    showNotification,
    formatPhone,
    formatRegId,

    getCurrentUser,
    setCurrentUser,
    getUsers,
    postUser,
    putUser,
    deleteUser,

    getPatients,
    postPatient,
    putPatient,
    deletePatient,

    getAppointments,
    postAppointment,
    putAppointment,
    deleteAppointment,
  };
});
