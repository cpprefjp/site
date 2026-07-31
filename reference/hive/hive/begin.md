# begin
* hive[meta header]
* std[meta namespace]
* hive[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
iterator begin() noexcept;             // (1) C++26
const_iterator begin() const noexcept; // (2) C++26
```

## 概要
先頭要素を指すイテレータを取得する。


## 戻り値
先頭要素を指すイテレータ


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

  const std::hive<int>& ch = h;

  decltype(h)::iterator       i  = h.begin();  // (1)
  decltype(h)::const_iterator ci = ch.begin(); // (2)

  // begin()からend()まで走査する
  for (auto it = i; it != h.end(); ++it) {
    std::print("{} ", *it);
  }
  std::println("");

  std::println("{}", *ci);
}
```
* begin()[color ff0000]
* h.insert[link insert.md]
* h.end()[link end.md]

### 出力例
```
1 2 3 
1
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
