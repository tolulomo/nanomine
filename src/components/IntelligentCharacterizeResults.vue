<template>
  <div class="main">
    <div class="IntelligentCharacterizeResults">
      <v-alert
        v-model="resultsError"
        type="error"
        dismissible
      >
        {{resultsErrorMsg}}
      </v-alert>
      <h1 class="header-nm">{{msg}}</h1>
      <v-container>
        <v-layout>
          <v-flex xs12 sm6>
            <h4>Uploaded Image</h4>
            <img :src="getInputImage()"/>
            {{inputImage}}
            <p></p>
          </v-flex>
          <v-flex xs12 sm9>
            <h4>Intelligent Characterization Results</h4> <!-- comment -->
            <v-flex d-inline-block xs2 sm1></v-flex>
            <v-flex d-inline-block xs8 sm8>
              <p></p>
              <v-list two-line subheader>
                <!--v-subheader>Details</v-subheader-->
                <v-list-tile avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>Volume fraction</v-list-tile-title>
                    <v-list-tile-sub-title>{{vf}}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>Interfacial Area</v-list-tile-title>
                    <v-list-tile-sub-title>{{intf_area}}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>Selected Characterization Method</v-list-tile-title>
                    <v-list-tile-sub-title> {{charac}}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>Isotropy Index (1 is perfect isotropy)</v-list-tile-title>
                    <v-list-tile-sub-title>{{isotropy}}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
              <v-list-tile avatar>
                <v-list-tile-content>
                  <v-list-tile-title>More details of microstructure characterization parameters</v-list-tile-title>
                  <v-list-tile-title>can be found in the downloadable file below.</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-flex>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs12>
            <h4>Download Results</h4>
            <a :href="getZipFile()">{{zipFileName}}</a>
          </v-flex>
        </v-layout>
        <h4 v-if="referenceOpen" @click="refOpen">References <i class="material-icons icon-adjust">keyboard_arrow_up</i></h4>
        <h4 v-else @click="refOpen">References <i class="material-icons icon-adjust">keyboard_arrow_down</i></h4>
        <v-flex xs12 v-if="referenceOpen">
          <p>Rintoul, M.D. and Torquato, S., 1997. Reconstruction of the structure of dispersions. <i>Journal of Colloid
            and Interface Science</i>, 186(2), pp.467-476.</p>
          <p>Yeong,C. and Torquato,S., 1998. Reconstructing random media Physical Review E, vol. 57, no. 1, p. 495</p>
        </v-flex>
      </v-container>
    </div>
  </div>
</template>

<script>
/* eslint-disable indent */

import Axios from 'axios'
import {} from 'vuex'
export default {
  name: 'IntelligentCharacterizeResults',
  data: () => {
    return ({
      msg: 'Intelligent - Characterization Results',
      resultsError: false,
      resultsErrorMsg: '',
      inputFileName: '',
      zipFileName: '',
      vf: '',
      intf_area: '',
      isotropy: '',
      charac: '',
      referenceOpen: false
    })
  },
  mounted: function () {
    let vm = this
    vm.getJobOutputParams()
      .then(function () {
        vm.getOutputResultJson() // added *************************************
      })
      .catch(function (err) {
        console.log(err)
      })
  },
  methods: {
    setLoading: function () {
      this.$store.commit('isLoading')
    },
    resetLoading: function () {
      this.$store.commit('notLoading')
    },
    getInputImage: function () {
      let vm = this
      return vm.$route.query.refuri + '/' + vm.inputFileName
    },
    getZipFile: function () {
      let vm = this
      return vm.$route.query.refuri + '/' + vm.zipFileName
    },
    getJobOutputParams: function () {
      let vm = this
      return new Promise(function (resolve, reject) {
        let url = vm.$route.query.refuri + '/job_output_parameters.json'
        vm.setLoading()
        return Axios.get(url)
          .then(function (response) {
            console.log(response.data)
            let myOutputParams = response.data // Axios did the JSON parse for us
            vm.inputFileName = myOutputParams.inputFileName
            vm.zipFileName = myOutputParams.zipFileName
            vm.resetLoading()
            resolve()
          })
          .catch(function (err) {
            console.log(err)
            vm.resultsrErrorMsg = err.message
            vm.resultsError = true
            vm.resetLoading()
            reject(new Error('Error getting Job Output Parameters'))
          })
      })
    },
    getOutputResultJson: function () { // *************************************
      let vm = this
      let url = vm.$route.query.refuri + '/output/result_json.json'
      vm.setLoading()
      return Axios.get(url)
        .then(function (response) {
          console.log(response.data)
          let myOutputResult = response.data // Axios did the JSON parse for us
          console.log(myOutputResult)
          vm.vf = myOutputResult.universal.vf // should i have two dots ? or directly call myOutputResult.vf?
          vm.intf_area = myOutputResult.universal.intf_area
          vm.isotropy = myOutputResult.universal.isotropy
          vm.charac = myOutputResult.charac
          vm.resetLoading()
        })
        .catch(function (err) {
          console.log(err)
          vm.resultsErrorMsg = 'Error loading result_json.json. ' + err
          vm.resultsError = true
          vm.resetLoading()
        })
    }, // ********************************************************************************
    refOpen () {
      return this.referenceOpen = !this.referenceOpen;
    }
  },
  created(){
    this.$store.commit('setAppHeaderInfo', {icon: 'workspaces', name: 'Microstructure Characterization'})
  }
}
</script>

<style scoped>
  img {
    width: 300px;
    height: auto;
  }

  h4 {
    text-transform: uppercase;
  }

</style>
