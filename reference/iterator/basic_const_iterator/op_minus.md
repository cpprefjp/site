# operator-
* iterator[meta header]
* std[meta namespace]
* basic_const_iterator[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
template<sized_sentinel_for<Iterator> S>
constexpr difference_type operator-(const S& y) const;  // (1)

template<not-a-const-iterator S>
  requires sized_sentinel_for<S, Iterator>
friend constexpr difference_type operator-(const S& x, const basic_const_iterator& y);  // (2) 非メンバ関数
```
* sized_sentinel_for[link /reference/iterator/sized_sentinel_for.md]

## 概要

`basic_const_iterator`の間、もしくは`Iterator`に対応する番兵との間の距離を計算する。

`basic_const_iterator<Iterator>`のオブジェクトを`i`、`Iterator`に対応する番兵型のオブジェクトを`s`とすると

- (1) : `i - s`のためのオーバーロード
- (2) : `s - i`のためのオーバーロード

## テンプレートパラメータ制約

`not-a-const-iterator<I>`は`I`が`basic_const_iterator`の特殊化ではない場合に`true`となる説明専用のコンセプトである。

## 効果

ラップしているイテレータを`current_`メンバ変数に保持するとして

- (1) : 以下と等価
    ```cpp
    return current_ - y;
    ```

- (2) : 以下と等価
    ```cpp
    return x - y.current_;
    ```

## 備考

(2)の関数は[*Hidden friends*](/article/lib/hidden_friends.md)として定義される。

## 例
```cpp example
#include <iostream>
#include <iterator>
#include <vector>

int main() {
  std::vector vec = {1, 2, 3, 4, 5};

  std::basic_const_iterator cit = vec.begin();
  auto se = vec.end();

  // 元のイテレータの番兵との間で距離計算
  std::cout << (cit - se) << '\n';
  std::cout << (se - cit) << '\n';

  std::basic_const_iterator cse = se;

  // basic_const_iterator同士で距離計算
  // (1) -> (2)と呼ばれることで内部イテレータ同士の距離計算を行う
  std::cout << (cit - cse) << '\n';
  std::cout << (cse - cit) << '\n';
}
```

### 出力
```
-5
5
-5
5
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
