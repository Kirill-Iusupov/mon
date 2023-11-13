export interface ApiDocData {
  id_document: number;
  document: string;
  sort: number;
  id_challenger_document: number | null;
  document_url: string | null;
}
