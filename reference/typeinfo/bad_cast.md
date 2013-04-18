#bad_cast
```cpp
namespace std {
  class bad_cast : public exception;
}
```
* exception[link /reference/exception/exception.md]

##概要

`bad_cast`クラスは、 `dynamic_cast`による実行時型チェックに失敗して投げられる例外の型である。オブジェクトが不完全の場合、実行時チェックは失敗する。標準ライブラリのいくつかは、型キャストのエラーを示すために、この例外を投げるかもしれない。

###メンバ関数

| | |
|-------------------------------------------------------------------------------------|-----------------------------------------------|
| `bad_cast() noexcept;` `bad_cast(const bad_cast&) noexcept;` | コンストラクタ |
| `virtual ~bad_cast() = default;` | デストラクタ |
| `bad_cast& operator=(const bad_cast&) noexcept;` | 代入演算子 |
| `virtual const char* what() const noexcept;` | 実装定義のエラー内容を取得する |

###例
```cpp
#include <iostream>
#include <typeinfo>

class Base { virtual void f() {} };
class Derived : Base {};

int main ()
{
  try {
    Base b;
    Derived& d = dynamic_cast<Derived&>(b);
  }
  catch (std::bad_cast& e) {
    std::cerr << e.what() << std::endl;
  }
}
```

###出力例
```cpp
std::bad_cast
```

##参照

