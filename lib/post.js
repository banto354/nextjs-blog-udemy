import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";


export const postsDirectory = path.join(process.cwd(), "posts");

// mdファイルのデータを取り出す
export function getPostsData(fileName) { 
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, "");
        // マークダウンファイルを文字列として読み取る 
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        const matterResult = matter(fileContents); 
        // idとデータを返す
        return {
            id,
            ...matterResult.data,
        };
    });
    return allPostsData;
}

//getStaticPathsでreturnするためのpathsを取得する
export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ""),
            },
        };
    }); 
}

//idからブログの内容を取得する
export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    const blogContent = await remark().use(html).process(matterResult.content);
    const blogcontentHtml = blogContent.toString();

    return {
        id,
        blogcontentHtml,
        ...matterResult.data,
    };
}