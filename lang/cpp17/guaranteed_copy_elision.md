# 値のコピー省略を保証 [P0135R1]

* cpp17[meta cpp]

<!-- start lang caution -->

このページはC++17に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため関連項目を参照してください。

<!-- last lang caution -->

## 概要
C++11で右辺値参照を導入するときに規定された「値カテゴリー (value category)」の仕様（C++17で更新）を利用し、[`prvalue`](../cpp11/rvalue_ref_and_move_semantics.md)<sup><a id="note_ref-1" href="#note-1">[注1]</a></sup>というカテゴリーの値を、オブジェクトの初期化のために使用する場合に、コピーが省略される。

## 仕様
まず、prvalueなどの値カテゴリー (value category)については、[n4659](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/n4659.pdf)[basic.lval]/1に定義されている。

また、[conv.rval]/1 に、次のような記述がある：

Temporary materialization conversion

`T`型の`prvalue`は、`T`型の`xvalue`に変換できる。この変換では、一時オブジェクトを結果オブジェクトとして`prvalue`を評価することによって、`prvalue`から`T`型の一時オブジェクトを初期化し、その一時オブジェクトを表す`xvalue`を生成する。`T`は完全型でなければならない。
[注：`T`がクラス型（またはその配列）の場合、アクセス可能な削除されていないデストラクタが必要である。]
例:

```cpp
struct X { int n; }
int k = X().n; // ok, X() prvalue は xvalue に変換される
```

つまり、`prvalue`は一時オブジェクトではない（C++17以降）。次のときにはじめて結果オブジェクトとして一時オブジェクトを使用して評価される。

[class.temporary]/2 より：

不必要な一時オブジェクトの作成を避けるために、一時オブジェクトの実体化は一般に可能な限り遅らせる。
注：一時オブジェクトは次のとき実体化されている。
  
 - 参照を`prvalue`にバインドするとき
 - クラス`prvalue`でメンバアクセスを実行するとき
 - 配列からポインタへの変換を実行するとき、または配列`prvalue`をサブスクライブするとき
 -  `braced-init-list`から`std::initializer_list<T>`型のオブジェクトを初期化するとき
 - 特定の未評価のオペランド、および`prvalue`が廃棄値式(`discarded-value expression`)として現れる場合

これより、上の例は「クラス`prvalue`でメンバアクセスを実行するとき」にあたり、`xvalue`として一時オブジェクトを生成している。

また、`prvalue`から`prvalue`への変換は、上記の「一時オブジェクトの実体化は一般に可能な限り遅らせられる」ことより、一時オブジェクトを実体化しない。よって、次の例における`prvalue`の`T`型の戻り値は、呼び出し元の`t`を直接初期化する。

```cpp
 T Func() {return T();} 
 T t = Func(); // 直接初期化
```

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
}             // 最適化されない場合、ムーブコンストラクタがよばれる
 
void g(std::vector<Noisy> arg) {
  std::cout << "arg.size() = " << arg.size() << '\n';
}
 
int main() {
  std::vector<Noisy> v = f(); // v 初期化時、コピーは省略される
  g(f());                     // g()の引数初期化時、コピーは省略される
}
```

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

C++17では、このようなコピー省略を保証する仕組みが導入される。そのため、オブジェクトの初期化のために使用するprvalueは、コピーもムーブもできない型であっても、関数の戻り値として返せるようになる。つまり、NRVOと区別してRVOの場合は、コピーコンストラクタを用意しなくてもよくなった。NRVOは依然として保証がないことに注意。

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
- [コピー省略 - cppreference.com](https://ja.cppreference.com/w/cpp/language/copy_elision)
- [値のコピー省略の保証について｜teratail](https://teratail.com/questions/168515)
- [c++ - How does guaranteed copy elision work? - Stack Overflow](https://stackoverflow.com/questions/38043319/how-does-guaranteed-copy-elision-work)
- [右辺値、左辺値などの細かい定義 - Qiita](https://qiita.com/rinse_/items/cffa87016b7de49391ae)
- [C++1z 値のコピー省略を保証 - Faith and Brave - C++で遊ぼう](https://faithandbrave.hateblo.jp/entry/2017/01/24/161342)
- [P0135R1 Wording for guaranteed copy elision through simplified value categories](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0135r1.html)
- [P0135R0 Guaranteed copy elision through simplified value categories](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0135r0.html)
- [Guaranteed Copy Elision](https://jonasdevlieghere.com/guaranteed-copy-elision/)

## 注釈
1. **<a id="note-1" href="#note_ref-1">^</a>** <cite>[右辺値、左辺値などの細かい定義 - Qiita](https://qiita.com/rinse_/items/cffa87016b7de49391ae)</cite>を参照