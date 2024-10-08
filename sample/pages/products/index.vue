<template>
    <v-container>

        <v-card-text class="font-weight-bold ml-n3 mt-n6" style="font-size: x-large;">
            <span>Add Products</span>
            <v-progress-linear color="brown-darken-2" class="mt-2" model-value="100" rounded />
        </v-card-text>
      
        <!-- Button to Open Add Product Form Dialog -->
        <v-btn color="brown-darken-2" @click="openDialog" class="mb-4" icon variant="flat" rounded="xl" >
            <v-icon>mdi-plus</v-icon>
        </v-btn>

        <!-- Dialog for Adding New Product -->
        <v-dialog v-model="dialog" max-width="500px" persistent> 
            <v-card elevation="0" rounded="xl">
                <v-card-title class="mx-3 my-2">
                    <span>{{ isEdit ? 'Edit Product' : 'Add New Product' }}</span>
                    <v-progress-linear color="brown-darken-2" model-value="100" rounded />
                </v-card-title>
                <v-card-text class="mt-n3 mb-n4">
                    <!-- Product Form -->
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-text-field v-model="name" variant="outlined" rounded label="Product Name" :rules="nameRules"
                            required></v-text-field>
                        <v-text-field v-model="price" variant="outlined" rounded label="Price" type="number"
                            :rules="priceRules" required></v-text-field>
                        <v-textarea v-model="description" variant="outlined" rounded label="Description"
                            :rules="descriptionRules"></v-textarea>
                    </v-form>
                </v-card-text>
                <v-card-actions class="mt-n4">
                    <v-spacer />
                    <v-btn text @click="closeDialog" rounded color="black">Cancel</v-btn>
                    <v-btn color="black" variant="flat" rounded @click="isEdit ? updateProduct() : addProduct()"
                        :disabled="!valid">Submit</v-btn>
                    <v-spacer />
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- List of Products -->
        <v-row>
            <v-col v-for="(product, index) in products" :key="index" cols="12" md="4" sm="6">
                <v-card border="" >

                    <v-card-title>
                        <p class="font-weight-bold" style="font-size: x-large;">
                            {{ product.name }}
                        </p>
                    </v-card-title>
                    <v-card-text>
                        <p class="font-weight-normal" style="font-size: large;">{{ product.price | currency }} Bath</p>
                    </v-card-text>
                    <v-card-subtitle>{{ product.description }}</v-card-subtitle>

                    <v-card-actions class="mx-1 mb-2">
                        <v-spacer />
                        <v-btn color="blue" @click="editProduct(product)" variant="outlined" rounded class="custom-btn"> <v-icon>mdi-pencil</v-icon></v-btn>
                        <v-btn color="red" @click="deleteProduct(product.id)" variant="outlined" rounded class="custom-btn"> <v-icon >mdi-delete</v-icon></v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>


<script lang="ts" setup>
import { ref, onMounted } from 'vue';

// Define the type for a product
interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
}

// Sidebar and dialog state
const dialog = ref(false);
const valid = ref(false);
const name = ref('');
const price = ref<number | ''>('');
const description = ref('');
const isEdit = ref(false); // To track whether it's edit mode or add mode
const currentProduct = ref<Product | null>(null); // To store the product being edited

// List of products (This will be populated by the API)
const products = ref<Product[]>([]);

// Validation rules for form inputs
const nameRules = [(v: string) => !!v || 'Product name is required'];
const priceRules = [
    (v: number | '') => !!v || 'Price is required',
    (v: number | '') => (v > 0 || v === '') || 'Price must be greater than 0',
];
const descriptionRules = [(v: string) => v.length <= 200 || 'Description must be less than 200 characters'];

// Function to open the dialog
const openDialog = () => {
    dialog.value = true;
    resetForm();
    isEdit.value = false;
};

// Function to close the dialog
const closeDialog = () => {
    dialog.value = false;
    resetForm();
};

// Function to reset the form
const resetForm = () => {
    name.value = '';
    price.value = '';
    description.value = '';
};

// Function to submit the new product (API call)
const addProduct = async () => {
    try {
        const response = await fetch('http://localhost:4000/api/menu', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name.value,
                price: price.value,
                description: description.value,
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        alert('Product added successfully');
        // Fetch the updated list of products after adding a new one
        await fetchProducts();
        closeDialog();
    } catch (error) {
        console.error('Error adding product:', error);
    }
};

// Function to fetch all products (API call)
const fetchProducts = async () => {
    try {
        const response = await fetch('http://localhost:4000/api/menu');
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        products.value = data;
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

// Function to edit a product
const editProduct = (product: Product) => {
    isEdit.value = true;
    currentProduct.value = product;
    name.value = product.name;
    price.value = product.price;
    description.value = product.description;
    dialog.value = true;
};

// Function to update a product
const updateProduct = async () => {
    if (!currentProduct.value) return;

    try {
        const response = await fetch(`http://localhost:4000/api/menu/${currentProduct.value.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name.value,
                price: price.value,
                description: description.value,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to update product');
        }

        alert('Product updated successfully');
        await fetchProducts();
        closeDialog();
    } catch (error) {
        console.error('Error updating product:', error);
    }
};

// Function to delete a product
const deleteProduct = async (id: number) => {
    try {
        const response = await fetch(`http://localhost:4000/api/menu/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete product');
        }

        alert('Product deleted successfully');
        await fetchProducts();
    } catch (error) {
        console.error('Error deleting product:', error);
    }
};

// Fetch the products when the component is mounted
onMounted(() => {
    fetchProducts();
});
</script>

<style>
.custom-btn {
  padding: 4px 8px;  /* Adjust the padding for button size */ /* Adjust font size if needed */
  min-width: 2.5rem;   /* Minimum width for smaller buttons */
  height: 4rem;      /* Button height */
}
</style>