<template>
    <div id="timetable">
    <h1>Timetable</h1>
        <div v-if="bus_stops">
            <div class="form-group">
            <label for="bus_stop">Bus Stop</label>
                <select id="bus_stop" v-on:click="getDelays($event.target.value)">
                <option v-for="bus_stop in bus_stops" :key="bus_stop.id" :value="bus_stop.id">
                    {{ bus_stop.name }}
                </option>
            </select>
            <input v-if=isLoggedIn() type="submit" value="Bookmark" v-on:click="addBusStopBookmark()" />
            </div>
            <BusArrivals :busStopId="lastBusStopId" :busses="busses" />
            <div v-if=isLoggedIn()>
            </div>
        </div>
    </div>
</template>

<script>
import BusArrivals from './BusArrivals'

import axios from 'axios'
import { BACKEND_URL, BUS_STOP_SERVICE_DELAYS_URL } from '../config'
import { isLoggedIn } from '../util'

export default {
  name: 'Timetable',
  data () {
    return {
      bus_stops: [],
      lastBusStopId: '0',
      busses: []
    }
  },
  mounted () {
    axios
      .get(BACKEND_URL + '/api/bus_stops')
      .then(response => {
        this.bus_stops = response.data
        if (this.bus_stops.length > 0) {
          this.lastBusStopId = this.bus_stops[0].id.toString()
        }
      })
  },
  methods: {
    isLoggedIn,
    getDelays (busStopId) {
      axios
        .get(BUS_STOP_SERVICE_DELAYS_URL(busStopId))
        .then(response => {
          this.busses = response.data.delay
          this.lastBusStopId = busStopId
        })
    },
    addBusStopBookmark () {
      console.log('AddBusStopBookmark called with busStopId: ' + this.lastBusStopId)
      axios
        .post(BACKEND_URL + '/api/bus_stops/' + localStorage.getItem('username') + '/add/' + this.lastBusStopId, {
          token: localStorage.getItem('token')
        })
        .then(response => {
          console.log(response)
        })
    },
    removeBusStopBookmark () {
      axios
        .post(BACKEND_URL + '/api/bus_stops/' + localStorage.getItem('username') + '/delete/' + this.lastBusStopId, {
          token: localStorage.getItem('token')
        })
        .then(response => {
          console.log(response)
        })
    }
  },
  components: {
    BusArrivals
  }
}
</script>

<style>
.busses-table {
  border-collapse: collapse;
  margin: auto;
}
.busses-table th, .busses-table td {
  padding: 10px;
}
</style>
