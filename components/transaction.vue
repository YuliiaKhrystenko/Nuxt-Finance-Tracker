<template>
    <div class="grid grid-cols-2 py-4 border-b border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100">
        <div class="flex items-center justify-between">

            <div class="flex items-center gap-2">
                <UIcon name="i-heroicons-arrow-up-right" class="text-green-600" />
                <div>Salary</div>
            </div>

            <div>
                <UBadge color="teal" variant="soft">Category</UBadge>
            </div>
        </div>

        <div class="flex items-center justify-end gap-2">
            <div>{{ currency }}</div>
            <div>
                <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
                    <UButton color="white" variant="ghost" trailing-icon="i-heroicons-ellipsis-horizontal"></UButton>
                </UDropdown>
            </div>
        </div>
    </div>
</template>

<script setup>
const { currency } = useCurrency(3000)
const items = [
    [{
        label: 'Edit',
        icon: 'i-heroicons-pencil-square-20-solid',
        click: () => console.log('Edit')
    },
    {
        label: 'Delete',
        icon: 'i-heroicons-trash-20-solid',
        click: () => console.log('delete')
    }]
]
</script>