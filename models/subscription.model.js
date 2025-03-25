import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Subscription name is required"],
        trim: true,
        minlength: [2, "Name must be at least 2 characters long"],
        maxlength: [100, "Name must be at most 100 characters long"]
    },
    price: {
        type: Number,
        required: [true, "Subscription price is required"],
        min: [0, "Price must be a positive number"]
    },
    currency: {
        type: String,
        enum: ["USD", "EUR", "GBP"],
        default: "USD"
    },
    frequency: {
        type: String,
        enum: ["daily", "weekly", "monthly", "yearly"],
    },
    category: {
        type: String,
        enum: ["entertainment", "health", "fitness", "education", "finance", "other"],
        required: [true, "Subscription category is required"]
    },
    paymentMethod: {
        type: String,
        required: [true, "Payment method is required"],
        trim: true,
    },
    status: {
        type: String,
        enum: ["active", "cancelled", "expired"],
        default: "active"
    },
    startDate: {
        type: Date,
        required: [true, "Subscription start date is required"],
        validate: {
            validator: (value) => value <= new Date(),
            message: "Subscription start date must be in the past"
        }
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function (value) {
                return value > this.startDate;
            },
            message: "Subscription renewal date must be after the start date"
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"],
        index: true
    }
}, { timestamps: true });

// Auto-calculate the renewal date if missing
subscriptionSchema.pre("save", function (next) {
    if (!this.renewalDate) {
       const renewalPeriods = {
          daily: 1,
          weekly: 7,
          monthly: 30,
          yearly: 365
       }

       this.renewalDate = new Date(this.startDate);
       this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    //Auto-calculate the renewal date if renewal date has passed
    if (this.renewalDate < new Date()) {
        this.renewalDate.status = 'expired';
    }

    next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;