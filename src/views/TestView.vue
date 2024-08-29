<template>
    <div style="margin-top:200px">
        <ul v-for="item in data" :key="item.idPro">
            <li>{{ item.idPro }}</li>
        </ul>
        <p v-if="error">{{ error }}</p>
    </div>
</template>
<script>
export default {
    data () {
        return {
            data: [],
            error:null
        }
    },
    mounted () {
        this.fetchData();
    },
    methods: {
        async fetchData () {
            try
            {
                const response = await fetch('http://localhost:8080/api.php');
                if (!response.ok)
                {
                    throw new Error('get API false');
                }
                const data = await response.json();
                this.data = data;
            }
            catch (error)
            {
                this.error = 'cos loi' + error.message;
            }
            
        }
    }
}
</script>
<style scoped>
li{
list-style-type: none;
}
</style>