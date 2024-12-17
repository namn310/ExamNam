<template>
    <!-- Modal -->
               <div v-show="visible" > 
              <div class="MODAL" >
                <div class="modalContent">
                  <div class="modal-header d-flex justify-content-between mb-2">
                    <h5 style="font-size:20px">Thông báo</h5>
                    <button id="modalClose" style="font-size: 25px;" @click="closeModal">&times;</button>
                  </div>
                  <hr>
                  <div class="modal-body text-center mt-4" style="height:70px;font-size: 19px;">
                   <slot name="modal-body"></slot>
                  </div>
                  <div class="modal-footer mt-3">
                    <div class="p-end">
                        <button class="btn btn-danger" @click="closeModal">Cancel</button>
                        <slot name="buttonConfirm"></slot>
                    </div>
                  </div>
                </div>
              </div>
              </div>
</template>
<script>
export default {
    name: 'ModalApp',
     props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    closeModal() {
      this.$emit("close");
    }
  } 
}
</script>
<style sco>
.MODAL {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modalContent{
  background: white;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  width:30%
}
.modalClose{
     position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}
</style>