const imageSource = (user) => {
    if (user.image) {
        return user.image.url;
    } else {
        return "/images/trees-6207925_640.jpg"
    }
};

export default imageSource;