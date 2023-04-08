
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'appointments', path: '', component: () => import('pages/AppointmentsPage.vue')},
      { name: 'patients', path: '/patients', component: () => import('pages/PatientsPage.vue')},

    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
