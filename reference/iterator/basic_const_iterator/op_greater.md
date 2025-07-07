# operator>
* iterator[meta header]
* std[meta namespace]
* basic_const_iterator[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr bool operator>(const basic_const_iterator& y) const
  requires random_access_iterator<Iterator>;                                        // (1)

template<different-from<basic_const_iterator> I>
constexpr bool operator>(const I& y) const
  requires random_access_iterator<Iterator> && totally_ordered_with<Iterator, I>;   // (2)

template<not-a-const-iterator I>
friend constexpr bool operator>(const I& x, const basic_const_iterator& y)
  requires random_access_iterator<Iterator> && totally_ordered_with<Iterator, I>;   // (3) 非メンバ関数
```
* totally_ordered_with[link /reference/concepts/totally_ordered.md]
* different-from[link /reference/ranges/different-from.md]

## 概要

`basic_const_iterator<Iterator>`オブジェクト同士あるいは別のイテレータとの間で、左辺が右辺より大きいかを判定する。

- (1) : 同じ`random_access_iterator`特殊化同士の間の`>`比較
- (2) : `Iterator`と比較可能な型の値との間の`>`比較
- (3) : (2)の逆順の演算子

## テンプレートパラメータ制約

`not-a-const-iterator<I>`は`I`が`basic_const_iterator`の特殊化ではない場合に`true`となる説明専用のコンセプトである。

## 効果

ラップしているイテレータを`current_`メンバ変数に保持するとして、以下と等価

- (1) : 以下と等価  
    ```cpp
    return current_ > y.current_;
    ```

- (2) : 以下と等価  
    ```cpp
    return current_ > y;
    ```

- (3) : 以下と等価  
    ```cpp
    return x > y.current_;
    ```

## 備考

(3)の関数は[*Hidden friends*](/article/lib/hidden_friends.md)として定義される。

## 例
```cpp example
#include <iostream>
#include <iterator>
#include <vector>

int main() {
  std::vector vec = {1, 2, 3, 4, 5};

  std::basic_const_iterator cit = vec.begin();
  auto se = vec.end();
  std::basic_const_iterator cse = se;

  std::cout << std::boolalpha;

  // basic_const_iterator同士の比較
  std::cout << (cit > cse) << '\n';
  std::cout << (cse > cit) << '\n';
  std::cout << (cit > cit) << '\n';

  // 元のイテレータとの比較
  std::cout << (cit > se) << '\n';
  std::cout << (se > cit) << '\n';
  std::cout << (cit > cit.base()) << '\n';
}
```
* >[color ff0000]

### 出力
```
false
true
false
false
true
false
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
