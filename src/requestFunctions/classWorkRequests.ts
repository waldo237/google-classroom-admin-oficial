import { getHeaders } from "../components/signInFuncs";
import {  StateInterface } from "../interfaces/interfaces";

export async function createCourseWork(courseId: string, state: StateInterface, dispatch: Function) {
  const {  assignment } = state;
  const requestBody: BodyInit = JSON.stringify(assignment);
  try {
    await fetch(`https://classroom.googleapis.com/v1/courses/${courseId}/courseWork?key=${process.env.REACT_APP_API_KEY}`, { method: "POST", headers: getHeaders(), body: requestBody })
      .then(async (res) => {
        if (!res.ok) {
          const er = await res.json();
          throw new Error(er.error.message);
        }
        return res.json();
      })
      .then(async (res: any) => {
        // dispatch({ type: 'SET_LOGS', payload: [{ type: logTypes.ASSIGMENT, id: res.id }, ...logs] });
      })
      .catch((er: any) => { throw new Error(er); });
    // dispatch({ type: 'SET_LOADING', payload: "" });
  } catch (error) {
    console.log(error)
    // dispatch({ type: 'SET_ERROR', payload: [{ message: error.message }] });
    // dispatch({ type: 'SET_LOADING', payload: "" });
  }
}
/**
 * Deletes a course work. This request must be made by the Developer Console
 *  project of the OAuth client ID used to create the corresponding course work item.
 * @param courseId 
 * @param id 
 * @param state 
 * @param dispatch 
 */
export async function deleteCourseWork(courseId: string, id: string, state: StateInterface, dispatch: Function) {

  try {
    await fetch(`https://classroom.googleapis.com/v1/courses/${courseId}/courseWork/${id}?key=${process.env.REACT_APP_API_KEY}`,
      { method: "DELETE", headers: getHeaders() })
      .then(async (res) => {
        if (!res.ok) {
          const er = await res.json();
          throw new Error(er.error.message);
        }
        return res.json();
      })
      .then(async (res: any) => {
        // dispatch({ type: 'SET_LOGS', payload: [{ type: logTypes.ASSIGMENT, id: res.id }, ...logs] });
      })
      .catch((er: any) => { throw new Error(er); });
    // dispatch({ type: 'SET_LOADING', payload: "" });
  } catch (error) {
    console.log(error)
    // dispatch({ type: 'SET_ERROR', payload: [{ message: error.message }] });
    // dispatch({ type: 'SET_LOADING', payload: "" });
  }
}
