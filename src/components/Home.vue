<template>
  <section>
    <div id="phone">
        <video preload="auto" width="273" height="486" data-setup="{}" autoplay loop muted>
            <source src="../assets/video/snarly_app_preview.mp4" poster="../assets/video/snarly_app_preview.jpg" type="video/mp4">
        </video>
    </div>

    <div id="signup">
        <img src="../assets/images/snarlylogo.png" alt="snarly" class="logo" />
        <p>
            <img src="../assets/images/text-1.png" class="text-1" />
        </p>
        <p> 
            <a href="https://itunes.apple.com/us/app/snarly/id1009352476?ls=1&mt=8" class="appstore">
                <img src="../assets/images/appstore.png" width="136" />
            </a>
            <!-- <br/><br/>
            <a href="#" class="share-btn">
                <img src="images/btn-share.png" width="136" />
            </a>
            
            <a href="#" class="share-btn">
                <img src="images/btn-tweet.png" width="136" />
            </a> -->
        </p>


    </div>
  </section>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../styles/main.css';
section {
  height: 100%;
}
</style>
