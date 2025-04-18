import mongoose from "mongoose";
import BaseSchema from "#models/base";
import { saveFile } from "#utils/uploadFile";

const brandRegistrationSchema = new BaseSchema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    file: true,
  }, // Store image path or URL
  about: {
    type: String,
    required: true,
    maxlength: 300,
  },
  website: {
    type: String,
    required: false,
  },
  socialMedia: {
    type: [String],
    required: false,
  },
  primaryContactNumber: {
    type: String,
    required: true,
  },
  secondaryContactNumber: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  supportEmail: {
    type: String,
    required: false,
  },
  faxNumber: {
    type: String,
    required: false,
  },
  authorizedRepresentativeName: {
    type: String,
    required: true,
  },
  authorizedRepresentativeContactNumber: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  companyType: {
    type: String,
    required: true,
  },
  gstNumber: {
    type: String,
    required: true,
  },
  gstCertificate: {
    type: String,
    file: true,
  },
  panNumber: {
    type: String,
    required: true,
  },
  businessAddress: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  bankName: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
  },
  accountHolderName: {
    type: String,
    required: true,
  },
  ifscCode: {
    type: String,
    required: true,
  },
  bankBranchName: {
    type: String,
    required: true,
  },
  branchAddress: {
    type: String,
    required: false,
  },
  fssaiLicenseNumber: {
    type: String,
    required: false,
  },
  fssaiLicenseCopy: {
    type: String,
    file: true,
    required: false,
  },
  ayushLicenseNumber: {
    type: String,
    required: false,
  },
  ayushLicenseCopy: {
    type: String,
    file: true,
    required: false,
  },
  otherCertifications: {
    type: [String],
    required: false,
  }, // ISO etc.
  password: {
    type: String,
    required: true,
  },
  approved: {
    type: Boolean,
    required: true,
    default: false,
  },
});

brandRegistrationSchema.pre("save", saveFile);

export default mongoose.model("BrandRegistration", brandRegistrationSchema);
