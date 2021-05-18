const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likes = blogs.map(b => b.likes)
    const reducer = (sum, item) => {
      return sum + item
    }
    return likes.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const likes = blogs.map(b => b.likes)
    const eniten = Math.max(...likes)
    const eniten_likes = blogs.filter(b => {return b.likes == eniten})
    return eniten_likes
}

  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}