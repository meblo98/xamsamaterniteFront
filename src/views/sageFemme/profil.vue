<template>
    <Layout>
        <div class="container">
            <Profil/>
        </div>
    </Layout>
</template>

<script>
import Layout from '@/components/layouts/Layout.vue';
import Profil from '@/components/profil.vue';


export default{
    components: {
        Layout,
        Profil
    }
}
</script>