<template>
    <div class="xl:ml-10 xl:mr-10 2xl:ml-32 2xl:mr-32">
        <div class="flex justify-center">
            <div class="p-6 flex flex-col md:flex-row items-start ">
                <img class="w-64 h-auto rounded" src="https://metiz.vn/media/poster_film/drm24_-_poster.jpg"
                    alt="Movie Poster">
                <div class="ml-0 md:ml-6 mt-6 md:mt-0 flex-1">
                    <h2 class="text-2xl font-bold">THE MOVIE DORAEMON - NOBITA AND THE EARTH SYMPHONY (DUB) (All ages)
                    </h2>
                    <p class="mt-5 text-lg"><strong>Genre: </strong>Animation</p>
                    <p class="text-lg"><strong>Opening: </strong>May 24, 2024</p>
                    <p class="text-lg"><strong>Duration:</strong> 115 minutes</p>
                    <p class="mt-2 text-lg"><strong>Rated:</strong> <span class="text-green-600">P - ALL AGES</span></p>
                    <div class="mt-6">
                        <button @click="outerVisible = true"
                            class="bg-colers_button-25 text-white px-4 py-2 rounded hover:bg-colers_button-50">BOOK TICKETS</button>
                    </div>
                </div>

            </div>
        </div>
        <div>
            <p class="text-gray-600 mt-2">FUJIKO F FUJIO 90TH ANNIVERSARY WORK Preparing for the school concert,
                Nobita
                practicing the flute - an instrument he is terrible at. Delighted by Nobita's odd "No" note, Micca - the
                mysterious girl
                hidden
                invited Doraemon, Nobita and a group of friends to "Farre" - a music palace located on a planet where
                music
                music
                will turn into energy. In order to save this palace, Micca is searching for "virtuoso" - the will music
                master
                together
                I perform! With the magical treasure "music specialist certificate", Doraemon and his friends chose
                music
                instrument,
                together with Micca, gradually restoring the palace. However, a terrifying living thing erases the
                musical number
                from the approaching world, the Earth is falling into danger...! Can the little friends save?
                Okay
                "the future of music" and the whole planet?

                One of the most anticipated animated series at the present time is Doraemon Movie -
                Nobita
                and Earth Symphony is the rising name. More than just content delivered to the mail
                dilate,
                The content in the film also brings many profound and meaningful messages.
            </p>
            <p class="text-gray-600 text-xl mt-2"><strong>Main content of the Movie Doraemon - Nobita and the transcript
                    enjoy the Earth</strong></p>
            <p class="mt-2"><strong>Synopsis</strong></p>
            <p class="text-gray-600 mt-2">The movie Doraemon - Nobita and the Earth Symphony is an open Anime movie
                head
                by Nobita's trouble when participating in music practice for an upcoming performance at school. Although
                course,
                With limited musical ability, he was laughed at by his friends. But the music seems to be
                "Are not
                "I can't hear it" moves a secret girl, Mika. She likes this relaxing and carefree music
                should
                invite you and your friends to the Fare Hall of Fame. This is the center of the music-centric planet
                do
                energy to maintain.

                This place is facing a great danger, so Mika needs to find a new performer to save the place
                This.
                Doraemon used “Musician License' to help. Although this place was restored, one creature
                scary
                wants to erase music from the world. And the earth is the target, is the "future" of music in
                left
                Will the land be saved?
            </p>
            <p class="text-gray-600 text-xl mt-2"><strong>Movie Trailer Doraemon - Nobita and the Earth Symphony
                    Bridge</strong></p>
            <div class="aspect-video">
                <iframe class="w-full h-full lg:w-[880px] lg:h-[495px] mx-auto mt-10"
                    src="https://www.youtube.com/embed/q4Zv8ZzPXF4?si=bwUEDPovuKBs4nVr" title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
        </div>
        <!-- Movie ticket booking method -->
        <el-dialog class="min-w-[90%] md:min-w-[80%] !mx-auto" v-model="outerVisible">
            <template #header>
                <div class="text-2xl text-orange-600 font-medium">Showtimes</div>
            </template>
            <hr class="border-b border-orange-600 w-full mb-3">

            <!-- Calendar Selection -->
            <h3 class="text-xl font-medium mb-2">Select show date</h3>
            <div class="flex justify-center mb-4 mt-7">
                <div class="flex flex-wrap space-x-4 space-y-4 justify-center">
                    <button class="px-4 py-2 rounded-full bg-orange-500 text-white">Wednesday<br>29/05</button>
                    <button class="px-4 py-2 rounded-full bg-gray-200">Thursday<br>30/05</button>
                    <button class="px-4 py-2 rounded-full bg-gray-200">Friday<br>31/05</button>
                    <button class="px-4 py-2 rounded-full bg-gray-200">Saturday<br>01/06</button>
                    <button class="px-4 py-2 rounded-full bg-gray-200">Sunday<br>02/06</button>
                    <button class="px-4 py-2 rounded-full bg-gray-200">Monday<br>03/06</button>
                    <button class="px-4 py-2 rounded-full bg-gray-200">Tuesday<br>04/06</button>
                </div>
            </div>


            <!-- Showtime Selection -->
            <div class="mt-20">
                <hr class="border-b border-orange-600 w-full mb-3">
                <h3 class="text-xl  font-medium mb-2">Select showtime</h3>
                <p class="font-bold text-xl mb-2 mt-4 text-center">THE MOVIE DORAEMON - NOBITA AND THE EARTH SYMPHONY (DUB) (P)
                </p>
                <div class="md:flex md:items-center md:mb-4 md:mt-5 md:justify-center md:w-full">
                    <img src="https://metiz.vn/media/poster_film/drm24_-_poster.jpg" alt="Doraemon Movie"
                        class="w-[195px] h-[265px] xl:w-[185px] xl:h-[245px] md:mr-4 mt-7 mx-auto">
                    <div class="">
                        <button class="p-2 ml-2 mr-2 mt-2 mb-2 border rounded text-center">14:20-16:15<br>Cinema Room
                            02</button>
                        <button class="p-2 ml-2 mr-2 mt-2 mb-2 border rounded text-center">15:35-17:30<br>Cinema Room
                            05</button>
                        <button class="p-2 ml-2 mr-2 mt-2 mb-2 border rounded text-center">17:05-19:00<br>Cinema Room
                            04</button>
                        <button class="p-2 ml-2 mr-2 mt-2 mb-2 border rounded text-center">17:40-19:35<br>Cinema Room
                            05</button>
                        <button class="p-2 ml-2 mr-2 mt-2 mb-2 border rounded text-center">18:20-20:15<br>Cinema Room
                            03</button>
                        <button class="p-2 ml-2 mr-2 mt-2 mb-2 border rounded text-center">19:00-20:55<br>Cinema Room
                            02</button>
                        <button class="p-2 ml-2 mr-2 mt-2 mb-2 border rounded text-center">19:45-21:40<br>Cinema Room
                            05</button>
                        <button class="p-2 ml-2 mr-2 mt-2 mb-2 border rounded text-center">20:10-22:55<br>Cinema Room
                            01</button>
                    </div>
                </div>
            </div>
            <router-link :to="{ name: 'booking' }" class="mt-2 mb-3 flex justify-center">
                <button class="bg-colers_button-25 text-white px-4 py-2 rounded hover:bg-colers_button-50">BOOK TICKETS</button>
            </router-link>
        </el-dialog>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const outerVisible = ref(false)
const innerVisible = ref(false)
</script>