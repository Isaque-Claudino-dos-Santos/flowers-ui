<template>
  <div class="flex flex-col gap-1">
    <label v-if="!!label" :for="id" class="font-bold text-gray-2">{{ label }}</label>
    <div
      :class="[
        'overflow-hidden rounded-xl border border-gray-8 p-[0.2rem] text-gray-600',
        !!errors.length
          ? 'bg-red-default-1 text-red-default-1'
          : `has-[input:focus]:bg-green-gradient`,
        blocked && 'bg-gray-6',
        disabled && `bg-gray-8`,
      ]"
    >
      <div
        :class="[
          'flex items-center justify-around rounded-lg px-2 py-3',
          blocked && 'bg-gray-6',
          disabled && `bg-gray-8`,
          !blocked && !disabled && 'bg-white',
        ]"
      >
        <div v-if="!!leftIcon" class="mr-1">
          <component :is="leftIcon()" />
        </div>
        <input
          :id="id"
          v-model="model"
          :name="id"
          :type="type"
          :placeholder="placeholder"
          :disabled="disabled || blocked"
          class="input-reset h-full w-full p-1 py-0.5"
        />

        <div v-if="!!blocked">
          <PhLock size="24" class="font-bold text-gray-5" />
        </div>

        <div v-else-if="!disableIconValidation && (value?.length ?? 0) > 0 && !meta.valid">
          <PhX size="24" class="font-bold text-red-default-1" />
        </div>

        <div v-else-if="!disableIconValidation && (value?.length ?? 0) > 0 && meta.valid">
          <PhCheckCircle size="24" class="font-bold text-green-default-1" />
        </div>

        <div v-else-if="!!rightIcon">
          <component :is="rightIcon()" />
        </div>
      </div>
    </div>
    <div v-if="(value?.length ?? 0) > 0 && !meta.valid">
      <p
        v-for="(error, indexError) in errors"
        :key="indexError"
        class="ml-2 text-sm font-semibold text-red-default-1"
      >
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PhCheckCircle, PhLock, PhX } from '@phosphor-icons/vue'
import { useField } from 'vee-validate'
import { computed, type InputTypeHTMLAttribute, type VNode } from 'vue'

export interface InputProps {
  id: string
  label?: string
  placeholder?: string
  type?: InputTypeHTMLAttribute
  defaultValue?: string
  disabled?: boolean
  disableIconValidation?: boolean
  blocked?: boolean
  rightIcon?: () => VNode
  leftIcon?: () => VNode
}

const {
  id,
  label,
  placeholder,
  defaultValue,
  type = 'text',
  disabled = false,
  blocked = false,
  disableIconValidation = false,
  leftIcon,
  rightIcon,
} = defineProps<InputProps>()

const emit = defineEmits(['change-value'])

const { value, errors, meta, handleChange } = useField(id, undefined, {
  initialValue: defaultValue,
})

const model = computed({
  get: () => value.value,
  set: (value) => {
    emit('change-value', value)
    handleChange(value)
  },
})
</script>

<style scoped>
.input-reset {
  border: none;
  outline: none;
}

.input-reset:-webkit-autofill {
  outline: none !important;
  border: 0 !important;
  background: white !important;
  -webkit-box-shadow: 0 0 0px 1000px #ffffff inset !important;
}
</style>
