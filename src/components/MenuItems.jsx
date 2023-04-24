import {BiHomeAlt} from 'react-icons/bi'
import {HiPlus} from 'react-icons/hi'
import {BsFillBarChartFill} from 'react-icons/bs'
import {FaArchive} from 'react-icons/fa'
import {MdCall} from 'react-icons/md'
import {AiFillPieChart} from 'react-icons/ai'

export const menuItems = [
    {
        "title" : "Home",
        "icon" : <BiHomeAlt size={25}/>,
        "url" : ""
    },
    {
        "title" : "Notify",
        "icon" : <HiPlus size={25}/>,
        "url" : "notify"
    },
    {
        "title" : "Best Hackers",
        "icon" : <BsFillBarChartFill size={25}/>,
        "url" : "best-hackers"
    },
    {
      "title" : "Best Groups",
      "icon" : <BsFillBarChartFill size={25}/>,
      "url" : "best-groups"
    },
    {
        "title" : "Archive",
        "icon" : <FaArchive size={25}/>,
        "url" : "archive"
    },
    {
        "title" : "Statistics",
        "icon" : <AiFillPieChart size={25}/>,
        "url" : "statistics"
    },
    {
        "title" : "Contact",
        "icon" : <MdCall size={25}/>,
        "url" : "contact"
    }
]