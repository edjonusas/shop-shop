<template>
  <div>
    <div class="container contact-block">
      <contacts-information />
      <contacts-form />
    </div>
    <div>
      <contacts-map />
    </div>
  </div>
</template>

<script>
import ContactsForm from "~/components/ContactsForm.vue";
import ContactsMap from "~/components/ContactsMap.vue";
import ContactsInformation from "~/components/ContactsInformation.vue";

export default {
  components: { ContactsInformation, ContactsForm, ContactsMap },
};
</script>

<style lang="scss" scoped>
div {
  margin-top: 40px;
}

.contact-block {
  display: flex;

  div {
    flex: 2;
  }

  div:first-child {
    flex: 1;
  }
}

@media only screen and (max-width: 1024px) {
  .contact-block {
    flex-direction: column;
  }
}
</style>>
