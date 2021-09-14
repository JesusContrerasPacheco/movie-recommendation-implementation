module.exports = {
    DYNAMODB: {
        QUERY: {
            FIRST: "first"
        }
    },
    STAT: {
        ACTIVE: "ACT",
        INACTIVE: "INA",
        // FRIEND
        PENDEND: "PEN",
        LOCK: "LCK",
        REJECT: "REJ"
    },
    DATABASE: {
        INSERT: {
          code: "DBS001",
          message: "Success Insert"
        },
        UPDATE: {
          code: "DBS002",
          message: "Success Update"
        },
        QUERY: {
          code: "DBS003",
          message: "Success Query"
        }
    },
    CODE_COUNTRY_PHONE: ["PE", "VE"] //["+51", "+56"]
};