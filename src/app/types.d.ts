interface RecordDetails {
  id: string; // Mapped from 'id'
  cast: string;
  country: string;
  date_added: string;
  description: string;
  director: string;
  duration: string;
  listed_in: string;
  rating: string;
  release_year: number;
  show_id: string;
  title: any;
  type: string;
}

interface GetTitlesPagedResponse {
  data: { records: RecordDetails[]; totalRecords: number };
}

interface GetTitleByIdResponse {
  data: RecordDetails;
}

interface User {
  email: string;
  fullname: string;
  age: number;
}
