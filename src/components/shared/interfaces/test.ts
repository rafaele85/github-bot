export interface ITestable<T> {
    test(testData: T): void;
}

export interface ITestResultHolder<T> {
    getTestResult(): T;
}
