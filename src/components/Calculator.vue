<template>
  <div class="calculator">
    <div class="display">{{current || '0'}}</div>
    <div class="btn" @click="clear">C</div>
    <div class="btn" @click="sign">+/-</div>
    <div class="btn" @click="percent">%</div>
    <div class="btn operator" @click="divide">/</div>

    <div class="btn" @click="append('7')">7</div>
    <div class="btn" @click="append('8')">8</div>
    <div class="btn" @click="append('9')">9</div>
    <div class="btn operator" @click="times">x</div>

    <div class="btn" @click="append('4')">4</div>
    <div class="btn" @click="append('5')">5</div>
    <div class="btn" @click="append('6')">6</div>
    <div class="btn operator" @click="minus">-</div>

    <div class="btn" @click="append('1')">1</div>
    <div class="btn" @click="append('2')">2</div>
    <div class="btn" @click="append('3')">3</div>
    <div class="btn operator" @click="add">+</div>

    <div class="zero btn" @click="append('0')">0</div>
    <div class="btn" @click="dot">.</div>
    <div class="btn operatorsss" @click="equal">=</div>
  </div>
</template>
<script>
export default {
  name: "Calculator",
  data() {
    return {
      current: "",
      operator: null,
      previous: null,
      operatorClicked: false
    };
  },
  methods: {
    clear() {
      this.current = "";
    },
    sign() {
      this.current =
        this.current.charAt(0) === "-"
          ? this.current.slice(1)
          : `-${this.current}`;
    },
    percent() {
      this.current = `${parseFloat(this.current) / 100}`;
    },
    append(number) {
      if (this.operatorClicked) {
        this.current = "";
        this.operatorClicked = false;
      }
      this.current = `${this.current}${number}`;
    },
    dot() {
      if (this.current.indexOf(".") === -1) {
        this.append(".");
      }
    },
    maintainStates() {
      this.operatorClicked = true;
      this.previous = this.current;
    },
    divide() {
      this.operator = (a, b) => a / b;
      this.maintainStates();
    },
    times() {
      this.operator = (a, b) => a * b;
      this.maintainStates();
    },
    minus() {
      this.operator = (a, b) => a - b;
      this.maintainStates();
    },
    add() {
      this.operator = (a, b) => a + b;
      this.maintainStates();
    },
    equal() {
      this.current = `${this.operator(
        parseFloat(this.previous),
        parseFloat(this.current)
      )}`;
      this.previous = null;
    }
  }
};
</script>
<style scoped>
.calculator {
  width: 400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(50px, auto);
  font-size: 40px;
  color: black;
}
.display {
  grid-column: 1/5;
  background-color: grey;
  color: black;
}
.zero {
  grid-column: 1/3;
}
.btn {
  background-color: bisque;
  border: 1px solid black;
}
.operator {
  background-color: orange;
  color: white;
}
</style>


