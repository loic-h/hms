<template>
  <div>
    {{ name }} – {{ artists.join(', ') }}
  </div>
</template>

<script>
export default {
  name: 'Track',
  props: {
    id: { type: String, default: null },
    name: { type: String, default: null },
    artists: { type: Array, default: () => [] },
    preview: { type: String, default: null }
  }
};
</script>
