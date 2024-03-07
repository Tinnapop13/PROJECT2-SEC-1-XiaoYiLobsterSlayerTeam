<script setup>
import { ref } from "vue";
import json from "../../data/db.json";

const personColor = () => {};
</script>

<template>
  <div class="border border-base-300 h-screen w-screen">
    <div class="navbar bg-base-100">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl">HOME</a>
        <a class="btn btn-ghost text-xl">STATISTIC</a>
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
              <img :src="json[0].LinkImage" />
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
            >{{ json[0].FakeName }}</span
          >
          <div class="rounded-sm overflow-hidden m-6">
            <img :src="json[0].LinkImage" />
          </div>
        </div>

        <div class="flex w-[70vw] flex-col">
          <div class="flex flex-row justify-evenly">
            <div class="flex flex-col m-5">
              <p class="m-2">Age</p>
              <p class="m-2 text-xs font-[10]">{{ json[0].Age }}</p>
            </div>
            <div class="flex flex-col m-5">
              <p class="m-2">Rank</p>
              <p class="m-2 text-xs font-[10]">{{ json[0].PositionRank }}</p>
            </div>
            <div class="flex flex-col m-5">
              <p class="m-2">PainPoint</p>
              <p class="m-2 text-xs font-[10]">{{ json[0].PainPoint }}</p>
            </div>
            <div class="flex flex-col m-5">
              <p class="m-2">Goal And Need</p>
              <p class="m-2 text-xs font-[10]">{{ json[0].GoalAndNeed }}</p>
            </div>
          </div>
          <div class="divider"></div>
          <div class="flex flex-row justify-evenly">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur totam similique fugiat numquam modi dolores. Delectus voluptatibus unde, aperiam, autem libero earum modi, assumenda officia dolore omnis fugit. Esse, unde.</div>
        </div>
      </div>
    </div>
  </div>
</template>
