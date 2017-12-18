# system_category
* system_error[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  const error_category& system_category() noexcept;
}
```
* error_category[link error_category.md]

## 概要
環境固有のエラーに関する`error_category`を返す。


## 戻り値
[`error_category`](error_category.md)クラスを継承したクラスオブジェクトへの参照を返す。

この関数を呼び出すことによって返されるオブジェクトは、同じオブジェクトを指す。 

この関数によって返されるオブジェクトのクラスは以下の特徴を持つ：

- [`name()`](error_category/name.md)関数によって返される文字列は`"system"`
- [`equivalent()`](error_category/equivalent.md)仮想関数の挙動は、基本クラスである[`error_category`](error_category.md)と同じである
- [`default_error_condition()`](error_category/default_error_condition.md)仮想関数は、パラメータ`ev`がPOSIXの`errno`であった場合 [`error_condition`](error_condition.md)`(ev,` [`generic_category()`](generic_category.md)`);` を返し、そうでない場合は[`error_condition`](error_condition.md)`(ev, system_category());` を返す。特定のOSに関する処理は未規定。ただし、POSIXのエラー値に対応していない場合がありえるため、環境によっては[`generic_category()`](generic_category.md)が返される挙動はサポートされない。


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <system_error>
#include <string>

int main()
{
  const std::error_category& cat = std::system_category();

  std::cout << cat.name() << std::endl;
  std::cout << cat.message(static_cast<int>(std::errc::invalid_argument)) << std::endl;
}
```
* std::system_category()[color ff0000]
* std::error_category[link error_category.md]
* cat.name()[link error_category/name.md]
* cat.message[link error_category/message.md]
* std::errc::invalid_argument[link errc.md]

### 出力
```
system
Invalid argument
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.6.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010


## 参照
