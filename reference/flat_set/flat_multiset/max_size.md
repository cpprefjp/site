# max_size
* flat_set[meta header]
* std[meta namespace]
* flat_multiset[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
size_type max_size() const noexcept; // (1) C++23
```

## 概要
コンテナが格納できる要素の最大数を返す。 
これは、システムやライブラリ実装の制限のもとでコンテナが格納できる潜在的な最大サイズである。


## 戻り値
`container_type` 型メンバ変数 `c` があるとして、`c.`[`max_size()`](/reference/vector/vector/max_size.md)。


## 計算量
定数時間。


## 例
```cpp example
#include <flat_set>
#include <iostream>

int main()
{
  std::flat_multiset<int> fs;

  std::cout << fs.max_size() << std::endl;
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
