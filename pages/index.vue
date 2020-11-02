<template>
  <v-container>
    <template>
      <v-card>
        <div>
          <br><br>
          <v-form ref="form">
            <v-row class="mb-8" justify="center">
              <v-col lg="8">
                <v-text-field
                  v-model="Name"
                  class="mx-4"
                  solo
                  label="Name"
                  text-center
                  required
                />
              </v-col>
            </v-row>
            <v-row class="mb-8" justify="center">
              <v-col lg="8">
                <v-textarea
                  v-model="TextReview"
                  outlined
                  name="input-7-4"
                  label="Text Review"
                  required
                />
              </v-col>
            </v-row>
            <v-row class="mb-8" justify="center">
              <v-col lg="8">
                <v-text-field v-model="Point" type="number" style="1" label="Point" required />
              </v-col>
            </v-row>
            <v-row class="mb-6" justify="center">
              <v-col lg="3">
                <v-checkbox v-model="status" value="TooGood" label="Too Good" required />
              </v-col>
              <v-col lg="3">
                <v-checkbox v-model="status" value="TooBad" label="Too Bad" required />
              </v-col>
            </v-row>
            <v-row justify="center">
              <button @click="Post">
                Post
              </button>
            </v-row>
            <br><br>
          </v-form>
        </div>
      </v-card>
      <div>
        <v-row>
          <v-col>
            <v-card class="mx-auto mt-5" max-width="344" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-4" />
                  <v-list-item-title class="headline mb-1">
                    Point
                  </v-list-item-title>
                  <v-list-item-subtitle>TextReview</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar tile size="80" color="grey">
                  {{ dataList.Name }}
                </v-list-item-avatar>
              </v-list-item>
              <v-card-actions>
                <v-btn outlined rounded text>
                  <v-icon>mdi-thumb-up</v-icon>
                </v-btn>
              </v-card-actions>
              {{ dataList }}
            </v-card>
          </v-col>
        </v-row>
      </div>
    </template>
  </v-container>
</template>

<script>
import { db } from '~/plugins/firebaseconfig.js'
export default {
  data: () => ({
    Name: '',
    TextReview: '',
    Point: 0,
    status: '',
    dataList: []
  }),
  created () {
    this.getData()
  },
  methods: {
    getData () {
      db.collection('review').onSnapshot((querySnapshot) => {
        const data = []
        querySnapshot.forEach((doc) => {
          data.push(doc.data())
        })
        this.dataList = data
      })
    },
    Post () {
      const data = {
        Name: this.Name,
        TextReview: this.TextReview,
        Point: this.Point,
        status: this.status
      }
      db.collection('review').doc().set(data)
    }
  }
}
</script>
