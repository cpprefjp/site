# [=]によるthisの暗黙の�ャプチャを非推奨化
* cpp20[meta cpp]

## 概要
C++20からは、ラムダ式でのデフォルトコピーの�ャプチャ指定`[=]`では、`this`ポインタが�ャプチャされなくなる。

C++20からは`[=, this]`のようにデフォルトコピーの�ャプチャと`this`を別々に指定できるようになるため、両方の�ャプチャが必要になる場合は、それぞれ指定すること。


## 例
```cpp example
#include <iostream>

struct X {
  void f()
  {
    int value = 3;

    auto x = [=] {        // C++20からは非推奨な方法：
      return value + g(); // 従来は[=]の指定でthisポインタも�ャプチャされ、クラスのメンバをラムダ式内で扱えていた
    };

    auto y = [=, this] {  // C++20から推奨される方法：
      return value + g(); // [=]ではthisポインタは�ャプチャされなくなるため、thisを指定して�ャプチャすること
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


## 関連項目
- [C++11 ラムダ式](/lang/cpp11/lambda_expressions.md)
- [C++20 ラムダ式の�ャプチャとして`[=, this]`を許可する](allow_lambda_capture_equal_this.md)


## 参照
- [P0806R2 Deprecate implicit capture of this via `[=]`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0806r2.html)
