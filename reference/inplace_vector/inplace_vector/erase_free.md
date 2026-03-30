# erase (非メンバ関数)
* inplace_vector[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  template <class T, std::size_t N, class U = T>
  constexpr typename inplace_vector<T, N>::size_type
    erase(inplace_vector<T, N>& c, const U& value); // (1) C++26
}
```

## 概要
指定した値をもつ要素とその分の領域を、コンテナから削除する。


## 効果
以下と等価：

```cpp
auto it = std::remove(c.begin(), c.end(), value);
auto r = std::distance(it, c.end());
c.erase(it, c.end());
return r;
```
* std::remove[link /reference/algorithm/remove.md]
* std::distance[link /reference/iterator/distance.md]
* distance[link /reference/iterator/distance.md]
* c.erase[link erase.md]
* c.begin()[link begin.md]
* c.end()[link end.md]


## 戻り値
削除した要素数を返す。


## 例
```cpp example
#include <print>
#include <inplace_vector>

int main()
{
  std::inplace_vector<int, 10> iv = {3, 1, 4, 1, 5};

  std::erase(iv, 1);

  for (int x : iv) {
    std::println("{}", x);
  }
}
```
* std::erase[color ff0000]

### 出力
```
3
4
5
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 23 [mark verified]
- [GCC](/implementation.md#gcc): 16 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 参照
- [P0843R14 `inplace_vector`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p0843r14.html)
