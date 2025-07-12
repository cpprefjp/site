# [=]によるthisの暗黙のキャプチャを非推奨化 [P0806R2]
* cpp20[meta cpp]

<!-- start lang caution -->

このページはC++20に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++20からは、ラムダ式でのデフォルトコピーのキャプチャ指定`[=]`での`this`ポインタのキャプチャは非推奨となる。

C++20からは`[=, this]`のようにデフォルトコピーのキャプチャと`this`を別々に指定できるようになるため、両方のキャプチャが必要になる場合は、それぞれ指定すること。


## 例
```cpp example
#include <iostream>

struct X {
  void f()
  {
    int value = 3;

    auto x = [=] {        // C++20からは非推奨な方法：
      return value + g(); // 従来は[=]の指定でthisポインタもキャプチャされ、クラスのメンバをラムダ式内で扱えていた
    };

    auto y = [=, this] {  // C++20から推奨される方法：
      return value + g(); // [=, this]と別々に指定することで、thisポインタもキャプチャしていることが明示される
    };
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
- [C++20 ラムダ式のキャプチャとして`[=, this]`を許可する](allow_lambda_capture_equal_this.md)


## 参照
- [P0806R2 Deprecate implicit capture of this via `[=]`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0806r2.html)
