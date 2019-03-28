<template>
    <b-row>
    <b-col cols="6">
      <h2>
        Join Room
        <b-link href="#/">(Room List)</b-link>
      </h2>
      <b-form @submit="onSubmit">
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Enter Nickname">
          <b-form-input id="nickname" :state="state" v-model.trim="chat.nickname"></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Join</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            chat: {}
        }
    },
    methods: {
        onSubmit (evt) {
            evt.preventDefault();
            this.chat.room = this.$route.params.id;
            this.chat.message = this.chat.nickname + ' join the room';
            axios.post(`http://localhost:3000/api/chat`, this.chat)
                .then(response => {
                    this.$router.push({
                        name: 'ChatRoom',
                        params: { id: this.$route.params.id, nickname: response.data.nickname }
                    });
                })
                .catch(e => {
                    this.errors.push(e);
                });
        }
    }
}
</script>

