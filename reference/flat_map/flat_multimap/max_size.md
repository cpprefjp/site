# max_size
* flat_map[meta header]
* std[meta namespace]
* flat_multimap[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
size_type max_size() const noexcept; // (1) C++23
```

## 概要
コンテナが格納できる要素の最大数を返す。 
これは、システムやライブラリ実装の制限のもとでコンテナが格納できる潜在的な最大サイズである。


## 戻り値
[`containers`](containers.md)型メンバ変数`c`があるとして、以下を返す。

```cpp
return min<size_type>(c.keys.max_size(), c.values.max_size());
```
* min[link /reference/algorithm/min.md]
* max_size()[link /reference/vector/vector/max_size.md]


## 計算量
定数時間。


## 例
```cpp example
#include <flat_map>
#include <iostream>

int main()
{
  std::flat_multimap<char, int> fm;

  std::cout << fm.max_size() << std::endl;
}
```
* max_size()[color ff0000]

### 出力例
```
178956970
```

## 言語バージョン
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

