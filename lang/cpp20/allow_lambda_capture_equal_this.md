# ラムダ式のキャプチャとして[=, this]を許可する
* cpp20[meta cpp]

## 概要
C++17まで、ラムダ式のキャプチャとして`[=, this]`は指定できなかった。これは、デフォルトコピーキャプチャ (`=`) に、`this`ポインタのコピーキャプチャが含まれるため、重複指定はできないというものである。

C++20では、`[=, this]`のキャプチャ指定を許可する。これは、意味としては`[=]`と同等である。明示的に`this`ポインタをキャプチャして使用するという表明によって、可読性を向上させる目的に使える。


## 例
```cpp
#include <iostream>

struct X {
  void f()
  {
    int value = 3;
    auto x = [=, this] { // [=]キャプチャと同等
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


## 関連項目
- [C++11 ラムダ式](/lang/cpp11/lambda_expressions.md)


## 参照
- [P0409R2 Allow lambda capture `[=, this]`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0409r2.html)
