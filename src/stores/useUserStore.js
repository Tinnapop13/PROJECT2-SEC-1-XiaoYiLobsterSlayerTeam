import {defineStore} from "pinia"
import {ref, computed} from "vue"
import {EmployeeManagement} from "@/libs/EmployeeManagement"


export const useUserStore = defineStore("user", () => {
  const employeeManager = ref(new EmployeeManagement())
  const searchKey = ref("")
  const currentUser = ref("")
  const loggedIn = ref(false)
  /*
    ============================================
    ======= Filtered Data For Searching ========
    ============================================
    */

  const filteredSearchData = computed(() => {
    return employeeManager.value.employees
      .filter((employee) => {
        return employee.OwnedBy === currentUser.value
      })
      .filter((employee) => {
        return Object.entries(employee)
          .filter(
            ([key, value]) =>
              key === "FakeName" || key === "PositionRank" || key === "Age"
          )
          .some(([key, value]) => {
            return String(value)
              .toLowerCase()
              .includes(searchKey.value.toLowerCase())
          })
      })
  })

  const filteredData = computed(() => {
    return employeeManager.value.employees.filter((employee) => {
      return employee.OwnedBy === currentUser.value
    })
  })

  return {
    loggedIn,
    currentUser,
    employeeManager,
    filteredData,
    filteredSearchData,
    searchKey,
    // getUserById,
  }
})
