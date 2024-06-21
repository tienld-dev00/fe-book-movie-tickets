<template>
    <div class="flex flex-col gap-2 p-3 overflow-auto">
        <div class="flex justify-between">
            <el-input style="width: 240px" placeholder="Type something">
                <template #prefix>
                    <el-icon class="el-input__icon"><search /></el-icon>
                </template>
            </el-input>
            <el-button type="primary" small>New Movie</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column fixed prop="id" label="Id" width="150" />
            <el-table-column prop="name" label="Name" min-width="300" />
            <el-table-column prop="image" label="Thumbnail" width="120">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <el-image :src="scope.row.image" />
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="duration" label="Duration" width="120" />
            <el-table-column prop="categories" label="Categories" min-width="120" />
            <el-table-column prop="age_limit" label="Age limit" width="120" />
            <el-table-column prop="release_date" label="Release date" width="120" />
            <el-table-column fixed="right" label="Operations" width="120">
                <template #default>
                    <el-button link type="primary" size="small"> Detail </el-button>
                    <el-button link type="primary" size="small">Edit</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="1000" />
    </div>
</template>

<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'
const tableData = [
    {
        id: 1,
        name: 'Asterix at the Olympic Games (Astérix aux jeux olympiques)',
        image: 'http://dummyimage.com/164x100.png/ff4444/ffffff',
        trailer: 'http://dummyimage.com/199x100.png/ff4444/ffffff',
        categories: 'Adventure|Children|Comedy|Fantasy',
        description: 'Fracture of unspecified skull and facial bones',
        duration: 9443702,
        age_limit: 95,
        release_date: '13/01/2024',
        created_at: '01/06/2023',
        updated_at: '15/01/2024',
    },
    {
        id: 2,
        name: 'The 21 Carat Snatch',
        image: 'http://dummyimage.com/249x100.png/cc0000/ffffff',
        trailer: 'http://dummyimage.com/193x100.png/dddddd/000000',
        categories: 'Crime',
        description: 'Other pruritus',
        duration: 2714588,
        age_limit: 19,
        release_date: '31/10/2023',
        created_at: '27/04/2024',
        updated_at: '04/08/2023',
    },
    {
        id: 3,
        name: 'Advise and Consent',
        image: 'http://dummyimage.com/229x100.png/dddddd/000000',
        trailer: 'http://dummyimage.com/225x100.png/cc0000/ffffff',
        categories: 'Drama',
        description: 'Osteitis condensans, left upper arm',
        duration: 1792699,
        age_limit: 46,
        release_date: '02/02/2024',
        created_at: '20/11/2023',
        updated_at: '24/03/2024',
    },
    {
        id: 4,
        name: 'Even Cowgirls Get the Blues',
        image: 'http://dummyimage.com/248x100.png/dddddd/000000',
        trailer: 'http://dummyimage.com/202x100.png/dddddd/000000',
        categories: 'Comedy|Romance',
        description:
            'Injury of left internal carotid artery, intracranial portion, not elsewhere classified with loss of consciousness of 6 hours to 24 hours, subsequent encounter',
        duration: 5572365,
        age_limit: 9,
        release_date: '12/03/2024',
        created_at: '12/10/2023',
        updated_at: '01/02/2024',
    },
    {
        id: 5,
        name: 'One-Eyed Jacks',
        image: 'http://dummyimage.com/161x100.png/dddddd/000000',
        trailer: 'http://dummyimage.com/202x100.png/dddddd/000000',
        categories: 'Western',
        description: 'Other disorders of glucosaminoglycan metabolism',
        duration: 9354021,
        age_limit: 60,
        release_date: '12/03/2024',
        created_at: '30/10/2023',
        updated_at: '23/03/2024',
    },
    {
        id: 6,
        name: 'Another Woman',
        image: 'http://dummyimage.com/249x100.png/ff4444/ffffff',
        trailer: 'http://dummyimage.com/177x100.png/dddddd/000000',
        categories: 'Drama',
        description: 'Unspecified corneal neovascularization, unspecified eye',
        duration: 1442037,
        age_limit: 94,
        release_date: '05/01/2024',
        created_at: '17/05/2024',
        updated_at: '13/04/2024',
    },
    {
        id: 7,
        name: 'Cloak and Dagger',
        image: 'http://dummyimage.com/162x100.png/5fa2dd/ffffff',
        trailer: 'http://dummyimage.com/246x100.png/dddddd/000000',
        categories: 'Drama|Romance',
        description:
            'Unspecified injury of extensor muscle, fascia and tendon of left little finger at wrist and hand level',
        duration: 4429366,
        age_limit: 44,
        release_date: '21/08/2023',
        created_at: '03/12/2023',
        updated_at: '25/08/2023',
    },
    {
        id: 8,
        name: 'Brainstorm',
        image: 'http://dummyimage.com/184x100.png/dddddd/000000',
        trailer: 'http://dummyimage.com/228x100.png/5fa2dd/ffffff',
        categories: 'Sci-Fi|Thriller',
        description:
            'Nondisplaced fracture of proximal third of navicular [scaphoid] bone of unspecified wrist, subsequent encounter for fracture with malunion',
        duration: 3732336,
        age_limit: 100,
        release_date: '10/12/2023',
        created_at: '18/06/2023',
        updated_at: '04/06/2023',
    },
    {
        id: 9,
        name: 'Remember Me (Ricordati di me)',
        image: 'http://dummyimage.com/160x100.png/cc0000/ffffff',
        trailer: 'http://dummyimage.com/149x100.png/cc0000/ffffff',
        categories: 'Comedy|Drama|Romance',
        description: 'Accidental malfunction from other specified firearms, sequela',
        duration: 4475162,
        age_limit: 10,
        release_date: '14/05/2024',
        created_at: '27/07/2023',
        updated_at: '13/07/2023',
    },
    {
        id: 10,
        name: 'Hitting Home',
        image: 'http://dummyimage.com/145x100.png/5fa2dd/ffffff',
        trailer: 'http://dummyimage.com/189x100.png/dddddd/000000',
        categories: 'Drama|Romance|Thriller',
        description: 'War operations involving chemical weapons and other forms of unconventional warfare',
        duration: 6928626,
        age_limit: 29,
        release_date: '02/08/2023',
        created_at: '08/10/2023',
        updated_at: '17/02/2024',
    },
    {
        id: 11,
        name: 'Fall of the Roman Empire, The',
        image: 'http://dummyimage.com/223x100.png/dddddd/000000',
        trailer: 'http://dummyimage.com/116x100.png/dddddd/000000',
        categories: 'Drama',
        description:
            'Unspecified injury of unspecified blood vessel at abdomen, lower back and pelvis level, subsequent encounter',
        duration: 8640536,
        age_limit: 49,
        release_date: '14/10/2023',
        created_at: '14/02/2024',
        updated_at: '04/12/2023',
    },
    {
        id: 12,
        name: 'Cinderella III: A Twist in Time',
        image: 'http://dummyimage.com/171x100.png/dddddd/000000',
        trailer: 'http://dummyimage.com/139x100.png/ff4444/ffffff',
        categories: 'Animation|Children|Fantasy|Romance',
        description: 'Unspecified injury of left renal vein, subsequent encounter',
        duration: 9334447,
        age_limit: 43,
        release_date: '29/03/2024',
        created_at: '25/03/2024',
        updated_at: '21/01/2024',
    },
    {
        id: 13,
        name: 'The Vexxer',
        image: 'http://dummyimage.com/240x100.png/ff4444/ffffff',
        trailer: 'http://dummyimage.com/242x100.png/ff4444/ffffff',
        categories: 'Comedy|Crime',
        description: 'Burn of internal genitourinary organs, initial encounter',
        duration: 691497,
        age_limit: 58,
        release_date: '29/05/2023',
        created_at: '24/08/2023',
        updated_at: '01/04/2024',
    },
    {
        id: 14,
        name: 'Major League',
        image: 'http://dummyimage.com/137x100.png/ff4444/ffffff',
        trailer: 'http://dummyimage.com/138x100.png/ff4444/ffffff',
        categories: 'Comedy',
        description:
            'Motorcycle passenger injured in collision with pedal cycle in traffic accident, initial encounter',
        duration: 6281649,
        age_limit: 90,
        release_date: '31/10/2023',
        created_at: '01/01/2024',
        updated_at: '23/03/2024',
    },
    {
        id: 15,
        name: 'Enlightenment Guaranteed (Erleuchtung Garantiert)',
        image: 'http://dummyimage.com/155x100.png/cc0000/ffffff',
        trailer: 'http://dummyimage.com/120x100.png/dddddd/000000',
        categories: 'Comedy|Drama',
        description: 'Other subluxation of left foot, initial encounter',
        duration: 6491894,
        age_limit: 7,
        release_date: '20/08/2023',
        created_at: '21/10/2023',
        updated_at: '07/04/2024',
    },
    {
        id: 16,
        name: 'Secrets & Lies',
        image: 'http://dummyimage.com/169x100.png/ff4444/ffffff',
        trailer: 'http://dummyimage.com/142x100.png/dddddd/000000',
        categories: 'Drama',
        description: 'Puncture wound with foreign body, unspecified thigh, initial encounter',
        duration: 9908057,
        age_limit: 47,
        release_date: '05/11/2023',
        created_at: '12/03/2024',
        updated_at: '24/11/2023',
    },
    {
        id: 17,
        name: 'Immediate Family',
        image: 'http://dummyimage.com/108x100.png/cc0000/ffffff',
        trailer: 'http://dummyimage.com/185x100.png/ff4444/ffffff',
        categories: 'Drama',
        description: 'Superficial frostbite of hand',
        duration: 7114470,
        age_limit: 62,
        release_date: '28/04/2024',
        created_at: '28/09/2023',
        updated_at: '09/12/2023',
    },
    {
        id: 18,
        name: 'Of Mice and Men',
        image: 'http://dummyimage.com/128x100.png/5fa2dd/ffffff',
        trailer: 'http://dummyimage.com/109x100.png/ff4444/ffffff',
        categories: 'Drama',
        description: 'Displacement of urinary electronic stimulator device, initial encounter',
        duration: 3921782,
        age_limit: 55,
        release_date: '21/03/2024',
        created_at: '20/08/2023',
        updated_at: '27/01/2024',
    },
    {
        id: 19,
        name: 'Ghost Writer, The',
        image: 'http://dummyimage.com/149x100.png/5fa2dd/ffffff',
        trailer: 'http://dummyimage.com/227x100.png/dddddd/000000',
        categories: 'Drama|Mystery|Thriller',
        description:
            'Fall into natural body of water striking water surface causing drowning and submersion, initial encounter',
        duration: 8266235,
        age_limit: 38,
        release_date: '20/12/2023',
        created_at: '13/06/2023',
        updated_at: '22/10/2023',
    },
    {
        id: 20,
        name: 'I Bought a Vampire Motorcycle',
        image: 'http://dummyimage.com/226x100.png/dddddd/000000',
        trailer: 'http://dummyimage.com/207x100.png/ff4444/ffffff',
        categories: 'Comedy|Horror',
        description: 'Laceration with foreign body of lower back and pelvis with penetration into retroperitoneum',
        duration: 9126575,
        age_limit: 15,
        release_date: '18/06/2023',
        created_at: '01/07/2023',
        updated_at: '11/06/2023',
    },
]
</script>
