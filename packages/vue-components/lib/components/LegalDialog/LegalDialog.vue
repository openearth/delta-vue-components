<template>
  <v-dialog
    scrollable
    persistent
    v-model="show"
    :fullscreen="$vuetify.breakpoint.xsOnly"
    :max-width="640"
  >
    <v-card class="d-flex flex-column" style="max-height: 100%;overflow:hidden">
      <v-card-title class="pa-5">
        <v-toolbar-title>{{ title }}</v-toolbar-title>
      </v-card-title>

      <div class="px-5 flex-grow-1 overflow-y-auto" v-html="body" />

      <v-card-actions>
        <div class="pa-2" style="width:100%">
          <form action="" submit.prevent>
            <v-checkbox
              v-for="(label, index) in checkboxes"
              :key="label"
              :label="label"
              class="ma-0"
              v-model="accepted[index]"
              hide-details
            />
          </form>
          <div class="mt-2 d-flex">
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              :disabled="!allAccepted"
              @click="onAcceptClick"
            >
              {{ buttonText }}
            </v-btn>
          </div>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
const storageKey = '__legal_accepted'
const storageModes = ['session', 'local', 'none']

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    checkboxes: {
      type: Array,
      required: true
    },
    buttonText: {
      type: String,
      required: true
    },
    storage: {
      type: String,
      default: 'session',
      validator(value) {
        const valid = storageModes.includes(value)

        if (!valid) {
          console.warn(`LegalDialog: 'mode' should be one of the following values: ${storageModes.join(', ')}`)
        }

        return valid
      }
    }
  },
  data: () => ({
    show: false,
    accepted: []
  }),
  computed: {
    allAccepted() {
      return this.accepted.every(val => val);
    },
    storageMethod() {
      if (this.storage === 'none') {
        return false
      } else if (storageModes.includes(this.storage)) {
        return `${this.storage}Storage`
      }

      return null
    }
  },
  mounted() {
    this.accepted = this.checkboxes.map(() => false)

    if (this.storageMethod) {
      this.show = !JSON.parse(window[this.storageMethod].getItem(storageKey))
    } else {
      this.show = true
    }
  },
  methods: {
    onAcceptClick() {
      this.show = false
      this.$emit('accepted')

      if (this.storageMethod) {
        window[this.storageMethod].setItem(storageKey, true)
      }
    },
  },
};
</script>
