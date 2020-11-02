<template>
  <TeamMember :key="$route.params.key" />
</template>
<script>
import TeamMember from '~/src/screens/TeamMember';

export default {
  components: {
    TeamMember,
  },
  head() {
    return {
      title: 'Member',
    };
  },
};
</script>
