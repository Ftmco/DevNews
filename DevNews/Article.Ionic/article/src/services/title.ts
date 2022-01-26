export const changeTitle = (title: string) => {
    const titleElement = document.getElementsByTagName("title")[0]
    titleElement.innerHTML = title
}