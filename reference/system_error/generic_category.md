# generic_category
* system_error[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  const error_category& generic_category() noexcept;
}
```
* error_category[link error_category.md]

## 概要
汎用エラーに関する`error_category`を返す。

ここでの「汎用」とは、[`<cerrno>`](/reference/cerrno.md)ヘッダで定義される環境依存しないエラー値、およびそれに対応する[`std::errc`](errc.md)列挙値によるエラー情報を指す。


## 戻り値
[`error_category`](error_category.md)クラスを継承したクラスオブジェクトへの参照を返す。

この関数を呼び出すことによって返されるオブジェクトは、同じオブジェクトを指す。

この関数によって返されるオブジェクトのクラスは以下の特徴を持つ：

- [`name()`](error_category/name.md)関数によって返される文字列は`"generic"`
- [`default_error_condition()`](error_category/default_error_condition.md)仮想関数および[`equivalent()`](error_category/equivalent.md)仮想関数の挙動は、基本クラスである[`error_category`](error_category.md)と同じである


## 例外
投げない


## 例
```cpp
#include <iostream>
#include <system_error>
#include <string>

int main()
{
  const std::error_category& cat = std::generic_category();

  std::cout << cat.name() << std::endl;
  std::cout << cat.message(static_cast<int>(std::errc::invalid_argument)) << std::endl;
}
```
* std::generic_category()[color ff0000]
* std::error_category[link error_category.md]
* cat.name()[link error_category/name.md]
* cat.message[link error_category/message.md]
* std::errc::invalid_argument[link errc.md]

### 出力
```
generic
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
- [Visual C++](/implementation.md#visual_cpp) 10.0


## 参照
