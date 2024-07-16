# max_size
* string_view[meta header]
* std[meta namespace]
* basic_string_view[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
constexpr size_type max_size() const noexcept;
```

## 概要
参照可能な最大の文字列長を取得する。


## 戻り値
`basic_string_view`クラスから参照可能な最大の文字列長が返る


## 例外
投げない


## 備考
このメンバ関数はコンテナのインタフェースのためにある。このクラスは動的メモリ確保を行わないため、メモリアロケータの確保可能なメモリサイズではなく単になんらかの定数が返るだけである


## 例
```cpp example
#include <iostream>
#include <string_view>

int main()
{
  std::string_view sv;
  std::cout << sv.max_size() << std::endl;
}
```
* max_size()[color ff0000]

### 出力例
```
18446744073709551615
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0 [mark verified]
- [GCC](/implementation.md#gcc): 7.1 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
