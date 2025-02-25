<template>
  <div>
    <section class="relative bg-gray-900 text-white">
      <img
        src="https://china-west.ru/images/dostavka-sportivnykh-tovarov-i-snaryazheniya-dlya-letnego-sezona-iz-kitaya.webp"
        alt="Sports equipment"
        class="w-full h-[500px] object-cover opacity-50"
      />
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="text-center">
          <h1 class="text-5xl font-bold mb-4">Summer Sale: Up to 50% Off!</h1>
          <p class="text-xl mb-8">
            Get ready for summer with our amazing deals on sports gear
          </p>
          <NuxtLink
            to="/products"
            class="bg-[#d90e32] text-white px-6 py-3 rounded-lg hover:bg-[#b80b2a] transition duration-300"
          >
            Shop Now
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Popular Categories</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div
            v-for="category in categories"
            :key="category.name"
            class="text-center"
          >
            <div
              class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <Icon
                :name="category.icon"
                class="w-16 h-16 mx-auto mb-4 text-[#d90e32]"
              />
              <h3 class="text-xl font-semibold">{{ category.name }}</h3>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Advertisement Banner -->
    <section class="bg-[#d90e32] text-white py-12">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-4">New Arrivals: Fall Collection</h2>
        <p class="text-xl mb-8">
          Discover our latest sports gear for the upcoming season
        </p>
        <button
          to="/new-arrivals"
          class="bg-white text-[#d90e32] px-6 py-3 rounded-lg hover:bg-gray-100 transition duration-300"
        >
          Explore Now
        </button>
      </div>
    </section>

    <!-- Customer Reviews -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">
          What Our Customers Say
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="review in customerReviews"
            :key="review.id"
            class="bg-white p-6 rounded-lg shadow-md"
          >
            <div class="flex items-center mb-4">
              
              <div>
                <h3 class="font-semibold">{{ review.name }}</h3>
                <div class="flex text-yellow-400">
                  <Icon
                    v-for="star in 5"
                    :key="star"
                    :name="
                      star <= review.rating
                        ? 'i-mdi-star'
                        : 'i-mdi-star-outline'
                    "
                    class="w-5 h-5"
                  />
                </div>
              </div>
            </div>
            <p class="text-gray-600">{{ review.comment }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const categories = reactive([
  { name: "Football", icon: "i-mdi-soccer" },
  { name: "Basketball", icon: "i-mdi-basketball" },
  { name: "Tennis", icon: "i-mdi-tennis" },
  { name: "Swimming", icon: "i-mdi-swim" },
]);

const featuredProducts = reactive([
  {
    id: 1,
    name: "Pro Soccer Ball",
    description: "Official size and weight",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 2,
    name: "Basketball Hoop",
    description: "Adjustable height, weather-resistant",
    price: 199.99,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 3,
    name: "Tennis Racket Set",
    description: "Includes 2 rackets and 3 balls",
    price: 89.99,
    image: "/placeholder.svg?height=300&width=400",
  },
]);

const customerReviews = reactive([
  {
    id: 1,
    name: "John Doe",
    rating: 5,
    comment: "Great quality products and fast shipping!",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Jane Smith",
    rating: 4,
    comment: "Excellent customer service. Will shop here again.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Mike Johnson",
    rating: 5,
    comment: "The best sports equipment I've ever purchased.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
]);
</script>
