import React, { useRef, useEffect } from 'react';
import Location from './Location';
import M from 'materialize-css'
import { Link } from 'react-router-dom';

export default function ModEditForms(props) {

	let titleRef = useRef();
	let descriptionRef = useRef();
	console.log("ÅÄÖÅÄÖÅÄÖÅÄÖÅÄÖÅÄÖÅÄÖÅÄÖÅÄÖÅÄÖÅÄÖÅÄÖ")
	console.log(props.mainData.id)
	let QRURL = '/moderator/qr-codes/' + props.mainData.id


	useEffect(() => {
		M.AutoInit();
		M.updateTextFields();

	}, []);

	function swapLocationsUp(locIndex) {
		/*
		onClick function to move a location-object up
		receives the ID from a specific location
		using forEach to sort out the ID of the location rendered below and sends "idFrom, idTo" to updateLocation()
		location_index will always be ordered ascending, making it possible to find the right object    
		*/
		let routeID = props.mainData.id;
		var idToIndex = (parseInt(locIndex) - 1);
		var idTo = "";
		let idFrom = ""

		props.locationsData.forEach((item) => {
			console.log(item.location_index + "   " + idToIndex);
			if (item.location_index === locIndex) {
				idFrom = item.location_id;
			} else if (item.location_index === idToIndex.toString()) {

				idTo = item.location_id
			}
		});
		props.callMoveLocation(routeID, idFrom, idTo);
	}

	function swapLocationsDown(locIndex) {

		/*
		onClick function to move a location-object down
		receives the ID from a specific location
		using forEach to sort out the ID of the location rendered above and sends "idFrom, idTo" to updateLocation()
		location_index will always be ordered ascending, making it possible to find the right object    
		*/
		let routeID = props.mainData.id;
		var idToIndex = (parseInt(locIndex) + 1);
		var idTo = "";
		let idFrom = ""

		props.locationsData.forEach((item) => {
			console.log(item.location_index + "   " + idToIndex);
			if (item.location_index === locIndex) {
				idFrom = item.location_id;
			} else if (item.location_index === idToIndex.toString()) {

				idTo = item.location_id
			}
		});

		props.callMoveLocation(routeID, idFrom, idTo);
	}

	function handleDelete(id) {
		alert(id)

		let routeID = props.mainData.id;
		props.callDeleteLocation(routeID, id);
	}

	const handleNewLocation = (() => {
		let id = props.mainData.id;
		props.callNewLocation(id);
	})

	const handleSave = (() => {
		let routeID = props.mainData.id;
		let title = titleRef.current.value;
		let description = descriptionRef.current.value;
		props.callSaveRoute(routeID, title, description);

	})




	return (
		<>
			<div className="row">
				<div className="col l12 m12">
					<div className='row'>
						<div className='col offset-l1 offset-m1'>
							<h5>Redigering av {props.mainData.title}</h5>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s11 l10 offset-l1 col m10 offset-m1">
							<i className="material-icons prefix">label</i>
							<label>Titel</label>
							<input
								id="title"
								type="text"
								defaultValue={props.mainData.title}
								ref={titleRef}
							/>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s11 l10 offset-l1 col m10 offset-m1">
							<i className="material-icons prefix">mode_edit</i>
							<label htmlFor="description">Beskrivning</label>
							<textarea
								type="text"
								className="materialize-textarea"
								id="description"
								defaultValue={props.mainData.description}
								ref={descriptionRef}
							/>
						</div>
					</div>
					<div className="row">
						<div className='col s 12 l12 m12'>
							<ul className="collapsible z-depth-0" style={{ 'border': '0' }}>
								{[...props.locationsData].map((location) => (
									<Location
										key={location.location_id}
										routeID={props.mainData.id}
										data={location}
										deleteLocation={handleDelete}
										swapLocationsUp={swapLocationsUp}
										swapLocationsDown={swapLocationsDown}
									/>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div className='row'>
				<div className='col s6 l6 m6 offset-l1 offset-m1'>
					<a class="waves-effect waves-light btn green lighten-1" onClick={handleNewLocation}><i className="material-icons col s1" onClick={handleNewLocation}>
						save
					</i> Spara</a>
				</div>
				<div className='col s6 l4 m4'>
					<Link to={QRURL} state={{ data: props.locationsData }}>
						<a class="waves-effect waves-light btn grey darken-3 right" ><i className="material-icons col s1">
							qr_code_scanner
						</i> Visa QR </a>
					</Link>
				</div>
			</div>
		</>
	)
}