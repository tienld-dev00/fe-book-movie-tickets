<template>
    <div class="flex justify-center">
        <div class="p-6 flex flex-col md:flex-row items-start ">
            <img class="w-64 h-auto rounded " src="https://metiz.vn/media/poster_film/drm24_-_poster.jpg"
                alt="Movie Poster">
            <div class="ml-0 md:ml-6 mt-6 md:mt-0 flex-1">
                <h2 class="text-2xl font-bold">PHIM ĐIỆN ẢNH DORAEMON - NOBITA VÀ BẢN GIAO HƯỞNG ĐỊA CẦU (LỒNG TIẾNG)
                    (P)</h2>
                <p class="mt-5"><strong>Thể loại:</strong> Hoạt hình</p>
                <p><strong>Khởi chiếu:</strong> 24-05-2024</p>
                <p><strong>Thời lượng:</strong> 115 phút</p>
                <p class="mt-2"><strong>Rated:</strong> <span class="text-green-600">P - PHIM ĐƯỢC PHÉP PHỔ BIẾN RỘNG
                        RÃI ĐẾN MỌI ĐỐI TƯỢNG.</span></p>
                <div class="mt-4 flex space-x-4">

                </div>
                <div class="mt-6 flex space-x-4">
                    <button class="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">Chi tiết</button>
                    <button class="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">Trailer</button>
                    <button class="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">Đánh giá</button>
                </div>
            </div>
            <div class="mt-6 md:mt-0 md:ml-6">
                <button @click="outerVisible = true"
                    class="bg-gray-950 text-white px-6 py-2 rounded hover:bg-gray-800">ĐẶT VÉ</button>
            </div>
        </div>
    </div>
    <div>
        <p class="text-gray-600 mt-2">TÁC PHẨM KỶ NIỆM 90 NĂM FUJIKO F FUJIO Chuẩn bị cho buổi hòa nhạc ở trường, Nobita
            đang tập thổi sáo - nhạc cụ mà cậu dở tệ. Thích thú trước nốt "No" lạc quẻ của Nobita, Micca - cô bé bí ẩn
            đã mời Doraemon, Nobita cùng nhóm bạn đến "Farre" - Cung điện âm nhạc tọa lạc trên một hành tinh nơi âm nhạc
            sẽ hóa thành năng lượng. Nhằm cứu cung điện này, Micca đang tìm kiếm "virtuoso" - bậc thầy âm nhạc sẽ cùng
            mình biểu diễn! Với bảo bối thần kì "chứng chỉ chuyên viên âm nhạc", Doraemon và các bạn đã chọn nhạc cụ,
            cùng Micca hòa tấu, từng bước khôi phục cung điện. Tuy nhiên, một vật thể sống đáng sợ sẽ xóa số âm nhạc
            khỏi thế giới đang đến gần, Trái Đất đang rơi vào nguy hiểm... ! Liệu những người bạn nhỏ có thể cứu được
            "tương lai âm nhạc" và cả địa cầu này?

            Một trong những bộ hoạt hình được mong chờ nhất trong thời gian hiện tại thì Phim Điện Ảnh Doraemon - Nobita
            và bản giao hưởng Địa Cầu chính là cái tên đang lên ngôi. Không chỉ là một nội dung mang đến việc thư giãn,
            những nội dung trong phim còn mang đến nhiều thông điệp sâu sắc và ý nghĩa.
        </p>
        <p class="text-gray-600 text-xl mt-2"><strong>Nội dung chính của Phim Điện Ảnh Doraemon - Nobita và bản giao
                hưởng Địa Cầu</strong></p>
        <p class="mt-2"><strong>Tóm tắt nội dung</strong></p>
        <p class="text-gray-600 mt-2">TPhim điện ảnh Doraemon - Nobita và bản giao hưởng Địa Cầu là bộ phim Anime mở đầu
            bằng một rắc rối của Nobita về khi tham gia buổi tập nhạc cho buổi trình diễn sắp tới ở trường. Tuy nhiên,
            với khả năng âm nhạc hạn chế đã làm cho cậu chàng bị bạn bè cười chê. Nhưng âm nhạc tưởng chừng là “không
            thể nghe nổi” này, lại làm cảm động một cô gái bí mật, Mika. Cô thích thứ âm nhạc thư giãn và vô tư này nên
            mời cậu và những người bạn đến Đại Sảnh Danh Vọng Fare. Đây chính là trung tâm của hành tinh lấy âm nhạc làm
            năng lượng để duy trì.

            Nơi đây đang đứng trước một nguy cơ lớn, nên Mika cần tìm một người biểu diễn mới mình để cứu lấy nơi này.
            Doraemon đã sử dụng “Giấy phép Nhạc sĩ' để giúp đỡ. Mặc dù khôi phục được nơi này nhưng một sinh vật đáng sợ
            đang muốn xóa sổ âm nhạc khỏi thế giới. Và trái đất đang là mục tiêu, liệu “tương lai” của âm nhạc ở trái
            đất có được cứu?
        </p>
        <p class="text-gray-600 text-xl mt-2"><strong>Trailer Phim Điện Ảnh Doraemon - Nobita và bản giao hưởng Địa
                Cầu</strong></p>
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
            <p class="font-bold text-xl mb-2 mt-4 text-center">PHIM ĐIỆN ẢNH DORAEMON - NOBITA VÀ BẢN GIAO HƯỞNG ĐỊA CẦU
                (LỒNG
                TIẾNG) (P)
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
            <button class="bg-gray-950 text-white px-4 py-2 rounded hover:bg-blue-600">
                ĐẶT VÉ
            </button>
        </router-link>
    </el-dialog>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const outerVisible = ref(false)
const innerVisible = ref(false)
</script>