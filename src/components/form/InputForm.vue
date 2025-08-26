<template>
  <div>
    <div class="flex flex-col">
      <label :for="id" class="text-nowrap">{{ label }}</label>
      <input v-model="value" :id="id" :name="id" class="w-full border p-1" />
    </div>
    <ul class="rounded px-1 w-max">
      <li v-for="(error, indexError) in errors" :key="indexError" class="text-red-700">
        - {{ error }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'

export interface BaseInputProps {
  id: string
  defaultValue?: string
  label?: string
}

const { id, defaultValue, label } = defineProps<BaseInputProps>()
const { value, errors, setErrors } = useField(() => id, undefined, {
  initialValue: defaultValue,
})

setErrors(['campo obrigatório', 'e-mail invalido'])
</script>
