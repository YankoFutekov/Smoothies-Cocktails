<template>
  <div class="add-smoothie container">
    <h2 class="center-align indigo-text">Add Smoothie Recipe</h2>
    <div class="card-panel login transparent black-text center">
      <form @submit.prevent="AddSmoothie">
        <div class="field title">
          <label for="title">Smoothie Title</label>
          <input type="text" name="title" v-model="title">
        </div>
        <div class="field" v-for="(ing, index) in ingredients" :key="index">
          <label for="ingredient">Ingredient:</label>
          <input type="text" name="ingredient" v-model="ingredients[index]">
          <i class="material-icons delete" @click="DeleteIngredient(ing)">delete</i>
        </div>
        <div class="field add-ingredient">
          <label for="add-ingredient">Add ingredient</label>
          <input
            type="text"
            name="add-ingredient"
            @keydown.enter.prevent="AddIngredient"
            v-model="another"
          >
        </div>
        <div class="field center-align">
          <p v-if="feedback" class="red-text">{{ feedback }}</p>
          <button class="btn pink">Add Smoothie</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";
export default {
  name: "AddSmoothie",
  data() {
    return {
      title: null,
      another: null,
      feedback: null,
      slug: null,
      ingredients: []
    };
  },
  methods: {
    AddSmoothie() {
      if (this.title) {
        this.feedback = null;
        // Create a slug
        this.slug = slugify(this.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\=:@]/g,
          lower: true
        });
        db.collection("Smoothies")
          .add({
            title: this.title,
            slug: this.slug,
            ingredients: this.ingredients
          })
          .then(() => {
            this.$router.push({ name: "Home" });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.feedback = "You must add a title.";
      }
    },
    AddIngredient() {
      if (this.another) {
        this.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "You must add an ingredient.";
      }
    },
    DeleteIngredient(ing) {
      this.ingredients = this.ingredients.filter(ingredient => {
        return ingredient != ing;
      });
    }
  }
};
</script>

<style>
.add-smoothie {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.add-smoothie h2 {
  font-size: 2em;
  margin: 20px auto;
}
.add-smoothie .field {
  margin: 20px auto;
  position: relative;
}
.add-smoothie .delete {
  position: absolute;
  right: 0px;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>
