# コンストラクタ
* iterator[meta header]
* std[meta namespace]
* basic_const_iterator[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr basic_const_iterator() requires default_initializable<Iterator> = default;  // (1)

constexpr basic_const_iterator(Iterator current);                                     // (2)

template<convertible_to<Iterator> U>
constexpr basic_const_iterator(basic_const_iterator<U> current);                      // (3)

template<different-from<basic_const_iterator> T>
  requires convertible_to<T, Iterator>
constexpr basic_const_iterator(T&& current);                                          // (4)
```
* default_initializable[link /reference/concepts/default_initializable.md]
* convertible_to[link /reference/concepts/convertible_to.md]
* different-from[link /reference/ranges/different-from.md]

## 概要

`basic_const_iterator`オブジェクトを構築する。

## 効果

ラップするイテレータを`current_`というメンバに保持するとして

- (1) : `current_`をデフォルト構築する
- (2) : `current_`を`std::move(current)`で初期化する
- (3) : `current_`を`std::move(current.current_)`で初期化する
- (4) : `current_`を`std::forward<T>(current)`で初期化する

## 例
```cpp example
#include <iterator>
#include <vector>

// 例示のための単純なイテレータラッパ、ラップするイテレータへの暗黙変換を提供する
template<typename I>
struct wrap_iter {
  I it;

  operator I() const {
    return it;
  }
};

int main() {
  using I = std::vector<int>::iterator;

  std::vector<int> vec = {1, 2, 3, 4, 5};

  // (1) デフォルトコンストラクタ
  std::basic_const_iterator<I> ci1{};

  // (2) イテレータから構築
  std::basic_const_iterator ci2{vec.begin()};

  // (3) 別のbasic_const_iteratorから変換して構築（コピーコンストラクタ）
  std::basic_const_iterator<I> ci3{ci2};

  wrap_iter wrap{ci2};
  // (4) Iteratorに変換可能な型から構築
  std::basic_const_iterator<I> ci4{wrap};
}
```
* basic_const_iterator[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 13.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 6 [mark verified]

## 参照

- [P2278R4 `cbegin` should always return a constant iterator](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2278r4.html)
