# max_size
* unordered_map[meta header]
* std[meta namespace]
* unordered_map[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
size_type max_size() const noexcept;
```

## 概要
格納可能な最大の要素数を取得する。


## 戻り値
このコンテナに格納可能な最大の要素数


## 例外
投げない。


## 計算量
定数


## 例
```cpp example
#include <iostream>
#include <string>
#include <unordered_map>

int main()
{
  std::unordered_map<std::string, int> um;
  decltype(um)::size_type s = um.max_size();

  std::cout << s << std::endl;
}
```
* max_size()[color ff0000]

### 出力例
```
2305843009213693951
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): -
- [Clang](/implementation.md#clang): 3.0, 3.1
- [GCC](/implementation.md#gcc): 4.4.7, 4.5.3, 4.6.3, 4.7.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?

### 備考
libstdc++ では、コンテナのア�ケータ `allocator_type` にメンバ関数 `max_size` が無いとコンパイル時エラーが発生する。
（`allocator_type::max_size()` を `std::`[`allocator_traits`](/reference/memory/allocator_traits.md)`::`[`max_size`](/reference/memory/allocator_traits/max_size.md) 経由ではなく直接使用しているため。）


## 関連項目
| 名前 | 説明 |
|-----------------------|----------------------------|
| [`empty`](empty.md) | コンテナが空かどうかを判定 |
| [`size`](size.md)   | 要素数の取得               |


