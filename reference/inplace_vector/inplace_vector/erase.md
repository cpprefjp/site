# erase
* inplace_vector[meta header]
* std[meta namespace]
* inplace_vector[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr iterator erase(const_iterator position);                   // (1) C++26
constexpr iterator erase(const_iterator first, const_iterator last); // (2) C++26
```

## 概要
指定した要素を削除する。

- (1) : `position`が指す要素を削除する。
- (2) : イテレータ範囲`[first, last)`の要素を削除する。


## 戻り値
削除された要素の次の要素を指すイテレータ。そのような要素が存在しない場合は[`end()`](end.md)を返す。


## 計算量
削除される要素の数と削除位置から[`end()`](end.md)までの要素数に対して線形時間。


## 例
```cpp example
#include <print>
#include <inplace_vector>

int main()
{
  // (1) 単一要素の削除
  {
    std::inplace_vector<int, 10> iv = {1, 2, 3, 4, 5};
    iv.erase(iv.begin() + 2); // 3を削除

    for (int x : iv) std::print("{} ", x);
    std::println("");
  }

  // (2) 範囲の削除
  {
    std::inplace_vector<int, 10> iv = {1, 2, 3, 4, 5};
    iv.erase(iv.begin() + 1, iv.begin() + 3); // 2, 3を削除

    for (int x : iv) std::print("{} ", x);
    std::println("");
  }
}
```
* erase[color ff0000]
* iv.begin()[link begin.md]

### 出力
```
1 2 4 5
1 4 5
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
