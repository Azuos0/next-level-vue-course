import Vue from 'vue';
import VueRouter from 'vue-router';
import EventShow from '@/views/EventShow.vue';
import EventCreate from '@/views/EventCreate.vue';
import EventList from '@/views/EventList';
import NotFound from '@/views/NotFound.vue';
import NetworkIssue from '@/views/NetworkIssue.vue';
import NProgress from 'nprogress';
import store from '@/store/index';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'event-list',
    component: EventList,
    props: true,
  },
  {
    path: '/event/:id',
    name: 'event-show',
    component: EventShow,
    props: true,
    beforeEnter: (to, from, next) => {
      store
        .dispatch('event/fetchEvent', to.params.id)
        .then((event) => {
          to.params.event = event;
          next();
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            next({ name: '404', params: { resource: 'event' } });
          } else {
            next({ name: 'network-issue' });
          }
        });
    },
  },
  {
    path: '/event/create',
    name: 'event-create',
    component: EventCreate,
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
    props: (route) => ({ resource: route.params.resource || 'page' }),
  },
  {
    path: '/network-issue',
    name: 'network-issue',
    component: NetworkIssue,
  },
  {
    path: '*',
    redirect: { name: '404', params: { resource: 'page' } },
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
