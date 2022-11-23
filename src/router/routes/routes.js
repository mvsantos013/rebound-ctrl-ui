export default [
  {
    path: '/lab/test-types',
    name: 'lab-test-types',
    component: () => import('@/pages/lab/test-types.vue'),
    meta: { requiresAuth: true },
  },
]
