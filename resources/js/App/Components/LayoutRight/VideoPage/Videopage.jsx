import React from "react";
import "./videopage.css"


export default class VideoPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentVideo: 0,
      changed: false
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props.match.params.alias !== prevProps.match.params.alias) {
      console.log("update has started");
      { this.setState( { currentVideo: 0, changed: true } ) }
    }
  }

  nextVideo = () => {
    this.setState( { currentVideo: this.state.currentVideo+1, changed: false } )
  }

  render() {
    console.log("render has started")
    console.log("this.state.changed", this.state.changed);
    
    const { keywordList } = this.props;
    const  { videos }  = keywordList.find((word) => {
      return (word.alias === this.props.match.params.alias)
    });
    console.log("state.currentvideo", this.state.currentVideo)

    return (
      <div>
              {this.state.changed && this.state.currentVideo != 0 ? <div>loading</div> :  <div>
            <div dangerouslySetInnerHTML={{ __html: `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videos[this.state.currentVideo] ? videos[this.state.currentVideo].URL : ""}?controls=1&cc_load_policy=1&cc_lang_pref=en&start=${(videos[this.state.currentVideo] ? videos[this.state.currentVideo].pivot.offset_start : "")-5}&end=${(videos[this.state.currentVideo] ? videos[this.state.currentVideo].pivot.offset_start : '')+5}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>` }} />

            <button onClick={this.nextVideo}>Next</button>
          </div>}

         
      </div>
    )
  }
}