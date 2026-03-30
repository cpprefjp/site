# insert
* inplace_vector[meta header]
* std[meta namespace]
* inplace_vector[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr iterator
  insert(const_iterator position,
         const T& x);              // (1) C++26

constexpr iterator
  insert(const_iterator position,
         T&& x);                   // (2) C++26

constexpr iterator
  insert(const_iterator position,
         size_type n,
         const T& x);              // (3) C++26

template <class InputIterator>
constexpr iterator
  insert(const_iterator position,
         InputIterator first,
         InputIterator last);      // (4) C++26

constexpr iterator insert(const_iterator position, initializer_list<T> il); // (5) C++26
```
* initializer_list[link /reference/initializer_list/initializer_list.md]

## 概要
任意の位置に新たな要素を挿入する。

- (1) : `position`の前に`x`のコピーを挿入する。
- (2) : `position`の前に`x`をムーブ挿入する。
- (3) : `position`の前に`n`個の`x`のコピーを挿入する。
- (4) : `position`の前にイテレータ範囲`[first, last)`の要素を挿入する。
- (5) : `position`の前に初期化子リスト`il`の要素を挿入する。


## 戻り値
挿入された要素を指すイテレータ。(3), (4), (5)では挿入された最初の要素を指すイテレータ。要素が挿入されなかった場合は`position`を指すイテレータ。


## 例外
挿入後のサイズが`N`を超える場合、[`bad_alloc`](/reference/new/bad_alloc.md)例外を送出する。


## 計算量
挿入される要素の数と挿入位置から[`end()`](end.md)までの要素数に対して線形時間。


## 例
```cpp example
#include <print>
#include <inplace_vector>

int main()
{
  std::inplace_vector<int, 10> iv = {1, 2, 3};

  // (1) 先頭にコピー挿入
  iv.insert(iv.begin(), 0);

  // (3) 末尾に2個の9を挿入
  iv.insert(iv.end(), 2, 9);

  // (5) 初期化子リストで挿入
  iv.insert(iv.begin() + 2, {10, 20});

  for (int x : iv) {
    std::println("{} ", x);
  }
}
```
* insert[color ff0000]
* iv.begin()[link begin.md]
* iv.end()[link end.md]

### 出力
```
0
1
10
20
2
3
9
9
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
