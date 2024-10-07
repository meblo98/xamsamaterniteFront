<template>
  <Layout>
    <div class="container">
      <div class="row">
        <div class="col-md-5">
          <div class="project-info-box mt-0">
            <div class="card-body text-center mb-5">
              <!-- Profile picture image-->
              <img
                class="img-account-profile rounded-circle mb-2"
                :src="imageUrl"
                alt="patiente"
              />
            </div>
            <h4 class="mb-3 text-capitalize">
              {{ user.prenom }} {{ user.nom }}
            </h4>
            <p>Téléphone : {{ user.telephone }}</p>
            <p>Adresse : {{ user.adresse }}</p>
            <p>Lieu de naissance : {{ patiente.lieu_de_naissance }}</p>
            <p>Date de naissance : {{ patiente.date_de_naissance }}</p>
            <p>Profession : {{ patiente.profession }}</p>
            <p>Type : {{ patiente.type }}</p>
          </div>
        </div>
        <div class="col-md-7">
          <div class="">
            <!-- Rendez-vous Section -->
            <div v-if="rendezVous.length === 0">
              <button
                type="button"
                class="btn"
                data-bs-toggle="modal"
                data-bs-target="#ajoutRendezVous"
              >
                Ajouter un rendez-vous
              </button>

              <!-- Modal -->
              <div
                class="modal fade"
                id="ajoutRendezVous"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabindex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="staticBackdropLabel">
                        Ajouter un rendez-vous
                      </h1>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <div class="form-group">
                        <label for="date_rv">Date du rendez-vous</label>
                        <input
                          v-model="newRendezVous.date_rv"
                          type="date"
                          class="form-control"
                          id="date_rv"
                          placeholder="Sélectionnez la date"
                        />
                      </div>
                      <div class="form-group">
                        <label for="structure_sante_id"
                          >Structure de santé</label
                        >
                        <select
                          v-model="newRendezVous.visite_id"
                          id="visite_id"
                          class="form-control"
                        >
                          <option value="" disabled selected>
                            Sélectionnez le type de la consultation
                          </option>
                          <option
                            v-for="visite in visites"
                            :key="visite.id"
                            :value="visite.id"
                          >
                            {{ visite.libelle }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button class="btn btn-primary" @click="addRendezVous">
                        Ajouter
                      </button>
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Fermer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <p>Aucun rendez-vous trouvé pour cette patiente.</p>
            </div>
            <Table
              v-else
              :columns="rendezVousColumns"
              :data="rendezVous"
              title="Rendez-vous"
              :type="'rendezVous'"
              :formFields="rendezVousFields"
              @action="handleRendezVousTableAction"
              @add-data="addRendezVous"
              @edit-data="editRendezVous"
            />
          </div>

          <div class="mt-3">
            <!-- Consultation Section -->
            <div v-if="consultations.length === 0">
              <button
                type="button"
                class="btn"
                data-bs-toggle="modal"
                data-bs-target="#ajoutConsultation"
              >
                Ajouter une consultation
              </button>

              <!-- Modal -->
              <div
                class="modal fade"
                id="ajoutConsultation"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabindex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="staticBackdropLabel">
                        Ajouter un accouchement
                      </h1>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <!-- Champ Date -->
                      <div class="form-group">
                        <label for="date">Date</label>
                        <input
                          type="date"
                          class="form-control"
                          v-model="newConsultation.date"
                          id="date"
                          required
                        />
                      </div>

                      <!-- Champ Visite -->
                      <div class="form-group">
                        <label for="structure_sante_id"
                          >Type de consultation</label
                        >
                        <select
                          v-model="newConsultation.visite_id"
                          id="visite_id"
                          class="form-control"
                        >
                          <option value="" disabled selected>
                            Sélectionnez le type de la consultation
                          </option>
                          <option
                            v-for="visite in visites"
                            :key="visite.id"
                            :value="visite.id"
                          >
                            {{ visite.libelle }}
                          </option>
                        </select>
                      </div>

                      <!-- Champ Terme -->
                      <div class="form-group">
                        <label for="terme">Terme</label>
                        <input
                        class="form-control"
                          type="text"
                          v-model="newConsultation.terme"
                          id="terme"
                        />
                      </div>

                      <!-- Champ SA -->
                      <div class="form-group">
                        <label for="sa">SA</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="newConsultation.SA"
                          id="sa"
                        />
                      </div>

                      <!-- Champ Plaintes -->
                      <div class="form-group">
                        <label for="plaintes">Plaintes</label>
                        <textarea
                        class="form-control"
                          v-model="newConsultation.plaintes"
                          id="plaintes"
                        ></textarea>
                      </div>

                      <!-- Champs Mois, Poids, Taille, PB -->
                      <div class="form-group">
                        <label for="mois">Mois</label>
                        <input
                          type="number"
                          class="form-control"
                          v-model="newConsultation.mois"
                          id="mois"
                        />

                        <label for="poids">Poids (kg)</label>
                        <input
                          type="number"
                          class="form-control"
                          v-model="newConsultation.poids"
                          id="poids"
                        />

                        <label for="taille">Taille (cm)</label>
                        <input
                          type="number"
                          class="form-control"
                          v-model="newConsultation.taille"
                          id="taille"
                        />

                        <label for="pb">PB (cm)</label>
                        <input
                          type="number"
                          class="form-control"
                          v-model="newConsultation.PB"
                          id="pb"
                        />
                      </div>

                      <!-- Champ Température -->
                      <div class="form-group">
                        <label for="temperature">Température (°C)</label>
                        <input
                          type="number"
                          class="form-control"
                          v-model="newConsultation.temperature"
                          id="temperature"
                          step="0.1"
                        />
                      </div>

                      <!-- Champ Urine -->
                      <div class="form-group">
                        <label for="urine">Urine</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="newConsultation.urine"
                          id="urine"
                        />
                      </div>

                      <!-- Champ Sucre -->
                      <div class="form-group">
                        <label for="sucre">Sucre</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="newConsultation.sucre"
                          id="sucre"
                        />
                      </div>

                      <!-- Champ TA -->
                      <div class="form-group">
                        <label for="ta">TA (mmHg)</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="newConsultation.TA"
                          id="ta"
                        />
                      </div>

                      <!-- Champ Pouls -->
                      <div class="form-group">
                        <label for="pouls">Pouls (bpm)</label>
                        <input
                          type="number"
                          class="form-control"
                          v-model="newConsultation.pouls"
                          id="pouls"
                        />
                      </div>

                      <!-- Champ EG -->
                      <div class="form-group">
                        <label for="eg">État général (EG)</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="newConsultation.EG"
                          id="eg"
                        />
                      </div>

                      <!-- Champ Muqueuse -->
                      <div class="form-group">
                        <label for="muqueuse">Muqueuse</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="newConsultation.muqueuse"
                          id="muqueuse"
                        />
                      </div>

                      <!-- Champ Mollet -->
                      <div class="form-group">
                        <label for="mollet">Mollet</label>
                        <input
                        class="form-control"
                          type="text"
                          v-model="newConsultation.mollet"
                          id="mollet"
                        />
                      </div>

                      <!-- Champ OMI -->
                      <div class="form-group">
                        <label for="omi">OMI</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="newConsultation.OMI"
                          id="omi"
                        />
                      </div>

                      <!-- Champ Examen des Seins -->
                      <div class="form-group">
                        <label for="examen_seins">Examen des seins</label>
                        <input
                        class="form-control"
                          type="text"
                          v-model="newConsultation.examen_seins"
                          id="examen_seins"
                        />
                      </div>

                      <!-- Champ HU -->
                      <div class="form-group">
                        <label for="hu">HU</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="newConsultation.hu"
                          id="hu"
                        />
                      </div>

                      <!-- Champ Speculum -->
                      <div class="form-group">
                        <label for="speculum">Speculum</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="newConsultation.speculum"
                          id="speculum"
                        />
                      </div>

                      <!-- Champ TV -->
                      <div class="form-group">
                        <label for="tv">TV</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="newConsultation.tv"
                          id="tv"
                        />
                      </div>

                      <!-- Champ Fer Ac Folique -->
                      <div class="form-group">
                        <label for="fer_ac_folique">Fer Ac Folique</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="newConsultation.fer_ac_folique"
                          id="fer_ac_folique"
                        />
                      </div>

                      <!-- Champ Milda -->
                      <div class="form-group">
                        <label for="milda">Milda</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="newConsultation.milda"
                          id="milda"
                        />
                      </div>

                      <!-- Champ Autre Traitement -->
                      <div class="form-group">
                        <label for="autre_traitement">Autre Traitement</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="newConsultation.autre_traitement"
                          id="autre_traitement"
                        />
                      </div>

                      <!-- Champ MAF -->
                      <div class="form-group">
                        <label for="maf">MAF</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="newConsultation.maf"
                          id="maf"
                        />
                      </div>

                      <!-- Champ BDCF -->
                      <div class="form-group">
                        <label for="bdcf">BDCF</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="newConsultation.bdcf"
                          id="bdcf"
                        />
                      </div>

                      <!-- Champ ALB -->
                      <div class="form-group">
                        <label for="alb">ALB</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="newConsultation.alb"
                          id="alb"
                        />
                      </div>

                      <!-- Champ VAT -->
                      <div class="form-group">
                        <label for="vat">VAT</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="newConsultation.vat"
                          id="vat"
                        />
                      </div>

                      <!-- Champ TPI -->
                      <div class="form-group">
                        <label for="tpi">TPI</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="newConsultation.tpi"
                          id="tpi"
                        />
                      </div>

                      <!-- Champ Palpation -->
                      <div class="form-group">
                        <label for="palpation">Palpation</label>
                        <input
                        class="form-control"
                          type="text"
                          v-model="newConsultation.palpation"
                          id="palpation"
                        />
                      </div>

                      <!-- Champ BDC -->
                      <div class="form-group">
                        <label for="bdc">BDC</label>
                        <input
                        class="form-control"
                          type="text"
                          v-model="newConsultation.bdc"
                          id="bdc"
                        />
                      </div>

                      <!-- Champ Présentation -->
                      <div class="form-group">
                        <label for="presentation">Présentation</label>
                        <input
                        class="form-control"
                          type="text"
                          v-model="newConsultation.presentation"
                          id="presentation"
                        />
                      </div>

                      <!-- Champ Bassin -->
                      <div class="form-group">
                        <label for="bassin">Bassin</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="newConsultation.bassin"
                          id="bassin"
                        />
                      </div>

                      <!-- Champ Pelvimètre Externe -->
                      <div class="form-group">
                        <label for="pelvimetre_externe"
                          >Pelvimètre Externe</label
                        >
                        <input
                          type="text"
                          class="form-control"
                          v-model="newConsultation.pelvimetre_externe"
                          id="pelvimetre_externe"
                        />
                      </div>

                      <!-- Champ Pelvimètre Interne -->
                      <div class="form-group">
                        <label for="pelvimetre_interne"
                          >Pelvimètre Interne</label
                        >
                        <input
                          type="text"
                          class="form-control"
                          v-model="newConsultation.pelvimetre_interne"
                          id="pelvimetre_interne"
                        />
                      </div>

                      <!-- Champ Biischiatique -->
                      <div class="form-group">
                        <label for="biischiatique">Biischiatique</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="newConsultation.biischiatique"
                          id="biischiatique"
                        />
                      </div>

                      <!-- Champ Trillat -->
                      <div class="form-group">
                        <label for="trillat">Trillat</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="newConsultation.trillat"
                          id="trillat"
                        />
                      </div>

                      <!-- Champ Lign Innommées -->
                      <div class="form-group">
                        <label for="lign_innominees">Lign Innommées</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="newConsultation.lign_innominees"
                          id="lign_innominees"
                        />
                      </div>

                      <!-- Champ LV -->
                      <div class="form-group">
                        <label for="lv">LV</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="newConsultation.lv"
                          id="lv"
                        />
                      </div>

                      <!-- Champ Localisation -->
                      <div class="form-groupe">
                        <label for="localisation">Localisation</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="newConsultation.localisation"
                          id="localisation"
                        />
                      </div>

                      <!-- Champ Lien -->
                      <div class="form-groupe">
                        <label for="lien">Lien</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="newConsultation.lien"
                          id="lien"
                        />
                      </div>

                      <!-- Champ Commentaires -->
                      <div class="form-groupe">
                        <label for="commentaires">Commentaires</label>
                        <textarea
                        class="form-control"
                          v-model="newConsultation.commentaires"
                          id="commentaires"
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        class="btn btn-primary"
                        @click.prevent="addConsultation"
                      >
                        Ajouter
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <p>Aucune consultation trouvée pour cette patiente.</p>
            </div>
            <Table
              v-else
              :columns="consultationColumns"
              :data="consultations"
              :type="'consultation'"
              title="Consultations"
              :formFields="consultationFields"
              @action="handleConsultationTableAction"
              @add-data="addConsultation"
              @edit-data="editConsultation"
            />
          </div>
          <div class="mt-3">
            <div class="mt-3">
              <!-- Accouchements Section -->
              <div v-if="accouchements.length === 0">
                <button
                  type="button"
                  class="btn"
                  data-bs-toggle="modal"
                  data-bs-target="#ajoutAccouchement"
                >
                  Ajouter un accouchement
                </button>

                <!-- Modal -->
                <div
                  class="modal fade"
                  id="ajoutAccouchement"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabindex="-1"
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">
                          Ajouter un accouchement
                        </h1>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <div class="form-group">
                          <label for="date_accouchement"
                            >Date de l'accouchement</label
                          >
                          <input
                            v-model="newAccouchement.date"
                            type="date"
                            class="form-control"
                            id="date_accouchement"
                          />
                        </div>
                        <div class="form-group">
                          <label for="heure">Heure</label>
                          <input
                            v-model="newAccouchement.heure"
                            type="time"
                            class="form-control"
                            id="heure"
                            placeholder="Entrez l'heure"
                          />
                        </div>
                        <div class="form-group">
                          <label for="mode">Mode d'accouchement</label>
                          <select
                            v-model="newAccouchement.mode"
                            id="mode"
                            class="form-control"
                          >
                            <option value="" disabled selected>
                              Sélectionnez le mode d'accouchement
                            </option>
                            <option value="naturel">Naturel</option>
                            <option value="instrumental">Instrumental</option>
                            <option value="césarienne">Césarienne</option>
                          </select>
                        </div>
                        <div class="form-group">
                          <label for="perinee">Perinee</label>
                          <select
                            v-model="newAccouchement.perinee"
                            id="perinee"
                            class="form-control"
                          >
                            <option value="" disabled selected>
                              Sélectionnez la perinee
                            </option>
                            <option value="intact">Intact</option>
                            <option value="episiotomie">Episiotomie</option>
                            <option value="dechirure">Déchirure</option>
                          </select>
                        </div>
                        <div class="form-group">
                          <label for="lieu">Lieu</label>
                          <select
                            v-model="newAccouchement.lieu"
                            id="lieu"
                            class="form-control"
                          >
                            <option value="" disabled selected>
                              Sélectionnez le lieu
                            </option>
                            <option value="maternité">Maternité</option>
                            <option value="domicile">Domicile</option>
                          </select>
                        </div>
                        <div class="form-group">
                          <label for="mois_grossesse">Mois de grossesse</label>
                          <input
                            v-model="newAccouchement.mois_grossesse"
                            type="number"
                            class="form-control"
                            id="mois_grossesse"
                            placeholder="Entrez le mois de grossesse"
                          />
                        </div>
                        <div class="form-group">
                          <label for="debut_travail">Début du travail</label>
                          <input
                            v-model="newAccouchement.debut_travail"
                            type="time"
                            class="form-control"
                            id="debut_travail"
                            placeholder="Entrez le début du travail"
                          />
                        </div>
                        <div class="form-group">
                          <label for="pathologie">Pathologie</label>
                          <input
                            v-model="newAccouchement.pathologie"
                            type="text"
                            class="form-control"
                            id="pathologie"
                            placeholder="Entrez la pathologie"
                          />
                        </div>
                   
                        <div class="form-group">
                          <label for="evolution_reanimation">Terme</label>
                          <select
                            v-model="newAccouchement.terme"
                            id="terme"
                            class="form-control"
                          >
                            <option value="" disabled selected>
                              Sélectionnez le terme
                            </option>
                            <option value="prématuré">prématuré</option>
                            <option value="à terme">à terme</option>
                            <option value="post-terme">post-terme</option>
                          </select>
                        </div>
                        <div class="form-group">
                          <label for="evolution_reanimation"
                            >Évolution réanimation</label
                          >
                          <select
                            v-model="newAccouchement.evolution_reanimation"
                            id="evolution_reanimation"
                            class="form-control"
                          >
                            <option value="" disabled selected>
                              Sélectionnez l'évolution réanimation
                            </option>
                            <option value="favorable">Favorable</option>
                            <option value="transfert">Transfert</option>
                            <option value="décès">Décès</option>
                          </select>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button
                          class="btn btn-primary"
                          @click="addAccouchement"
                        >
                          Ajouter
                        </button>
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Fermer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <p>Aucun accouchement trouvé pour cette patiente.</p>
              </div>
              <Table
                v-else
                :columns="accouchementsColumns"
                :data="accouchements"
                title="Accouchements"
                :type="'accouchement'"
                :formFields="accouchementFields"
                @action="handleAccouchementTableAction"
                @add-data="addAccouchement"
                @edit-data="editAccouchement"
              />
            </div>
          </div>
          <div class="mt-3">
            
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/components/layouts/Layout.vue";
import patienteService from "@/services/patienteService";
import consultationService from "@/services/consultationService";
import Table from "@/components/tableau.vue";
import visiteService from "@/services/visiteService";
import rendezVousService from "@/services/rendezVousService";
import Swal from "sweetalert2";
import accouchementService from "@/services/accouchementService";
import urlImage from "@/services/imageUrl";

const ACTION_VIEW = "view";
const ACTION_EDIT = "edit";
const ACTION_DELETE = "delete";

export default {
  components: {
    Layout,
    Table,
  },
  data() {
    return {
      accouchements: [],
      user: [],
      FormData: {},
      accouchementsColumns: [
        { label: "Date", field: "date" },
        { label: "Mode", field: "mode" },
        { label: "Pathologie", field: "pathologie" },
        { label: "Actions", field: "action", type: "action" },
      ],
      accouchementFields: [
        {
          label: "Date",
          name: "date",
          field: "date",
          type: "date",
        },
        {
          label: "Heure",
          field: "heure",
          name: "heure",
          type: "time",
        },
        {
          label: "Lieu",
          field: "lieu",
          name: "lieu",
          type: "select",
          options: [
            { value: "", text: "Selectionner              " },
            { value: "maternité", text: "maternité" },
            { value: "domicile", text: "domicile" },
          ],
        },
        {
          label: "Mode",
          field: "mode",
          name: "mode",
          type: "select",
          options: [
            { value: "", text: "Selectionner              " },
            { value: "naturel", text: "naturel" },
            { value: "instrumental", text: "instrumental" },
            { value: "césarienne", text: "césarienne" },
          ],
        },
        {
          label: "Terme",
          field: "terme",
          name: "terme",
          type: "select",
          options: [
            { value: "", text: "Selectionner              " },
            { value: "naturel", text: "naturel" },
            { value: "instrumental", text: "instrumental" },
            { value: "césarienne", text: "césarienne" },
          ],
        },
        {
          label: "Mois de grossesse",
          field: "mois_grossesse",
          name: "mois_grossesse",
          type: "number",
        },
        {
          label: "Début du travail",
          field: "debut_travail",
          name: "debut_travail",
          type: "time",
        },
        {
          label: "Périnée",
          field: "perinee",
          name: "perinee",
          type: "select",
          options: [
            { value: "", text: "Selectionner la périnée" },
            { value: "dechirure", text: "dechirure" },
            { value: "episiotomie", text: "episiotomie" },
            { value: "intact", text: "intact" },
          ],
        },
        {
          label: "Pathologie",
          field: "pathologie",
          name: "pathologie",
          type: "text",
        },
        {
          label: "Évolution/réanimation",
          field: "evolution_reanimation",
          name: "evolution_reanimation",
          type: "select",
          options: [
            { value: "", text: "Selectionner              " },
            { value: "favorable", text: "favorable" },
            { value: "transfert", text: "transfert" },
            { value: "décès", text: "décès" },
          ],
        },
      ],

      newAccouchement: {
        date: "",
        heure: "",
        lieu: "",
        mode: "",
        terme: "",
        mois_grossesse: "",
        debut_travail: "",
        perinee: "",
        pathologie: "",
        evolution_reanimation: "",
        patiente_id: this.id,
      },

      rendezVousFields: [
        {
          label: "Date",
          field: "date_rv",
          name: "date_rv",
          type: "date",
        },
        {
          label: "Type de rendez-vous",
          field: "visite_id",
          name: "visite_id",
          type: "select",
          options: [], // options pour le champ visite_id
        },
      ],
      visite: [],
      newRendezVous: {
        date_rv: "",
        visite_id: "",
        sage_femme_id: "",
        patiente_id: this.id,
      },
      consultationFields: [
        {
          name: "date",
          field: "date",
          label: "Date",
          type: "date",
          placeholder: "Entrez la date de la consultation",
        },
        {
          name: "terme",
          field: "terme",
          label: "Terme",
          type: "text",
          placeholder: "Entrez le terme",
        },
        {
          name: "SA",
          field: "SA",
          label: "SA (Semaines d'Aménorrhée)",
          type: "number",
          placeholder: "Entrez les semaines d'aménorrhée",
        },
        {
          name: "plaintes",
          field: "plaintes",
          label: "Plaintes",
          type: "text",
          placeholder: "Entrez les plaintes",
        },
        {
          name: "mois",
          field: "mois",
          label: "Mois de grossesse",
          type: "number",
          placeholder: "Entrez le mois de grossesse",
        },
        {
          name: "poids",
          field: "poids",
          label: "Poids",
          type: "number",
          placeholder: "Entrez le poids",
        },
        {
          name: "taille",
          field: "taille",
          label: "Taille",
          type: "number",
          placeholder: "Entrez la taille",
        },
        {
          name: "PB",
          label: "Périmètre brachial",
          type: "number",
          placeholder: "Entrez le périmètre brachial",
        },
        {
          name: "temperature",
          field: "temperature",
          label: "Température",
          type: "number",
          placeholder: "Entrez la température",
        },
        {
          name: "urine",
          field: "urine",
          label: "Urine",
          type: "text",
          placeholder: "Entrez les résultats d'analyse d'urine",
        },
        {
          name: "sucre",
          field: "sucre",
          label: "Sucre",
          type: "text",
          placeholder: "Entrez les résultats d'analyse de sucre",
        },
        {
          name: "TA",
          field: "TA",
          label: "Tension artérielle",
          type: "text",
          placeholder: "Entrez la tension artérielle",
        },
        {
          name: "pouls",
          field: "pouls",
          label: "Pouls",
          type: "number",
          placeholder: "Entrez le pouls",
        },
        {
          name: "EG",
          field: "EG",
          label: "État général",
          type: "text",
          placeholder: "Entrez l'état général",
        },
        {
          name: "muqueuse",
          field: "muqueuse",
          label: "Muqueuse",
          type: "text",
          placeholder: "Entrez l'état des muqueuses",
        },
        {
          name: "mollet",
          field: "mollet",
          label: "Mollets",
          type: "text",
          placeholder: "Entrez l'état des mollets",
        },
        {
          name: "OMI",
          field: "OMI",
          label: "Œdème des membres inférieurs",
          type: "text",
          placeholder: "Entrez l'OMI",
        },
        {
          name: "examen_seins",
          field: "examen_seins",
          label: "Examen des seins",
          type: "text",
          placeholder: "Entrez le résultat de l'examen des seins",
        },
        {
          name: "hu",
          field: "hu",
          label: "Hauteur utérine",
          type: "number",
          placeholder: "Entrez la hauteur utérine",
        },
        {
          name: "speculum",
          field: "speculum",
          label: "Examen au spéculum",
          type: "text",
          placeholder: "Entrez le résultat de l'examen au spéculum",
        },
        {
          name: "tv",
          field: "tv",
          label: "Toucher vaginal",
          type: "text",
          placeholder: "Entrez le résultat du toucher vaginal",
        },
        {
          name: "fer_ac_folique",
          field: "fer_ac_folique",
          label: "Fer/Acide folique",
          type: "text",
          placeholder: "Indiquez si fer/acide folique est pris",
        },
        {
          name: "milda",
          field: "milda",
          label: "MILD (Moustiquaire)",
          type: "text",
          placeholder: "Indiquez si moustiquaire est utilisée",
        },
        {
          name: "autre_traitement",
          field: "autre_traitement",
          label: "Autre traitement",
          type: "text",
          placeholder: "Entrez un autre traitement",
        },
        {
          name: "maf",
          field: "maf",
          label: "Mouvements actifs fœtaux",
          type: "text",
          placeholder: "Entrez les MAF",
        },
        {
          name: "bdcf",
          field: "bdcf",
          label: "Battements du cœur fœtal",
          type: "text",
          placeholder: "Entrez les BDCF",
        },
        {
          name: "alb",
          field: "alb",
          label: "Protéine dans l'urine",
          type: "text",
          placeholder: "Entrez les résultats de l'analyse d'albumine",
        },
        {
          name: "vat",
          field: "vat",
          label: "Vaccination antitétanique",
          type: "text",
          placeholder: "Indiquez si la vaccination antitétanique est faite",
        },
        {
          name: "tpi",
          label: "Traitement préventif intermittent",
          type: "text",
          placeholder:
            "Indiquez si le traitement préventif intermittent est fait",
        },
        {
          name: "palpation",
          field: "palpation",
          label: "Palpation abdominale",
          type: "text",
          placeholder: "Entrez les résultats de la palpation abdominale",
        },
        {
          name: "bdc",
          field: "bdc",
          label: "Battements du cœur",
          type: "text",
          placeholder: "Entrez les BDC",
        },
        {
          name: "presentation",
          field: "presentation",
          label: "Présentation du fœtus",
          type: "text",
          placeholder: "Entrez la présentation du fœtus",
        },
        {
          name: "bassin",
          field: "bassin",
          label: "Bassin obstétrical",
          type: "text",
          placeholder: "Entrez les résultats de l'examen du bassin obstétrical",
        },
        {
          name: "pelvimetre_externe",
          field: "pelvimetre_externe",
          label: "Pelvimètre externe",
          type: "text",
          placeholder: "Entrez les résultats de la pelvimétrie externe",
        },
        {
          name: "pelvimetre_interne",
          field: "pelvimetre_interne",
          label: "Pelvimètre interne",
          type: "text",
          placeholder: "Entrez les résultats de la pelvimétrie interne",
        },
        {
          name: "biischiatique",
          field: "biischiatique",
          label: "Diamètre bi-ischiatique",
          type: "number",
          placeholder: "Entrez le diamètre bi-ischiatique",
        },
        {
          name: "trillat",
          field: "trillat",
          label: "Ligne de Trillat",
          type: "text",
          placeholder: "Entrez les résultats de la ligne de Trillat",
        },
        {
          name: "lign_innominees",
          field: "lign_innominees",
          label: "Lignes innominées",
          type: "text",
          placeholder: "Entrez les résultats des lignes innominées",
        },
        {
          name: "autre_examen",
          field: "autre_examen",
          label: "Autres examens",
          type: "text",
          placeholder: "Entrez les résultats des autres examens",
        },
        {
          name: "resultat",
          label: "Résultats des examens",
          type: "text",
          placeholder: "Entrez les résultats des examens",
        },
        {
          name: "lieu_accouchement_apre_consentement",
          label: "Lieu d'accouchement après consentement",
          type: "text",
          placeholder: "Entrez le lieu d'accouchement après consentement",
        },
        {
          name: "traitement",
          field: "traitement",
          label: "Traitement proposé",
          type: "text",
          placeholder: "Entrez le traitement proposé",
        },
      ],

      newConsultation: {
        date: "",
        visite_id: "",
        terme: "",
        SA: "",
        plaintes: "",
        mois: "",
        poids: "",
        taille: "",
        PB: "",
        temperature: "",
        urine: "",
        sucre: "",
        TA: "",
        pouls: "",
        EG: "",
        muqueuse: "",
        mollet: "",
        OMI: "",
        examen_seins: "",
        hu: "",
        speculum: "",
        tv: "",
        fer_ac_folique: "",
        milda: "",
        autre_traitement: "",
        maf: "",
        bdcf: "",
        alb: "",
        vat: "",
        tpi: "",
        palpation: "",
        bdc: "",
        presentation: "",
        bassin: "",
        pelvimetre_externe: "",
        pelvimetre_interne: "",
        biischiatique: "",
        trillat: "",
        lign_innominees: "",
        autre_examen: "",
        resultat: "",
        lieu_accouchement_apre_consentement: "",
        traitement: "",
        patiente_id: this.patienteId,
        visite_id: this.visiteId,
      },

      patiente: {}, // Détails de la patiente
      consultations: [], // Stockage des consultations
      rendezVous: [], // Stockage des rendez-vous
      consultationColumns: [
        { label: "Date", field: "date" },
        { label: "Type de rendez-vous", field: "type" },
        { label: "Terme", field: "terme" },
        { label: "Actions", field: "action", type: "action" },
      ],
      rendezVousColumns: [
        { label: "Date", field: "date_rv" },
        { label: "Type de rendez-vous", field: "libelle" },
        { label: "Actions", field: "action", type: "action" },
      ],
    };
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  mounted() {
    this.getPatienteDetails();
    this.getConsultations();
    this.getRendezVous();
    this.getVisites();
    this.getAccouchements();
  },
  methods: {
    async getVisites() {
      try {
        const response = await visiteService.getVisites();
        this.visites = response.ListeVisites;
        this.updateRendezVousOptions();
      } catch (error) {
        console.error("Erreur lors de la récupération des visites :", error);
      }
    },
    updateRendezVousOptions() {
      const visiteOptions = this.visites.map((visite) => ({
        value: visite.id,
        text: visite.libelle,
      }));
      this.rendezVousFields.find(
        (field) => field.field === "visite_id"
      ).options = visiteOptions;
    },
    async getPatienteDetails() {
      try {
        const response = await patienteService.getPatiente(this.id);
        this.patiente = response.patiente;
        this.user = this.patiente.user;
        this.photo = this.patiente.user.photo;        
        this.imageUrl = this.photo ? urlImage + `${this.photo}` : "/src/assets/images/women.svg";
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des détails de la patiente :",
          error
        );
      }
    },
    async getConsultations() {
      try {
        const response = await consultationService.getConsultationsByPatiente(
          this.id
        );

        if (response && response.consultations) {
          if (!Array.isArray(response.consultations)) {
            response.consultations = [response.consultations];
          }

          this.consultations = response.consultations.map((consultation) => ({
            id: consultation.id,
            date: consultation.date,
            type: consultation.visite.libelle,
            terme: consultation.terme,
            autre_examen: consultation.autre_examen,
            SA: consultation.SA,
            plaintes: consultation.plaintes,
            mois: consultation.mois,
            poids: consultation.poids,
            taille: consultation.taille,
            PB: consultation.PB,
            temperature: consultation.temperature,
            urine: consultation.urine,
            sucre: consultation.sucre,
            TA: consultation.TA,
            pouls: consultation.pouls,
            EG: consultation.EG,
            muqueuse: consultation.muqueuse,
            mollet: consultation.mollet,
            OMI: consultation.OMI,
            examen_seins: consultation.examen_seins,
            hu: consultation.hu,
            speculum: consultation.speculum,
            tv: consultation.tv,
            fer_ac_folique: consultation.fer_ac_folique,
            milda: consultation.milda,
            autre_traitement: consultation.autre_traitement,
            maf: consultation.maf,
            bdcf: consultation.bdcf,
            alb: consultation.alb,
            vat: consultation.vat,
            tpi: consultation.tpi,
            palpation: consultation.palpation,
            bdc: consultation.bdc,
            presentation: consultation.presentation,
            bassin: consultation.bassin,
            pelvimetre_externe: consultation.pelvimetre_externe,
            pelvimetre_interne: consultation.pelvimetre_interne,
            biischiatique: consultation.biischiatique,
            trillat: consultation.trillat,
            lign_innominees: consultation.lign_innominees,
            resultat: consultation.resultat,
            lieu_accouchement_apre_consentement:
              consultation.lieu_accouchement_apre_consentement,
            traitement: consultation.traitement,
            sage_femme_id: consultation.sage_femme_id,
            patiente_id: consultation.patiente_id,
            visite_id: consultation.visite_id,
          }));
        } 
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des consultations :",
          error
        );
      }
    },

    async getRendezVous() {
      try {
        const response = await consultationService.getRendezVousByPatiente(
          this.id
        );

        // Vérifie si mes_rv existe
        if (response && response.mes_rv) {
          // Si mes_rv est un objet unique
          if (!Array.isArray(response.mes_rv)) {
            // On le transforme en tableau pour le traiter de manière uniforme
            response.mes_rv = [response.mes_rv];
          }

          // Mapper les rendez-vous
          this.rendezVous = response.mes_rv.map((rendezVous) => ({
            id: rendezVous.id,
            date_rv: rendezVous.date_rv,
            libelle: rendezVous.visite
              ? rendezVous.visite.libelle
              : "Aucun libellé",
            visite_id: rendezVous.visite_id,
          }));
        } 
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des rendez-vous :",
          error
        );
      }
    },

    async addRendezVous(FormData) {
      this.newRendezVous = { ...this.newRendezVous, ...FormData };
      try {
        await rendezVousService.createRendezVous(this.newRendezVous);
        this.getRendezVous();
        this.resetRendezVousForm();
        Swal.fire({
          title: "Rendez-vous ajouté avec succès!",
          icon: "success",
        });
      } catch (error) {
        Swal.fire({
          title: "Erreur lors de l'ajout",
          text: "Vérifiez les informations.",
          icon: "error",
        });
      }
    },
    resetRendezVousForm() {
      this.newRendezVous = {
        date_rv: "",
        visite_id: "",
        patiente_id: this.id,
      };
    },
    async addConsultation() {
      try {
    
        await consultationService.createConsultation({
          ...this.newConsultation,
          patiente_id: this.id,
        });

        Swal.fire({
          title: "Succès!",
          text: "Consultation ajoutée avec succès.",
          icon: "success",
        });

        // Réinitialiser les champs du formulaire après succès
        this.newConsultation = {
          /* champs réinitialisés */
        };
        await this.getConsultations();
        $("#ajoutConsultation").modal("hide");
      } catch (error) {
        console.error("Erreur lors de la création de la consultation :", error);

        if (error.response && error.response.status === 422) {
          console.error("Erreurs de validation :", error.response.data.errors);
        }
      }
    },
    resetConsultationForm() {
      this.newConsultation = {
        date: "",
        terme: "",
        plaintes: "",
        patiente_id: this.id,
      };
    },
    async deleteRendezVous(id) {
      Swal.fire({
        title: "Êtes-vous sûr de vouloir supprimer ce rendez-vous ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Oui, supprimer",
        cancelButtonText: "Annuler",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await rendezVousService.deleteRendezVous(id);
            this.getRendezVous(); // Recharger la liste après la suppression
            Swal.fire({
              title: "Rendez-vous supprimé avec succès !",
              icon: "success",
              timer: 1000,
            });
          } catch (error) {
            console.error(
              "Erreur lors de la suppression du rendez-vous :",
              error
            );
            Swal.fire({
              title: "Erreur lors de la suppression du rendez-vous !",
              icon: "error",
              timer: 1000,
            });
          }
        }
      });
    },

    handleAccouchementTableAction({ action, row }) {
      switch (action) {
        case ACTION_VIEW:
          this.$router.push({
            name: "detailAccouchement",
            params: { id: row.id },
          });
          break;
        case ACTION_EDIT:
          this.editAccouchement(row);
          break;
        case ACTION_DELETE:
          this.deleteAccouchement(row.id);
          break;
        default:
          break;
      }
    },

    handleConsultationTableAction({ action, row }) {
      switch (action) {
        case ACTION_VIEW:
          this.$router.push({
            name: "detailConsultation",
            params: { id: row.id },
          });
          break;
        case ACTION_EDIT:
          this.editConsultation(row);
          break;
        case ACTION_DELETE:
          this.deleteConsultation(row.id);
          break;
        default:
          break;
      }
    },

    handleRendezVousTableAction({ action, row }) {
      switch (action) {
        case ACTION_VIEW:
          this.$router.push({
            name: "detailRendezVous",
            params: { id: row.id },
          });
          break;
        case ACTION_EDIT:
          this.editRendezVous(row);
          break;
        case ACTION_DELETE:
          this.deleteRendezVous(row.id);
          break;
        default:
          break;
      }
    },

    async editConsultation(consultation) {
      try {
        // Appelez le service pour modifier une consultation
        await consultationService.updateConsultation(
          consultation.id,
          consultation
        );
        this.getConsultations(); // Rafraîchir la liste des consultations
        Swal.fire({
          title: "Consultation mise à jour avec succès!",
          icon: "success",
        });
      } catch (error) {
        Swal.fire({
          title: "Erreur lors de la mise à jour de la consultation",
          text: "Veuillez vérifier les informations et réessayer.",
          icon: "error",
        });
      }
    },

    async editRendezVous(rendezVous) {
      try {
        // Appelez le service pour modifier un rendez-vous
        await rendezVousService.updateRendezVous(rendezVous.id, rendezVous);
        this.getRendezVous(); // Rafraîchir la liste des rendez-vous
        Swal.fire({
          title: "Rendez-vous mis à jour avec succès!",
          icon: "success",
        });
      } catch (error) {
        Swal.fire({
          title: "Erreur lors de la mise à jour du rendez-vous",
          text: "Veuillez vérifier les informations et réessayer.",
          icon: "error",
        });
      }
    },

    async getAccouchements() {
      try {
        const response = await accouchementService.getAccouchementsByPatiente(
          this.id
        );

        if (response && response.accouchements) {
          this.accouchements = response.accouchements.map((accouchement) => ({
            date: accouchement.date,
            mode: accouchement.mode,
            pathologie: accouchement.pathologie,
            lieu: accouchement.lieu,
            heure: accouchement.heure,
            terme: accouchement.terme,
            mois_grossesse: accouchement.mois_grossesse,
            debut_travail: accouchement.debut_travail,
            perinee: accouchement.perinee,
            evolution_reanimation: accouchement.evolution_reanimation,
            id: accouchement.id,
          }));
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des accouchements :",
          error
        );
      }
    },
    async addAccouchement() {
      try {
        await accouchementService.createAccouchement({
          ...this.newAccouchement,
          patiente_id: this.id,
        });
        this.getAccouchements();
        this.resetAccouchementForm();
        Swal.fire({
          title: "Accouchement ajouté avec succès!",
          icon: "success",
        });
        this.getAccouchements();
      } catch (error) {
        Swal.fire({
          title: "Erreur lors de l'ajout",
          text: error,
          icon: "error",
        });
      }
    },
    resetAccouchementForm() {
      this.newAccouchement = {
        date: "",
        mode: "",
        perinee: "",
        lieu: "",
        mois_grossesse: "",
        terme: "",
        debut_travail: "",
        pathologie: "",
        heure: "",
        evolution_reanimation: "",
        mode: "",
        patiente_id: this.id,
      };
    },
    async editAccouchement(accouchement) {
      try {
        // Appelez le service pour modifier un accouchement
        await accouchementService.updateAccouchement(
          accouchement.id,
          accouchement
        );
        this.getAccouchements(); // Rafraîchir la liste des accouchements
        Swal.fire({
          title: "Accouchement mis à jour avec succès!",
          icon: "success",
        });
      } catch (error) {
        Swal.fire({
          title: "Erreur lors de la mise à jour de l'accouchement",
          text: "Veuillez vérifier les informations et réessayer.",
          icon: "error",
        });
      }
    },
    async deleteAccouchement(id) {
      Swal.fire({
        title: "Êtes-vous sûr de vouloir supprimer cet accouchement ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Oui, supprimer",
        cancelButtonText: "Annuler",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            // Appelez le service pour supprimer un accouchement
            await accouchementService.deleteAccouchement(id);
            this.getAccouchements(); // Rafraîchir la liste après la suppression
            Swal.fire({
              title: "Accouchement supprimé avec succès!",
              icon: "success",
              timer: 1000,
            });
          } catch (error) {
            Swal.fire({
              title: "Erreur lors de la suppression de l'accouchement",
              icon: "error",
              timer: 1000,
            });
          }
        }
      });
    },

  },
};
</script>

<style scoped>
.info {
  background-color: #fff;
  padding: 20px;
}
.project {
  margin: 15px 0;
}
.img-account-profile {
  height: 10rem;
  width: 10rem;
}
.rounded-circle {
  border-radius: 50% !important;
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
}
.rounded {
  border-radius: 5px !important;
}
.btn-xs.btn-icon {
  width: 34px;
  height: 34px;
  max-width: 34px !important;
  max-height: 34px !important;
  font-size: 10px;
  line-height: 34px;
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

.add-btn {
  background-color: #6932f9;
  color: white;
  border: none;
  padding: 5px;
  margin-bottom: 10px;
  cursor: pointer;
}
button {
  background-color: #6932f9;
  color: white;
  border: none;
  padding: 5px;
  margin-bottom: 10px;
  cursor: pointer;
}
</style>
