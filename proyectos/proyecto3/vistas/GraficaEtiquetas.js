module.exports = Backbone.View.extend({
    template: _.template(`
        <canvas width="400" height="400"></canvas>
    `),
    initialize() {
        this.listenTo(this.model, "change", this.render);
        this.render();
        document.body.append(this.el);
    },
    render() {
        this.$el.html(this.template());

        const ctx = this.$("canvas");

        console.log(this.$("canvas"));

        const etiquetas = this.model.get("etiquetas");

        const labels = _.keys(etiquetas);

        function randomColor() {
            function c() {
                return Math.floor(Math.random() * 255);
            }
            return `rgb(${c()}, ${c()}, ${c()})`;
        }

        const data = {
            datasets: [{
                data: _.map(labels, nombre => etiquetas[nombre]),
                backgroundColor: "_".repeat(labels.length).split("").map(() => {
                    return randomColor();
                })
            }],

            labels: labels
        };

        console.log(data);

        console.log(ctx);

        const myDoughnutChart = new Chart(ctx, {
            type: 'doughnut',
            data: data,
            // options: options
        });
    }
});