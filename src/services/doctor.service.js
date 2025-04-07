import Doctor from "#models/doctor";
import BaseService from "#services/base";

class DoctorService extends BaseService {
  static Model = Doctor;
}

export default DoctorService;
