<template>
  
  <section v-if="loaded">
    <div class="spot" v-if="spot">

      <h1>{{ spot.get('title') }}</h1>
      <h2>{{ spot.get('loc_disp') }}</h2>
      
      <div class="spot-photo">
        <img :src="spotPhoto" />
      </div>

      <p>
        {{ spot.get('notes') }}
      </p>

      <a :href="spotLocation" target="_blank">Open map</a>

      <a href="https://itunes.apple.com/us/app/snarly/id1009352476?ls=1&mt=8" class="appstore">
          <img src="../assets/images/appstore.png" width="136" />
      </a>

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
    object-fit: contain;
    background: #fff;
  }

  .appstore {
    margin-top: 20px;
    width: 100%;
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
      spot: null,
      loaded: false
    }
  },
  computed: {
    spotPhoto() {
      let photo = this.spot.get('photo');

      let cloudinary = 'https://res.cloudinary.com/snarly/image/fetch/w_'+ 750 +',h_'+ 870 +',c_fit,f_auto/' + photo._url

      return cloudinary;
    },
    spotLocation() {
      let location = this.spot.get('location');
      if(isMobile.isIOS) {
        return 'maps://?q='+location._latitude+','+location._longitude;
      } else if (isMobile.isAndroid) {
        return 'geo:0,0?q='+location._latitude+','+location._longitude + '('+ this.spot.get('title') +')';
      } else {
        return 'https://www.google.com/maps/search/?api=1&query='+location._latitude+','+location._longitude;
      }
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
      }, (error) => {
        this.loaded = true;
        // The object was not retrieved successfully.
        // error is a Parse.Error with an error code and message.
      });
  }
}
</script>