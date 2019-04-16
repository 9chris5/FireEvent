<template>
    <v-container fill-height>
        <v-layout wrap fill-height>
            <v-flex lg3 class="hidden-md-and-down">
                <v-card flat style="height: 100%">
                    <v-card-title class="subheading font-weight-medium">Explore</v-card-title>
                    <v-divider></v-divider>
                    <v-list>
                        <v-list-tile v-for="item in list" :key="item.text" :to="item.route" ripple>
                            <v-list-tile-action>
                                <v-icon color="primary">{{ item.icon }}</v-icon>
                            </v-list-tile-action>
                            <v-list-title>{{ item.text }}</v-list-title>
                        </v-list-tile>
                    </v-list>
                </v-card>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex lg8> 
                <router-view></router-view>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

export default {
    name: 'myProfile',
    data: () => {
        return {
            list: [
                { icon: 'person', text: 'Info', route: '/my-profile/info' },
                { icon: 'photo', text: 'Avatar', route: '/my-profile/avatar' },
                { icon: 'whatshot', text: 'My Events', route: '/my-profile/my-events' }
            ]
        }
    }
}
</script>
