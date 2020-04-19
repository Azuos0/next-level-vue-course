<template>
  <div>
    <h1>Events for {{ user.user.name }}</h1>
    <event-card
      v-for="event in event.events"
      :key="event.id"
      :event="event"
    ></event-card>
    <router-link
      v-show="page != 1"
      :to="{ name: 'event-list', query: { page: page - 1 } }"
      rel="previous"
      >Prev Page</router-link
    >
    <template v-show="hasNextPage"> | </template>
    <router-link
      v-show="hasNextPage"
      :to="{ name: 'event-list', query: { page: page + 1 } }"
      rel="next"
      >Next Page</router-link
    >
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue';
import { mapState } from 'vuex';
import store from '@/store/index';

function getPageEvents(routeTo, next) {
  const currentPage = parseInt(routeTo.query.page) || 1;
  store.dispatch('event/fetchEvents', { page: currentPage }).then(() => {
    routeTo.params.page = currentPage;
    next();
  });
}

export default {
  props: {
    page: {
      type: Number,
      required: true,
    },
  },
  components: {
    EventCard,
  },
  beforeRouteEnter(to, from, next) {
    getPageEvents(to, next);
  },
  beforeRouteUpdate(to, from, next) {
    getPageEvents(to, next);
  },
  computed: {
    hasNextPage() {
      return this.event.eventsTotal > this.page * this.event.perPage;
    },
    ...mapState(['event', 'user']),
  },
};
</script>

<style lang="scss" scoped></style>
