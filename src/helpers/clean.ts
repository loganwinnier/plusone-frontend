/* eslint-disable @typescript-eslint/no-explicit-any */

/** clean: cleans userData by removing empty fields */
export default function clean(userData : {[key: string]: any}) {
    for(const data in userData) {
      if(userData[data] === "") {
        delete userData[data]
      }
    }
    return userData
}