<script>
import enfantService from '@/services/enfantService';
import * as CanvasJS from '@canvasjs/charts';

export default {
    data() {
        return {
            chart: null,
            options: {
                animationEnabled: true,
                exportEnabled: true,
                title: {
                    text: "Pyramide des âges des enfants",
                    fontFamily: "Tahoma, Verdana, sans-serif"
                },
                axisY: {
                    labelFormatter: (e) => {
                        return Math.abs(e.value); // Affiche les valeurs absolues sur l'axe Y
                    }
                },
                axisX: {
                    title: "Tranches d'âge",
                    interval: 1, // Ajustez en fonction de vos données
                    maximum: 4, // L'axe X sera centré autour de 0
                    minimum: 0, // Par exemple, ajustez selon les données
                },
                toolTip: {
                    shared: true,
                    contentFormatter: (e) => {
                        var content = "<span style='font-weight: bold;'>Tranche d'âge: " + e.entries[0].dataPoint.label + "</span><br/>";
                        for (var i = 0; i < e.entries.length; i++) {
                            content += "<span style='color:" + e.entries[i].dataSeries.color + "'>" + e.entries[i].dataSeries.name + "</span>: " + CanvasJS.formatNumber(Math.abs(e.entries[i].dataPoint.y), "#,##0.##");
                            content += "<br/>";
                        }
                        return content;
                    }
                },
                legend: {
                    verticalAlign: "top"
                },
                data: []
            },
            styleOptions: {
                width: "100%",
                height: "360px"
            },
            enfants: []
        }
    },
    methods: {
        chartInstance(chart) {
            this.chart = chart;
        },
        calculerAge(date_naissance) {
            const dateNaissanceObj = new Date(date_naissance);
            const aujourdHui = new Date();
            let age = aujourdHui.getFullYear() - dateNaissanceObj.getFullYear();
            const moisDiff = aujourdHui.getMonth() - dateNaissanceObj.getMonth();

            if (moisDiff < 0 || (moisDiff === 0 && aujourdHui.getDate() < dateNaissanceObj.getDate())) {
                age--;
            }

            return age;
        },
        async recupererEnfants() {
            try {
                const response = await enfantService.getEnfants();
                this.enfants = response.Liste_des_enfants.map((enfant) => {
                    const age = this.calculerAge(enfant.date_naissance);
                    return {
                        age: age,
                        sexe: enfant.sexe
                    };
                });

                this.regrouperEnfantsParTrancheDAge();
            } catch (error) {
                console.error("Erreur lors de la récupération des enfants:", error);
            }
        },
        regrouperEnfantsParTrancheDAge() {
            const tranchesDAge = [
                { label: "0-1an", garcons: 0, filles: 0 },
                { label: "2-3ans", garcons: 0, filles: 0 },
                { label: "4-5ans", garcons: 0, filles: 0 },
                { label: "6ans et plus", garcons: 0, filles: 0 },
            ];

            this.enfants.forEach((enfant) => {
                const age = enfant.age;

                if (age >= 0 && age <= 1) {
                    tranchesDAge[0].garcons += enfant.sexe === "M" ? 1 : 0;
                    tranchesDAge[0].filles += enfant.sexe === "F" ? 1 : 0;
                } else if (age >= 2 && age <= 3) {
                    tranchesDAge[1].garcons += enfant.sexe === "M" ? 1 : 0;
                    tranchesDAge[1].filles += enfant.sexe === "F" ? 1 : 0;
                } else if (age >= 4 && 5) {
                    tranchesDAge[2].garcons += enfant.sexe === "M" ? 1 : 0;
                    tranchesDAge[2].filles += enfant.sexe === "F" ? 1 : 0;
                } else {
                    tranchesDAge[3].garcons += enfant.sexe === "M" ? 1 : 0;
                    tranchesDAge[3].filles += enfant.sexe === "F" ? 1 : 0;
                }
            });

            this.creerPyramideDesAges(tranchesDAge);
        },
        creerPyramideDesAges(enfantsRegroupes) {
            const data = [];
            const seriesGarcons = {
                type: "stackedBar",
                showInLegend: true,
                name: "Garçons",
                legendMarkerType: "none",
                color: "#00a6ed",
                dataPoints: []
            };
            const seriesFilles = {
                type: "stackedBar",
                showInLegend: true,
                name: "Filles",
                legendMarkerType: "none",
                color: "#f70a8d",
                dataPoints: []
            };

            enfantsRegroupes.forEach((enfant) => {
                // Les garçons sont négatifs pour qu'ils soient à gauche
                seriesGarcons.dataPoints.push({ label: enfant.label, y: -enfant.garcons });
                // Les filles sont positives pour qu'elles soient à droite
                seriesFilles.dataPoints.push({ label: enfant.label, y: enfant.filles });
            });

            data.push(seriesGarcons);
            data.push(seriesFilles);

            this.options.data = data;
            this.$forceUpdate();

        }
    },
    mounted() {
        this.recupererEnfants();
    }
}
</script>
<template>
    <CanvasJSChart :options="options" :style="styleOptions" @chart-ref="chartInstance" />
</template>
<style></style>
