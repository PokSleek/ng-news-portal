export class SourceModel {
    constructor(
      public id: string = '',
      public name: string = '',
      public description: string = '',
      public url: string = '',
      public category: string = '',
      public language: string = '',
      public country: string = '',
    ) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.url = url;
      this.category = category;
      this.language = language;
      this.country = country;
    }
  }
