import EventCreatePost from "../components/HomeScreenComponents/CreatePost/EventCreatePost"
import BandCreatePost from "../components/HomeScreenComponents/CreatePost/BandCreatePost"
import MusicianCreatePost from "../components/HomeScreenComponents/CreatePost/MusicianCreatePost"
import TrackCreatePost from "../components/HomeScreenComponents/CreatePost/TrackCreatePost"
import GearCreatePost from "../components/HomeScreenComponents/CreatePost/GearCreatePost"

import EventCardContent from "../components/HomeScreenComponents/CardContent/EventCardContent"
import BandCardContent from "../components/HomeScreenComponents/CardContent/BandCardContent"
import MusicianCardContent from "../components/HomeScreenComponents/CardContent/MusicianCardContent"
import PromoTrackContent from "../components/HomeScreenComponents/CardContent/PromoTrackContent"
import GearCardContent from "../components/HomeScreenComponents/CardContent/GearCardContent"

import { POST_TYPES } from "./postTypes"

export const postRegistry = {
  [POST_TYPES.EVENT]: {
    create: EventCreatePost,
    card: EventCardContent,
  },
  [POST_TYPES.BAND]: {
    create: BandCreatePost,
    card: BandCardContent,
  },
  [POST_TYPES.MUSICIAN]: {
    create: MusicianCreatePost,
    card: MusicianCardContent,
  },
  [POST_TYPES.PROMO]: {
    create: TrackCreatePost,
    card: PromoTrackContent,
  },
  [POST_TYPES.GEAR]: {
    create: GearCreatePost,
    card: GearCardContent,
  },
}
