# iostream_category
* ios[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  const error_category& iostream_category();          // C++11
  const error_category& iostream_category() noexcept; // C++14
}
```
* error_category[link /reference/system_error/error_category.md]

## 概要
[`io_errc`](io_errc.md)のためのエラーカテゴリを取得する。


## 戻り値
[`error_category`](/reference/system_error/error_category.md)クラスを継承したクラスオブジェクトへの参照を返す。
この関数を呼び出すことによって返されるオブジェクトは、同じオブジェクトを指す。

この関数によって返されるオブジェクトのクラスは以下の特徴を持つ：

- [`name()`](/reference/system_error/error_category/name.md)関数によって返される文字列は`"iostream"`
- [`default_error_condition()`](/reference/system_error/error_category/default_error_condition.md)仮想関数および[`equivalent()`](/reference/system_error/error_category/equivalent.md)仮想関数の挙動は、基本クラスである[`error_category`](/reference/system_error/error_category.md)と同じである


## 例外
投げない


## 例
```cpp example
#include <iostream> // 自動的に<ios>もインクルードされる
#include <string>

int main()
{
  const std::error_category& cat = std::iostream_category();

  std::cout << cat.name() << std::endl;
  std::cout << cat.message(static_cast<int>(std::io_errc::stream)) << std::endl;
}
```
* std::iostream_category[color ff0000]
* std::error_category[link /reference/system_error/error_category.md]
* cat.name()[link /reference/system_error/error_category/name.md]
* cat.message()[link /reference/system_error/error_category/message.md]
* std::io_errc::stream[link io_errc.md]

### 出力例
```
iostream
iostream stream error
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc):
- [GCC, C++11 mode](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012


## 参照
- [LWG Issue 2087. iostream_category() and noexcept](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2087)

