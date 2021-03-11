<template>
  <div class="users-item">
    <div class="users-item__content">
      <h3 class="users-item__name">
        {{ name }}
      </h3>
      <span>
        {{ score }} pts
      </span>
    </div>
    <button
      @click="remove"
      class="users-item__remove material-icons">
      remove_circle_outline
    </button>
  </div>
</template>

<script>
export default {
  name: "ClientsItem",
  props: {
    id: { type: String, default: null },
    name: { type: String, default: null },
    score: { type: Number, default: null }
  },
  methods: {
    remove() {
      this.$store.commit('removeUser', this.id);
    }
  }
}
</script>

<style lang="scss">
.users-item {
  $root: &;
  display: flex;
  align-items: center;
  padding: 1rem;
  border-radius: var(--border-radius);

  &__content {
    flex-grow: 1;
  }

  &__name {
    font-weight: 600;
    font-size: 1rem;
    margin-bottom: 0.25rem;
  }

  &__remove {
    @include icon(s);
    margin-left: 1rem;
    display: none;
    cursor: pointer;
    color: var(--grey-light);

    &:hover {
      color: var(--black);
    }
  }

  &:hover {
    background-color: var(--grey-pale);
    #{$root}__remove {
      display: block;
    }
  }
}
</style>
