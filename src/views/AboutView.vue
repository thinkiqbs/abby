<template>
  <div class="about container">
    <section class="hero">
      <h1>About Us</h1>
    </section>
    <section class="content">
      <p>Welcome to our math forum! We are a community of students, teachers, and math enthusiasts who share a passion for learning and solving mathematical problems. Our forum provides a safe and supportive space for students to ask questions, get help, and connect with others who share their interests.</p>

      <p>Our mission is to make math accessible and engaging for everyone. We believe that by working together, we can overcome the challenges that come with learning math and develop a deeper understanding of this fascinating subject. Whether you're a student struggling with a particular problem or a teacher looking to support your students, our forum is here to help.</p>

      <p>Our forum is moderated by a team of experienced math educators who are committed to creating a positive learning environment for everyone. We uphold high standards for respectful communication and constructive feedback, and we encourage our members to approach discussions with an open mind and a willingness to learn.</p>

      <p>We welcome students of all levels, from elementary school to university, as well as anyone who is interested in math and wants to join our community. We offer a variety of resources, including math problem sets, tutorials, and study groups, to help our members achieve their goals.</p>

      <p>Thank you for visiting our math forum. We hope that you will join us in our mission to make math accessible and fun for everyone. If you have any questions or feedback, please don't hesitate to contact us.</p>
    </section>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AboutPage',
})
</script>

<style>
.about {
  max-width: 800px;
  margin: 0 auto;
}

.hero {
  background-color: #f5f5f5;
  text-align: center;
  padding: 50px 0;
}

.content {
  line-height: 1.5;
  margin: auto;
  text-align: justify;
}
</style>
