# swap (非メンバ関数)
* flat_set[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std {
  template <class Key, class Compare, class KeyContainer>
  void
    swap(flat_set<Key, Compare, KeyContainer>& x,
         flat_set<Key, Compare, KeyContainer>& y); // (1) C++23
  template <class Key, class Compare, class KeyContainer>
  constexpr void
    swap(flat_set<Key, Compare, KeyContainer>& x,
         flat_set<Key, Compare, KeyContainer>& y); // (1) C++26
}
```

## 概要
2つの `flat_set` オブジェクトを入れ替える。


## 効果
`x.`[`swap`](swap.md)`(y)`


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
  std::flat_set<int> fs1 = {10, 20, 30};

  std::flat_set<int> fs2 = {5, 15};

  // fs1とfs2を入れ替える
  std::swap(fs1, fs2);

  print("fs1", fs1);
  print("fs2", fs2);
}
```
* std::swap[color ff0000]

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
