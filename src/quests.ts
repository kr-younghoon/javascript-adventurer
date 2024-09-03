export interface Quest {
    id: number;
    title: string;
    description: string;
    initialCode: string;
    solution: string;
    hint: string;
    chapter: number;
}

export const quests: Quest[] = [
    {
        id: 1,
        title: '퀘스트 1: 변수 선언',
        description:
            '타입스크립트를 사용하여 문자열 타입의 변수 "greeting"을 선언하고 값으로 "안녕하세요"를 할당하세요.',
        initialCode: '// 여기에 코드를 작성하세요\n',
        solution: 'const greeting: string = "안녕하세요";',
        hint: '변수를 선언할 때 타입을 지정하려면 변수명 뒤에 콜론(:)과 타입을 적습니다.',
        chapter: 1,
    },
    {
        id: 2,
        title: '퀘스트 2: 함수 작성',
        description:
            '두 개의 숫자 매개변수를 받아 그 합을 반환하는 함수 "add"를 작성하세요.',
        initialCode: '// 여기에 코드를 작성하세요\n',
        solution:
            'function add(a: number, b: number): number { return a + b; }',
        hint: '함수의 매개변수와 반환 타입도 타입을 지정할 수 있습니다.',
        chapter: 1,
    },
    {
        id: 3,
        title: '퀘스트 3: 배열 타입 지정',
        description:
            '숫자 타입의 배열을 선언하고 숫자 1, 2, 3을 포함하는 배열을 "numbers"라는 변수에 할당하세요.',
        initialCode: '// 여기에 코드를 작성하세요\n',
        solution: 'const numbers: number[] = [1, 2, 3];',
        hint: '배열의 타입은 타입 뒤에 대괄호([])를 붙여서 지정합니다.',
        chapter: 1,
    },
    {
        id: 4,
        title: '퀘스트 4: 인터페이스 정의',
        description:
            'name(문자열)과 age(숫자) 속성을 가진 "Person" 인터페이스를 정의하고, 해당 인터페이스를 사용하는 "person" 객체를 만드세요.',
        initialCode: '// 여기에 코드를 작성하세요\n',
        solution: `interface Person {
    name: string;
    age: number;
}

const person: Person = { name: "홍길동", age: 30 };`,
        hint: '인터페이스는 "interface" 키워드를 사용하여 정의하며, 객체의 구조를 설명합니다.',
        chapter: 2,
    },
    {
        id: 5,
        title: '퀘스트 5: 유니온 타입',
        description:
            '문자열 또는 숫자 타입의 매개변수를 받아 문자열로 반환하는 함수 "format"을 작성하세요.',
        initialCode: '// 여기에 코드를 작성하세요\n',
        solution: `function format(value: number | string): string {
    return value.toString();
}`,
        hint: '유니온 타입은 파이프("|")를 사용하여 둘 이상의 타입을 결합합니다.',
        chapter: 2,
    },
    {
        id: 6,
        title: '퀘스트 6: 제네릭 함수',
        description:
            '어떤 타입의 매개변수도 받아서 그대로 반환하는 제네릭 함수 "identity"를 작성하세요.',
        initialCode: '// 여기에 코드를 작성하세요\n',
        solution: `function identity<T>(arg: T): T {
    return arg;
}`,
        hint: '제네릭은 함수 이름 뒤에 꺽쇠(<>)를 사용하여 정의하며, 다양한 타입을 처리할 수 있게 합니다.',
        chapter: 3,
    },
    // 추가적인 문제들은 필요에 따라 계속 추가할 수 있습니다.
];
