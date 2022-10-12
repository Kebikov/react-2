import useHttp from "../components/hooks/http.hook";

const useMarvelService = () => {
    const {loading, request, error} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=f1878f3f75337b3a8e697ec994f33fb5';
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacters = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const _transformCharacter = (char) => {
        if(!char.description) char.description = "На данный момент описания нет...";
        if(char.description.length > 50) {
            let str = char.description.slice(0, 200) + '...'; 
            char.description = str;
        }

        char.cover = char.thumbnail.path.includes('image_not_available') ? true : false;
        
        return {
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            cover: char.cover,
            id: char.id,
            comics: char.comics.items
        }
    }
    return {getAllCharacters, getCharacters, loading, error}
}

export default useMarvelService;
