import {defineStore} from "pinia"
import {ref, computed} from "vue"
import {EmployeeManagement} from "@/libs/EmployeeManagement"


export const useUserStore = defineStore("user", () => {
  const employeeManager = ref(new EmployeeManagement())
  const searchKey = ref("")
  const currentUser = ref("")
  const loggedIn = ref(false)
  const currentUsername = ref("")
  const moodFilter = ref("")
  /*
    ============================================
    ======= Filtered Data For Searching ========
    ============================================
    */

  const filteredSearchData = computed(() => {
    const filteredSearchDataResult = employeeManager.value.employees
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
    return moodFilter.value.length === 0 ? filteredSearchDataResult : filteredSearchDataResult.filter((employee) => employee.LinkImage.includes(moodFilter.value))
  })

  const filteredData = computed(() => {
    const filteredDataResult =  employeeManager.value.employees.filter((employee) => {
      return employee.OwnedBy === currentUser.value
    })
    return moodFilter.value.length === 0 ? filteredDataResult : filteredDataResult.filter((employee) => employee.LinkImage.includes(moodFilter.value))
  })

  const averageCoworkerData = computed(() => {
    return employeeManager.value.employees
    .filter((employee) => {return employee.OwnedBy === currentUser.value})
    .map((employee)=>{ return employee.Rating.coworker})
    .reduce((sum,rate)=>{ return sum + Number(rate)},0) 
    / filteredData.value.length
  })

  const averageEnvironmentData = computed(() => {
    return employeeManager.value.employees
    .filter((employee) => {return employee.OwnedBy === currentUser.value})
    .map((employee)=>{ return employee.Rating.environment})
    .reduce((sum,rate)=>{ return sum + Number(rate)},0) 
    / filteredData.value.length
  })

  const averageResponsibilityData = computed(() => {
    return employeeManager.value.employees
    .filter((employee) => {return employee.OwnedBy === currentUser.value})
    .map((employee)=>{ return employee.Rating.responsibility})
    .reduce((sum,rate)=>{ return sum + Number(rate)},0) 
    / filteredData.value.length
  })

  return {
    loggedIn,
    currentUser,
    currentUsername,
    employeeManager,
    filteredData,
    filteredSearchData,
    averageCoworkerData,
    averageEnvironmentData,
    averageResponsibilityData,
    searchKey,
    moodFilter
  }
})
