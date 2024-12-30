<template>
  <div class="bg-white shadow rounded-lg p-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">搜索患者</h2>
    <form @submit.prevent="searchPatients" class="space-y-4 mb-6">
      <div>
        <label for="searchTerm" class="form-label">搜索关键字</label>
        <input type="text" id="searchTerm" v-model="searchTerm" class="form-input"
               placeholder="请输入患者姓名、编号、或其他个人信息关键字">
      </div>
      <div>
        <button type="submit" class="btn btn-primary w-full" :disabled="isSearching">
          {{ isSearching ? 'Searching...' : 'Search Patients' }}
        </button>
      </div>
    </form>

    <!-- Edit Patient Modal -->
    <div v-if="showUpdateModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
         id="updateModal">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3 text-center">
          <h3 class="text-lg leading-6 font-medium text-gray-900">编辑患者信息</h3>
          <form @submit.prevent="updatePatient" class="mt-2 text-left">
            <div class="mb-4">
              <label for="updateName" class="form-label">姓名</label>
              <input type="text" id="updateName" v-model="updateForm.name" required class="form-input">
            </div>
            <div class="mb-4">
              <label for="updateAge" class="form-label">年龄</label>
              <input type="number" id="updateAge" v-model="updateForm.age" required class="form-input">
            </div>
            <div class="mb-4">
              <label for="updateGender" class="form-label">性别</label>
              <select id="updateGender" v-model="updateForm.gender" required class="form-input">
                <option value="male">男</option>
                <option value="female">女</option>
              </select>
            </div>
            <div class="mb-4">
              <label for="updateAddress" class="form-label">地址</label>
              <input type="text" id="updateAddress" v-model="updateForm.address" required class="form-input">
            </div>
            <div class="flex justify-end">
              <button type="submit" class="btn btn-primary">更新</button>
              &nbsp;&nbsp;
              <button type="button" @click="closeUpdateModal" class="btn btn-secondary mr-2">取消</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
         id="deleteModal">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3 text-center">
          <h3 class="text-lg leading-6 font-medium text-gray-900">删除患者</h3>
          <div class="mt-2 px-7 py-3">
            <p class="text-sm text-gray-500">
              确认要删除此患者？该操作无法撤销.
            </p>
          </div>
          <div class="flex justify-center mt-4">
            <button @click="closeDeleteModal" class="btn btn-secondary mr-2">取消</button>
            &nbsp;&nbsp;
            <button @click="deletePatient" class="btn btn-danger">删除</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="searchMessage"
         :class="['mt-4 p-4 rounded', searchMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700']">
      {{ searchMessage.text }}
    </div>

    <div v-if="patients.length > 0" class="mt-6">
      <h3 class="text-xl font-semibold mb-2">搜索结果</h3>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="w-10 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <input
                  type="checkbox"
                  @change="toggleAllCheckboxes"
                  :checked="allChecked"
                  class="form-checkbox h-5 w-5 text-blue-600"
              >
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              姓名
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              年龄
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              性别
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              地址
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              操作
            </th>
          </tr>
          </thead>

          <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="patient in patients" :key="patient.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <input
                  type="checkbox"
                  v-model="selectedPatients"
                  :value="patient.id"
                  class="form-checkbox h-5 w-5 text-blue-600"
              >
            </td>
            <td class="px-6 py-4 whitespace-nowrap">{{ patient.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ patient.age }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ patient.gender }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ patient.address }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <button @click="openUpdateModal(patient)" class="btn btn-secondary mr-2">编辑</button>
              &nbsp;&nbsp;
              <button @click="openDeleteModal(patient)" class="btn btn-danger">删除</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-4 flex justify-end space-x-2">
        <button @click="batchExport" class="btn btn-primary" :disabled="!selectedPatients.length">
          批量导出
        </button>
        &nbsp;&nbsp;
        <button @click="batchDelete" class="btn btn-danger" :disabled="!selectedPatients.length">
          批量删除
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, reactive, computed} from 'vue'
import VModal from 'vue-js-modal'

const searchTerm = ref('')
const patients = ref([])
const isSearching = ref(false)
const searchMessage = ref(null)


const showUpdateModal = ref(false)
const showDeleteModal = ref(false)
const selectedPatient = ref(null)
const selectedPatients = ref([]);

const emit = defineEmits(['edit', 'delete', 'batchExport', 'batchDelete']);

const updateForm = reactive({
  name: '',
  age: '',
  gender: '',
  address: ''
})

const searchPatients = async () => {
  isSearching.value = true
  searchMessage.value = null
  patients.value = []

  try {
    // const response = await fetch(`http://localhost:8080/api/patients?search=${encodeURIComponent(searchTerm.value)}`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    //
    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`)
    // }
    console.log(searchTerm.value)

    const result = [
      {"id": 1, "name": "张三", "age": "26", "gender": "男", "address": "成都市"},
      {"id": 2, "name": "李四", "age": "47", "gender": "女", "address": "北京市"}
    ]
    patients.value = result

    if (patients.value.length === 0) {
      searchMessage.value = {type: 'success', text: '未查询到符合条件的患者.'}
    } else {
      searchMessage.value = {type: 'success', text: `找到 ${patients.value.length} 位患者.`}
    }
  } catch (error) {
    console.error('Error:', error)
    searchMessage.value = {type: 'error', text: '查询过程中遇到了服务器异常，请重试.'}
  } finally {
    isSearching.value = false
  }
}

const openUpdateModal = (patient) => {
  selectedPatient.value = patient
  updateForm.name = patient.name
  updateForm.age = patient.age
  updateForm.gender = patient.gender
  updateForm.address = patient.address
  showUpdateModal.value = true
}

const closeUpdateModal = () => {
  showUpdateModal.value = false
  selectedPatient.value = null
}

const updatePatient = async () => {
  try {
    const response = await fetch(`http://localhost:8080/api/patients/${selectedPatient.value.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateForm)
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const updatedPatient = await response.json()
    const index = patients.value.findIndex(p => p.id === updatedPatient.id)

    if (index !== -1) {
      patients.value[index] = updatedPatient
    }
    closeUpdateModal()
    searchMessage.value = {type: 'success', text: '患者信息更新成功！'}
  } catch (error) {
    console.error('Error:', error)
    searchMessage.value = {type: 'error', text: '更新患者信息时发生了错误，请稍后重试'}
  }
}

const openDeleteModal = (patient) => {
  selectedPatient.value = patient
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  selectedPatient.value = null
}

const deletePatient = async () => {
  try {
    const response = await fetch(`http://localhost:8080/api/patients/${selectedPatient.value.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    patients.value = patients.value.filter(p => p.id !== selectedPatient.value.id)
    closeDeleteModal()
    searchMessage.value = {type: 'success', text: '删除患者成功！'}
  } catch (error) {
    console.error('Error:', error)
    searchMessage.value = {type: 'error', text: '删除患者时发生了错误，请稍后重试'}
  }
}

const allChecked = computed(() => {
  return selectedPatients.value.length === patients.value.length;
});

const toggleAllCheckboxes = (event) => {
  if (event.target.checked) {
    selectedPatients.value = patients.value.map(patient => patient.id);
  } else {
    selectedPatients.value = [];
  }
};

const batchExport = () => {
  emit('batchExport', selectedPatients.value);
};

const batchDelete = () => {
  emit('batchDelete', selectedPatients.value);
};
</script>

<style scoped>
.btn-danger {
  @apply bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded;
}
</style>