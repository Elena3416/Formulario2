import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { from } from 'rxjs';
import { mergeMap, switchMap, map } from "rxjs/operators";
import { Country } from "./../../app/Interfaces/CountryInterface";

@Injectable({
  providedIn: 'root'
})

export class CountryService {

  private urlcountry: string = "https://restcountries.eu/rest/v2/all";
  
  constructor(private http: HttpClient) { }

  public GetCountries() {
    return this.http.get(this.urlcountry).pipe(
      mergeMap((countries: Country[]) =>
        from((countries)).pipe(
          map((country) => country.name)
        )
      )
    );
  }
}
