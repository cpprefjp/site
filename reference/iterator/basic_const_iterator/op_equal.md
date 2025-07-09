# operator==
* iterator[meta header]
* std[meta namespace]
* basic_const_iterator[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
template<sentinel_for<Iterator> S>
constexpr bool operator==(const S& s) const;
```

## 概要

`basic_const_iterator<Iterator>`オブジェクトと別のイテレータ（`basic_const_iterator<Iterator>`か`Iterator`のオブジェクト）が同じ要素を指しているかを判定する。

## 効果

ラップしているイテレータを`current_`メンバ変数に保持するとして、以下と等価

```cpp
return current_ == s;
```

## 戻り値

2つのイテレータが同じ要素を指している場合に`true`を返す。


## 備考

この演算子により以下の演算子が使用可能になる。

```cpp
// !=
template<sentinel_for<Iterator> S>
constexpr bool operator!=(const S&) const;

// 逆順
template<sentinel_for<Iterator> S>
friend constexpr bool operator==(const S&, const basic_const_iterator<Iterator>&);

template<sentinel_for<Iterator> S>
friend constexpr bool operator!=(const S&, const basic_const_iterator<Iterator>&);
```

## 例
```cpp example
#include <iostream>
#include <iterator>
#include <vector>

int main() {
  std::vector vec = {1, 2, 3, 4, 5};

  std::basic_const_iterator cit = vec.begin();
  auto se = vec.end();

  std::cout << std::boolalpha;

  // 元のイテレータとの比較
  std::cout << (cit == se) << '\n';
  std::cout << (se == cit) << '\n';

  std::basic_const_iterator cse = se;

  // basic_const_iterator同士の比較
  std::cout << (cit == cse) << '\n';
  std::cout << (cse == cit) << '\n';

  // !=の導出
  std::cout << (cit != se) << '\n';
  std::cout << (se != cit) << '\n';
  std::cout << (cit != cse) << '\n';
  std::cout << (cse != cit) << '\n';
}
```
* ==[color ff0000]

### 出力
```
false
false
false
false
true
true
true
true
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
