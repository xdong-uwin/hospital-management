<template>
  <div class="bg-white shadow rounded-lg p-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">添加患者</h2>

    <form @submit.prevent="submitForm" class="space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">姓名</label>
        <input type="text" id="name" v-model="form.name" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
      </div>

      <div>
        <label for="age" class="block text-sm font-medium text-gray-700">年龄</label>
        <input type="number" id="age" v-model="form.age" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
      </div>

      <div>
        <label for="gender" class="block text-sm font-medium text-gray-700">性别</label>
        <select id="gender" v-model="form.gender" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
          <option value="">请选择</option>
          <option value="male">男</option>
          <option value="female">女</option>
        </select>
      </div>

      <div>
        <label for="address" class="block text-sm font-medium text-gray-700">地址</label>
        <input type="number" id="age" v-model="form.age" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
      </div>

      <div>
        <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          添加患者
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  name: '',
  age: '',
  gender: '',
  address: ''
})

const submitForm = () => {
  // Here you would typically send the form data to your backend
  console.log('Form submitted:', form)
  // Reset form after submission
  Object.keys(form).forEach(key => form[key] = '')
}
</script>