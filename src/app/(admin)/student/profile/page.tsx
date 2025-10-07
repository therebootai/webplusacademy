import { getAStudentbyId } from "@/actions/studentAction";
import StudentTemplate from "@/templates/StudentTemplate";
import { getFormattedDate } from "@/util/dateParse";
import { verifyToken } from "@/util/jsonToken";
import { cookies } from "next/headers";

export default async function StudentProfilePage() {
  const studentData = await pageData();
  return (
    <StudentTemplate>
      <div className="flex flex-col gap-6 py-4">
        <h1 className="font-bold lg:text-2xl text-xl text-site-darkgreen">
          Student Details
        </h1>
        <div className="relative h-max overflow-auto">
          <table className="w-full table-auto text-base text-left border border-site-gray">
            <tbody className="text-gray-600 divide-y">
              <tr className="divide-x">
                <td className="pl-6 py-4 whitespace-nowrap text-site-darkgreen font-semibold">
                  ID
                </td>
                <td className="pl-6 py-4 whitespace-nowrap text-site-black">
                  {studentData?.student_id}
                </td>
              </tr>
              <tr className="divide-x">
                <td className="pl-6 py-4 whitespace-nowrap text-site-darkgreen font-semibold">
                  Name
                </td>
                <td className="pl-6 py-4 whitespace-nowrap text-site-black">
                  {studentData?.studentName}
                </td>
              </tr>
              <tr className="divide-x">
                <td className="pl-6 py-4 whitespace-nowrap text-site-darkgreen font-semibold">
                  Mobile Number
                </td>
                <td className="pl-6 py-4 whitespace-nowrap text-site-black">
                  {studentData?.mobileNumber}
                </td>
              </tr>
              <tr className="divide-x">
                <td className="pl-6 py-4 whitespace-nowrap text-site-darkgreen font-semibold">
                  Admission Date
                </td>
                <td className="pl-6 py-4 whitespace-nowrap text-site-black">
                  {getFormattedDate(studentData?.dateOfAdmission)}
                </td>
              </tr>
              <tr className="divide-x">
                <td className="pl-6 py-4 whitespace-nowrap text-site-darkgreen font-semibold">
                  Gender
                </td>
                <td className="pl-6 py-4 whitespace-nowrap text-site-black">
                  {studentData?.gender}
                </td>
              </tr>
              <tr className="divide-x">
                <td className="pl-6 py-4 whitespace-nowrap text-site-darkgreen font-semibold">
                  Guardian Name
                </td>
                <td className="pl-6 py-4 whitespace-nowrap text-site-black">
                  {studentData?.gurdianName}
                </td>
              </tr>
              <tr className="divide-x">
                <td className="pl-6 py-4 whitespace-nowrap text-site-darkgreen font-semibold">
                  Guardian Mobile Number
                </td>
                <td className="pl-6 py-4 whitespace-nowrap text-site-black">
                  {studentData?.gurdianMobileNumber}
                </td>
              </tr>
              <tr className="divide-x">
                <td className="pl-6 py-4 whitespace-nowrap text-site-darkgreen font-semibold">
                  Date of Birth
                </td>
                <td className="pl-6 py-4 whitespace-nowrap text-site-black">
                  {getFormattedDate(studentData?.dateOfBirth)}
                </td>
              </tr>
              <tr className="divide-x">
                <td className="pl-6 py-4 whitespace-nowrap text-site-darkgreen font-semibold">
                  Caste
                </td>
                <td className="pl-6 py-4 whitespace-nowrap text-site-black">
                  {studentData?.caste}
                </td>
              </tr>
              <tr className="divide-x">
                <td className="pl-6 py-4 whitespace-nowrap text-site-darkgreen font-semibold">
                  Class 10 School Name
                </td>
                <td className="pl-6 py-4 whitespace-nowrap text-site-black">
                  {studentData?.class10SchoolName}
                </td>
              </tr>
              <tr className="divide-x">
                <td className="pl-6 py-4 whitespace-nowrap text-site-darkgreen font-semibold">
                  10 pass year
                </td>
                <td className="pl-6 py-4 whitespace-nowrap text-site-black">
                  {studentData?.class10PassYear}
                </td>
              </tr>
              <tr className="divide-x">
                <td className="pl-6 py-4 whitespace-nowrap text-site-darkgreen font-semibold">
                  Class 12 School Name
                </td>
                <td className="pl-6 py-4 whitespace-nowrap text-site-black">
                  {studentData?.class12SchoolName}
                </td>
              </tr>
              <tr className="divide-x">
                <td className="pl-6 py-4 whitespace-nowrap text-site-darkgreen font-semibold">
                  12 pass year
                </td>
                <td className="pl-6 py-4 whitespace-nowrap text-site-black">
                  {studentData?.class12PassYear}
                </td>
              </tr>
              <tr className="divide-x">
                <td className="pl-6 py-4 whitespace-nowrap text-site-darkgreen font-semibold">
                  Address
                </td>
                <td className="pl-6 py-4 whitespace-nowrap text-site-black">
                  {studentData?.address}
                </td>
              </tr>
              <tr className="divide-x">
                <td className="pl-6 py-4 whitespace-nowrap text-site-darkgreen font-semibold">
                  City
                </td>
                <td className="pl-6 py-4 whitespace-nowrap text-site-black">
                  {studentData?.city}
                </td>
              </tr>
              <tr className="divide-x">
                <td className="pl-6 py-4 whitespace-nowrap text-site-darkgreen font-semibold">
                  Pincode
                </td>
                <td className="pl-6 py-4 whitespace-nowrap text-site-black">
                  {studentData?.pinCode}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
