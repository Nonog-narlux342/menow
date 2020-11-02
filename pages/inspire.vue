<template>
  <div>
    <v-container>
      <h1>Data User</h1>
      {{ dataList }}
      <v-card>
        <v-card-title>
          <v-text-field
            v-model="itemsearch"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          />
        </v-card-title>
        <v-data-table
          :headers="headers"
          :reservation="dataList"
          :search="itemsearch"
          class="elevation-1"
        >
          <template v-slot:item.actions="{ item }">
            <v-icon small @click="deleteItem(item.itemId)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
      <br><br>
      <v-card>
        <br>
        <v-row class="mb-6" justify="center">
          <h1>Add Promotion</h1>
        </v-row>
        <br>
        <v-form ref="form">
          <v-row class="mb-6" justify="center">
            <v-col lg="6">
              <v-text-field
                v-model="head"
                class="mx-4"
                solo
                label="หัวข้อ"
                text-center
                required
              />
            </v-col>
          </v-row>
          <v-row class="mb-6" justify="center">
            <v-col lg="4">
              <div>
                <v-file-input
                  v-model="img"
                  label=" Add Image"
                  filled
                  prepend-icon="mdi-camera"
                />
              </div>
            </v-col>
            <v-col lg="2">
              <button @click="onUpload">
                Upload
              </button>
            </v-col>
          </v-row>
          <v-row class="mb-6" justify="center">
            <v-col lg="4">
              <v-text-field
                v-model="price"
                type="number"
                class="mx-4"
                solo
                label="ราคา-บาท/ชั่วโมง"
                text-center
                required
              />
            </v-col>
            <v-col lg="4">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    label="วัน เดือน ปี"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker ref="picker" v-model="date" range />
              </v-menu>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col lg="9">
              <v-textarea
                v-model="neww"
                outlined
                name="input-7-4"
                label="รายละเอียด"
              />
            </v-col>
          </v-row>
          <v-row class="mb-6" justify="end">
            <v-col lg="7">
              <v-btn color="success" class="mr-4" @click="addData">
                ตกลง
              </v-btn>
              <v-btn color="error" class="mr-4">
                ยกเลิก
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import firebase from 'firebase'
import { db } from '~/plugins/firebaseconfig.js'
export default {
  name: 'Upload',
  data: () => {
    return {
      img: null,
      imageurl: null,
      head: '',
      menu: '',
      price: 0,
      neww: '',
      date: [],
      dataList: [],
      itemsearch: '',
      headers: [
        {
          text: 'FirstName',
          align: 'start',
          value: 'Firstname'
        },
        { text: 'LastName', value: 'Lastname' },
        { text: 'E-mail', value: 'Email' },
        { text: 'Birthday', value: 'Birthday' },
        { text: 'CallNumber', value: 'Phonenumber' },
        { text: 'Actions', value: 'actions', sortable: false }
      ]
    }
  },
  computed: {
    dateRangeText () {
      return this.date.join(' ~ ')
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      db.collection('Resgister').onSnapshot((querySnapshot) => {
        const data = []
        querySnapshot.forEach((doc) => {
          data.push(doc.data())
        })
        this.dataList = data
      })
    },
    addData () {
      const data = {
        head: this.head,
        price: this.price,
        neww: this.neww,
        date: this.date
      }
      db.collection('addpromotion').doc().set(data)
      // storage.collection('addpromotion').doc().set(data)
    },
    onUpload () {
      this.imageurl = null
      const storageRef = firebase
        .storage()
        // eslint-disable-next-line no-template-curly-in-string
        .ref('nonong')
        .child(this.img.name)
        .put(this.img)
      storageRef.on(
        'state_changed',
        () => {
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.imageurl = url
          })
        }
      )
    },
    deleteItem (item) {
      if (confirm('Are you sure?')) {
        db.collection('Reservation').doc(item).delete()
      }
    }
  }
}
</script>
