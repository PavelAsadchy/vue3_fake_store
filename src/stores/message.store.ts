import { defineStore } from 'pinia'

interface MessageState {
  message: string | null
}

export const useMessageStore = defineStore('messageStore', {
  state: (): MessageState => ({ message: null }),
  actions: {
    showMessage(msg: string) {
      this.message = msg
    }
  }
})
