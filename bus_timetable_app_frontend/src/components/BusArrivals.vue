<template>
    <div>
        <vue-good-table :columns="columns" :rows="busses"/>
    </div>
</template>

<script>
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table'

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
        {
          label: 'Destination',
          name: 'headsign',
          field: 'headsign'
        },
        {
          label: 'Shceduled Time',
          name: 'theoreticalTime',
          field: 'theoreticalTime'
        },
        {
          label: 'Delay',
          name: 'delayInSeconds',
          field: 'delayInSeconds'
        },
        {
          label: 'Estimated Time',
          name: 'estimatedTime',
          field: 'estimatedTime'
        }
      ]
    }
  },
  components: {
    VueGoodTable
  }
}

</script>
