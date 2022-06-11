import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
   posts:[]
}

export const getPosts = createAsyncThunk('posts/getPosts', async(_, {rejctWithValue, dispatch}) => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
    dispatch(setPosts(res.data))
} )

export const deletePostById =  createAsyncThunk('posts/deletePostById ',
async (id, {rejctWithValue, dispatch}) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
    dispatch(deletePost(id))
}
)

export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload
        },
        deletePost: (state,action) => {
            state.posts = state.posts.filter((post) =>post.id !== action.payload)
        }

    },
 
})

export const {setPosts, deletePost} = postSlice.actions
export default postSlice.reducer