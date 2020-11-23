<template>
  <TeamMember
    v-if="person !== undefined"
    :person="person"
  />
</template>
<script>
import TeamMember from '~/src/screens/TeamMember';

export default {
  components: {
    TeamMember,
  },
  data: () => ({
    persons: [],
  }),
  computed: {
    person() {
      return this.persons[this.$route.params.key];
    },
  },
  mounted() {
    // if (this.BaseUrl === 'https://cashflash.io/api') {
    //   this.$router.push('/');
    // }
    if (this.$route.params.key === undefined
      || this.persons[this.$route.params.key] === undefined) {
      this.$router.push('/');
    }
  },
  created() {
    this.persons = this.$t('land.team.items');
  },
  head() {
    return {
      title: 'Member',
    };
  },
};
</script>
