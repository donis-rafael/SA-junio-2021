export class GlobalConstants {
    public static server: string = 'http://34.68.53.63:4091/';

    public static endpoint_accept: string = GlobalConstants.server + 'auth/accept';
    public static endpoint_check_stock: string = GlobalConstants.server + 'books/checkStock';

    // endpoints de bitacora
    public static endpoint_log_all: string = GlobalConstants.server + 'log/getBitacoras';
    public static endpoint_log_delete: string = GlobalConstants.server + 'log/removeAll';
    public static endpoint_log_deleteByUser: string = GlobalConstants.server + 'log/removeByUser';
    public static endpoint_log_search: string = GlobalConstants.server + 'log/search';
    public static endpoint_log_save: string = GlobalConstants.server + 'log/save';

    public static endpoint_getCountries:string = 'http://34.68.53.63:4091/calc/todosCountry';
    public static endpoint_postCalcularImpuesto:string = 'http://34.68.53.63:4091/calc/impuesto';
    public static endpoint_postSolicitarBook:string = 'http://34.68.53.63:4091/book-request/add';
    public static endpoint_getRequestsBooks:string = 'http://34.68.53.63:4091/books-requests';
    public static endpoint_postDeleteBookRequest:string = 'http://34.68.53.63:4091/book-request/delete';

    // public static endpoint_getCountries:string = 'http://34.68.53.63:4091/calc/todosCountry';
    // public static endpoint_postCalcularImpuesto:string = 'http://34.68.53.63:4091/calc/impuesto';
    // public static endpoint_postSolicitarBook:string = 'http://34.68.53.63:4091/book-request/add';
    // public static endpoint_getRequestsBooks:string = 'http://34.68.53.63:4091/books-requests';
    // public static endpoint_postDeleteBookRequest:string = 'http://34.68.53.63:4091/book-request/delete';
}
