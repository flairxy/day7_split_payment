<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <h1>Split Payment</h1>
          <p>
            Both fields take in arrays of addresses and amounts respectively.
            The arrays must be equal
          </p>
          <form>
            <div>
              <input
                type="text"
                placeholder="enter address"
                v-model="address"
              />
              <button @click.prevent="addAddress">add Address</button>
            </div>
            <div>
              <input type="text" placeholder="enter amount" v-model="amount" />
              <button @click.prevent="addAmount">add Amount</button>
            </div>
          </form>
          <form>
            <h4>Send</h4>
            <div class="form-group">
              <label for="send-to">To</label>
              <input
                v-model="addresses"
                type="text"
                placeholder="['address1', 'address2]"
                class="form-control"
                disabled
              />
            </div>
            <div class="form-group">
              <label for="send-amount">Amount</label>
              <input
                placeholder="['amount1', 'amount2]"
                v-model="amounts"
                type="text"
                class="form-control"
                disabled
              />
            </div>
            <button
              type="submit"
              class="btn btn-primary"
              @click.prevent="transferEther"
            >
              send
            </button>
            <div>
              <p id="send-result"></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "SplitPayment",
  data: () => ({
    addresses: [],
    amounts: [],
    amount: "",
    address: "",
  }),
  methods: {
    addAddress() {
      this.addresses.push(this.address);
      this.address = "";
    },
    addAmount() {
      this.amounts.push(parseInt(this.amount));
      this.amount = "";
    },
    transferEther() {
      // ['0x6d9980A153FeE9179015F28F3553277634c52D89','0xB2010adeebf80e3a04f6c1fE3414f7DF44A51c8B']
      // [50, 40]
      const total = this.amounts.reduce((sum, val) => (sum += val));
      this.drizzleInstance.contracts["SplitPayment"].methods["send"](
        this.addresses,
        this.amounts
      )
        .send({ from: this.activeAccount, value: total })
        .then((res) => {
          console.log(res);
        });
      // this.drizzleInstance.web3.eth.getAccounts().then((_account) => {
      //   console.log(_account);
      // });
    },
    async getAccounts() {
      // let res = await this.drizzleInstance.eth.getAccounts();
      // this.accounts = res;
    },
  },
  computed: {
    ...mapGetters("contracts", ["getContractData"]),
    ...mapGetters("drizzle", ["drizzleInstance"]),
    ...mapGetters("accounts", ["activeAccount"]),
  },
};
</script>
