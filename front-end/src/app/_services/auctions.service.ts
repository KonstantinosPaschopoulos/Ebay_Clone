import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auction } from '../_models';
import { environment } from 'src/environments/environment';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuctionsService {
    constructor(private http: HttpClient) { }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    getAllAuctions() {
        return this.http.get<Auction[]>(`${environment.apiUrl}/auctions`);
    }

    getAuction(id) {
        return this.http.get<Auction>(`${environment.apiUrl}/auctions/${id}`);
    }

    searchAuctions(term: string) {
        if (!term.trim()) {
            // if not search term, return empty array.
            return of([]);
        }
        return this.http.get<Auction[]>(`${environment.apiUrl}/?name=${term}`).pipe(
            tap(_ => console.log(`found auctions matching "${term}"`)),
            catchError(this.handleError<Auction[]>('searchAuctions', []))
        );
    }

    searchCategory(term: string) {
        if (!term.trim()) {
            // if not search term, return empty array.
            return of([]);
        }
        return this.http.get<Auction[]>(`${environment.apiUrl}/?name=${term}`).pipe();
    }
}