# assign
* system_error[meta header]
* std[meta namespace]
* error_condition[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void assign(int val, const error_category& cat) noexcept;
```
* error_category[link assign.md]

## 概要
エラー値とエラーカテゴリを再�定する。


## 要件
パラメータ`val`をエラー値、`cat`をエラーカテゴリと見なして保持する。


## 戻り値
なし


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <system_error>

int main()
{
  std::error_condition ec;

  ec.assign(static_cast<int>(std::errc::invalid_argument), std::generic_category());

  if (ec) {
    std::cout << "error" << std::endl;
  }
  else {
    std::cout << "success" << std::endl;
  }

  std::cout << ec.value() << std::endl;
  std::cout << ec.category().name() << std::endl;
}
```
* assign[color ff0000]
* std::errc::invalid_argument[link /reference/system_error/errc.md]
* std::generic_category()[link /reference/system_error/generic_category.md]
* ec.value()[link value.md]
* ec.category()[link category.md]
* name()[link /reference/system_error/error_category/name.md]

### 出力
```
error
22
generic
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010


## 参照
