# swap
* flat_set[meta header]
* std[meta namespace]
* flat_multiset[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
void swap(flat_multiset& y) noexcept;           // (1) C++23
constexpr void swap(flat_multiset& y) noexcept; // (1) C++26
```

## 概要
コンテナ内のコンテンツを、同じ型の要素を保持する他の `flat_multiset` オブジェクトである `y` 内のコンテンツと交換する。

このメンバ関数の呼び出しの後、呼び出し前にコンテナ内にあった要素は `y` へ、`y` 内にあった要素は `*this` へ移る。


## 計算量
定数時間。


## 例
```cpp example
#include <flat_set>
#include <iostream>

template <class Set>
void print(const char* name, const Set& s)
{
  std::cout << name << " : {";

  bool first = true;

  for (const auto& x : s) {
    if (first) {
      first = false;
    }
    else {
      std::cout << ", ";
    }
    std::cout << x;
  }
  std::cout << "}" << std::endl;
}

int main()
{
  std::flat_multiset<int> fs1 = {10, 20, 30};

  std::flat_multiset<int> fs2 = {5, 15};

  // fs1とfs2を入れ替える
  fs1.swap(fs2);

  print("fs1", fs1);
  print("fs2", fs2);
}
```
* swap[color ff0000]

### 出力
```
fs1 : {5, 15}
fs2 : {10, 20, 30}
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
