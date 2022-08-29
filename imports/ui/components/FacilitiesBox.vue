<template>
  <div>
    <div class="select-box">
      <label for="facilities">Select A Facility:</label>
      <select name="facilities" id="facilities" v-model="selectedFacility">
        <option
          v-for="(facility, index) in facilitues"
          :key="index"
          :value="facility"
        >
          {{ facility.displayName }}
        </option>
      </select>
    </div>
    <br />
    <div v-if="selectedFacility" class="select-box">
      <label for="facilities"
        >Select A System for {{ selectedFacility.displayName }}:</label
      >
      <select name="systems" id="systems" v-model="selectedSystem">
        <option
          v-for="system in selectedFacility.systems"
          :key="system.id"
          :value="system"
        >
          {{ system.displayName }}
        </option>
      </select>
    </div>
    <br />
    <div v-if="selectedSystem">
      <SearchBox :selectedSystem="selectedSystem" />

      <!-- <label for="facilities"
        >Select An Identifier for {{ selectedSystem.displayName }}:</label
      >
      <select
        v-if="selectedSystem"
        name="identifier"
        id="identifier"
        v-model="selectedIdentifier"
      >
        <option
          v-for="identifier in selectedSystem.identifiers"
          :key="identifier.id"
          :value="identifier"
        >
          {{ identifier.Name }}
        </option>
      </select> -->
    </div>
  </div>
</template>

<script>
import SearchBox from "./SearchBox.vue";
export default {
  components: { SearchBox },
  props: {
    facilitues: Array,
  },
  data: () => ({
    selectedFacility: null,
    selectedSystem: null,
    selectedIdentifier: null,
  }),
  watch: {
    selectedSystem: function (system) {
      this.$store.dispatch("setHeader", {
        head: "Fhir-System",
        value: system.id,
      });
    },
  },
  methods: {},
};
</script>

<style>
.select-box {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: start;
}

.select-box :first-child {
  flex: 0 0 150px;
}
.select-box > * {
  flex: 0 0 250px;
}

.select-box select {
  padding: 8px 5px;
}
</style>
