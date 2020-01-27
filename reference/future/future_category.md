# future_category
* future[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  const error_category& future_category() noexcept;
}
```
* error_category[link /reference/system_error/error_category.md]

## 概要
[`future_errc`](future_errc.md)のためのエラーカテゴリを取得する。


## 戻り値
[`error_category`](/reference/system_error/error_category.md)クラスを継承したクラスオブジェクトへの参照を返す。

この関数を呼び出すことによって返されるオブジェクトは、同じオブジェクトを指す。

この関数によって返されるオブジェクトのクラスは以下の特徴を持つ：

- [`name()`](/reference/system_error/error_category/name.md)関数によって返される文�列は`"future"`
- [`default_error_condition()`](/reference/system_error/error_category/default_error_condition.md)仮想関数および[`equivalent()`](/reference/system_error/error_category/equivalent.md)仮想関数の挙動は、基底クラスである[`error_category`](/reference/system_error/error_category.md)と同じである


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <future>
#include <string>

int main()
{
  const std::error_category& cat = std::future_category();

  std::cout << cat.name() << std::endl;
  std::cout << cat.message(static_cast<int>(std::future_errc::broken_promise)) << std::endl;
}
```
* std::future_category()[color ff0000]
* std::error_category[link /reference/system_error/error_category.md]
* cat.name()[link /reference/system_error/error_category/name.md]
* cat.message[link /reference/system_error/error_category/message.md]
* std::future_errc::broken_promise[link future_errc.md]

### 出力例
```
future
Broken promise
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012


## 参照


