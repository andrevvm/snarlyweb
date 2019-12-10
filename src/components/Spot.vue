<template>
  
  <section v-if="loaded">
    <div class="spot" v-if="spot">

      <h1>{{ spot.title }}</h1>
      <h2>{{ spot.locDisp }}</h2>
      
      <div class="spot-photo">
        <img :src="spotPhoto" />
      </div>

      <p>
        {{ spot.notes }}
      </p>
      
      <p>
        <a :href="spotLocation" target="_blank">Open map</a>
      </p>
      <p>
        <a href="https://itunes.apple.com/us/app/snarly/id1009352476?ls=1&mt=8" class="appstore">
            <img src="../assets/images/appstore.png" width="136" />
        </a><br/>
        <small>snarly is an app for skaters</small>
      </p>

    </div>
    <div v-else>
      Spot not found
    </div>

  </section>
  <section class="loading" v-else>
    <p>Loading&hellip;</p>
  </section>

</template>

<style scoped lang="scss">
  .spot {
    display: flex;
    flex-direction: column;
  }

  h1 {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 0em;
    margin-top: 0;
  }
  h2, p {
    margin-top: 0.5em;
    font-size: 14px;
    font-weight: 500;
  }

  .spot-photo img {
    height: 50vh;
    width: 50vh;
    object-fit: cover;
    background: #fff;
  }

  .appstore {
    margin-top: 20px;
    width: 100%;
  }

  small {
    font-size: 12px;
    color: #666;
  }
</style>

<script>

import { isMobile } from 'mobile-device-detect';

var Parse = require('parse');
Parse.initialize("iuAEYOprPqDnC45lCQSlJRw096uacXs1dTbYwpOc", "UyK5YcAPUxuvAMpwC99uCBIYEQly1mAnGZUgJtRo");
Parse.serverURL="https://pg-app-nxoq07r75ee2095y0ee0fx9k1fwjzc.scalabl.cloud/1/";

export default {
  name: 'Spot',
  data () {
    return {
      title: null,
      spot: {
        title: null,
        locDisp: null,
        photo: null,
        notes: null,
        location: null
      },
      loaded: false
    }
  },
  head: {
    // To use "this" in the component, it is necessary to return the object through a function
    title: function () {
      return {
        inner: this.title
      }
    },
    meta: function () {
      return [
        { property: 'og:title', content: this.title },
        { property: 'og:description', content: this.spot.notes },
        { property: 'og:image', content: this.spotPhoto }
      ]
    }
  },
  computed: {
    spotTitle() {
      return this.spot.title
    },
    spotPhoto() {
      let photo = this.spot.photo
      if(!photo)
        return false
      let cloudinary = 'https://res.cloudinary.com/snarly/image/fetch/w_'+ 750 +',h_'+ 870 +',c_fit,f_auto/' + photo._url

      return cloudinary;
    },
    spotLocation() {
      let location = this.spot.location
      if(isMobile.isIOS) {
        return 'maps://?q='+location._latitude+','+location._longitude;
      } else if (isMobile.isAndroid) {
        return 'geo:0,0?q='+location._latitude+','+location._longitude + '('+ this.spot.get('title') +')';
      } else {
        return 'https://www.google.com/maps/search/?api=1&query='+location._latitude+','+location._longitude;
      }
    }
  },
  methods: {
    getAsyncData: function () {
      this.$emit('updateHead')
    },
    setupSpot(spot) {
      this.spot.title = spot.get("title");
      this.spot.photo = spot.get("photo");
      this.spot.location = spot.get("location");
      this.spot.locDisp = spot.get("loc_disp");
      this.spot.notes = spot.get("notes");

      this.$emit('updateHead')
      this.$nextTick(window.prerenderReady)
    }
  },
  mounted() {
    const $vm = this;
    var Spots = Parse.Object.extend("Spots");
    var query = new Parse.Query(Spots);

    query.get(this.$route.params.spotId)
      .then((spot) => {
        this.loaded = true;
        $vm.spot = spot
        this.title = spot.get('title') + ' - ' + spot.get('loc_disp');
        this.setupSpot(spot);
      }, (error) => {
        this.loaded = true;
        // The object was not retrieved successfully.
        // error is a Parse.Error with an error code and message.
      });
  }
}
</script>