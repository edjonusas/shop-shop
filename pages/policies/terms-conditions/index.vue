<template>
 <TermsAndConditions/>
</template>

<script>
import GdprPolicy from "~/components/GdprPolicy";
import TermsAndConditions from "~/components/TermsAndConditions";

export default {
  name: "index",
  components: {
    TermsAndConditions,
    GdprPolicy,
  }
}
</script>
