import { SourceModel } from '../models';

export interface SourceResponse {
  status: string;
  sources: Array<SourceModel>;
}