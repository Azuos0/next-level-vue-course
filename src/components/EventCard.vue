<template>
  <router-link
    class="event-link"
    :to="{ name: 'event-show', params: { id: event.id } }"
  >
    <div class="event-card -shadow">
      <span class="eyebrow">@{{ event.time }} on {{ event.date | date }}</span>
      <h4 class="title">{{ event.title }}</h4>
      <div class="container">
        <BaseIcon name="users" width="24" height="24">
          {{ event.attendees.length }} attending
        </BaseIcon>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'event-card',
  props: {
    event: {
      type: Object,
      required: true, 
    },
  },
};
</script>

<style lang="scss" scoped>
.event-card {
  padding: 20px;
  margin-bottom: 24px;
  transition: all 0.2s linear;
  cursor: pointer;
}
.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
}
.event-card > .title {
  margin: 0;
}

.event-link {
  color: black;
  text-decoration: none;
  font-weight: 100;
}
.container {
  display: flex;
  align-items: center;
  justify-items: center;
}
</style>
