<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/app.store'
import CardItem from '@/components/CardItem.vue'

const appStore = useAppStore()
const { cart, _itemListTotal } = storeToRefs(appStore)

const details = ref(false)

const showDetails = (id: string) => {
  details.value = true
  appStore.getSelectedItem(id)
}

const closeDetails = () => {
  details.value = false
  appStore.selected = null
}

const getItemProp = computed(() => (_id: string, prop: string) => {
  const value = (_itemListTotal.value.find((item) => item.id === _id) as Record<string, any>)![prop]
  return value
})

const getTotalSum = computed(() => {
  return cart?.value?.products
    .reduce((sum, product) => {
      sum +=
        product.quantity *
        (_itemListTotal.value.find((item) => item.id === product.productId) as Record<
          string,
          any
        >)!['price']
      return sum
    }, 0)
    .toFixed(2)
})
</script>

<template>
  <v-container v-if="cart">
    <v-card class="mx-auto" width="100%">
      <v-list :items="cart?.products" item-props lines="three">
        <v-list-item
          v-for="product in cart.products"
          :key="product.productId"
          :title="getItemProp(product.productId, 'title')"
          :subtitle="`
            Price: $${getItemProp(product.productId, 'price').toFixed(2)}
            Quantity: ${product.quantity}
          `"
        >
          <template v-slot:prepend>
            <v-avatar
              color="grey-lighten-1"
              :image="getItemProp(product.productId, 'image')"
              size="large"
            ></v-avatar>
          </template>

          <v-rating
            :model-value="getItemProp(product.productId, 'rating')['rate']"
            color="amber"
            density="compact"
            half-increments
            readonly
            size="x-small"
          ></v-rating>

          <template v-slot:append>
            <v-field variant="plain">
              $ {{ (getItemProp(product.productId, 'price') * product.quantity).toFixed(2) }}
            </v-field>
            <v-btn
              @click="() => appStore.addItemToCart(product.productId)"
              color="grey-lighten-1"
              icon="mdi-plus-circle"
              variant="tonal"
            ></v-btn>
            <v-btn
              @click="() => appStore.removeItemFromCart(product.productId)"
              color="grey-lighten-1"
              icon="mdi-minus-circle"
              variant="tonal"
            ></v-btn>
            <v-btn
              @click="() => showDetails(product.productId)"
              color="grey-lighten-1"
              icon="mdi-information"
              variant="text"
            ></v-btn>
          </template>
        </v-list-item>

        <v-divider inset></v-divider>

        <v-list-item title="Total:">
          <template v-slot:prepend>
            <v-avatar color="amber">
              <v-icon icon="mdi-cash-multiple" color="white"></v-icon
            ></v-avatar>
          </template>

          <template v-slot:append>
            <v-field variant="solo-filled" bg-color="amber">$ {{ getTotalSum }}</v-field>
            <RouterLink to="/">
              <v-btn color="amber" icon="mdi-home-outline" variant="text"></v-btn>
            </RouterLink>
          </template>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>

  <v-dialog v-model="details" width="auto">
    <CardItem
      :isLoading="!appStore.selected"
      :item="appStore.selected!"
      primaryActionTitle="Close"
      :onPrimaryActionClickHandler="closeDetails"
      detailed
    />
  </v-dialog>
</template>
