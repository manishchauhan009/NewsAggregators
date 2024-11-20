import './style.scss';
import stars from '../assets/stars.svg';
function Footer(){
    return(
        <div id='Footer'>
            <img src={stars}/>
            <span>© Copyright 2024 News Aggregator's</span>
        </div>
    )
}
export default Footer;