import React from 'react';
import M from 'materialize-css'
import { useEffect } from 'react';
import LocationForm from './LocationForm';


export default function Location(props) {
    useEffect(() => {
        M.AutoInit();
      }, []);
    /*
        const [stateObject, setObjectState] = useState({
            firstKey: '',
            secondKey: '',
        });    
    
        setObjectState((prevState) => ({
            ...prevState, 
            secondKey: 'value',
        }));
    */
    /*
     function renderLocation() {
         console.log("SORTERAR ELEMENTEN: ")
         props.data.forEach(element => {
             if (element.location_index === "1") {
                 return (
                     <li className='row card-panel'>
 
                         <i className="material-icons col s1">place</i>
                         <span className='col s9'>
                             {props.data.name}
                         </span>
                         <button onClick={() => { props.deleteLocation(props.data.id) }}>
                             Ta bort
                         </button>
                         <button onClick={() => { props.swapLocationsDown(props.data.id) }}>
                             Flytta ner
                         </button>
                     </li>
                 )
             } else if (element.location_index !== (element.location_index.length - 2).toString()) {
                 return (
                     <li className='row card-panel'>
 
                         <i className="material-icons col s1">place</i>
                         <span className='col s9'>
                             {props.data.name}
                         </span>
                         <button onClick={() => { props.deleteLocation(props.data.id) }}>
                             Ta bort
                         </button>
                         <button onClick={() => { props.swapLocationsUp(props.data.id) }}>
                             Flytta upp
                         </button>
                         <button onClick={() => { props.swapLocationsDown(props.data.id) }}>
                             Flytta ner
                         </button>
                     </li>
                 )
             } else if (element.location_index === (element.location_index.length - 1).toString()) {
                 return (
                     <li className='row card-panel'>
 
                         <i className="material-icons col s1">place</i>
                         <span className='col s9'>
                             {props.data.name}
                         </span>
                         <button onClick={() => { props.deleteLocation(props.data.id) }}>
                             Ta bort
                         </button>
                         <button onClick={() => { props.swapLocationsUp(props.data.id) }}>
                             Flytta upp
                         </button>
                     </li>
                 )
             } else if (element.last_location === "true") {
                 return (
                     <li className='row card-panel'>
 
                         <i className="material-icons col s1">place</i>
                         <span className='col s9'>
                             {props.data.name}
                         </span>
                     </li>
                 )
             }
         });
     }
 */
    return (
        <>
            <li className='row card-panel'>
                <section className='collapsible-header'>
                <i className="material-icons col s1">place</i>
                <span className='col s9'>
                    {props.data.name} Här hamnar titeln på en location. vi kan flytta en location upp eller ner samt ta bort.
                </span>
                <button onClick={() => { props.deleteLocation(props.data.id) }}>
                    Ta bort
                </button>
                <button onClick={() => { props.swapLocationsUp(props.data.id) }}>
                    Flytta upp
                </button>
                <button onClick={() => { props.swapLocationsDown(props.data.id) }}>
                    Flytta ner
                </button>
                </section>
                <section className='collapsible-body'>
                    <LocationForm />
                </section>
            </li>
        </>
    )
}
