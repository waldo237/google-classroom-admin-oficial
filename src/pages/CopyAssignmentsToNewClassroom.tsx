import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "../App.module.scss";

import {
  createAssignments,
  undoOldActions,
} from "../requestFunctions/assignmentsRequest";
import { createTopics } from "../requestFunctions/topicRequests";
import { Context } from "../store/store";
import Table from "../components/Table";
import Progress from "../components/Progress";
import {
  getAllCourses,
  getCoursesArray,
} from "../requestFunctions/courseRequests";
import BtnLoad from "../components/BtnLoad";
import {
  AssignmentInterface,
  CourseInterface,
  TopicInterface,
} from "../interfaces/interfaces";
export default function CopyAssignmentsToNewClassroom() {
  const [state, dispatch] = useContext(Context);
  const { courses } = state;
  const [progress, setProgress] = useState(0)
  const [total, setTotal] = useState(0)

  // dealing with memory leaks when unmounting components
  const unmounted = useRef(false);
  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);

  async function chainedActions() {
    try {
      
      const coursesToBeEdited: CourseInterface[] = await getCoursesArray<CourseInterface>( dispatch);
      let count = 0;
      
      for (let i = 0; i < coursesToBeEdited.length; i++) {
          const selectedAssignments = JSON.parse( localStorage.getItem("selectedAssignments") || "" ) as [];
          const selectedTopics = JSON.parse(localStorage.getItem("selectedTopics") || "") as [];
          const courseReceivingChange = coursesToBeEdited[i];
          
        
        await createTopics(courseReceivingChange.id, state, dispatch);

        await createAssignments(
            courseReceivingChange.id,
            selectedAssignments,
            selectedTopics,
            state,
            dispatch
          );
        dispatch({ type: "SET_LOADING", payload: "" });
        count++;
       console.log(count);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <section className={styles.mainContainerCopy}>
      <h2>CopyAssignments</h2>
      <div>
        <ol className={styles.cols}>
          <li>
            <p>Get the list of all your classrooms</p>

            <BtnLoad
              action={getAllCourses}
              identifier="button-1"
              text="Load my Classrooms"
            />
            {courses && courses.length ? (
              <Progress value={courses.length} total={courses.length} />
            ) : null}
          </li>

          <li>
            <p>Copy the topics from blueprint to your classrooms</p>
            <BtnLoad
              action={createTopics}
              identifier="button-2"
              text="Copy Topics"
            />
            {/* {topicLogs.current.length ? <Progress value={topicLogs.current.length} total={topics.length} /> : null} */}
          </li>

          <li>
            <p>Copy the assignments from blueprint to your classrooms</p>
            <BtnLoad
              action={createAssignments}
              identifier="button-3"
              text="Copy Assignments"
            />
          </li>
        </ol>
        <hr />

        <div className={styles.cols}>
          <p> do all operations at once</p>
          <BtnLoad
            action={chainedActions}
            identifier="button-4"
            text="😏copy entire blueprint😏"
          />
        </div>
        <div>
          <p> Undo the previous operations</p>
          <BtnLoad
            action={() => undoOldActions(state, dispatch)}
            identifier="button-5"
            text="undo actions"
            classNames={styles.red}
          />
        </div>
      </div>
      <h4>monitor operations</h4>
      <h5>⬇</h5>
      <div>
        <Table
          title={"Classrooms in my account"}
          items={courses}
          selection={["name", "completed", "id", "section"]}
        />
      </div>
    </section>
  );
}