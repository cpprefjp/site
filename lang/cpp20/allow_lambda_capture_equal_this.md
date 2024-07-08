# ラムダ式のキャプチャとして[=, this]を許可する [P0409R2]
* cpp20[meta cpp]

<!-- start lang caution -->

このページはC++20に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative_page)を参照してください。

<!-- last lang caution -->

## 概要
C++17まで、ラムダ式のキャプチャとして`[=, this]`は指定できなかった。これは、デフォルトコピーキャプチャ (`=`) に、`this`ポインタのコピーキャプチャが含まれるため、重複指定はできないというものである。

C++20では、`[=, this]`のキャプチャ指定を許可する。これは、意味としては`[=]`と等価である。明示的に`this`ポインタをキャプチャして使用するという表明によって、可読性を向上させる目的に使える。


## 例
```cpp example
#include <iostream>

struct X {
  void f()
  {
    int value = 3;
    auto x = [=, this] { // [=]キャプチャと等価
      return value + g();
    };
    std::cout << x() << std::endl;
  }

  int g() const
  {
    return 2;
  }
};

int main()
{
  X().f();
}
```


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++11 ラムダ式](/lang/cpp11/lambda_expressions.md)
- [C++20 `[=]`による`this`の暗黙のキャプチャを非推奨化](deprecate_implicit_capture_of_this_via_defcopy.md)


## 参照
- [P0409R2 Allow lambda capture `[=, this]`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0409r2.html)