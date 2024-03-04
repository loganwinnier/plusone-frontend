/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from "jwt-decode";

/** File of Type interfaces to be imported in other files. */

//Type Assertion Methods
export function validateString<T>(x: T | undefined, msg: string): typeof x {
    if (typeof x === "undefined") throw new Error(msg);
    return 
}

//User interfaces
export interface FindUserCardComponent {
    user: User,
    like:  (eventId: string) => void,
    pass:  () => void,
}

export interface UpdateUserComponent {
    updateUser:  (formData: UpdateUser) => void,
    deleteUser:  () => void,
}

export interface UserParams extends EventsParams {
   eventId?: string
}

export interface User {
    email: string,
    phoneNumber: string | null,
    firstName: string,
    lastName: string,
    isAdmin: boolean,
    lastLogin: string,
    profile: Profile,
    events: Array<Event>
    chats: Array<Chat>
}

export interface LoginForm {
    email?: string | undefined,
    phone?: string | undefined,
    password?: string | undefined
}

export interface RegisterUser {
    [key: string]: any,
    email: string,
    phone?: string,
    password: string,
    firstName: string,
    lastName: string
}

export interface UpdateUser {
    email?: string
    phone?: string,
    password?: string,
    firstName?: string,
    lastName?: string,
    repeatNewPassword?: string,
    newPassword?: string,
    phoneNumber?: string
}

export interface UserProfile {
    email: string,
    phoneNumber?: string | null,
    firstName?: string,
    lastName?: string,
    isAdmin?: boolean,
    lastLogin?: string,
    profile?: Profile,
    events?: Array<Event>
    chats?: Array<Chat>
}

//Profile interfaces
export interface ProfileComponent {
    updateProfile:  (formData: InitialProfile) => void,
}

export interface ProfileFormComponent {
    updateOrCreate:  (formData: any) => void,
    editing: boolean
}


export interface ProfileImagesComponent {
    images: Array<Image>,
    removed?:Array<string>,
    removeImage?:  ((evt: MouseClickEvent) => void) | null,
}

export interface Profile {
    [key: string]: any,
    email: string,
    geoLocation: Array<string>,
    city: string,
    state: string,
    age: number,
    bio: string,
    gender: string
    images: Array<File | any>,
    range: number
}

export interface InitialProfile {
    [key: string]: any,
    bio: string,
    age: number,
    gender: string,
    city?: string,
    state?: string,
    images?: Array<File | any>,
    range: number
    removeImages?: Array<string>
}



//Events interfaces
export interface EventCardComponent {
    event: Event,
    toggleModal: (
        evt:  React.FormEvent<HTMLFormElement>,
        eventId:string) => void
}

export interface FindEventsComponent {
    event: Event,
}

export interface EventsCardAreaComponent {
    position: number,
    like:  (eventId: string) => void,
    pass:  () => void,
}

export interface FindEventCardComponent {
    event: Event,
    like:  (eventId: string) => void,
    pass:  () => void,
}

export interface EventFormComponent {
    updateOrCreate:  (formData: any) => void,
    eventId?: string | null
}

export interface EventImagesComponent {
    images: Array<Image>,
    removed?:Array<string>,
    removeImage?:  ((evt: MouseClickEvent) => void) | null,
}

//Profile interfaces
export interface MyEventsComponent {
    deleteEvent:  (eventId: string) => void,
}

export interface Event {
    [key: string]: any,
    eventId: string,
    geoLocation: Array<string>,
    title: string,
    dateTime: string,
    createdAt: Date,
    description: string,
    city: string,
    state: string,
    payment: number | null,
    hostEmail: string,
    chatIds: Array<string>,
    images: Array<File | any>
}

export interface EventsParams {
    min?: number,
    max?: number,
    range?: number
}

export interface CreateOrEditEvent {
    [key: string]: any,
    title: string,
    dateTime: string | null,
    description: string,
    city: string,
    state: string,
    payment: number
    removeImages?: Array<string>,
    images: Array<File | any>
}

export interface EditEvent {
    title?: string,
    dateTime?: Date,
    description?: string,
    city?: string,
    state?: string,
    removeImages?: Array<string>,
    images: Array<Image>
}

export interface EventDetailCardComponent  {
    event: Event, 
    toggleEventModal: (event: Event | null) => void
}

//Chats interfaces
export interface ActiveChatComponent {
    id: string | null
}

export interface ChatHeaderComponent {
    chat: Chat, 
    toggleEventModal: (event: Event | null) => void
}

export interface SideBarComponent {
    chats: Chat[], 
    setChatId: (id:string) => void
    activeChat: string | null
}

export interface SideBarItemComponent {
    chat: Chat, 
    setChatId: (id:string) => void
    active: boolean}


export interface MessageBarComponent {
    sendMessage:  (message:string) => void
}

export interface ChatAreaComponent {
    getChats:  () => unknown,
}

export interface MessageBubbleComponent {
    message: Message, 
    imageUrl?: string | null, 
    otherUserEmail?: string | null
}

export interface Chat {
    id: string,
    lastMessage: Date,
    lastMessageContent: string,
    eventIds: string[],
    userOne: User,
    userTwo: User,
    userOneEmail: string,
    userTwoEmail: string,
    messages: Message[],
    associatedEvents: Event[],

}

export interface Message {
  messageId: number      
  chatId:    string  
  sender:    string
  recipient: string
  sentAt:    Date 
  content:   string   
  chat:      Chat     
}

//Forms 
export interface LoginFormComponent {
    login:  (formData: LoginForm) => void
}

export interface SignupFormComponent {
    signup:  (formData: RegisterUser) => void
}

export interface LoginFormComponent {
    login:  (formData: LoginForm) => void
}

export interface SignupFormComponent {
    signup:  (formData: RegisterUser) => void
}

//Navigation 
export interface NavBarComponent {
    logout:  () => void,
}

export interface RouteComponent {
    login:  (formData: LoginForm) => void,
    signup:  (formData: RegisterUser) => void,
    createProfile:  (formData: Profile) => void,
    updateProfile:  (formData: InitialProfile) => void,
    updateUser:  (formData: UpdateUser) => void,
    createEvent:  (formData: CreateOrEditEvent) => void,
    deleteUser:  () => void,
    deleteEvent:  (eventId:string) => void,
    getChats:  () => any,
}

//Likes
export interface Like {
    eventLikes: boolean,
    userLikes: boolean,
    userEmail: string,
    likeEventId: string
}

//One Offs
export interface TokenDecoded extends JwtPayload {
    email: string,
    phoneNumber: string | null,
    isAdmin: boolean,
    iat: number
}

export interface Image {
    url: string,
    id: string,
    userEmail: string,
    profileEmail: string
}

export interface AlertComponent {
    alerts: Array<string>,
    type: string
}

//Special Cases
export interface HTMLFileInput extends Event {
    target: FileTarget;
}
interface FileTarget extends EventTarget {
    files: unknown | undefined
}

export interface MouseClickEvent extends Event {
    target: IdTarget
}
interface IdTarget extends EventTarget {
    id: string,
}




