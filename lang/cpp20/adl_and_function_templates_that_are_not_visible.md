# 関数テンプレートに明示的に型指定した場合にADLで見つからない問題を修正 [P0846R0]
* cpp20[meta cpp]

<!-- start lang caution -->

このページはC++20に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++17までは、以下のコードが不適格だった：

```cpp
#include <iostream>

void f() { std::cout << "global f" << std::endl; }

namespace ns {
  struct A {};

  template <class T>
  void f(T) {
    std::cout << "ns::f" << std::endl;
  }
}

int main() {
  f<ns::A>(ns::A{}); // コンパイルエラー！
}
```

これは、仕様として式`f<ns::A>`が関数ポインタ`f`に対する`operator<`による比較と見なされてしまい、その後の続くトークンが比較式として不適切なためにコンパイルエラーとなる。

C++20では、関数に続いて`<`が指定された場合、その関数をテンプレート名であると見なす仕様となり、式`f<ns::A>(ns::A{});`で名前空間`ns`内の関数テンプレート`f()`が正しく呼び出されるようになる。


ただしこの変更により、関数ポインタを`operator<`によって比較する以下のコードが不適格となり、互換性がなくなる。そのようなことをしたい場合は、関数ポインタを丸カッコで囲むこと。

```cpp
struct A {};
bool operator <(void (*fp)(), A);
void f(){}

int main() {
  A a;
  f < a;   // C++17:OK C++20:NG
  (f) < a; // C++17:OK C++20:OK
}
```


## 例
```cpp example
#include <iostream>
#include <tuple>

int main() {
  std::tuple t{1, 3.14, "Hello"};
  std::cout << get<0>(t) << std::endl; // C++17:NG C++20:OK
}
```
* get[link /reference/tuple/tuple/get.md]

### 出力
```
1
```

## 参照
- [P0846R0 ADL and Function Templates that are not Visible](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0846r0.html)
