export default function formattedFilename(fileName: string) {
    const formattedName = fileName.split(".")[0];
    return formattedName;
}