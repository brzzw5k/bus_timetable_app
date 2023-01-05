<template>
    <div id="timetable">
        <div class="select-bus-stop" v-if="bus_stops">
            <div class="form-group">
              <label for="bus_stop">Select a bus stop</label>
              <select id="bus_stop" v-on:change="getDelays($event.target.value.toString())">
                <option v-for="bus_stop in bus_stops" :key="bus_stop.id" :value="bus_stop.id">
                  {{ bus_stop.name }}
                </option>
              </select>
              <input v-if=isLoggedIn() type="submit" value="Bookmark" v-on:click="addBusStopBookmark()" />
            </div>
            <div v-if=isLoggedIn()>
              <div v-if="bookmarkedBusStops.length > 0">
                <h2>Bookmarked Bus Stops</h2>
                  <div class="bookmarked-bus-stops" v-for="busStop in bookmarkedBusStops" :key="busStop.id" :value="busStop.id">
                    <a :class="{bold: busStop.name === lastBusStopName}" v-on:click="getDelays(busStop.id.toString())"> {{ busStop.name }} </a>
                  </div>
              </div>
              <div v-if="lastBusStopName.length > 0">
                <div class="remove-bookmark" v-if="this.bookmarkedBusStops.map(busStop => { return busStop.name }).includes(this.lastBusStopName)">
                  <a v-on:click="removeBusStopBookmark()"> Remove bookmark </a>
                </div>
              </div>
            </div>
          </div>
        <BusArrivals :busStopId.sync="lastBusStopId" :busses.sync="busses" />
    </div>
</template>

<script>
import BusArrivals from './BusArrivals'
import 'vue-resource'
import { BACKEND_URL, BUS_STOP_SERVICE_DELAYS_URL } from '../config'
import { isLoggedIn } from '../util'

export default {
  name: 'Timetable',
  data () {
    return {
      bus_stops: [],
      lastBusStopId: '0',
      lastBusStopName: '',
      busses: [],
      bookmarkedBusStops: []
    }
  },
  mounted () {
    this.$http
      .get(BACKEND_URL + '/api/bus_stops')
      .then(response => {
        this.bus_stops = response.data
        if (this.bus_stops.length > 0) {
          this.lastBusStopId = this.bus_stops[0].id.toString()
        }
      })
    if (this.isLoggedIn()) {
      this.getBookmarkedBusStops()
    }
  },
  methods: {
    isLoggedIn,
    getDelays (busStopId) {
      this.$http
        .get(BUS_STOP_SERVICE_DELAYS_URL(busStopId))
        .then(response => {
          this.busses = response.data.delay.map(bus => {
            return {
              headsign: bus.headsign,
              theoreticalTime: bus.theoreticalTime,
              delayInSeconds: bus.delayInSeconds,
              estimatedTime: bus.estimatedTime
            }
          })
          this.lastBusStopId = busStopId
          this.lastBusStopName = this.bus_stops.find(busStop => busStop.id.toString() === busStopId).name
          this.$emit('update:busStopId', this.lastBusStopId)
          this.$emit('update:busses', this.busses)
        })
    },
    getBookmarkedBusStops () {
      this.$http
        .get(BACKEND_URL + '/api/bus_stops/' + localStorage.getItem('username'), {
          params: {
            token: localStorage.getItem('token')
          }
        })
        .then(response => {
          this.bookmarkedBusStops = response.data
        })
    },
    addBusStopBookmark () {
      this.$http
        .post(BACKEND_URL + '/api/bus_stops/' + localStorage.getItem('username') + '/add/' + this.lastBusStopId, {
          token: localStorage.getItem('token')
        })
        .then(response => {
          this.bookmarkedBusStops = response.data
        })
    },
    removeBusStopBookmark () {
      this.$http
        .post(BACKEND_URL + '/api/bus_stops/' + localStorage.getItem('username') + '/delete/' + this.lastBusStopId, {
          token: localStorage.getItem('token')
        })
        .then(response => {
          this.bookmarkedBusStops = response.data
        })
    }
  },
  components: {
    BusArrivals
  }
}
</script>

<style>
.bookmarked-bus-stops {
  padding: 1em;
  display: inline-block;
}

.remove-bookmark {
  padding: 1em;
}

.form-group {
  margin: 1em;
}

.bold {
  font-weight: bold;
  font-size: larger;
}
</style>
