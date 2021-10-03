module.exports = {
    DYNAMODB: {
        QUERY: {
            FIRST: "first"
        }
    },
    STAT: {
        ACTIVE: "ACT",
        INACTIVE: "INA",
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
    MESSAGES: {
      "SUBJECT": "Recordatorio de recomendaciones - Movies UPC"
    },
    MAIL: {
      "BUCKET": "ue2s3bucketprv001/upc/tp2/mail",
      "KEY": "mail.html"
    }
};