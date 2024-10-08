<template>
    <v-card class="mx-auto my-5" max-width="500" elevation="0">
        <v-card-title class="text-h5 d-flex justify-center">Welcome to Cafe Management</v-card-title>
        <v-card-subtitle class="d-flex justify-center">
            Manage your cafe's products and orders from this dashboard.
        </v-card-subtitle>
        <v-card-actions class="d-flex justify-center">
            <v-btn color="primary" @click="goToDashboard" variant="outlined" rounded="">Go to Dashboard</v-btn>
        </v-card-actions>
    </v-card>
</template>