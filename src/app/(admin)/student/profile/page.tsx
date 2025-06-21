import { checkTokenAuth } from "@/actions/authAction";
import StudentTemplate from "@/templates/StudentTemplate";
import { isValid } from "date-fns";

export default async function () {
  const studentData = await pageData();
  return (
    <StudentTemplate>
      <div className="flex flex-col gap-6">
        <h1 className="font-bold lg:text-2xl text-xl text-site-darkgreen">
          Student Details
        </h1>
        <div className="grid lg:grid-cols-3 grid-cols-1">
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
              {isValid(studentData?.dateOfAdmission)
                ? new Date(studentData?.dateOfAdmission).toLocaleDateString()
                : "None"}
            </h5>
          </div>
        </div>
      </div>
    </StudentTemplate>
  );
}

async function pageData() {
  try {
    const user = await checkTokenAuth();
    return user.user;
  } catch (err) {
    console.log(err);
    return null;
  }
}
