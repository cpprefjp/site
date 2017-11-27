# 例外仕様を型システムの一部にする
* cpp17[meta cpp]

## 概要
[`noexcept`](/lang/cpp11/noexcept.md)による例外仕様が、関数の型の一部として扱われるようになる。

```cpp
void f() noexcept;
void g();

void(*p1)() noexcept = f;   // OK
void(*p2)() = f;            // OK : noexceptから非noexceptへの変換
//void(*p3)() noexcept = g; // コンパイルエラー : 非noexceptからnoexceptに変換できない
```

互換性のために`noexcept`な関数ポインタから非`noexcept`な関数ポインタには変換できる。しかし、非`noexcept`な関数ポインタから`noexcept`な関数ポインタには、変換できない。

これは、メンバ関数ポインタも同様である。

例外仕様は、[`noexcept`](/lang/cpp11/noexcept.md)キーワードによるもののみで、`throw`キーワードによる例外仕様は含まない。

この仕様は、ラムダ式も同様である。

```cpp
void(*p1)() noexcept = []() noexcept {}; // OK
void(*p2)() = []() noexcept {};          // OK
//void(*p3)() noexcept = [](){};         // コンパイルエラー
```

`noexcept`の違いによる関数のオーバーロードはできない。


## 備考
この仕様による破壊的な影響として、C++14まで有効だった以下のコードは、C++17以降ではコンパイルエラーとなる：

```cpp
void g1() noexcept;
void g2();

template<class T>
int f(T*, T*);

int x = f(g1, g2); // コンパイルエラー : g1とg2の型が一致しない (関数テンプレートの推論失敗)
```


## 例
### 関数テンプレートで受け取った関数ポインタがnoexceptか否かを取得する
```cpp example
#include <iostream>

template <class R, class... Args, bool IsNoExcept>
void g(R(*f)(Args...) noexcept(IsNoExcept))
{
  std::cout << std::boolalpha << IsNoExcept << std::endl;
}

void h(int, char) noexcept {}
void i(int, char) noexcept(false) {}

int main()
{
  g(h);
  g(i);
}
```

#### 出力
```
true
false
```


## この機能が必要になった背景・経緯
C++11で[`noexcept`](/lang/cpp11/noexcept.md)が導入されたことにより、コンパイラに最適化の機会を増やすことにつながった。この機能はそれに関連して、さらなる最適化の機会を与えることを主目的としている。

そのほか、次期標準で考えられているトランザクショナルメモリ機能において、トランザクション内で安全に使える機能の条件を決める上で、「関数に`noexcept`が付いていること」というものが必要となった。


## 関連項目
- [C++11 noexcept](/lang/cpp11/noexcept.md)
- [C++17 noexcept付きのラムダ式から変換する関数ポインタにnoexceptを付加する](lambda_to_noexcept_function_pointer.md)


## 参照
- [P0012R1 Make exception specifications be part of the type system, version 5](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0012r1.html)
