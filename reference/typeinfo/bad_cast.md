# bad_cast
* typeinfo[meta header]
* std[meta namespace]
* class[meta id-type]

```cpp
namespace std {
  class bad_cast : public exception;
}
```
* exception[link /reference/exception/exception.md]

## 概要
`bad_cast`クラスは、 `dynamic_cast`による実行時型チェックに失敗して投げられる例外の型である。オブジェクトが不完全の場合、実行時チェックは失敗する。標準ライブラリのいくつかの実装は、型�ャストのエラーを示すために、この例外を投げる可能性がある。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------------------------|--------------------------------|---|
| `bad_cast() noexcept;`<br/>`bad_cast(const bad_cast&) noexcept;` | コンストラクタ | |
| `virtual ~bad_cast() = default;`                                 | デストラクタ | |
| `bad_cast& operator=(const bad_cast&) noexcept;`                 | 代入演算� | |
| `virtual const char* what() const noexcept;`                     | 実装定義のエラー内容を取得する | |


### 例
```cpp example
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
* std::bad_cast[color ff0000]

### 出力例
```
std::bad_cast
```

## 参照

