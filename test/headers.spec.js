import {Headers} from '../src/headers';
import {initialize} from 'aurelia-pal-browser';

describe('headers', () => {
  beforeAll(() => initialize());

  it('can add header value', () => {
    var headers = new Headers();
    headers.add('Authorization', '123');

    expect(headers.headers['Authorization']).toBe('123');
  });

  it('can get header value', () => {
    var headers = new Headers();
    headers.add('Authorization', '123');

    expect(headers.get('Authorization')).toBe('123');
  });

  it('will clear headers on clear', () => {
    var headers = new Headers();
    headers.add('Authorization', '123');

    expect(headers.get('Authorization')).toBe('123');

    headers.clear();

    expect(headers.get('Authorization')).toBeUndefined();
    expect(headers.headers).toEqual({});
  });

  it('configureXHR should add the headers', () => {
    var headers = new Headers();
    headers.add('Authorization', '123');
    headers.add('Content-Type', 'application/json');

    jasmine.Ajax.withMock(() => {
      var xhr = new XMLHttpRequest();

      headers.configureXHR(xhr);

      expect(xhr.requestHeaders['Authorization']).toBe('123');
      expect(xhr.requestHeaders['Content-Type']).toBe('application/json');
    });


  });

  describe("parse()", () => {
    it("should return a new instance on undefined, null or empty string", () => {
      expect(Headers.parse()).toEqual(jasmine.any(Headers));
      expect(Headers.parse(null)).toEqual(jasmine.any(Headers));
      expect(Headers.parse("")).toEqual(jasmine.any(Headers));
    });

    it("should parse header strings", () => {
      let headers = Headers.parse('key1: value1\u000d\u000akey2: value2');

      expect(headers.get('key1')).toBe('value1');
      expect(headers.get('key2')).toBe('value2');
    });

    it("should parse headers with values of ': '", () => {
      let headers = Headers.parse('key1: value1\u000d\u000akey2: key: value');

      expect(headers.get('key1')).toBe('value1');
      expect(headers.get('key2')).toBe('key: value');
    });
  });

});
