import {defineStore} from "pinia"
import {ref, computed} from "vue"

export const useAuthStore = defineStore("authentication", () => {
  const loginErrorLog = ref("")
  const loginFailed = ref(false)

  const username = ref("")
  const password = ref("")
  const validatePassword = ref("")

  const hasUpper = ref(false)
  const hasLower = ref(false)
  const hasDigit = ref(false)
  const hasSpecial = ref(false)
  const isBoxChecked = ref(false)

  const computedPasswordHasDigit = computed(() => {
    if (/[0-9]/.test(password.value)) {
      hasDigit.value = true
      return "Password have number"
    } else {
      hasDigit.value = false
      return "Password doesn't have any digit"
    }
  })
  const computedPasswordHasLower = computed(() => {
    if (/[a-z]/.test(password.value)) {
      hasLower.value = true
      return "Password have lower case"
    } else {
      hasLower.value = false
      return "Password doesn't have any lower case"
    }
  })
  const computedPasswordHasUpper = computed(() => {
    if (/[A-Z]/.test(password.value)) {
      hasUpper.value = true
      return "Password have upper case"
    } else {
      hasUpper.value = false
      return "Password doesn't have any upper case"
    }
  })
  const computedPasswordHasspecial = computed(() => {
    if (/[@#$%^&*!]/.test(password.value)) {
      hasSpecial.value = true
      return "Password have special character"
    } else {
      hasSpecial.value = false
      return "Password doesn't have any special character"
    }
  })
  return {
    loginErrorLog,
    loginFailed,
    hasUpper,
    hasLower,
    hasDigit,
    hasDigit,
    hasSpecial,
    isBoxChecked,
    username,
    password,
    validatePassword,
    computedPasswordHasDigit,
    computedPasswordHasLower,
    computedPasswordHasUpper,
    computedPasswordHasspecial,
  }
})
