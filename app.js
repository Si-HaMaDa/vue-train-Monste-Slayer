function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: [],
    };
  },
  computed: {
    playerHealthStyles() {
      return { width: this.playerHealth > 0 ? this.playerHealth + "%" : 0 };
    },
    monsterHealthStyles() {
      return { width: this.monsterHealth > 0 ? this.monsterHealth + "%" : 0 };
    },
    canUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        // A even
        this.winner = "even";
      } else if (value <= 0) {
        // Player lost
        this.winner = "Monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        // A even
        this.winner = "even";
      } else if (value <= 0) {
        // Monster lost
        this.winner = "Player";
      }
    },
  },
  methods: {
    playerAttack() {
      this.currentRound++;
      const attackValue = getRandomValue(7, 15);
      this.monsterHealth -= attackValue;
      this.addLogMessage("player", "attack", attackValue);
      this.monsterAttack();
    },
    monsterAttack() {
      const attackValue = getRandomValue(15, 21);
      this.playerHealth -= attackValue;
      this.addLogMessage("monster", "attack", attackValue);
    },
    playerHeal() {
      this.currentRound++;
      const healValue = getRandomValue(20, 30);
      if (this.playerHealth + healValue > 100) this.playerHealth = 100;
      else this.playerHealth += healValue;
      this.addLogMessage("player", "heal", healValue);
      this.monsterAttack();
    },
    playerSpecialAttack() {
      this.currentRound++;
      const attackValue = getRandomValue(10, 25);
      this.monsterHealth -= attackValue;
      this.addLogMessage("player", "attack", attackValue);
      this.monsterAttack();
    },
    surrender() {
      this.winner = "monster";
    },
    newGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.winner = null;
      this.currentRound = 0;
      this.logMessages = [];
    },
    addLogMessage(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
});

app.mount("#game");
