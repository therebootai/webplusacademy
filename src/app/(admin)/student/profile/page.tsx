import { getAStudentbyId } from "@/actions/studentAction";
import StudentTemplate from "@/templates/StudentTemplate";
import { getFormattedDate } from "@/util/dateParse";
import { verifyToken } from "@/util/jsonToken";
import { cookies } from "next/headers";

export default async function StudentProfilePage() {
  const studentData = await pageData();
  const courseFess = studentData?.courseFees[0];
  return (
    <StudentTemplate>
      <div className="flex flex-col gap-6">
        <h1 className="font-bold lg:text-2xl text-xl text-site-darkgreen">
          Student Details
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 place-items-stretch justify-items-stretch gap-6">
          <div className="flex flex-col gap-4 border border-site-gray rounded-lg xl:p-8 md:p-6 p-4">
            <div className="flex flex-col gap-2">
              <h3 className="lg:text-lg text-base font-medium text-site-darkgreen">
                ID
              </h3>
              <h5 className="lg:text-base text-sm text-site-black">
                {studentData?.student_id}
              </h5>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="lg:text-lg text-base font-medium text-site-darkgreen">
                Name
              </h3>
              <h5 className="lg:text-base text-sm text-site-black">
                {studentData?.studentName}
              </h5>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="lg:text-lg text-base font-medium text-site-darkgreen">
                Admission Date
              </h3>
              <h5 className="lg:text-base text-sm text-site-black">
                {getFormattedDate(studentData?.dateOfAdmission)}
              </h5>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="lg:text-lg text-base font-medium text-site-darkgreen">
                Gender
              </h3>
              <h5 className="lg:text-base text-sm text-site-black capitalize">
                {studentData?.gender}
              </h5>
            </div>
          </div>
          <div className="flex flex-col gap-4 border border-site-gray rounded-lg xl:p-8 md:p-6 p-4">
            <div className="flex flex-col gap-2">
              <h3 className="lg:text-lg text-base font-medium text-site-darkgreen">
                Guardian Name
              </h3>
              <h5 className="lg:text-base text-sm text-site-black">
                {studentData?.gurdianName}
              </h5>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="lg:text-lg text-base font-medium text-site-darkgreen">
                Guardian Mobile Number
              </h3>
              <h5 className="lg:text-base text-sm text-site-black">
                {studentData?.gurdianMobileNumber}
              </h5>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="lg:text-lg text-base font-medium text-site-darkgreen">
                Date of Birth
              </h3>
              <h5 className="lg:text-base text-sm text-site-black">
                {getFormattedDate(studentData?.dateOfBirth)}
              </h5>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="lg:text-lg text-base font-medium text-site-darkgreen">
                Caste
              </h3>
              <h5 className="lg:text-base text-sm text-site-black capitalize">
                {studentData?.caste}
              </h5>
            </div>
          </div>
          <div className="flex flex-col gap-4 border border-site-gray rounded-lg xl:p-8 md:p-6 p-4">
            <div className="flex flex-col gap-2">
              <h3 className="lg:text-lg text-base font-medium text-site-darkgreen">
                Class 10 School Name
              </h3>
              <h5 className="lg:text-base text-sm text-site-black">
                {studentData?.class10SchoolName}
              </h5>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="lg:text-lg text-base font-medium text-site-darkgreen">
                10 pass year
              </h3>
              <h5 className="lg:text-base text-sm text-site-black">
                {studentData?.class10PassYear}
              </h5>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="lg:text-lg text-base font-medium text-site-darkgreen">
                Class 12 School Name
              </h3>
              <h5 className="lg:text-base text-sm text-site-black">
                {studentData?.class12SchoolName}
              </h5>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="lg:text-lg text-base font-medium text-site-darkgreen">
                12 pass year
              </h3>
              <h5 className="lg:text-base text-sm text-site-black capitalize">
                {studentData?.class12PassYear}
              </h5>
            </div>
          </div>
          <div className="flex flex-col gap-4 border border-site-gray rounded-lg xl:p-8 md:p-6 p-4">
            <div className="flex flex-col gap-2">
              <h3 className="lg:text-lg text-base font-medium text-site-darkgreen">
                Address
              </h3>
              <h5 className="lg:text-base text-sm text-site-black">
                {studentData?.address}
              </h5>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="lg:text-lg text-base font-medium text-site-darkgreen">
                City
              </h3>
              <h5 className="lg:text-base text-sm text-site-black">
                {studentData?.city}
              </h5>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="lg:text-lg text-base font-medium text-site-darkgreen">
                Pincode
              </h3>
              <h5 className="lg:text-base text-sm text-site-black">
                {studentData?.pinCode}
              </h5>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="lg:text-lg text-base font-medium text-site-darkgreen">
                Mobile Number
              </h3>
              <h5 className="lg:text-base text-sm text-site-black capitalize">
                {studentData?.mobileNumber}
              </h5>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <h1 className="font-bold lg:text-2xl text-xl text-site-darkgreen">
          Course Fees Details
        </h1>
      </div>
    </StudentTemplate>
  );
}

async function pageData() {
  try {
    const cookieStore = await cookies(); // Get cookies from request
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return { success: false, user: null };
    }

    const decodedPayload = verifyToken(token);

    if (
      !decodedPayload ||
      typeof decodedPayload !== "object" ||
      !decodedPayload._id
    ) {
      return { success: false, user: null };
    }

    const user = await getAStudentbyId(decodedPayload?._id);
    return { ...user.student };
  } catch (err) {
    console.log(err);
    return null;
  }
}
