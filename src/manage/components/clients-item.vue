<template>
  <div>
    {{ name }}
  </div>
</template>

<script>
export default {
  name: "ClientsItem",
  props: {
    id: { type: String, default: null },
    name: { type: String, default: null }
  }
}
</script>
