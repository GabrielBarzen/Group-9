import React from 'react'


export default function GameItem(props) {
  const icons = ['panorama_fish_eye', 'crop_square', 'change_history', 'star_border', 'check'];
  const colors = ['light-blue darken-3', 'grey darken-3', 'amber darken-4', 'purple darken-4', 'teal lighten-1'];
  const data = props.currentQuestion


  const handleClick = (id) => {
    // update clickedIds state here using props.setClickedIds
    const newClickedIds = { ...props.clickedIds }; // make a copy of the current clickedIds state
    if (newClickedIds[id]) {
      // If the id is present in the clickedIds object, remove it
      delete newClickedIds[id];
    } else {
      // If the id is not present in the clickedIds object, set it to true
      newClickedIds[id] = true;
    }
    props.setClickedIds(newClickedIds); // update the clickedIds state
    console.log(props.clickedIds)
  };

/*
const handleClick = (id) => {
  let newClickedIds = { ...props.clickedIds };

  const exists = newClickedIds.answers.find(ans => ans.id === id);
  if (exists){
    newClickedIds.answers = newClickedIds.answers.filter(ans => ans.id !== id)
  } else {
    newClickedIds.answers = newClickedIds.answers.concat({id:id})
  }
  props.setClickedIds(newClickedIds);
};
*/
  return (
    <>
      <div className='row'>
        <div className='container white container-css'>
          <div className='row center-align'>
            <div className="col s12">
              <div className='row'>
                {/* Add a conditional statement to render the appropriate element based on the values of data.media[0].externalMedia and data.media[0].mediaType */}
                {data.media[0].externalMedia && data.media[0].mediaType === "video" ? (
                  // Render an iframe element
                  <iframe src={data.media[0].mediaURL} title="youtube video" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                ) : data.media[0].mediaType === "video" ? (
                  // Render a video element
                  <video src={data.media[0].mediaURL} controls></video>
                ) : (
                  // Render an img element
                  <img src={data.media[0].mediaURL} alt="questionImage" className='responsive-img' style={{ "borderRadius": "5px" }}></img>
                )}
              </div>

              <div className='row'>
                <div className='col s12 grey lighten-3' style={{ "borderRadius": "5px", "padding": '2rem' }}>
                  <div className='row'>
                    <h5>{data.name}</h5>
                    <p>{data.text_info}</p>
                  </div>
                </div>
              </div>
              {data.content.map((item, index) => (
                <div className='row' key={item['content-id']} onClick={() => handleClick(item['content-id'])}>
                  {/* Add a conditional statement to render the appropriate icon and color based on the value of clickedIds[item['content-id']] */}
                  <div className={`col s12 ${props.clickedIds[item['content-id']] ? colors[4] : colors[index]} white-text`} style={{ "borderRadius": "5px", "padding": "0.75rem", "marginBottom": "1rem" }}>
                    <p>
                      {/* Add a conditional statement to render the appropriate icon based on the value of clickedIds[item['content-id']] */}
                      <i className="small material-icons left" style={{ "marginRight": "0px" }}>{props.clickedIds[item['content-id']] ? icons[4] : icons[index]}</i>
                      {item.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}