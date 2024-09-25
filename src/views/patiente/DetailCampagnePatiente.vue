<template>
  <Layout>
    <div class="container">
      <div class="row">
        <div class="col-md-5">
          <div class="project-info-box mt-0">
            <h5>PROJECT DETAILS</h5>
            <p class="mb-0">
              Vivamus pellentesque, felis in aliquam ullamcorper, lorem tortor
              porttitor erat, hendrerit porta nunc tellus eu lectus. Ut vel
              imperdiet est. Pellentesque condimentum, dui et blandit laoreet,
              quam nisi tincidunt tortor.
            </p>
          </div>
          <!-- / project-info-box -->

          <div class="project-info-box">
            <p><b>Client:</b> CUPCAKE CO</p>
            <p><b>Date:</b> 14.02.2020</p>
            <p><b>Designer:</b> James Doe</p>
            <p><b>Tools:</b> Illustrator</p>
            <p class="mb-0"><b>Budget:</b> $500</p>
          </div>
          <!-- / project-info-box -->
        </div>
        <!-- / column -->

        <div class="col-md-7">
          <img
            src="https://www.bootdey.com/image/400x300/FFB6C1/000000"
            alt="project-image"
            class="rounded"
          />
        </div>
        <!-- / column -->
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/components/layouts/Layout.vue";

export default {
  components: {
    Layout,
  },
};
</script>

<style>
.project {
  margin: 15px 0;
}

.no-gutter .project {
  margin: 0 !important;
  padding: 0 !important;
}

.has-spacer {
  margin-left: 30px;
  margin-right: 30px;
  margin-bottom: 30px;
}

.has-spacer-extra-space {
  margin-left: 30px;
  margin-right: 30px;
  margin-bottom: 30px;
}

.has-side-spacer {
  margin-left: 30px;
  margin-right: 30px;
}

.project-title {
  font-size: 1.25rem;
}

.project-skill {
  font-size: 0.9rem;
  font-weight: 400;
  letter-spacing: 0.06rem;
}

.project-info-box {
  margin: 15px 0;
  background-color: #fff;
  padding: 30px 40px;
  border-radius: 5px;
}

.project-info-box p {
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #d5dadb;
}

.project-info-box p:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}
img {
  width: 100%;
  max-width: 100%;
  height: auto;
  -webkit-backface-visibility: hidden;
}

.project-info-box p {
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #d5dadb;
}
p {
  font-family: "Barlow", sans-serif !important;
  font-weight: 300;
  font-size: 1rem;
  color: #686c6d;
  letter-spacing: 0.03rem;
  margin-bottom: 10px;
}
b,
strong {
  font-weight: 700 !important;
}
</style>
