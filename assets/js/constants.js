const API_URL = "https://api.cognospheredynamics.com/api/auth";

// image storage

const imagesUrl = `https://api.cognospheredynamics.com/storage/`;

// user Id

const windowURL = new URL(window.location.href);
const params = new URLSearchParams(windowURL.search);
const userId = parseInt(params.get("id"));

// Twogere
const ORGANIZATIONS = "getAllOrganisation";
const GET_ALL_USERS = "getAllTwogereUsers";
const GET_ALL_ORGANIZATION_USERS = `getAllOrganisationUsers/${userId}`;
const GET_SINGLE_USER = `getSingleUser/${userId}`;
const TWOGERE_ORGANIZATIONS = "getAllOrganisationTwogere";

const REGISTER_TWOGERE_ADMIN = "registerTwogereAdmin";

// Administrators

const LOGOUT_ADMINISTRATORS = "logoutUser";
const LOGIN_ADMINISTRATORS = "loginWebTwogereAdmin";
const READ_ADMINISTRATORS_PROFILE = `adminProfile/${userId}`;

// payments

const PAYMENTS = "payment";

// verify mail and codes sent to mails
const verifyMail = "sendMailForVerification";
const verifyCode = "verifyingCode";

//  organization profiles

const ORG_PROFILE = `organisationProfile`;
const ACTIVE_USER_PROFILE = `userProfile`;
const EDIT_ORG = "editOrganisation";
const ADMINS = "twogereAdminUsers";
const orgPayments = `orgPayments`;

const EDIT_USER = "editUser";
const EDIT_PASSWORD = "editPassword";

// jobs
const JOBS = "getallJobs";
const ADDJOB = "postJob";
const UPDATE_JOB = `updatingJob/${userId}`;
const JOB_DETAILS = `getSingleJob/${userId}`;
const DELETE_JOB = `deleteJob/${userId}`;

const sendEmailToVerify = "sendVerifyResetEmail";
const sendCodeToVerify = "verifyingResetEmail";
const sendPasswordToReset = "resetPassword";

const encryptionKey = "0123456789abcdef0123456789abcdef";

export {
  API_URL,
  imagesUrl,
  ORGANIZATIONS,
  GET_ALL_USERS,
  LOGOUT_ADMINISTRATORS,
  LOGIN_ADMINISTRATORS,
  ORG_PROFILE,
  EDIT_ORG,
  ACTIVE_USER_PROFILE,
  EDIT_PASSWORD,
  EDIT_USER,
  ADMINS,
  READ_ADMINISTRATORS_PROFILE,
  GET_ALL_ORGANIZATION_USERS,
  GET_SINGLE_USER,
  TWOGERE_ORGANIZATIONS,
  // userid
  userId,
  PAYMENTS,
  orgPayments,

  // verifying
  verifyCode,
  verifyMail,

  // twogere Admin
  REGISTER_TWOGERE_ADMIN,

  // jobs
  JOBS,
  ADDJOB,
  UPDATE_JOB,
  JOB_DETAILS,
  DELETE_JOB,
  encryptionKey,

  // reseting email
  sendEmailToVerify,
  sendCodeToVerify,
  sendPasswordToReset,
};
