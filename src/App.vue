<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <h1 class="text-xl font-bold text-gray-800"><a @click="setView('Welcome')" href="#">医院管理系统</a></h1>
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">

              <div class="relative">
                <button @click="toggleDropdown('patient')" class="text-gray-600 hover:text-gray-800 px-3 py-5 rounded-md text-sm font-medium">
                  患者管理
                </button>
                <div v-if="dropdowns.patient" class="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div class="py-1">
                    <a @click="setView('addPatient')" href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">添加患者</a>
                    <a @click="setView('searchPatient')" href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">搜索患者</a>
                  </div>
                </div>
              </div>

              <div class="relative">
                <button @click="toggleDropdown('medicine')" class="text-gray-600 hover:text-gray-800 px-3 py-5 rounded-md text-sm font-medium">
                  药品管理
                </button>
                <div v-if="dropdowns.medicine" class="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div class="py-1">
                    <a @click="setView('addMedicine')" href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">添加药品</a>
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">搜索药品</a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <component :is="currentView" />
    </main>
  </div>
</template>

<script setup>
import { ref, shallowRef } from 'vue'
import Welcome from './components/Welcome.vue'
import AddPatientForm from './components/patient/AddPatientForm.vue'
import SearchPatientForm from "@/components/patient/SearchPatientForm.vue";
import AddMedicineForm from "@/components/medicine/AddMedicineForm.vue";

const dropdowns = ref({
  patient: false,
  medicine: false
})

const currentView = shallowRef(Welcome)

const toggleDropdown = (dropdown) => {
  dropdowns.value[dropdown] = !dropdowns.value[dropdown]
  // Close other dropdowns
  Object.keys(dropdowns.value).forEach(key => {
    if (key !== dropdown) dropdowns.value[key] = false
  })
}

const setView = (view) => {
  switch(view) {
    case 'addPatient':
      currentView.value = AddPatientForm
      break
    case 'searchPatient':
      currentView.value = SearchPatientForm
      break
    case 'addMedicine':
      currentView.value = AddMedicineForm
      break
    case 'Welcome':
      currentView.value = Welcome
      break
    default:
      currentView.value = Welcome
  }
  // Close all dropdowns
  Object.keys(dropdowns.value).forEach(key => dropdowns.value[key] = false)
}
</script>