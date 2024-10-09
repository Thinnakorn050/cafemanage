<template>
    <v-container>
      <!-- Title and Progress Bar -->
      <v-card-text class="font-weight-bold ml-n3 mt-n6" style="font-size: x-large;">
        <span>Manage Orders</span>
        <v-progress-linear color="brown-darken-2" class="mt-2" model-value="100" rounded />
      </v-card-text>
  
      <!-- List of Orders -->
      <v-row>
        <v-col v-for="(order, index) in orders" :key="index" cols="12" md="4" sm="6">
          <v-card>
            <v-card-title>
              <p class="font-weight-bold" style="font-size: x-large;">
                Order #{{ order.order_id }}
              </p>
            </v-card-title>
            <v-card-text>
              <p class="font-weight-normal" style="font-size: large;">
                Customer ID: {{ order.user_id }}
              </p>
              <p class="font-weight-normal" style="font-size: large;">
                Order Date: {{ order.order_date }}
              </p>
              <p class="font-weight-normal" style="font-size: large;">
                Total Price: {{ order.total_price | currency }} ฿
              </p>
              <p class="font-weight-normal" style="font-size: large;">
                Payment Status: {{ order.payment_status }}
              </p>
            </v-card-text>
            <v-card-actions class="mx-1 mb-2">
              <v-spacer />
              <v-btn color="blue" @click="editOrder(order)" variant="outlined" rounded>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn color="red" @click="deleteOrder(order.order_id)" variant="outlined" rounded>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
  
      <!-- Dialog for Editing Order -->
      <v-dialog v-model="dialog" max-width="500px" persistent>
        <v-card elevation="0" rounded="xl">
          <v-card-title class="mx-3 my-2">
            <span>{{ isEdit ? 'Edit Order' : 'Add New Order' }}</span>
            <v-progress-linear color="brown-darken-2" model-value="100" rounded />
          </v-card-title>
          <v-card-text class="mt-n3 mb-n4">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field v-model="order.customerName" variant="outlined" rounded label="User ID"
                            :rules="nameRules" required></v-text-field>
              <v-text-field v-model="order.totalPrice" variant="outlined" rounded label="Total Price"
                            type="number" :rules="priceRules" required></v-text-field>
              <v-textarea v-model="order.description" variant="outlined" rounded label="Description"
                          :rules="descriptionRules"></v-textarea>
              <v-select v-model="order.paymentStatus" :items="['pending', 'completed', 'cancelled']"
                        label="Payment Status" required></v-select>
            </v-form>
          </v-card-text>
          <v-card-actions class="mt-n4">
            <v-spacer />
            <v-btn text @click="closeDialog" rounded color="black">Cancel</v-btn>
            <v-btn color="black" variant="flat" rounded @click="submitOrder" :disabled="!valid">Submit</v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        orders: [], // รายการคำสั่งซื้อ
        dialog: false, // สำหรับการแสดงหรือซ่อน Dialog
        isEdit: false, // เช็คว่าเป็นการแก้ไขหรือเพิ่มคำสั่งซื้อใหม่
        order: {
          order_id: null,
          customerName: '',
          totalPrice: '',
          description: '',
          paymentStatus: ''
        },
        valid: false, // ตรวจสอบฟอร์มว่าถูกต้องไหม
        nameRules: [(v) => !!v || 'Customer name is required'],
        priceRules: [(v) => !!v || 'Price is required'],
        descriptionRules: [(v) => !!v || 'Description is required'],
      };
    },
    methods: {
      // ฟังก์ชันโหลดรายการคำสั่งซื้อจาก API
      fetchOrders() {
        fetch('http://localhost:4000/api/orders')
          .then(response => response.json())
          .then(data => {
            this.orders = data; // บันทึกข้อมูลคำสั่งซื้อในตัวแปร orders
          })
          .catch(error => {
            console.error('Error fetching orders:', error);
          });
      },
  
      // ฟังก์ชันเพิ่มคำสั่งซื้อใหม่
      addOrder() {
        fetch('http://localhost:4000/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.order)
        })
          .then(response => response.json())
          .then(data => {
            this.fetchOrders(); // รีเฟรชรายการหลังเพิ่มคำสั่งซื้อ
            this.closeDialog();
          })
          .catch(error => {
            console.error('Error adding order:', error);
          });
      },
  
      // ฟังก์ชันอัปเดตคำสั่งซื้อ
      updateOrder() {
        if (!this.order.order_id) {
          console.error('Order ID is missing');
          return;
        }
  
        fetch(`http://localhost:4000/api/orders/${this.order.order_id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            customerName: this.order.customerName,
            totalPrice: this.order.totalPrice,
            description: this.order.description,
            paymentStatus: this.order.paymentStatus,
          })
        })
          .then(response => response.json())
          .then(data => {
            if (data.success) {
              this.fetchOrders(); // รีเฟรชรายการหลังอัปเดตคำสั่งซื้อ
              this.closeDialog();
            } else {
              console.error('Failed to update order:', data.message || data);
            }
          })
          .catch(error => {
            console.error('Error updating order:', error);
          });
      },
  
      // ฟังก์ชันแก้ไขคำสั่งซื้อ
      editOrder(order) {
        if (order && order.order_id) {
          this.isEdit = true; // บอกว่าเป็นการแก้ไข
          this.order = { ...order }; // คัดลอกข้อมูลคำสั่งซื้อที่เลือกมาแสดงในฟอร์ม
          this.dialog = true; // แสดง Dialog สำหรับการแก้ไข
        } else {
          console.error('Invalid order data:', order);
        }
      },
  
      // ฟังก์ชันที่เรียกใช้ในการตรวจสอบฟอร์มและส่งคำสั่งซื้อ
      submitOrder() {
        if (this.$refs.form.validate()) {
          // ถ้าเป็นการแก้ไขคำสั่งซื้อ
          if (this.isEdit) {
            this.updateOrder();
          }
          // ถ้าเป็นการเพิ่มคำสั่งซื้อ
          else {
            this.addOrder();
          }
        } else {
          console.log('Form is invalid');
        }
      },
  
      // ฟังก์ชันปิด dialog
      closeDialog() {
        this.dialog = false;
        this.order = {
          order_id: null,
          customerName: '',
          totalPrice: '',
          description: '',
          paymentStatus: ''
        }; // รีเซ็ตข้อมูลหลังจากปิด dialog
      },
  
      // ฟังก์ชันลบคำสั่งซื้อ
      deleteOrder(orderId) {
        fetch(`http://localhost:4000/api/orders/${orderId}`, {
          method: 'DELETE',
        })
          .then(response => response.json())
          .then(data => {
            if (data.success) {
              this.fetchOrders(); // รีเฟรชรายการหลังจากลบคำสั่งซื้อ
            } else {
              console.error('Failed to delete order:', data.message || data);
            }
          })
          .catch(error => {
            console.error('Error deleting order:', error);
          });
      },
    },
    created() {
      this.fetchOrders(); // โหลดรายการคำสั่งซื้อเมื่อ component ถูกสร้าง
    }
  };
  </script>
  