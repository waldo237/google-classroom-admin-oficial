import React, { useContext } from "react";
import styles from "../App.module.scss";
import { Context } from "../store/store";
import ClassroomSelector from "../components/ClassroomSelector";
import Table from "../components/Table";
import { getAllCourses } from "../requestFunctions/courseRequests";
import BtnLoad from "../components/BtnLoad";

export default function Courses() {
  const [state ] = useContext(Context);
  const { courses } = state;

  return (
    <div className={styles.container}>
      <div className={styles.list}>
     
        <BtnLoad
          action={getAllCourses}
          identifier="GetlistofBtn"
          text="Get list of classrooms"
          classNames={styles.green}
        />
        <ClassroomSelector />

        <Table
          title={"Classrooms in this account"}
          selection={["courseState", "name", "id"]}
          items={courses}
        ></Table>
      </div>
    </div>
  );
}