# cend
* hive[meta header]
* std[meta namespace]
* hive[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
const_iterator cend() const noexcept; // (1) C++26
```

## 概要
末尾の次を指す読み取り専用イテレータを取得する。

このイテレータは、有効な要素を指さない終端を表す番兵として使用する。


## 戻り値
末尾の次を指す読み取り専用イテレータ


## 例外
投げない


## 計算量
定数時間


## 例
```cpp example
#include <hive>
#include <print>

int main()
{
  std::hive<int> h;
  h.insert(1);
  h.insert(2);
  h.insert(3);

  // cbegin()/cend()で読み取り専用に走査する
  for (auto it = h.cbegin(); it != h.cend(); ++it) {
    std::print("{} ", *it);
  }
  std::println("");
}
```
* cend()[color ff0000]
* h.insert[link insert.md]
* h.cbegin()[link cbegin.md]

### 出力例
```
1 2 3 
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 参照
- [P0447R28 Introduction of `std::hive` to the standard library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p0447r28.html)
    - C++26で追加された
