const cardList = [
  {
    id: "pm_1IlaeDHLMB3TsWb24AP5STxl",
    object: "payment_method",
    billing_details: {
      address: {
        city: null,
        country: "US",
        line1: null,
        line2: null,
        postal_code: null,
        state: null,
      },
      email: null,
      name: "G Khan",
      phone: null,
    },
    card: {
      brand: "amex",
      checks: {
        address_line1_check: null,
        address_postal_code_check: null,
        cvc_check: "pass",
      },
      country: "US",
      exp_month: 12,
      exp_year: 2021,
      fingerprint: "snTLXUhxiTiw5KTk",
      funding: "credit",
      generated_from: null,
      last4: "0005",
      networks: {
        available: ["amex"],
        preferred: null,
      },
      three_d_secure_usage: {
        supported: false,
      },
      wallet: null,
    },
    created: 1619705721,
    customer: "cus_JONPhq5xjKzYX8",
    livemode: false,
    metadata: {},
    type: "card",
  },
  {
    id: "pm_1IlaeDHLMB3TsWb24AP5STxr",
    object: "payment_method",
    billing_details: {
      address: {
        city: null,
        country: "US",
        line1: null,
        line2: null,
        postal_code: null,
        state: null,
      },
      email: null,
      name: "A Fernandes",
      phone: null,
    },
    card: {
      brand: "visa",
      checks: {
        address_line1_check: null,
        address_postal_code_check: null,
        cvc_check: "pass",
      },
      country: "US",
      exp_month: 12,
      exp_year: 2021,
      fingerprint: "snTLXUhxiTiw5KTk",
      funding: "credit",
      generated_from: null,
      last4: "0005",
      networks: {
        available: ["amex"],
        preferred: null,
      },
      three_d_secure_usage: {
        supported: false,
      },
      wallet: null,
    },
    created: 1619705721,
    customer: "cus_JONPhq5xjKzYX8",
    livemode: false,
    metadata: {},
    type: "card",
  },
];

export { cardList };
