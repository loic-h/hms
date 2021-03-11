import Hammer from "hammerjs";

export default {
  swipe: {
    beforeMount(el, binding) {
      el.mc = new Hammer(el);
      el.mc.on("swipe", e => binding.value(e));
    },
    unmounted(el) {
      el.mc.destroy();
    }
  },
  'swipe-left': {
    beforeMount(el, binding) {
      el.mc = new Hammer(el);
      el.mc.on("swipeleft", e => binding.value(e));
    },
    unmounted(el) {
      el.mc.destroy();
    }
  },
  'swipe-right': {
    beforeMount(el, binding) {
      el.mc = new Hammer(el);
      el.mc.on("swiperight", e => binding.value(e));
    },
    unmounted(el) {
      el.mc.destroy();
    }
  }
};
