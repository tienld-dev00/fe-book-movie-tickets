import axios from '@/api/axios'

export const listMoviesShowing = async (): Promise<any> => {
    try {
        const response  = await axios.get('/movies/list-showing-movies')

        return response
    } catch (error) {
        return Promise.reject(error)
    }
}

export const listUpcomingMovies = async (): Promise<any> => {
    try {
        const response  = await axios.get('/movies/list-upcoming-movie')

        return response
    } catch (error) {
        return Promise.reject(error)
    }
}