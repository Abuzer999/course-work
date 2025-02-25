<template>
  <div class="mx-auto px-4 py-12">
    <h1 class="text-4xl font-bold text-center mb-8">About SportTime</h1>

    <div class="grid md:grid-cols-2 gap-12 my-[80px]">
      <div>
        <NuxtImg
          src="https://avatars.mds.yandex.net/get-altay/6010116/2a0000018ae99abf032d0bd8786c1d58f447/L"
          alt="SportTime Store"
          class="rounded-lg shadow-lg w-[100%]"
        />
      </div>
      <div>
        <h2 class="text-2xl font-semibold mb-4 ">Our Story</h2>
        <p class="text-gray-600 mb-4">
          Founded in 2010, SportTime has grown from a small local shop to a
          leading online retailer of sporting goods. Our passion for sports and
          commitment to quality have been the driving forces behind our success.
        </p>
        <p class="text-gray-600 mb-4">
          We believe that everyone should have access to high-quality sports
          equipment, regardless of their skill level or budget. That's why we
          offer a wide range of products to suit every need and preference.
        </p>
        <h2 class="text-2xl font-semibold mb-4">Our Mission</h2>
        <p class="text-gray-600 mb-4">
          At SportTime, our mission is to inspire and enable athletic
          achievement through our products and services. We strive to provide
          our customers with the best sporting goods and exceptional customer
          service.
        </p>
      </div>
    </div>

    <div class="my-[80px]">
      <h2 class="text-2xl font-semibold mb-6 text-center">
        Why Choose SportTime?
      </h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div class="text-center">
          <Icon
            name="i-mdi-trophy"
            class="w-12 h-12 mx-auto mb-4 text-[#d90e32]"
          />
          <h3 class="text-xl font-semibold mb-2">Quality Products</h3>
          <p class="text-gray-600">
            We offer only the best sporting goods from trusted brands.
          </p>
        </div>
        <div class="text-center">
          <Icon
            name="i-mdi-truck-delivery"
            class="w-12 h-12 mx-auto mb-4 text-[#d90e32]"
          />
          <h3 class="text-xl font-semibold mb-2">Fast Shipping</h3>
          <p class="text-gray-600">
            Get your orders delivered quickly and efficiently.
          </p>
        </div>
        <div class="text-center">
          <Icon
            name="i-mdi-headphones"
            class="w-12 h-12 mx-auto mb-4 text-[#d90e32]"
          />
          <h3 class="text-xl font-semibold mb-2">Expert Support</h3>
          <p class="text-gray-600">
            Our knowledgeable team is always ready to help you.
          </p>
        </div>
      </div>
    </div>

    <div class="my-[80px] text-center">
      <h2 class="text-2xl font-semibold mb-6">Ready to Get Started?</h2>
      <NuxtLink
        to="/products"
        class="bg-[#d90e32] text-white px-6 py-3 rounded-lg hover:bg-[#b80b2a] transition duration-300"
      >
        Shop Now
      </NuxtLink>
    </div>
  </div>
</template>
