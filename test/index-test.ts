import {expect} from "chai";
import * as dict from "../lib/index";


describe("dict", () => {

    const foo: dict.Dict<number> = {foo: 1};

    describe("count", () => {

        it("counts own enumerable properties", () => {
            expect(dict.count(foo)).to.equal(1);
        });

    });

    describe("entries", () => {

        it("returns an array of entries", () => {
            expect(dict.entries(foo)).to.eql([["foo", 1]]);
        });

    });

    describe("every", () => {

        it("returns true for an empty dict", () => {
            expect(dict.every({}, () => false)).to.be.true;
        });

        it("checks if every value passes a predicate", () => {
            expect(dict.every(
                foo,
                function(value: number, key: string, dict: dict.Dict<number>) {
                    expect(this).to.equal("bar");
                    expect(value).to.equal(1);
                    expect(key).to.equal("foo");
                    expect(dict).to.equal(dict);
                    return value === 1;
                },
                "bar"
            )).to.be.true;
            expect(dict.every({foo: 1, bar: 2}, value => value >= 1)).to.be.true;
            expect(dict.every({foo: 1, bar: 2}, value => value < 2)).to.be.false;
        });

    });

    describe("filter", () => {

        it("filters the dictect with a predicate", () => {
            expect(dict.filter(
                foo,
                function(value: number, key: string, dict: dict.Dict<number>) {
                    expect(this).to.equal("bar");
                    expect(value).to.equal(1);
                    expect(key).to.equal("foo");
                    expect(dict).to.equal(dict);
                    return value === 1;
                },
                "bar"
            )).to.eql({foo: 1});
            expect(dict.filter(foo, value => value === 2)).to.eql({});
        });

    });

    describe("forEach", () => {

        it("runs side effect for each entry", () => {
            dict.forEach(
                foo,
                function(value: number, key: string, dict: dict.Dict<number>) {
                    expect(this).to.equal("bar");
                    expect(value).to.equal(1);
                    expect(key).to.equal("foo");
                    expect(dict).to.equal(dict);
                },
                "bar"
            );
        });

    });

    describe("from", () => {

        it("creates a dict from an array of entries", () => {
            expect(dict.from([["foo", 1]])).to.eql(foo);
        });

    });

    describe("fromKeys", () => {

        it("creates a dict from an array of keys", () => {
            expect(dict.fromKeys(
                ["foo"],
                function(key: string) {
                    expect(this).to.equal("bar");
                    expect(key).to.equal("foo");
                    return key + "bar";
                },
                "bar"
            )).to.eql({foo: "foobar"});
        });

    });

    describe("get", () => {

        it("gets own enumerable properties", () => {
            expect(dict.get(foo, "foo")).to.equal(1);
        });

        it("allows a default value to be given", () => {
            expect(dict.get(foo, "bar", 2)).to.equal(2);
        });

    });

    describe("has", () => {

        it("checks own enumberable properties", () => {
            expect(dict.has(foo, "foo")).to.be.true;
        });

        it("ignores inherited properties", () => {
            expect(dict.has(foo, "propertyIsEnumerable")).to.be.false;
        });

    });

    describe("isEmpty", () => {

        it("checks if a dict is empty", () => {
            expect(dict.isEmpty(foo)).to.be.false;
            expect(dict.isEmpty({})).to.be.true;
        });

    });

    describe("keys", () => {

        it("returns an array of own enumerable properties", () => {
            expect(dict.keys(foo)).to.eql(["foo"]);
        });

    });

    describe("map", () => {

        it("returns an array with entries mapped", () => {
            const result: Array<string> = dict.map(
                foo,
                function(value: number, key: string, dict: dict.Dict<number>) {
                    expect(this).to.equal("bar");
                    expect(value).to.equal(1);
                    expect(key).to.equal("foo");
                    expect(dict).to.equal(dict);
                    return `${key}${value}`;
                },
                "bar"
            );
            expect(result).to.eql(["foo1"]);
        });

    });

    describe("mapValues", () => {

        it("returns a new dictect with values mapped", () => {
            const result: dict.Dict<string> = dict.mapValues(
                foo,
                function(value: number, key: string, dict: dict.Dict<number>) {
                    expect(this).to.equal("bar");
                    expect(value).to.equal(1);
                    expect(key).to.equal("foo");
                    expect(dict).to.equal(dict);
                    return `${key}${value}`;
                },
                "bar"
            );
            expect(result).to.eql({foo: "foo1"});
        });

    });

    describe("mapEntries", () => {

        it("returns a new dictect with entries mapped", () => {
            const result: dict.Dict<string> = dict.mapEntries(
                foo,
                function(value: number, key: string, dict: dict.Dict<number>) {
                    expect(this).to.equal("bar");
                    expect(value).to.equal(1);
                    expect(key).to.equal("foo");
                    expect(dict).to.equal(dict);
                    return [`${key}bar`, `${key}${value}`];
                },
                "bar"
            );
            expect(result).to.eql({foobar: "foo1"});
        });

    });

    describe("mapKeys", () => {

        it("returns a new dictect with entries mapped", () => {
            const result: dict.Dict<number> = dict.mapKeys(
                foo,
                function(key: string, value: number, dict: dict.Dict<number>) {
                    expect(this).to.equal("bar");
                    expect(value).to.equal(1);
                    expect(key).to.equal("foo");
                    expect(dict).to.equal(dict);
                    return `${key}bar`;
                },
                "bar"
            );
            expect(result).to.eql({foobar: 1});
        });

    });

    describe("reduce", () => {

        it("reduces a dict to a value", () => {
            const result: string = dict.reduce(
                foo,
                function(reduction: string, value: number, key: string, dict: dict.Dict<number>) {
                    expect(this).to.equal("bar");
                    expect(value).to.equal(1);
                    expect(key).to.equal("foo");
                    expect(dict).to.equal(dict);
                    return `${reduction}${key}`;
                },
                "reduction",
                "bar"
            );
            expect(result).to.eql("reductionfoo");
        });

        it("allows a default initial reduction", () => {
            expect(dict.reduce({foo: 1,  bar: 2}, (total, value) => total + value)).to.equal(3);
        });

    });

    describe("remove", () => {

        it("removes the value in a new dict", () => {
            expect(dict.remove(foo, "foo")).to.eql({});
        });

    });

    describe("set", () => {

        it("sets the value in a new dict", () => {
            expect(dict.set(foo, "foo", 99)).to.eql({foo: 99});
        });

    });

    describe("some", () => {

        it("returns false for an empty dict", () => {
            expect(dict.some({}, () => true)).to.be.false;
        });

        it("checks if at least one value passes a predicate", () => {
            expect(dict.some(
                foo,
                function(value: number, key: string, dict: dict.Dict<number>) {
                    expect(this).to.equal("bar");
                    expect(value).to.equal(1);
                    expect(key).to.equal("foo");
                    expect(dict).to.equal(dict);
                    return value === 1;
                },
                "bar"
            )).to.be.true;
            expect(dict.some({foo: 1, bar: 2}, value => value >= 1)).to.be.true;
            expect(dict.some({foo: 1, bar: 2}, value => value < 2)).to.be.true;
            expect(dict.some({foo: 1, bar: 2}, value => value < 1)).to.be.false;
        });

    });

    describe("update", () => {

        it("returns a new dict with values updated", () => {
            expect(dict.update({foo: 2, bar: 2}, foo)).to.eql({foo: 1, bar: 2});
        });

    });

    describe("values", () => {

        it("returns an array of values", () => {
            expect(dict.values(foo)).to.eql([1]);
        });

    });

});
