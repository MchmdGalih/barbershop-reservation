<template>
    <div class="min-h-screen w-full ">
        <div class="grid grid-cols-1 md:grid-cols-2">
            <section class="w-full h-screen  relative md:block hidden ">
                <img src="../assets/images/auth-bg.jpg" class="object-contain md:object-cover w-full h-full  object-center " alt="barber-shop" />
            </section>
            <section class="w-full h-screen py-4 px-3 flex justify-center items-center">
                <slot/>
            </section>
        </div>
    </div>
</template

