# 値のコピー省略を保証

* cpp17[meta cpp]

## 概要
C++11で右辺値参照を導入するときに規定された「値カテゴリー (value category)」の仕様（C++17で更新）を利用し、prvalue（詳しくは[ここ](https://qiita.com/rinse_/items/cffa87016b7de49391ae)を参照 ）という一時オブジェクトを表すカテゴリーの値を、オブジェクトの初期化のために使用する場合に、コピーが省略される。

## 仕様
[n4659](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/n4659.pdf)[conv.rval]/1 より。

T型のprvalueは、type型のxvalueに変換できる。この変換はT型の一時的なオブジェクトを初期化する。この変換は、結果オブジェクトとしての一時オブジェクトを使用してprvalueを評価することによって、prvalueから型Tの一時オブジェクトを初期化し、その一時オブジェクトを示すxvalueを生成する。Tは完全型でなければならない。
 (注：Tがクラス型（またはその配列）の場合、アクセス可能な削除されていないデストラクタが必要)

```cpp
struct X { int n; };
int k = X().n // X（）prvalueはxvalueに変換される
```

また、prvalueなどの値カテゴリー (value category)については、[n4659](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/n4659.pdf)[basic.lval]/1に定義されている。

## 例
[コピー省略 - cppreference.com](https://ja.cppreference.com/w/cpp/language/copy_elision)より引用した。

```cpp example
#include <iostream>
#include <vector>
 
struct Noisy {
    Noisy() { std::cout << "constructed\n"; }
    Noisy(const Noisy&) { std::cout << "copy-constructed\n"; }
    Noisy(Noisy&&) { std::cout << "move-constructed\n"; }
    ~Noisy() { std::cout << "destructed\n"; }
};
 
std::vector<Noisy> f() {
    std::vector<Noisy> v = std::vector<Noisy>(3); // v 初期化時、コピーは省略される
    return v; // NRVO は、C++17でも保証されない
}             // 最適化されない場合、コピーコンストラクタがよばれる
 
void g(std::vector<Noisy> arg) {
    std::cout << "arg.size() = " << arg.size() << '\n';
}
 
int main() {
    std::vector<Noisy> v = f(); // v 初期化時、コピーは省略される
    g(f());                     // g()の引数初期化時、コピーは省略される
}
```
* vector[link ../../reference/vector/vector.md]
* cout[link ../../reference/iostream/cout.md]

### 出力例
最適化された場合

```
constructed
constructed
constructed
constructed
constructed
constructed
arg.size() = 3
destructed
destructed
destructed
destructed
destructed
destructed
```

## この機能が必要になった背景・経緯
関数の戻り値のコピーを発生させない手法として、RVO (Return Value Optimization) やNRVO (Named Return Value Optimization) といった最適化があった（注：RVOは、NRVOと区別せずに使われることがある）。

```cpp
// RVOの最適化が動作した場合
struct Foo {};

Foo foo()
{
    return Foo();
}

Foo x = foo(); // Foo型のコピーコンストラクタが動作することなくxが初期化される
```
```cpp
// NRVOの最適化が動作した場合
struct Foo { int value = 0; };

Foo foo()
{
    Foo y;
    y.value = 42;
    return y;
}

Foo x = foo(); // Foo型のコピーコンストラクタが動作することなくxが初期化される
```

しかし、これらの最適化はコンパイラに対して許可された動作であって、そのように最適化されることが保証されるものではない。そのため、実際には(N)RVOによってコピーは起こらないけどコピーコンストラクタは用意しなければならない、といったことになった。

C++1zでは、このようなコピー省略を保証する仕組みが導入される。そのため、オブジェクトの初期化のために使用するprvalueは、コピーもムーブもできない型であっても、関数の戻り値として返せるようになる。つまり、NRVOと区別してRVOはの場合は、コピーコンストラクタを用意しなくてもよくなった。

```cpp
// C++17
struct Foo {
    // Fooはコピーもムーブもできない
    Foo() = default;
    Foo(const Foo&) = delete;
    Foo(Foo&&) = delete;
};

Foo foo()
{
    return Foo();
}

Foo y = foo(); // OK
```

```cpp
// C++17
struct Foo {
    // Fooはコピーもムーブもできない
    Foo() = default;
    Foo(const Foo&) = delete;
    Foo(Foo&&) = delete;
};

Foo foo()
{
    Foo y;
    return y;
}

Foo x = foo(); // error Foo型のコピーコンストラクタが必要
```

## 参照
- [右辺値、左辺値などの細かい定義 - Qiita](https://qiita.com/rinse_/items/cffa87016b7de49391ae)
- [C++1z 値のコピー省略を保証 - Faith and Brave - C++で遊ぼう](https://faithandbrave.hateblo.jp/entry/2017/01/24/161342)
- [P0135R1 Wording for guaranteed copy elision through simplified value categories](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0135r1.html)
- [P0135R0 Guaranteed copy elision through simplified value categories](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0135r0.html)
- [Guaranteed Copy Elision](https://jonasdevlieghere.com/guaranteed-copy-elision/)