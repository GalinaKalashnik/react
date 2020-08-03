import * as axios from 'axios';

//настройка axios с помощью axios.create что б разгрузить код
// вместо к примеру
// return axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageSize}`, {
//     withCredentials: true
// })
//теперь можно использовать
//return instance.get(`users?page=${currentPage}&count=${pageSize}`)

const instance = axios.create({
    //этот параметр говорит что б с запросом отправили и куку тоже
    withCredentials: true,

    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY" : "f0275849-35c1-4efb-9711-7874097a02ad"
    }
})


//(currentPage = 1, pageSize = 10) значение по умолчанию
//если не придут данные из src/components/Users/UsersContainer.jsx
export const usersAPI = {
    requestUsers(currentPage = 1, pageSize = 10) {
        //users?page и &count берутся из api документации в данном случае из https://social-network.samuraijs.com/docs /users
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            //здесь с помощью Промисов из response достаем только то что нам надо response.data
            // поэтому там где будем вызывать requestUsers в then используем не response
            // а response.data которую назовем просто data
            .then(response => {
                return response.data
            })
    },
    follow(userId) {
        return instance.post(`follow/${userId}`)
            .then(response => {
                return response
            })
    },
    unfollow(userId) {
        return instance.delete(`follow/${userId}`)
            .then(response => {
                return response
            })
    }
}

export const authAPI = {
    getAuthMe() {
        return instance.get(`auth/me`)
    },
    login(email, password, rememberMe = false) {
        return instance.post(`auth/login`, { email, password, rememberMe })
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/` + userId)
    },
    getStatus(userId) {
        return instance.get(`profile/status/` + userId);
    },
    updateStatus(status) {
        return instance.put(`profile/status`, { status: status });
    },
    savePhoto(photoFile) {
        const formData = new FormData();
        //'image' - это из требований в док https://social-network.samuraijs.com/docs#profile_photo_put
        // Properties image: required(file)
        formData.append('image', photoFile)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    saveProfile(profile) {
        return instance.put(`profile`, profile);
    },
}