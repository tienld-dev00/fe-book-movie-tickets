<template>


    <div class="max-w-6xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
        <!-- Seat Selection Header -->
        <h2 class="text-2xl font-bold mb-6">Chọn ghế</h2>



        <!-- Seat Grid -->
        <div class="lg:flex">
            <div class="lg:w-3/4">
                <!-- Screen -->
                <div class="text-center mb-4">
                    <div class="bg-gray-300 h-10 w-full rounded-t-lg flex items-center justify-center">MÀN HÌNH</div>
                </div>
                <div class="flex justify-center mb-1">
                    <div class="p-1">
                        <button class="w-10 h-10 rounded text-sm bg-gray-300 hover:bg-gray-400">A1</button>
                    </div>
                    <div class="p-1">
                        <button class="w-10 h-10 rounded text-sm bg-green-500 cursor-not-allowed">A2</button>
                    </div>
                    <!-- Add more seats as needed -->
                </div>
                <!-- Add more rows as needed -->
            </div>
            <div class="lg:w-1/4 lg:pl-4">
                <img src="https://metiz.vn/media/poster_film/drm24_-_poster.jpg" alt="Doraemon Movie"
                    class="w-[250px] mb-4 mx-auto">
                <p class="font-bold mb-2">Phim: PHIM ĐIỆN ẢNH DORAEMON - NOBITA VÀ BẢN GIAO HƯỞNG ĐỊA CẦU (LỒNG TIẾNG)
                    (P)</p>
                <p>Ngày: 29/05/2024</p>
                <p>Thời gian: 15:35-17:30</p>
                <p>Ghế: 0</p>
                <p>Tổng tiền: 0 VND</p>

                <!-- Seat Legend -->
                <div class="mt-6">
                    <div class="flex items-center mb-2">
                        <div class="w-6 h-6 bg-green-500 mr-2"></div>
                        <span>Ghế đã đặt</span>
                    </div>
                    <div class="flex items-center mb-2">
                        <div class="w-6 h-6 bg-yellow-500 mr-2"></div>
                        <span>Ghế đang chọn</span>
                    </div>
                    <div class="flex items-center mb-2">
                        <div class="w-6 h-6 bg-gray-300 mr-2"></div>
                        <span>Ghế trống</span>
                    </div>

                </div>
            </div>
        </div>

        <!-- Buttons -->
        <div class="mt-10 flex justify-between">
            <router-link :to="{ name: 'movieIsShowing', query: { openModal: true } }">
                <button class="bg-gray-500 text-white px-4 py-2 rounded">Đổi suất chiếu</button>
            </router-link>
            <button class="bg-yellow-600 text-white px-4 py-2 rounded">Tiếp tục</button>
        </div>
    </div>
</template>