export interface INewsPost { 
  id: string,
  title: string, 
  description: string | undefined
  url: string,
  urlToImage: string | null,
  content: string | null,
  source: {
    id: string,
    name: string,
  }
}