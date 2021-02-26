var firebaseConfig = {
    apiKey: "AIzaSyAItQs2KtkI5j3pM3FN8yxN_ZnFLyifruI",
    authDomain: "service-storage-acc7a.firebaseapp.com",
    databaseURL: "https://service-storage-acc7a-default-rtdb.firebaseio.com",
    projectId: "service-storage-acc7a",
    storageBucket: "service-storage-acc7a.appspot.com",
    messagingSenderId: "10223659033",
    appId: "1:10223659033:web:6b998588ce24ad03796288"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Create a variable to reference the database
let db = firebase.database()


//when submit button is pressed, use the push method of the firebase database to add new child records without destroying previous records
$("#submit").on("click",function(event) {
// event.preventDefault()     Since we are adding these entries to firebase, reset the form

var newEntryRef = db.ref('/school');
var newEntry = newEntryRef.push({
    employeeName: $("#txtEmployeeName").val(),
    role: $("#txtRole").val(),
    startDate: $("#dtDate").val(),
    monthlyRate: $("#intMonthlyRate").val(),
    dateAdded: firebase.database.ServerValue.TIMESTAMP    //use the firebase option to add a unix timestamp
});
//Could have done it this way
// newEntry.set({
//     "employeeName": strEmpName,
//     "role": strRole,
//     "startDate": dtDate,
//     "monthlyRate": intRate
// });
})

//when the form is loaded the child added is fired for each exising child in the database at this location
//then it will fire each time a new one is added
//the orderByChild will sort the order of how each snapshot object is returned
db.ref("/school").orderByChild("dateAdded").on("child_added", function(snap) {
        let newRow = $("<tr>")
        let strEmpName = $("<td>").append(snap.val().employeeName)
        let strRole = $("<td>").append(snap.val().role)
        let startDate = moment(snap.val().startDate)
        // let empStartPretty = moment.unix(empStart).format("MM/DD/YYYY")
        let dtDate = $("<td>").append(startDate.format("MM/DD/YYYY")) 
        let intRate = $("<td>").append(snap.val().monthlyRate)
        let firstDate = moment(snap.val().startDate)
        // console.log(moment().diff(startDate, "months"))
        // console.log(firstDate.diff(moment(),"months"))


        let monthsPassed = moment().diff(startDate, "months")
        //moment().diff(moment(empStart,"X"),"months")
        intMonthsWorked = $("<td>").append(monthsPassed)
        let intTotalBilled = $("<td>").append((snap.val().monthlyRate) * monthsPassed) 

        newRow.append(strEmpName,strRole, dtDate, intMonthsWorked ,intRate,intTotalBilled)
        // this looked better than my solution
        //     newRow = $("<tr>").append(
        //         $("<td>").text(empName),
        //             etc
        //     )

        $("#tableBody").prepend(newRow)
}, function(errObject) {
console.log(errObject)
})