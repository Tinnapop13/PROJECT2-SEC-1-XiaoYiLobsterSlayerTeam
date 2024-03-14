<script setup>


import { ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";


const route = useRoute();
const employeeId = ref(0);
const loading = ref(false);
const fetchData = ref(null);
const editTemplate = ref({
  Age: "",
  PositionRank: "",
  PainPoint: "",
  GoalAndNeed: "",
});

employeeId.value = route.params.id;

const readJsonData = async () => {
  await fetch("http://localhost:5000/employees")
    .then((respJson) => respJson.json())
    .then((data) => {
      fetchData.value = data;
      loading.value = true;
    });
  console.log(fetchData.value);
};

const deleteJsonData = () => {
  fetch(`http://localhost:5000/employees/${employeeId.value}`, {
    method: "DELETE",
  });
};

const editJsonData = () => {
  fetch(`http://localhost:5000/employees/${employeeId.value}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Age:
        editTemplate.value.Age.trim().length === 0
          ? fetchData.value.Age
          : editTemplate.value.Age,
      PositionRank:
        editTemplate.value.PositionRank.trim().length === 0
          ? fetchData.value.PositionRank
          : editTemplate.value.PositionRank,
      PainPoint:
        editTemplate.value.PainPoint.trim().length === 0
          ? fetchData.value.PainPoint
          : editTemplate.value.PainPoint,
      GoalAndNeed:
        editTemplate.value.GoalAndNeed.trim().length === 0
          ? fetchData.value.GoalAndNeed
          : editTemplate.value.GoalAndNeed,
    }),
  }).then((respJson) => {
    respJson.json();
  });
};

onBeforeMount(() => {
  readJsonData();
});
</script>

<template v-if="loading">
  <div class="border border-base-300 h-screen w-screen">
    <div class="navbar bg-base-100">
      <div class="flex-1">
        <router-link to="/">
          <a class="btn btn-ghost text-xl ml-2 mr-2">HOME</a></router-link
        >
        <router-link to="/statistics"
          ><a class="btn btn-ghost text-xl ml-2">STATISTIC</a></router-link
        >
      </div>
      <div class="flex-none gap-2">
        <div class="form-control">
          <input
            type="text"
            placeholder="Search"
            class="input input-bordered w-24 md:w-auto"
          />
        </div>
        <div class="dropdown dropdown-end">
          <div
            tabindex="0"
            role="button"
            class="btn btn-ghost btn-circle avatar"
          >
            <div class="w-10 rounded-full">
              <img
                :src="
                  fetchData === null ? '' : fetchData[employeeId]?.LinkImage
                "
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex px-4 py-5 border-t border-base-300">
      <div class="border border-base-300 flex w-screen h-[25vw]">
        <div class="avatar indicator">
          <span
            class="border-black bg-white text-black indicator-item badge badge-secondary m-6"
            >{{
              fetchData === null ? "" : fetchData[employeeId]?.FakeName
            }}</span
          >
          <div class="rounded-sm overflow-hidden m-6">
            <img
              :src="fetchData === null ? '' : fetchData[employeeId]?.LinkImage"
            />
          </div>
        </div>

        <div class="flex w-[70vw] flex-col">
          <div class="flex flex-row justify-evenly">
            <div class="flex flex-col m-5">
              <p class="m-2">Age</p>
              <p class="m-2 text-xs font-[10]">
                <input
                  type="text"
                  :placeholder="
                    fetchData === null ? '' : fetchData[employeeId]?.Age
                  "
                  v-model="editTemplate.Age"
                  class="input input-bordered input-xs w-full max-w-xs"
                />
              </p>
            </div>
            <div class="flex flex-col m-5">
              <p class="m-2">Rank</p>
              <p class="m-2 text-xs font-[10]">
                <input
                  type="text"
                  :placeholder="
                    fetchData === null
                      ? ''
                      : fetchData[employeeId]?.PositionRank
                  "
                  v-model="editTemplate.PositionRank"
                  class="input input-bordered input-xs w-full max-w-xs"
                />
              </p>
            </div>
            <div class="flex flex-col m-5">
              <p class="m-2">PainPoint</p>
              <p class="m-2 text-xs font-[10]">
                <input
                  type="text"
                  :placeholder="
                    fetchData === null ? '' : fetchData[employeeId]?.PainPoint
                  "
                  v-model="editTemplate.PainPoint"
                  class="input input-bordered input-xs w-full max-w-xs"
                />
              </p>
            </div>
            <div class="flex flex-col m-5">
              <p class="m-2">Goal And Need</p>
              <p class="m-2 text-xs font-[10]">
                <input
                  type="text"
                  :placeholder="
                    fetchData === null ? '' : fetchData[employeeId]?.GoalAndNeed
                  "
                  v-model="editTemplate.GoalAndNeed"
                  class="input input-bordered input-xs w-full max-w-xs"
                />
              </p>
            </div>
          </div>
          <div class="divider"></div>
          <div class="flex flex-row justify-evenly">
            <textarea class="textarea textarea-bordered w-full">
Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto libero dolorem placeat, incidunt, provident aut, corrupti beatae quam voluptatum repellendus dolorum velit quisquam excepturi quae laborum nam accusamus unde sunt?</textarea
            >
          </div>
          <div class="flex flex-row items-center m-10">
            <p class="mr-5 mb-1">Coworker</p>
            <progress
              class="progress progress-primary w-50 mr-20"
              :value="fetchData[employeeId]?.Rating.coworker"
              max="10"
            ></progress>
            <p class="mr-5 mb-1">Environment</p>
            <progress
              class="progress progress-primary w-50 mr-20"
              :value="fetchData[employeeId]?.Rating.environment"
              max="10"
            ></progress>
            <p class="mr-5 mb-1">Responsibility</p>
            <progress
              class="progress progress-primary w-50 mr-20"
              :value="fetchData[employeeId]?.Rating.responsibility"
              max="10"
            ></progress>
            <router-link
              to="/"
              class="btn btn-ghost text-xl mr-2"
              @click="editJsonData()"
              >UPDATE</router-link
            >
            <router-link
              to="/"
              class="btn btn-ghost text-xl ml-2"
              @click="deleteJsonData()"
              >DELETE</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
