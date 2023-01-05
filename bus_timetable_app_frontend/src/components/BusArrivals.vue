<template>
    <div>
        <vue-good-table :columns="columns" :rows="rows" />
    </div>
</template>

<script>
export default {
  name: 'BusArrivals',
  props: {
    busStopId: {
      type: String,
      required: true
    },
    busses: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      columns: [
      ],
      rows: busses
    }
  }
}

</script>
