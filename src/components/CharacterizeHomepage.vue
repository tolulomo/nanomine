<!--
################################################################################
#
# File Name: CharacterizeHomepage.vue
# Application: templates
# Description:
#
# Created by: Akshay Iyer, August 15, 2018
# Customized for NanoMine
#
################################################################################
-->

<template>
  <div class="main">
    <h1 v-if="this.$store.state.versionNew" class="header-mm">{{ msg }}</h1>
    <div class="characterization_homepage">
      <v-container class="text-xs-left">
        <h1 v-if="!this.$store.state.versionNew" class="header-nm">{{ msg }}</h1>
            <div>
              <p> Choose the characterization method from the options below.</p>
            </div>
            <p><strong>NOTE: Uploaded images will be binarized using Otsu method</strong></p>
        <v-layout align-space-between justify-center row fill-height>
          <v-flex>
              <div>
                <h2> Correlation Functions </h2>
                <div class="text-xs-left"> They are statistical descriptors that quantitatively connect the macroscopic properties of a heterogeneous image to its complex microstructure.
                    Mathematically, they quantify the conditional probability of finding two randomly chosen points in the same phase (autocorrelation). Currently, our webtool can evaluate four widely used two-point
                    correlation functions - autocorrelation, lineal path, cluster and surface correlation.</div>
                <router-link v-if="this.$store.state.versionNew" to="/mm/CorrelationCharacterize">Use Correlation Function Webtool</router-link>
                <router-link v-if="!this.$store.state.versionNew" to="/CorrelationCharacterize">Use Correlation Function Webtool</router-link>
              </div>
            <p></p>
              <div>
                <h2> Physical Descriptors </h2>
                <div class="text-xs-left"> Physical descriptors (aka features/predictors) provide a meaningful and convenient approach for direct elucidation of Processing-Structure-Property relations.
                    Descriptors are important structural parameters that are highly related to material properties and provide a reduced dimension representation of microstructure. Extracting descriptors from a microstructure
                    image involves application of image segmentation techniques to identify clusters of filler material followed by analysis of individual cluster. Although one can consider several descriptors, our webtool
                    evaluates four descriptors - volume fraction, number of white phase aggregates, aspect ratio and nearest neighbor distance. This method is best suited for materials with particulate filler clusters that are speherical/ellipsoidal in shape.</div>
                <router-link v-if="this.$store.state.versionNew" to="/mm/DescriptorCharacterize">Use Physical Descriptor Webtool</router-link>
                <router-link v-if="!this.$store.state.versionNew" to="/DescriptorCharacterize">Use Physical Descriptor Webtool</router-link>
              <p></p>
              </div>
              <div>
                <h2> Spectral Density Function </h2>
                <div class="text-xs-left"> The Spectral Density Function (SDF) is a frequency domain microstructure representation where different frequencies represent real
                space features at different length scales. SDF provides a low-dimensional microstructure representation for quasi-random materials which have arbitrary filler geometry but its distribution is governed by an
                underlying spatial correlation. The inverse Fourier Transform of SDF is the two-point autocorrelation function.</div>
                <router-link v-if="this.$store.state.versionNew" to="/mm/SDFCharacterize">Use Spectral Density Function Webtool</router-link>
                <router-link v-if="!this.$store.state.versionNew" to="/SDFCharacterize">Use Spectral Density Function Webtool</router-link>
              <p></p>
              </div>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CharacterizeHomepage',
  data () {
    return {
      msg: 'Microstructure Characterization',
    }
  },
  created(){
    this.$store.commit('setAppHeaderInfo', {icon: 'workspaces', name: 'Microstructure Characterization'})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  img {
    width: 240px;
  }
  h4 {
    text-transform: uppercase;
  }
</style>
