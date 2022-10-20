import { httpGet } from './mock-http-interface';

type TResult = { "FAILURE": string } | { "Arnie Quote": string }
type GetResult = { status: number, body: string}

export const getArnieQuotes = async (urls: string[]): Promise<TResult[]> => {
  
  const promises: Promise<GetResult>[] = urls.map((url) => {
    // errors already caught
    return httpGet(url)
  })

  // Would normally avoid promise.all as much as possible 
  const allQuotes = await Promise.all(promises).then((resp) => {
    return resp.map(x => x.status !== 200
      ? { 'FAILURE': 'Your request has been terminated' }
      : { 'Arnie Quote': JSON.parse(x.body).message })
  })
//
  return allQuotes
};